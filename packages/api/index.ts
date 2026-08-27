import { type Prisma, type ScopedPrismaClient, type TenantScope } from '@hris/db';

export const API_VERSION = '0.1.0';

export type Permission = `${string}.${string}` | '*';

export interface ApiContext extends TenantScope {
  actorId: string;
  permissions: readonly Permission[];
  database: ScopedPrismaClient;
}

export interface AuditInput {
  action: string;
  entity: string;
  entityId?: string;
  branchId?: string | null;
  before?: Record<string, unknown> | null;
  after?: Record<string, unknown> | null;
}

export function requirePermission(context: ApiContext, permission: Permission): void {
  if (!context.permissions.includes('*') && !context.permissions.includes(permission)) {
    throw new ApiError('FORBIDDEN', `Missing permission: ${permission}`);
  }
}

export class ApiError extends Error {
  constructor(
    public readonly code: 'BAD_REQUEST' | 'FORBIDDEN' | 'NOT_FOUND',
    message: string,
  ) {
    super(message);
  }
}

const maskedFields = new Set(['email', 'password', 'passwordHash', 'mfaSecret', 'token', 'ip']);

function maskAuditValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(maskAuditValue);
  }

  if (typeof value !== 'object' || value === null) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => [
      key,
      maskedFields.has(key) ? '[masked]' : maskAuditValue(nestedValue),
    ]),
  );
}

function asJson(value: Record<string, unknown>): Prisma.InputJsonValue {
  return value as Prisma.InputJsonValue;
}

export async function audit(context: ApiContext, input: AuditInput): Promise<void> {
  await context.database.auditLog.create({
    data: {
      tenantId: context.tenantId,
      actorId: context.actorId,
      action: input.action,
      entity: input.entity,
      entityId: input.entityId,
      branchId: input.branchId ?? context.branchId,
      before: input.before ? asJson(input.before) : undefined,
      after: input.after ? asJson(input.after) : undefined,
    },
  });
}

export async function getSettings(context: ApiContext) {
  requirePermission(context, 'settings.manage');
  const tenant = await context.database.tenant.findFirst({ where: {} });
  if (!tenant) throw new ApiError('NOT_FOUND', 'Tenant not found.');
  return tenant;
}

export async function updateSettings(
  context: ApiContext,
  input: { name: string; logoUrl?: string | null; timezone: string; locale: string; currency: string },
) {
  requirePermission(context, 'settings.manage');
  const tenant = await getSettings(context);
  const updated = await context.database.tenant.updateMany({
    where: { id: tenant.id },
    data: input,
  });
  if (!updated.count) throw new ApiError('NOT_FOUND', 'Tenant not found.');
  await audit(context, { action: 'tenant.updated', entity: 'tenant', entityId: tenant.id, before: tenant, after: input });
}

export async function listBranches(context: ApiContext) {
  requirePermission(context, 'settings.manage');
  return context.database.branch.findMany({ orderBy: { name: 'asc' } });
}

export async function createBranch(
  context: ApiContext,
  input: { name: string; code: string; timezone: string; currency: string },
) {
  requirePermission(context, 'settings.manage');
  const branch = await context.database.branch.create({
    data: { ...input, tenantId: context.tenantId },
  });
  await audit(context, { action: 'branch.created', entity: 'branch', entityId: branch.id, after: branch });
  return branch;
}

export async function updateBranch(
  context: ApiContext,
  branchId: string,
  input: { name: string; code: string; timezone: string; currency: string },
) {
  requirePermission(context, 'settings.manage');
  const branch = await context.database.branch.findFirst({ where: { id: branchId } });
  if (!branch) throw new ApiError('NOT_FOUND', 'Branch not found.');
  await context.database.branch.updateMany({ where: { id: branchId }, data: input });
  await audit(context, { action: 'branch.updated', entity: 'branch', entityId: branchId, before: branch, after: input });
}

export async function listMembers(context: ApiContext) {
  requirePermission(context, 'members.manage');
  return context.database.userRole.findMany({
    include: { user: true, role: true, branch: true },
    orderBy: { createdAt: 'asc' },
  });
}

export async function changeMemberRole(
  context: ApiContext,
  input: { userRoleId: string; roleId: string; branchId?: string | null },
) {
  requirePermission(context, 'members.manage');
  const membership = await context.database.userRole.findFirst({ where: { id: input.userRoleId } });
  if (!membership) throw new ApiError('NOT_FOUND', 'Member role not found.');
  const role = await context.database.role.findFirst({ where: { id: input.roleId } });
  if (!role) throw new ApiError('NOT_FOUND', 'Role not found.');
  if (role.scope === 'BRANCH' && !input.branchId) {
    throw new ApiError('BAD_REQUEST', 'Branch-scoped roles require a branch.');
  }
  await context.database.userRole.updateMany({
    where: { id: membership.id },
    data: { roleId: role.id, branchId: role.scope === 'ALL' ? null : input.branchId },
  });
  await audit(context, {
    action: 'member.role_changed',
    entity: 'user_role',
    entityId: membership.id,
    before: { roleId: membership.roleId, branchId: membership.branchId },
    after: { roleId: role.id, branchId: role.scope === 'ALL' ? null : input.branchId },
  });
}

export async function listAuditLogs(
  context: ApiContext,
  filter: { action?: string; entity?: string; from?: Date; to?: Date } = {},
) {
  requirePermission(context, 'audit.read');
  const logs = await context.database.auditLog.findMany({
    where: {
      action: filter.action || undefined,
      entity: filter.entity || undefined,
      createdAt: { gte: filter.from, lte: filter.to },
    },
    include: { actor: { select: { name: true } } },
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
  return logs.map((log) => ({ ...log, before: maskAuditValue(log.before), after: maskAuditValue(log.after) }));
}
