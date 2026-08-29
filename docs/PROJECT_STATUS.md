# Concrete Cutter Website – Project status

## Current website release
The website now combines three layers:
1. a conversion-focused multilingual product homepage,
2. localized search/tool pages for concrete-cutting field tasks,
3. a multilingual authority hub that connects Concrete Cutter directly with concrete cutting and core drilling search intent.

## SEO/acquisition foundation — #25 / #26
- Public product name standardized as **Concrete Cutter** directly in HTML.
- Canonical URLs, hreflang clusters, Open Graph, Twitter metadata and crawl directives across the 8-language site.
- Structured data for Concrete Cutter Apps and the Android/iOS app.
- Explicit language switching without automatic first-visit redirect.
- GA4 events for store clicks, language changes, tool CTAs and web weight calculations.
- Five useful web entry pages in each of 8 languages.
- Functional browser-based concrete weight calculator in each language.
- Sitemap expanded from 40 to 80 URLs.

## Homepage visual V2 — #27 / #28 / #33
- Stronger conversion-focused hero across all 8 languages.
- Desktop hero fit refined after live review: smaller but still dominant H1, wider copy column, tighter vertical rhythm and viewport-height tuning so store CTAs remain visible on common laptop/desktop screens.
- Three-screen app presentation using existing screenshots.
- Industrial dark visual direction with Concrete Cutter orange accents.
- Larger App Store / Google Play calls to action.
- Upgraded feature cards, screenshot showcase and web-tool teaser.
- Localized final download CTA.
- Dedicated `home-v2.css` keeps the redesign isolated to homepages.
- `homepage_final_store_click` analytics event.

## Concrete cutting authority hub — #29 / #30 / #31
- Authority hub available in **NO, EN, SV, DA, DE, PL, NL and FI** at the same stable slug: `concrete-cutting-calculator-app/`.
- Every authority page has localized title, meta description, H1, field terminology and store CTA copy.
- Each page explains the difference between generic concrete-volume calculators and concrete-cutting field calculations.
- Each page links to localized concrete weight, core drilling, overcut, slab division and stitch-drilling content.
- Full 8-language hreflang cluster plus `x-default` on every authority page.
- Language selector works across the authority cluster because the slug is consistent in all locales.
- Each localized homepage links directly to its authority page.
- WebPage, MobileApplication and Breadcrumb structured data are present.
- Practical safety/field limitations are included; pages do not claim to replace engineering, lifting plans or professional judgement.
- `authority_store_click` measures store CTA activity.
- Sitemap expanded from **81 to 88 URLs**.

## Web monetization / calculator V2 — #35
- AdSense publisher verification prepared for `ca-pub-2502421026163101`.
- Root `ads.txt` mirrors the authorized Google seller entry already used by `app-ads.txt`.
- Weight calculator V2 supports rectangle and core/cylinder geometry, metric/imperial inputs, editable density and kg/lb output.
- Manual ad placement is reserved but stays inactive until AdSense approval and a real ad-unit slot exist.
- EEA/UK/Switzerland consent/CMP setup is required before live web ad serving.

## Tracking
GA4 distinguishes:
- `app_store_click`
- `google_play_click`
- `language_change`
- `tool_cta_click`
- `web_weight_calculation`
- `homepage_final_store_click`
- `authority_store_click`

## Search follow-up
- Submit `sitemap.xml` in Google Search Console.
- Use URL Inspection → Request indexing for the English authority page first, then the strongest local-market pages.
- Monitor queries around concrete cutting app/calculator, core drilling calculator and localized equivalents.
- Use UTM-tagged links for trade-group sharing by market.
- Add future pages only when they answer a distinct field question rather than creating thin search pages.

## Change log
- 2026-08-29: #24 merged — mobile language picker.
- 2026-08-29: #26 merged — SEO/acquisition overhaul with 40 localized tool pages.
- 2026-08-29: #28 merged — homepage visual V2 across 8 languages.
- 2026-08-29: #30 merged — English concrete-cutting calculator app authority hub.
- 2026-08-29: #31 — authority hub localized across all 8 website languages.
- 2026-08-29: #33 — desktop homepage hero tightened after live viewport review.
- 2026-08-29: #35 — AdSense verification and web weight calculator V2.
