import { PrismaClient, RoleScope } from '../generated/prisma/client';

const prisma = new PrismaClient();

const permissions = [
  ['people', 'read'],
  ['people', 'write'],
  ['leave', 'approve'],
  ['payroll', 'read'],
  ['payroll', 'run'],
  ['settings', 'manage'],
  ['members', 'manage'],
  ['audit', 'read'],
] as const;

const roleTemplates = [
  { key: 'owner', name: 'Owner', scope: RoleScope.ALL, permissions: ['*'] },
  {
    key: 'bod',
    name: 'Board of Directors',
    scope: RoleScope.ALL,
    permissions: ['reports.read', 'audit.read'],
  },
  {
    key: 'hr_admin',
    name: 'HR Administrator',
    scope: RoleScope.ALL,
    permissions: ['people.read', 'people.write', 'leave.approve', 'settings.manage', 'members.manage', 'audit.read'],
  },
  {
    key: 'payroll_admin',
    name: 'Payroll Administrator',
    scope: RoleScope.ALL,
    permissions: ['payroll.read', 'payroll.run'],
  },
  { key: 'manager', name: 'Manager', scope: RoleScope.BRANCH, permissions: ['people.read', 'leave.approve'] },
  { key: 'employee', name: 'Employee', scope: RoleScope.BRANCH, permissions: ['people.read'] },
] as const;

async function main() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'acme' },
    update: {},
    create: { name: 'Acme Corporation', slug: 'acme' },
  });

  await prisma.branch.createMany({
    data: [
      { tenantId: tenant.id, name: 'Jakarta', code: 'JKT', timezone: 'Asia/Jakarta', currency: 'IDR' },
      { tenantId: tenant.id, name: 'Surabaya', code: 'SBY', timezone: 'Asia/Jakarta', currency: 'IDR' },
    ],
    skipDuplicates: true,
  });

  await prisma.permission.createMany({
    data: permissions.map(([resource, action]) => ({ resource, action })),
    skipDuplicates: true,
  });

  for (const role of roleTemplates) {
    await prisma.role.upsert({
      where: { tenantId_key: { tenantId: tenant.id, key: role.key } },
      update: { name: role.name, scope: role.scope, isTemplate: true, permissions: [...role.permissions] },
      create: {
        tenantId: tenant.id,
        key: role.key,
        name: role.name,
        scope: role.scope,
        isTemplate: true,
        permissions: [...role.permissions],
      },
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error: unknown) => {
    await prisma.$disconnect();
    throw error;
  });
