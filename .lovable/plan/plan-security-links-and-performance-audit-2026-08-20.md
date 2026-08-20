# Plan: Security, Links, and Performance Audit

Comprehensive audit and optimization of the GS Representações landing page to ensure security, reliability, and performance without altering the visual design.

## Technical Details

- **Security & Links**:
    - Standardize all WhatsApp links to `https://wa.me/55...?text=...` with URL-encoded messages.
    - Add `rel="noopener noreferrer"` to all `target="_blank"` links for security.
    - Ensure all email links use `mailto:` correctly.
    - Verify that internal navigation links point to existing IDs.
    - Implement a basic Content Security Policy (CSP) meta tag in `__root.tsx` that is permissive enough for current assets but adds protection.
    - Ensure all links use HTTPS.
- **Performance**:
    - Add `loading="lazy"` to non-critical images and assets.
    - Review dependencies in `package.json` (though mostly standard shadcn/tanstack).
- **Cleanup**:
    - Confirm absence of Supabase/backend code (already verified).
    - Remove any dead code or unused imports if found during the process.
- **Privacy**:
    - Verify no cookies or tracking scripts are being injected.

## Proposed Changes

### `src/routes/index.tsx`
- Standardize WhatsApp numbers and links.
- Add `rel="noopener noreferrer"` to all external links.
- Fix any broken internal links.
- Add lazy loading to images.

### `src/routes/__root.tsx`
- Add security meta tags (CSP, Referrer Policy).
- Ensure metadata is strictly institutional.

### `src/components/SPMap.tsx`
- Add security attributes to the CTA button link if present.

