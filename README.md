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

- **Site no ar:** https://gsrepresentacoes.vercel.app
- **Painel administrativo:** https://gsrepresentacoes.vercel.app/admin/login
- **Repositório:** https://github.com/danielasaph03-dotcom/cuddle-script-zone

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19 + Vite), Tailwind CSS, shadcn/ui
- [Supabase](https://supabase.com) (Postgres + Auth + Storage) para o painel administrativo
- Hospedado na [Vercel](https://vercel.com), com **deploy automático a cada push na branch `main`**

## Rodando localmente

Precisa de Node.js instalado.

```sh
git clone https://github.com/danielasaph03-dotcom/cuddle-script-zone.git
cd cuddle-script-zone
npm install
npm run dev
```

Para o painel `/admin` funcionar (login, criar/editar publicações, upload de
imagem), é preciso configurar um projeto Supabase — passo a passo completo em
[ADMIN_SETUP.md](./ADMIN_SETUP.md). Sem isso, o site público ainda roda
normalmente, só a área de notícias fica vazia.

Outros comandos úteis:

```sh
npm run build      # build de produção (o mesmo que a Vercel roda)
npm run lint        # ESLint
npm run format       # Prettier
npx tsc --noEmit      # checagem de tipos
```

## Deploy

Qualquer push na branch `main` do GitHub aciona um novo deploy automático na
Vercel — não é preciso fazer nada manual. Projeto na Vercel: `gsrepresentacoes`
(time `gs-representacoes`).

Duas variáveis de ambiente precisam estar configuradas lá (Project Settings →
Environment Variables), **com visibilidade "Non-sensitive"** — não
"Sensitive"/"Secret". Variáveis com prefixo `VITE_` são lidas durante o
*build*, e "Sensitive" só libera o valor em *runtime*, o que faz o site subir
com o Supabase "desconectado" silenciosamente:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

> Nota técnica: existe um segundo projeto vazio na Vercel chamado
> `cuddle-script-zone` (criado por engano durante a configuração inicial, sem
> nenhum deploy). Pode ser ignorado ou apagado — o projeto real e ativo é o
> `gsrepresentacoes`.

## Painel administrativo

Publicar notícias **não precisa de código nem deploy manual** — é só entrar em
`/admin/login` com o usuário administrador (criado manualmente no Supabase,
veja [ADMIN_SETUP.md](./ADMIN_SETUP.md)) e usar a interface. Publicar uma
notícia atualiza o site na hora.

Segurança: não há uso de `service_role` em nenhum lugar do código — toda
escrita passa pela `anon key` (pública, segura) protegida por Row Level
Security (RLS) no Supabase; só o usuário administrador autenticado consegue
criar, editar ou excluir publicações.

## Notas do projeto (contexto para quem for mexer no código)

- O projeto nasceu no [Lovable](https://lovable.dev). O painel administrativo,
  a área de notícias e o deploy na Vercel foram adicionados depois, com apoio
  do Claude Code — não há mais edição ativa pelo editor do Lovable, o fluxo
  atual é: editar código → commit → push no GitHub → deploy automático na
  Vercel.
- As migrations do Supabase ficam em `supabase/migrations/`, numeradas em
  ordem (`0001`, `0002`, `0003`, ...). Um projeto Supabase novo (do zero)
  precisa rodar todas elas em sequência no SQL Editor — veja ADMIN_SETUP.md.
- Uma sessão nova do Claude Code (neste PC ou em outro) não herda o histórico
  desta conversa, mas consegue se situar rápido lendo este arquivo, o
  `ADMIN_SETUP.md` e o histórico do `git log` — não é preciso reexplicar o
  projeto do zero.
