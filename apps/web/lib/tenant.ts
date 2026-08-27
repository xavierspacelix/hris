import { prisma, type TenantScope } from '@hris/db';

export async function resolveTenantScope(host: string | null): Promise<TenantScope | null> {
  const hostname = host?.split(':')[0]?.toLowerCase();
  const slug = hostname?.split('.')[0];

  if (!slug || slug === 'localhost') {
    return null;
  }

  const tenant = await prisma.tenant.findUnique({ where: { slug } });

  return tenant ? { tenantId: tenant.id, branchId: null, scope: 'all' } : null;
}
