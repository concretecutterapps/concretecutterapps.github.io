# Concrete Cutter Website – Project status

## Active
- Issue: #27 — Homepage visual V2 – stronger app showcase and conversion
- Branch: `feat/homepage-visual-v2`
- Goal: make the app feel immediately more professional and desirable when visitors land on the site, while preserving the SEO/acquisition foundation from #25.

## Completed foundation — #25
- Public product name standardized as **Concrete Cutter** directly in HTML.
- Canonical URLs, hreflang clusters, Open Graph, Twitter metadata and crawl directives across all 8 languages.
- Structured data for Concrete Cutter Apps and the Android/iOS app.
- Explicit language switching without automatic first-visit redirect.
- GA4 events for store clicks, language changes, tool CTAs and web weight calculations.
- Lightweight 1200×630 social sharing card.
- Five useful localized web entry pages in all 8 languages.
- Functional browser-based concrete weight calculator in all 8 languages.
- Sitemap expanded from 40 to 80 URLs.
- #24 mobile language-picker fix merged before the SEO work.
- #26 merged to `main` on 2026-08-29.

## Homepage visual V2 — #27
Implemented on all 8 localized homepages:
- Stronger conversion-focused hero copy.
- Three-screen app presentation in the hero using existing app screenshots.
- Industrial dark visual direction with Concrete Cutter orange accents and subtle grid/glow depth.
- Larger, clearer App Store / Google Play calls to action.
- Field-ready benefit pills retained and visually emphasized.
- Premium feature cards with stronger hierarchy and interaction.
- Upgraded screenshot showcase with staggered phone presentation.
- Web tools section reframed as a premium teaser for the full app.
- New localized final download CTA near the bottom of every homepage.
- Dedicated `home-v2.css` so tool/support/privacy pages keep their existing layout.
- Mobile breakpoints and the existing reduced-motion accessibility behavior preserved.
- New analytics event on the final CTA: `homepage_final_store_click`.

## Tracking
GA4 distinguishes:
- `app_store_click`
- `google_play_click`
- `language_change`
- `tool_cta_click`
- `web_weight_calculation`
- `homepage_final_store_click`

## Follow-up after release
- Verify GitHub Pages deploy and inspect desktop/mobile live.
- Add the sitemap in Google Search Console and monitor indexing/queries.
- Use UTM-tagged links for Facebook/trade-group sharing by market.
- Compare landing-page traffic with App Store / Play click events before making further conversion changes.

## Change log
- 2026-08-29: #24 merged (mobile language picker).
- 2026-08-29: #26 merged — SEO/acquisition overhaul with 40 new localized tool pages.
- 2026-08-29: #27 created — homepage visual V2.
- 2026-08-29: Homepage visual V2 implemented across all 8 languages.
