# Concrete Cutter Website – Project status

## Active
- Issue: #25 — Website SEO + acquisition overhaul
- Branch: `feat/website-seo-acquisition-overhaul`
- Goal: improve organic search visibility, social sharing and conversion to App Store / Google Play without turning the site into low-value SEO content.

## Completed in #25
- Standardized the public product name as **Concrete Cutter** directly in HTML instead of relying on JavaScript replacement.
- Added consistent canonical URLs, hreflang clusters, Open Graph, Twitter metadata and crawl directives across the existing 8-language site.
- Added structured data for Concrete Cutter Apps and the mobile app, covering both Android and iOS.
- Removed the automatic first-visit redirect from `/` to `/en/`; language switching now remains explicit and preserves the current page plus query/hash parameters.
- Added GA4 events for App Store clicks, Google Play clicks, language changes, tool CTAs and web weight calculations.
- Added a lightweight 1200×630 social sharing card.
- Added shared styling and JavaScript for acquisition/tool pages.
- Added five useful web entry pages in each of the 8 languages:
  - concrete weight calculator
  - core drilling / angled drilling guide
  - concrete saw overcut guide
  - slab division / weight planning guide
  - stitch drilling guide
- Added a functional browser-based concrete weight calculator to every localized weight page.
- Linked the new tools visibly from every localized homepage.
- Expanded `sitemap.xml` from 40 to 80 URLs and added `lastmod` for the release date.
- Preserved `robots.txt`, store links, privacy/support/FAQ/contact pages and the existing visual identity.
- Merged prior mobile language-picker fix #24 before starting this work to avoid overlapping CSS changes.

## Tracking
GA4 now distinguishes:
- `app_store_click`
- `google_play_click`
- `language_change`
- `tool_cta_click`
- `web_weight_calculation`

## Follow-up after release
- Add the sitemap in Google Search Console and monitor indexing/queries.
- Use UTM-tagged links when sharing into trade groups so traffic and store-click conversion can be compared by market/source.
- Review Search Console query data before creating any additional SEO pages; only add pages that provide distinct useful content.

## Change log
- 2026-08-29: #24 merged (mobile language picker).
- 2026-08-29: #25 created.
- 2026-08-29: SEO/acquisition overhaul implemented across 8 languages with 40 new localized tool pages.
