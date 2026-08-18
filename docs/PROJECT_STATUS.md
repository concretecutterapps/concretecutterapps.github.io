# Concrete Cutter Website – Project status

## Active
- Issue: #15
- Branch: `agent/issue-15-site-consistency`
- Goal: consistent branding, language navigation and current Android/iOS support information across the website.

## Completed in #15
- Unified Norwegian subpage header with the same Concrete Cutter logo used elsewhere.
- Added language selector logic that keeps the current page type when switching language.
- Added language selectors to updated subpages.
- Replaced old `Concrete Cutter Calculator` branding in updated pages and manifest.
- Updated privacy date to 18 August 2026.
- Updated privacy text for Google Play and Apple App Store/StoreKit.
- Updated Norwegian and English support/FAQ for both Android and iPhone.
- Updated outdated FAQ statement that iPhone was not yet available.

## Audit findings
- Older open PRs #1 and #2 are stale/diverged and should not be used as the source of truth for this fix.
- Several non-Norwegian subpages still contain old branding/support wording and are tracked as follow-up work if not covered by this PR.

## Change log
- 2026-08-18: #15 created after detecting inconsistent Norwegian/English headers and missing subpage language controls.
- 2026-08-18: Website audit found stale iPhone availability text, Android-only purchase/support wording and old app name references.
