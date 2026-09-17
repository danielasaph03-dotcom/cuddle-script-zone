import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";
import bcrypt from "bcryptjs";
import { getPool } from "./db";
import { createSessionToken, verifySessionToken, SESSION_COOKIE_NAME } from "./cookies";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
};

const _signIn = createServerFn({ method: "POST" })
  .validator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const pool = getPool();
    const [rows] = await pool.query(
      "SELECT id, password_hash FROM admins WHERE email = ? LIMIT 1",
      [data.email],
    );
    const admin = (rows as { id: string; password_hash: string }[])[0];
    if (!admin) throw new Error("E-mail ou senha inválidos.");

    const valid = await bcrypt.compare(data.password, admin.password_hash);
    if (!valid) throw new Error("E-mail ou senha inválidos.");

    const { value, maxAge } = createSessionToken(admin.id);
    setCookie(SESSION_COOKIE_NAME, value, { ...cookieOptions, maxAge });
  });

export async function signIn(email: string, password: string): Promise<void> {
  await _signIn({ data: { email, password } });
}

const _signOut = createServerFn({ method: "POST" }).handler(async () => {
  deleteCookie(SESSION_COOKIE_NAME, cookieOptions);
});

export async function signOut(): Promise<void> {
  await _signOut();
}

const _getSession = createServerFn({ method: "GET" }).handler(async () => {
  const token = getCookie(SESSION_COOKIE_NAME);
  const adminId = verifySessionToken(token);
  return adminId ? { adminId } : null;
});

export async function getSession(): Promise<{ adminId: string } | null> {
  return _getSession();
}
