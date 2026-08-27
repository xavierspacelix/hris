-- Applied with each generated Prisma migration under ADR 0001.
-- Missing settings return NULL, so every policy fails closed.

ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches FORCE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE users FORCE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles FORCE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles FORCE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs FORCE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions FORCE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts FORCE ROW LEVEL SECURITY;
ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE verifications FORCE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON branches
  USING (tenant_id = current_setting('app.current_tenant', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant', true)::uuid);

CREATE POLICY tenant_isolation ON users
  USING (tenant_id = current_setting('app.current_tenant', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant', true)::uuid);

CREATE POLICY tenant_isolation ON roles
  USING (tenant_id = current_setting('app.current_tenant', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant', true)::uuid);

CREATE POLICY tenant_isolation ON user_roles
  USING (
    tenant_id = current_setting('app.current_tenant', true)::uuid
    AND (
      current_setting('app.scope', true) = 'all'
      OR branch_id = current_setting('app.current_branch', true)::uuid
    )
  )
  WITH CHECK (
    tenant_id = current_setting('app.current_tenant', true)::uuid
    AND (
      current_setting('app.scope', true) = 'all'
      OR branch_id = current_setting('app.current_branch', true)::uuid
    )
  );

CREATE POLICY tenant_isolation ON audit_logs
  USING (
    tenant_id = current_setting('app.current_tenant', true)::uuid
    AND (
      current_setting('app.scope', true) = 'all'
      OR branch_id IS NULL
      OR branch_id = current_setting('app.current_branch', true)::uuid
    )
  )
  WITH CHECK (
    tenant_id = current_setting('app.current_tenant', true)::uuid
    AND (
      current_setting('app.scope', true) = 'all'
      OR branch_id IS NULL
      OR branch_id = current_setting('app.current_branch', true)::uuid
    )
  );

CREATE POLICY tenant_isolation ON sessions
  USING (tenant_id = current_setting('app.current_tenant', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant', true)::uuid);

CREATE POLICY tenant_isolation ON accounts
  USING (tenant_id = current_setting('app.current_tenant', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant', true)::uuid);

CREATE POLICY tenant_isolation ON verifications
  USING (tenant_id = current_setting('app.current_tenant', true)::uuid)
  WITH CHECK (tenant_id = current_setting('app.current_tenant', true)::uuid);
