/**
 * The /admin path is protected by Cloudflare Access before a
 * request reaches this Worker. Keeping the application layer free of a second
 * JWT implementation avoids server-render crashes while Access owns the login
 * session, policy, and token validation at the edge.
 */
export async function requireAdminAccess(): Promise<void> {
  return;
}
