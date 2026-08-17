# GS Representações Institutional Landing Page Implementation Plan

Build a premium institutional landing page for GS Representações, a commercial representation company connecting food, beverage, cosmetic, and consumer brands to retail. The design will be modern, professional, and sophisticated, using a green and neutral palette with gold/yellow accents.

## User Review Required

> [!IMPORTANT]
> - The current `src/routes/index.tsx` is a placeholder and will be completely replaced.
> - We will use Lucide icons for the minimal icon requirements.
> - Framer Motion (or simple CSS transitions) will be used for subtle entry animations.
> - Images will be elegant placeholders (Unsplash URLs) to maintain the premium feel.

## Proposed Changes

### 1. Visual Identity & Global Styles
- Configure the theme in `src/styles.css` with the specified color palette:
  - Primary: Deep Green (sophisticated)
  - Secondary: Neutral/White
  - Accents: Gold/Yellow
- Define typography tokens for a "strong and elegant" feel.

### 2. Components Development
- **Header**: Fixed, minimalist navigation with desktop/mobile support.
- **Hero**: Impactful section with split layout (text left, placeholder for representatives' photo right).
- **About ("A GS")**: Text and image split layout focusing on relationship and strategy.
- **Brands ("Marcas")**: Elegant cards for TOZZI, BALY, SALVATORI, DOCIGEL with category and description.
- **Diferenciais**: Four cards (Relationship, Market Knowledge, Strategic Portfolio, Focus on Turn) with minimal icons.
- **Portfolio**: Large visual sections for Alimentos, Bebidas, Higiene & Beleza.
- **B2B CTA ("Para o Varejista")**: Contrasting background section with strong B2B copy.
- **Final CTA**: High-impact closing section.
- **Footer**: Professional layout with social links, contact info, and quick links.

### 3. Page Structure (`src/routes/index.tsx`)
- Assemble all components into the main landing page.
- Implement smooth scrolling for anchor links (Início, A GS, Marcas, Diferenciais, Contato).
- Apply subtle entry animations using `framer-motion` or standard intersection observers.

### 4. Technical Details
- **Responsive**: Mobile-first approach using Tailwind's utility classes.
- **SEO**: Unique titles and descriptions for GS Representações in the `head()` property.
- **Scalability**: Structured components allowing easy replacement of images and text.

## Verification Plan

### Manual Verification
- Check responsiveness on mobile, tablet, and desktop viewports.
- Verify smooth scroll functionality between sections.
- Ensure all CTA buttons are visually consistent and have micro-interactions.
- Confirm the color palette matches the "sophisticated green/neutral" requirement.

### Automated Checks
- `bun run build` to ensure no production build regressions.
- Check browser console for hydration errors or accessibility warnings.
