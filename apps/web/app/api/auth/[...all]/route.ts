import { toNextJsHandler } from 'better-auth/next-js';
import { NextResponse } from 'next/server';
import { withScopedTransaction } from '@hris/db';
import { createTenantAuth } from '../../../../lib/auth';
import { resolveTenantScope } from '../../../../lib/tenant';

async function handle(request: Request, method: 'GET' | 'POST') {
  const context = await resolveTenantScope(request.headers.get('host'));

  if (!context) {
    return NextResponse.json({ error: 'Tenant not found.' }, { status: 404 });
  }

  return withScopedTransaction(context, async (database) => {
    const handler = toNextJsHandler(createTenantAuth(context, database));
    return handler[method](request);
  });
}

export function GET(request: Request) {
  return handle(request, 'GET');
}

export function POST(request: Request) {
  return handle(request, 'POST');
}
