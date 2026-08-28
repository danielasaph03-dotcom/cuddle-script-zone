# Painel administrativo — configuração

Este site tem um painel em `/admin` pra criar e publicar notícias sem editar código.
Ele usa o [Supabase](https://supabase.com) (banco de dados, login e armazenamento de imagens).
Antes de usar o painel, é preciso configurar o Supabase — leva uns 10 minutos, é só uma vez.

## 1. Criar o projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta (dá pra entrar com GitHub).
2. Clique em **"New project"**.
3. Escolha um nome (ex.: `gs-representacoes`), uma senha forte para o banco (guarde-a — só é
   usada internamente pelo Supabase) e a região mais próxima (ex.: South America).
4. Aguarde o projeto ser criado (leva 1–2 minutos).

## 2. Pegar a URL e a chave do projeto

1. No painel do Supabase, vá em **Settings → API**.
2. Copie o **Project URL**.
3. Copie a chave em **"anon" / "public"** (⚠️ **não** a `service_role` — essa nunca deve sair do
   Supabase).

## 3. Configurar as variáveis de ambiente

1. Na raiz do projeto, copie o arquivo `.env.example` para um novo arquivo chamado `.env`.
2. Preencha com os valores do passo 2:
   ```
   VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-anon-key-aqui
   ```
3. O arquivo `.env` já está no `.gitignore` — não é enviado ao GitHub.
4. Se o site for publicado fora do seu computador (Lovable, GitHub Pages, Vercel, etc.), essas
   duas variáveis também precisam ser configuradas lá, na área de "Environment Variables" da
   hospedagem.

## 4. Rodar a migration (criar as tabelas)

1. No painel do Supabase, vá em **SQL Editor → New query**.
2. Abra o arquivo `supabase/migrations/0001_admin_cms.sql` deste projeto, copie todo o conteúdo
   e cole no editor.
3. Clique em **"Run"**.
4. Isso cria: a tabela `posts`, a tabela `site_settings`, todas as políticas de segurança (RLS)
   e o bucket de imagens `article-images` — além de já inserir a publicação de exemplo
   `[EXEMPLO]` pra você ver o painel funcionando.

## 5. Criar o primeiro (e único) administrador

Não existe cadastro público — o administrador é criado manualmente por você:

1. No painel do Supabase, vá em **Authentication → Users**.
2. Clique em **"Add user" → "Create new user"**.
3. Preencha e-mail e senha (marque **"Auto Confirm User"** para não precisar confirmar por e-mail).
4. Clique em criar.

Esse e-mail/senha é o que você vai usar para entrar em `/admin/login`.

## 6. Acessar o painel

Com tudo configurado, rode o projeto (`npm run dev`) e acesse:

```
/admin/login
```

Entre com o e-mail e senha criados no passo 5. Você será redirecionado para `/admin`.

## 7. Criar e publicar uma notícia

1. No menu lateral, clique em **"Nova publicação"**.
2. Preencha título (o slug/URL é gerado automaticamente, mas pode editar), resumo, categoria,
   autor, data, imagem de capa e o texto (o editor permite títulos, negrito, itálico, links,
   listas e citação).
3. Clique em **"Salvar como rascunho"** a qualquer momento para não perder o que escreveu sem
   publicar ainda — rascunhos não aparecem no site público.
4. Quando estiver pronta, clique em **"Publicar"** — ela aparece automaticamente na Home, em
   `/noticias` e na própria URL, sem precisar mexer em código ou fazer deploy manual.

## O que foi criado no Supabase

**Tabelas**
- `posts` — as publicações (título, slug, resumo, conteúdo, imagem de capa, categoria, autor,
  status, data, campos de SEO).
- `site_settings` — pares chave/valor para telefone, WhatsApp, e-mail, redes sociais e textos
  institucionais editáveis em `/admin/conteudo`.

**Políticas de RLS (Row Level Security)**
- `posts`: qualquer visitante só enxerga publicações com `status = 'published'`; um usuário
  autenticado (o admin) enxerga e edita todas.
- `site_settings`: leitura pública (o site usa esses valores), escrita só para autenticado.
- Bucket `article-images`: leitura pública (as imagens aparecem no site), upload/edição/exclusão
  só para autenticado.

**Sem `service_role` em lugar nenhum do código** — toda operação de escrita é feita pelo usuário
administrador autenticado, protegida pelas políticas acima.
