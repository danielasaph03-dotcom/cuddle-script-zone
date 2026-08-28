-- Formato da imagem de capa (paisagem / quadrado "feed Instagram" / retrato).
-- Cole no SQL Editor do Supabase e clique em "Run".

alter table public.posts
  add column if not exists cover_image_ratio text not null default 'landscape'
  check (cover_image_ratio in ('landscape', 'square', 'portrait'));
