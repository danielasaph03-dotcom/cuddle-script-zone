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

## 4. Rodar as migrations (criar as tabelas)

Os arquivos ficam em `supabase/migrations/`, numerados em ordem. Num projeto Supabase novo
(do zero), rode **todos, um de cada vez, na ordem do número**:

1. No painel do Supabase, vá em **SQL Editor → New query**.
2. Abra `supabase/migrations/0001_admin_cms.sql`, copie todo o conteúdo, cole no editor e
   clique em **"Run"**. Isso cria a tabela `posts`, as políticas de segurança (RLS) e o bucket
   de imagens `article-images` — além de já inserir a publicação de exemplo `[EXEMPLO]` pra
   você ver o painel funcionando.
3. Repita o mesmo passo (nova query, colar, Run) para `0002_cover_image_ratio.sql` e depois
   para `0003_more_cover_ratios.sql` — esses dois adicionam o campo de formato da imagem de
   capa e os formatos disponíveis.

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
2. Preencha título e resumo (obrigatórios) — categoria e autor são opcionais, pode deixar em
   branco que a publicação sai do mesmo jeito. Escolha a data, o formato da imagem de capa
   (Paisagem 16:9, Quadrado — feed Instagram 1:1, Retrato — feed Instagram 4:5, Retrato —
   Stories/Reels 9:16, ou Original — sem cortar a imagem), a imagem em si, e o texto (o editor
   permite títulos, negrito, itálico, links, listas e citação).
3. Clique em **"Salvar como rascunho"** a qualquer momento para não perder o que escreveu sem
   publicar ainda — rascunhos não aparecem no site público.
4. Quando estiver pronta, clique em **"Publicar"** — ela aparece automaticamente na Home, em
   `/noticias` e na própria URL, sem precisar mexer em código ou fazer deploy manual.

## O que foi criado no Supabase

**Tabela `posts`** — as publicações: título, slug, resumo, conteúdo, imagem de capa, formato da
imagem de capa (`cover_image_ratio`), categoria (opcional), autor (opcional), status
(rascunho/publicado), data, campos de SEO.

**Políticas de RLS (Row Level Security)**
- Qualquer visitante só enxerga publicações com `status = 'published'`; um usuário autenticado
  (o admin) enxerga e edita todas.
- Bucket `article-images`: leitura pública (as imagens aparecem no site), upload/edição/exclusão
  só para autenticado.

**Sem `service_role` em lugar nenhum do código** — toda operação de escrita é feita pelo usuário
administrador autenticado, protegida pelas políticas acima.
