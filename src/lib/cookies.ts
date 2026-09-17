import { createHmac, timingSafeEqual } from "node:crypto";

const SESSION_COOKIE_NAME = "gs_admin_session";
const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 dias

function getSecret(): string {
  const secret = process.env["AUTH_COOKIE_SECRET"];
  if (!secret) {
    throw new Error("AUTH_COOKIE_SECRET não configurado (veja ADMIN_SETUP.md).");
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

/** Gera o valor assinado do cookie de sessão para um admin autenticado. */
export function createSessionToken(adminId: string): { value: string; maxAge: number } {
  const expiresAt = Date.now() + SESSION_MAX_AGE_MS;
  const payload = `${adminId}.${expiresAt}`;
  const signature = sign(payload);
  return { value: `${payload}.${signature}`, maxAge: SESSION_MAX_AGE_MS / 1000 };
}

/** Valida o cookie de sessão; retorna o id do admin se válido e não expirado, senão null. */
export function verifySessionToken(token: string | undefined): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [adminId, expiresAtStr, signature] = parts as [string, string, string];
  const payload = `${adminId}.${expiresAtStr}`;
  const expected = sign(payload);

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  const expiresAt = Number(expiresAtStr);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return null;

  return adminId;
}

export { SESSION_COOKIE_NAME };
