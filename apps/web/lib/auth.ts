import { prismaAdapter } from 'better-auth/adapters/prisma';
import { betterAuth } from 'better-auth';
import type { PrismaClient, ScopedPrismaClient, TenantScope } from '@hris/db';

export function createTenantAuth(context: TenantScope, database: ScopedPrismaClient) {
  return betterAuth({
    database: prismaAdapter(database as unknown as PrismaClient, {
      provider: 'postgresql',
    }),
    emailAndPassword: {
      enabled: true,
    },
    user: {
      additionalFields: {
        tenantId: {
          type: 'string',
          required: true,
          input: false,
        },
      },
    },
    session: {
      additionalFields: {
        tenantId: {
          type: 'string',
          required: true,
          input: false,
        },
      },
    },
    advanced: {
      database: {
        generateId: 'uuid',
      },
    },
    databaseHooks: {
      user: {
        create: {
          before: async (user) => ({
            data: { ...user, tenantId: context.tenantId },
          }),
        },
      },
      session: {
        create: {
          before: async (session) => ({
            data: { ...session, tenantId: context.tenantId },
          }),
        },
      },
      account: {
        create: {
          before: async (account) => ({
            data: { ...account, tenantId: context.tenantId },
          }),
        },
      },
    },
  });
}
