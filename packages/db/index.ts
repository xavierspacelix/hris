import { Prisma, PrismaClient } from './generated/prisma/client';

export { Prisma, PrismaClient } from './generated/prisma/client';

export type RoleScope = 'all' | 'branch';

export interface TenantScope {
  tenantId: string;
  branchId: string | null;
  scope: RoleScope;
}

const tenantScopedModels = new Set(['Branch', 'User', 'Role', 'UserRole', 'AuditLog']);
const branchScopedModels = new Set(['UserRole', 'AuditLog']);
const uniqueOperations = new Set([
  'findUnique',
  'findUniqueOrThrow',
  'update',
  'updateManyAndReturn',
  'delete',
  'upsert',
]);
const createOperations = new Set(['create', 'createMany', 'createManyAndReturn']);

export const prisma = new PrismaClient();

function asRecord(value: unknown): Record<string, unknown> {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  return {};
}

function scopedWhere(where: unknown, context: TenantScope, needsBranchScope: boolean) {
  const filters: Record<string, string>[] = [{ tenantId: context.tenantId }];

  if (needsBranchScope && context.scope === 'branch') {
    if (!context.branchId) {
      throw new Error('Branch-scoped database access requires a branch ID.');
    }

    filters.push({ branchId: context.branchId });
  }

  return { AND: [asRecord(where), ...filters] };
}

function scopedData(data: unknown, context: TenantScope, needsBranchScope: boolean) {
  const applyScope = (value: unknown) => {
    const scoped: Record<string, unknown> = {
      ...asRecord(value),
      tenantId: context.tenantId,
    };

    if (needsBranchScope && context.scope === 'branch') {
      if (!context.branchId) {
        throw new Error('Branch-scoped database access requires a branch ID.');
      }

      scoped.branchId = context.branchId;
    }

    return scoped;
  };

  return Array.isArray(data) ? data.map(applyScope) : applyScope(data);
}

export function withTenantScope(context: TenantScope) {
  return Prisma.defineExtension((client) =>
    client.$extends({
      query: {
        $allModels: {
          async $allOperations({ args, model, operation, query }) {
            if (model === 'Tenant') {
              if (createOperations.has(operation) || uniqueOperations.has(operation)) {
                throw new Error('Tenant creation and unique operations require the system client.');
              }
              const scopedArgs = asRecord(args);
              return query({
                ...scopedArgs,
                where: { AND: [asRecord(scopedArgs.where), { id: context.tenantId }] },
              });
            }

            if (!model || !tenantScopedModels.has(model)) {
              return query(args);
            }

            if (uniqueOperations.has(operation)) {
              throw new Error(
                `${model}.${operation} is not allowed on a tenant-scoped client. ` +
                  'Use a scoped collection operation instead.',
              );
            }

            const scopedArgs = asRecord(args);
            const needsBranchScope = branchScopedModels.has(model);

            if (createOperations.has(operation)) {
              return query({
                ...scopedArgs,
                data: scopedData(scopedArgs.data, context, needsBranchScope),
              });
            }

            return query({
              ...scopedArgs,
              where: scopedWhere(scopedArgs.where, context, needsBranchScope),
            });
          },
        },
      },
    }),
  );
}

export type ScopedPrismaClient = Omit<
  typeof prisma,
  '$connect' | '$disconnect' | '$extends' | '$on' | '$transaction'
>;

export async function withScopedTransaction<T>(
  context: TenantScope,
  execute: (client: ScopedPrismaClient) => Promise<T>,
): Promise<T> {
  if (context.scope === 'branch' && !context.branchId) {
    throw new Error('Branch-scoped database access requires a branch ID.');
  }

  const scopedPrisma = prisma.$extends(withTenantScope(context));

  return scopedPrisma.$transaction(async (transaction) => {
    await transaction.$executeRaw`
      SELECT set_config('app.current_tenant', ${context.tenantId}, true),
             set_config('app.current_branch', ${context.branchId ?? '00000000-0000-0000-0000-000000000000'}, true),
             set_config('app.scope', ${context.scope}, true)
    `;

    // Prisma 6 omits $extends from transaction type despite retaining extension behavior.
    return execute(transaction as unknown as ScopedPrismaClient);
  });
}
