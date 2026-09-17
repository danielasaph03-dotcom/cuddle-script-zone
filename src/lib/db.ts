import mysql from "mysql2/promise";

const host = process.env["DB_HOST"];
const user = process.env["DB_USER"];
const password = process.env["DB_PASSWORD"];
const database = process.env["DB_NAME"];

export const isDbConfigured = Boolean(host && user && password && database);

let poolInstance: mysql.Pool | undefined;

/** Pool de conexões MySQL. Só é criado na primeira chamada, e só no servidor. */
export function getPool(): mysql.Pool {
  if (!host || !user || !password || !database) {
    throw new Error(
      "Banco de dados não configurado: defina DB_HOST, DB_USER, DB_PASSWORD e DB_NAME (veja ADMIN_SETUP.md).",
    );
  }
  if (!poolInstance) {
    poolInstance = mysql.createPool({
      host,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 5,
      // Trata DATETIME como UTC na leitura e na escrita — evita bugs de fuso
      // horário (o resto do app já assume tudo em UTC, ver formatarData()).
      timezone: "Z",
    });
  }
  return poolInstance;
}
