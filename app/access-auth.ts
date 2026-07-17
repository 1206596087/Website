import { env } from "cloudflare:workers";
import { headers } from "next/headers";
import { createRemoteJWKSet, jwtVerify } from "jose";

type AccessIdentity = { email: string };

/**
 * Verifies the Cloudflare Access token before an administrator route can use
 * the database. Cloudflare's edge policy is the first gate; this verification
 * prevents a direct request from bypassing that policy.
 */
export async function requireAdminAccess(): Promise<AccessIdentity> {
  const teamDomain = String(env.TEAM_DOMAIN ?? "").replace(/\/$/, "");
  const audiences = String(env.POLICY_AUD ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const adminEmail = String(env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const token = (await headers()).get("cf-access-jwt-assertion");

  if (!teamDomain || audiences.length === 0 || !adminEmail || !token) {
    throw new Error("Cloudflare Access is not configured.");
  }

  const jwks = createRemoteJWKSet(
    new URL(`${teamDomain}/cdn-cgi/access/certs`),
  );
  const { payload } = await jwtVerify(token, jwks, {
    issuer: teamDomain,
    audience: audiences,
  });
  const email = typeof payload.email === "string" ? payload.email.toLowerCase() : "";

  if (!email || email !== adminEmail) {
    throw new Error("Administrator access required.");
  }

  return { email };
}
