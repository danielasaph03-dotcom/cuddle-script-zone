-- Schema MySQL do painel administrativo e da área de Notícias.
-- Cole este arquivo inteiro na aba "SQL" do phpMyAdmin (dentro do banco que
-- você criou pelo Database Wizard) e execute. Veja ADMIN_SETUP.md.

CREATE TABLE IF NOT EXISTS posts (
  id CHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL DEFAULT '',
  cover_image LONGTEXT,
  cover_image_ratio ENUM('landscape', 'square', 'portrait', 'portrait_story', 'original')
    NOT NULL DEFAULT 'landscape',
  category VARCHAR(255) NOT NULL DEFAULT '',
  author VARCHAR(255) NOT NULL DEFAULT '',
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  published_at DATETIME NULL,
  seo_title VARCHAR(255),
  seo_description VARCHAR(500),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_posts_status (status),
  INDEX idx_posts_published_at (published_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS admins (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Post de demonstração (equivalente ao que existia antes no Supabase).
-- INSERT IGNORE: se já existir uma linha com esse slug (chave única), não faz nada.
INSERT IGNORE INTO posts
  (id, title, slug, excerpt, content, cover_image, category, author, status, published_at)
VALUES (
  UUID(),
  '[EXEMPLO] Queda nas vendas: o que o mercado pode aprender',
  'queda-nas-vendas-o-que-o-mercado-pode-aprender',
  'Conteúdo de demonstração — substitua por uma publicação real. Este é um texto placeholder para mostrar como a área de notícias funciona.',
  '<p>Este é um texto de demonstração. Substitua por conteúdo real antes de publicar — nenhuma informação aqui deve ser tratada como fato.</p><p>Este parágrafo mostra como um bloco de texto comum aparece na matéria, com espaçamento e legibilidade pensados para leitura confortável tanto no desktop quanto no celular.</p><h2>Um exemplo de subtítulo</h2><p>Use subtítulos para dividir a matéria em seções, facilitando a leitura de textos mais longos.</p><p>Também é possível usar listas, como no exemplo abaixo:</p><ul><li>Primeiro ponto de exemplo</li><li>Segundo ponto de exemplo</li><li>Terceiro ponto de exemplo</li></ul><h2>Como substituir este conteúdo</h2><p>No painel administrativo (/admin), abra "Postagens", clique para editar esta publicação e troque título, resumo, categoria, autor, data, imagem de capa e texto. Depois é só clicar em "Publicar" — a home e a listagem se atualizam sozinhas.</p>',
  '/uploads/hero_supermarket.webp',
  'Tendências',
  'Equipe GS Representações',
  'published',
  '2026-08-01 00:00:00'
);
