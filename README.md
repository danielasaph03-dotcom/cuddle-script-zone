<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

# GS Representações — site institucional

Site institucional da **Garcia & Silva Representações** (representação comercial
B2B), com área de notícias e um painel administrativo para publicar conteúdo
sem precisar mexer em código.

- **Site oficial:** https://garciaesilvarepresentacoes.com.br
- **Painel administrativo:** https://garciaesilvarepresentacoes.com.br/admin/login
- **Repositório:** https://github.com/danielasaph03-dotcom/cuddle-script-zone

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19 + Vite), Tailwind CSS, shadcn/ui
- **MySQL** (da própria hospedagem cPanel) para o painel administrativo — sem serviço externo
- Hospedado via **cPanel → Setup Node.js App** (Node.js persistente, não é hospedagem estática)

## Rodando localmente

Precisa de Node.js instalado.

```sh
git clone https://github.com/danielasaph03-dotcom/cuddle-script-zone.git
cd cuddle-script-zone
npm install
npm run dev
```

Para o painel `/admin` funcionar (login, criar/editar publicações), é preciso configurar um banco
MySQL — passo a passo completo em [ADMIN_SETUP.md](./ADMIN_SETUP.md). Sem isso, o site público
ainda roda normalmente, só a área de notícias fica vazia.

Outros comandos úteis:

```sh
npm run build:cpanel   # build de produção pro deploy no cPanel (Node.js)
npm run build:pages    # build estático só da parte institucional (sem Notícias/admin)
npm run lint            # ESLint
npm run format           # Prettier
npx tsc --noEmit          # checagem de tipos
```

## Deploy (cPanel)

O site roda como aplicativo Node.js no cPanel (**Setup Node.js App**), não como arquivo estático
— é o que permite a área de Notícias e o painel `/admin` funcionarem. Não há deploy automático
por push (diferente de quando o site rodava na Vercel): o ciclo é manual —

1. `npm run build:cpanel` (gera `.output-cpanel/`)
2. Compactar o conteúdo em `.zip`
3. Enviar pelo **Gerenciador de Arquivos** do cPanel, substituindo `server/` e `public/` na pasta
   da aplicação
4. **Executar a instalação do NPM** (se o `package.json` mudou) e **Reiniciar**

Variáveis de ambiente necessárias (configuradas em **Setup Node.js App → Variáveis de
ambiente**): `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `AUTH_COOKIE_SECRET`. Detalhes
completos em [ADMIN_SETUP.md](./ADMIN_SETUP.md).

## Painel administrativo

Publicar notícias **não precisa de código nem deploy manual** — é só entrar em `/admin/login`
com o usuário administrador (criado rodando `scripts/create-admin.mjs`, veja
[ADMIN_SETUP.md](./ADMIN_SETUP.md)) e usar a interface. Publicar uma notícia atualiza o site na
hora.

Segurança: senha do admin com hash bcrypt (tabela `admins` no MySQL), sessão por cookie
`httpOnly` assinado (HMAC) com `AUTH_COOKIE_SECRET` — sem serviço de autenticação externo. Só
funciona em conexão **https://**.

## Notas do projeto (contexto para quem for mexer no código)

- O projeto nasceu no [Lovable](https://lovable.dev). O painel administrativo e a área de
  notícias foram adicionados depois, com apoio do Claude Code — não há mais edição ativa pelo
  editor do Lovable.
- O site já rodou na Vercel usando Supabase (Postgres + Auth + Storage) — essa arquitetura foi
  **substituída** por MySQL + auth própria porque o projeto gratuito do Supabase pausou por
  inatividade e o usuário optou por não depender de serviço externo pago. `vite.config.ts`
  (preset Vercel) ainda existe no repo mas não reflete mais o deploy atual, que usa
  `vite.cpanel.config.ts` (preset `node-server`, Nitro).
- Schema do banco em `db/mysql-schema.sql`. As migrations antigas em `supabase/migrations/`
  ficaram só como histórico, não são mais usadas.
- Uma sessão nova do Claude Code (neste PC ou em outro) não herda o histórico desta conversa,
  mas consegue se situar rápido lendo este arquivo, o `ADMIN_SETUP.md` e o histórico do
  `git log` — não é preciso reexplicar o projeto do zero.
