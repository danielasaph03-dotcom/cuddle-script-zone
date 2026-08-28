-- Mais formatos de imagem de capa (Stories/Reels 9:16 e Original sem cortar).
-- Cole no SQL Editor do Supabase e clique em "Run".

alter table public.posts drop constraint if exists posts_cover_image_ratio_check;

alter table public.posts
  add constraint posts_cover_image_ratio_check
  check (cover_image_ratio in ('landscape', 'square', 'portrait', 'portrait_story', 'original'));
