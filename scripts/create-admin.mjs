#!/usr/bin/env node
// Gera o hash bcrypt de uma senha e imprime um INSERT pronto pra colar no
// phpMyAdmin, criando o (único) usuário administrador do painel.
//
// Uso: node scripts/create-admin.mjs seu-email@exemplo.com "SuaSenhaForte123"

import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";

const [, , email, password] = process.argv;

if (!email || !password) {
  console.error('Uso: node scripts/create-admin.mjs seu-email@exemplo.com "SuaSenhaForte123"');
  process.exit(1);
}

const id = randomUUID();
const hash = await bcrypt.hash(password, 12);
const escapedEmail = email.replace(/'/g, "''");

console.log("\nCole isto no phpMyAdmin (aba SQL) e execute:\n");
console.log(
  `INSERT INTO admins (id, email, password_hash) VALUES ('${id}', '${escapedEmail}', '${hash}');\n`,
);
