-- Painel administrativo (/admin) — schema, RLS e storage.
--
-- Como aplicar: cole o conteúdo inteiro deste arquivo no SQL Editor do seu
-- projeto Supabase (https://supabase.com/dashboard/project/_/sql/new) e
-- clique em "Run". Veja ADMIN_SETUP.md para o passo a passo completo.
--
-- Design de segurança: não há uso de service_role em lugar nenhum do app.
-- Toda escrita acontece com o usuário autenticado (anon key + sessão) e é
-- protegida pelas policies de RLS abaixo. Como não existe cadastro público
-- (o primeiro/único admin é criado manualmente em Authentication → Users),
-- "auth.role() = 'authenticated'" já é equivalente a "é o administrador".

-- ============================================================================
-- 1. Tabela de publicações
-- ============================================================================

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null default '',
  cover_image text,
  category text not null,
  author text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_slug_idx on public.posts (slug);
create index if not exists posts_status_idx on public.posts (status);
create index if not exists posts_published_at_idx on public.posts (published_at desc);

-- mantém updated_at em dia automaticamente
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row
  execute function public.set_updated_at();

alter table public.posts enable row level security;

drop policy if exists "public can read published posts" on public.posts;
create policy "public can read published posts"
  on public.posts for select
  using (status = 'published');

drop policy if exists "authenticated can read all posts" on public.posts;
create policy "authenticated can read all posts"
  on public.posts for select
  using (auth.role() = 'authenticated');

drop policy if exists "authenticated can insert posts" on public.posts;
create policy "authenticated can insert posts"
  on public.posts for insert
  with check (auth.role() = 'authenticated');

drop policy if exists "authenticated can update posts" on public.posts;
create policy "authenticated can update posts"
  on public.posts for update
  using (auth.role() = 'authenticated');

drop policy if exists "authenticated can delete posts" on public.posts;
create policy "authenticated can delete posts"
  on public.posts for delete
  using (auth.role() = 'authenticated');

-- ============================================================================
-- 2. Configurações do site (telefone, WhatsApp, redes sociais, textos, etc.)
-- ============================================================================

create table if not exists public.site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row
  execute function public.set_updated_at();

alter table public.site_settings enable row level security;

drop policy if exists "public can read settings" on public.site_settings;
create policy "public can read settings"
  on public.site_settings for select
  using (true);

drop policy if exists "authenticated can insert settings" on public.site_settings;
create policy "authenticated can insert settings"
  on public.site_settings for insert
  with check (auth.role() = 'authenticated');

drop policy if exists "authenticated can update settings" on public.site_settings;
create policy "authenticated can update settings"
  on public.site_settings for update
  using (auth.role() = 'authenticated');

-- ============================================================================
-- 3. Storage — imagens das publicações
-- ============================================================================

insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true)
on conflict (id) do nothing;

drop policy if exists "public can view article images" on storage.objects;
create policy "public can view article images"
  on storage.objects for select
  using (bucket_id = 'article-images');

drop policy if exists "authenticated can upload article images" on storage.objects;
create policy "authenticated can upload article images"
  on storage.objects for insert
  with check (bucket_id = 'article-images' and auth.role() = 'authenticated');

drop policy if exists "authenticated can update article images" on storage.objects;
create policy "authenticated can update article images"
  on storage.objects for update
  using (bucket_id = 'article-images' and auth.role() = 'authenticated');

drop policy if exists "authenticated can delete article images" on storage.objects;
create policy "authenticated can delete article images"
  on storage.objects for delete
  using (bucket_id = 'article-images' and auth.role() = 'authenticated');

-- ============================================================================
-- 4. Publicação de demonstração
-- (a mesma que existia em src/content/noticias.ts — marcada como [EXEMPLO])
-- ============================================================================

insert into public.posts (
  title, slug, excerpt, content, cover_image, category, author,
  status, published_at, seo_title, seo_description
) values (
  '[EXEMPLO] Queda nas vendas: o que o mercado pode aprender',
  'queda-nas-vendas-o-que-o-mercado-pode-aprender',
  'Conteúdo de demonstração — substitua por uma publicação real. Este é um texto placeholder para mostrar como a área de notícias funciona.',
  '<p>Este é um texto de demonstração. Substitua por conteúdo real antes de publicar — nenhuma informação aqui deve ser tratada como fato.</p><p>Este parágrafo mostra como um bloco de texto comum aparece na matéria, com espaçamento e legibilidade pensados para leitura confortável tanto no desktop quanto no celular.</p><h2>Um exemplo de subtítulo</h2><p>Use subtítulos para dividir a matéria em seções, facilitando a leitura de textos mais longos.</p><p>Também é possível usar listas, como no exemplo abaixo:</p><ul><li>Primeiro ponto de exemplo</li><li>Segundo ponto de exemplo</li><li>Terceiro ponto de exemplo</li></ul><h2>Como substituir este conteúdo</h2><p>No painel administrativo (/admin), abra "Postagens", clique para editar esta publicação e troque título, resumo, categoria, autor, data, imagem de capa e texto. Depois é só clicar em "Publicar" — a home e a listagem se atualizam sozinhas.</p>',
  '/uploads/hero_supermarket.webp',
  'Tendências',
  'Equipe GS Representações',
  'published',
  '2026-08-01T00:00:00Z',
  null,
  null
)
on conflict (slug) do nothing;
