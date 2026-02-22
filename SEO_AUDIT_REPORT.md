# SEO Technical Audit - Tectone Steel

## Scope & method
- Live production host checks to `https://tectonesteel.com` were attempted but blocked in this environment (`curl: CONNECT tunnel failed, response 403`).
- Full-page analysis was executed against the locally built SSG output served at `http://localhost:4173`, plus direct review of `public/robots.txt` and `public/sitemap.xml`.
- Sample size: all 21 URLs declared in sitemap.

## A) Crawl & index control findings
1. **Critical**: 9 sitemap URLs are non-indexable (`meta robots=noindex, follow`) but are still included in sitemap.
   - URLs: /our-product/product/109-folding-screen, /blog/insect-screen-in-singapore, /blog/sliding-door-mosquito-screen-in-singapore, /blog/sliding-aluminium-mosquito-net-door-prices, /blog/let-the-air-in-keep-the-bugs-out, /blog/tectone-renex-steel-singapore-strongest-for-insect-screen-systems, /blog/mosquito-netting-in-singapore, /blog/mosquito-nets-for-windows-in-singapore, /blog/aluminium-mosquito-net
2. **High**: Canonical consistency issues.
   - Some canonicals include trailing slash (e.g., `/our-product/`), while sitemap uses non-trailing slash (`/our-product`).
   - Both slash/non-slash variants return 200 locally (no enforced redirect), creating duplicate-url risk.
3. **Pass**: robots.txt exists, allows crawling, and includes sitemap directive.
4. **Pass**: All sitemap URLs return HTTP 200 in local preview.
5. **Needs external validation**: canonical host enforcement (HTTPS + www/non-www + redirect hop count) could not be validated from this environment.

## B) Architecture & internal linking
- Checked 13 internal links discovered from sitemap pages; no 4xx links found in sample.
- Navigation is crawlable (`<a href>` links are present in rendered HTML).
- Potential index bloat risk remains due to slash/non-slash URL variants returning 200.

## C) On-page SEO template findings
- **High**: Missing `<title>` on 9 pages (all blog articles + `/our-product/product/109-folding-screen`).
- **High**: Non-indexable blog/article templates currently include meaningful content but are blocked from indexation.
- **Pass**: H1 detected on sampled pages.
- **Partial**: OG tags exist on key templates in source, but Twitter card tags are not consistently present.

## D) Structured data
- Blog article template includes `Article` schema in source (`BlogPostDetail.tsx`).
- Breadcrumb schema is implemented (`Breadcrumb.tsx`).
- External rich result validation (Google validator) not possible from this environment.

## E) Performance & CWV practical checks
- Build artifact shows a large main JS bundle (`dist/assets/app-*.js` ~749 kB raw), which is an LCP/TTI risk on mobile.
- Several images use lazy-loading and async decoding; good baseline.
- Compression/cache headers require production response validation (not inferable from static files alone).

## F-I) Technical hygiene, trust, analytics, migration
- HTTPS/mixed-content, hreflang reciprocity, staging exposure, analytics event firing, consent behavior, and legacy 301 map require live-host verification and were not fully testable here.
- Core trust pages appear routed in app (`about`, `contact`, `quote`), but legal pages (privacy/terms) were not found in sitemap sample.

## Prioritized issues (severity, evidence, fix)
1. **Critical — Noindex URLs present in sitemap**
   - Evidence: 9 URLs in sitemap rendered with `meta robots=noindex, follow`.
   - Fix: either remove `noindex` on pages intended to rank, or remove those URLs from sitemap. Expected outcome: cleaner index coverage and better crawl budget efficiency.
2. **High — Missing `<title>` on indexable templates**
   - Evidence: 9 pages returned empty title during render parsing.
   - Fix: enforce template-level SEO defaults for blog/product detail fallback data. Expected outcome: better relevance signals and CTR potential.
3. **High — URL canonical/normalization mismatch**
   - Evidence: slash and non-slash variants both return 200 locally; canonical formatting is mixed.
   - Fix: enforce one URL style via 301 redirects and align sitemap + canonical outputs to same style. Expected outcome: reduced duplicate clusters and stronger canonical consolidation.
4. **Medium — Large JS payload**
   - Evidence: app bundle ~749 kB raw at build.
   - Fix: route-level code splitting, remove unused libs/components from initial chunk. Expected outcome: improved CWV (LCP/INP).

## Discovered URL inventory (sitemap sample)
| URL | Status | Indexable | Canonical | Title | H1 | Meta robots | Word count |
|---|---:|---|---|---|---|---|---:|
| / | 200 | yes | https://tectonesteel.com/ | Insect Screen Singapore \| Custom Mosquito Netting \| Tectone Renex Steel Pte Ltd | Insect Screen Systems Specialist in Singapore |  | 549 |
| /about-insect-screen-supplier | 200 | yes | https://tectonesteel.com/about-insect-screen-supplier | About Us \| Tectone Renex Steel | Singapore's Premium Screen Solutions |  | 417 |
| /our-product | 200 | yes | https://tectonesteel.com/our-product/ | Mosquito Netting \| Insect Screen Products \| Get a Quote Now \| Tectone Renex Steel | Premium Insect Screen Solutions |  | 935 |
| /our-product/product/107-security-swing-door | 200 | yes | https://tectonesteel.com/our-product/product/107-security-swing-door | Insect Screen Swing Door \| Get an Instant Quote Now \| Tectone Renex Steel | Insect Screen Swing Door |  | 759 |
| /our-product/product/104-security-folding-door | 200 | yes | https://tectonesteel.com/our-product/product/104-security-folding-door | Insect Screen Folding Door \| Get an Instant Quote Now \| Tectone Renex Steel | Insect Screen Folding Door |  | 773 |
| /our-product/product/105-security-sliding-door | 200 | yes | https://tectonesteel.com/our-product/product/105-security-sliding-door | Insect Screen Sliding Door \| Get an Instant Quote Now \| Tectone Renex Steel | Insect Screen Sliding Door |  | 762 |
| /our-product/product/103-security-casement-window | 200 | yes | https://tectonesteel.com/our-product/product/103-security-casement-window | Casement Window \| Get an Instant Quote Now \| Tectone Renex Steel | Casement Window |  | 759 |
| /our-product/product/106-security-sliding-window | 200 | yes | https://tectonesteel.com/our-product/product/106-security-sliding-window | Insect Screen Sliding Window \| Get an Instant Quote Now \| Tectone Renex Steel | Insect Screen Sliding Window |  | 776 |
| /our-product/product/109-folding-screen | 200 | no |  |  | Page not found | noindex, follow | 145 |
| /our-product/product/102-fixed-screen | 200 | yes | https://tectonesteel.com/our-product/product/102-fixed-screen | Fixed Insect Screen \| Get an Instant Quote Now \| Tectone Renex Steel | Fixed Insect Screen |  | 766 |
| /our-product/product/108-security-top-hung | 200 | yes | https://tectonesteel.com/our-product/product/108-security-top-hung | Top Hung Window \| Get an Instant Quote Now \| Tectone Renex Steel | Top Hung Window |  | 769 |
| /blog/insect-screen-in-singapore | 200 | no |  |  | Page not found | noindex, follow | 145 |
| /blog/sliding-door-mosquito-screen-in-singapore | 200 | no |  |  | Page not found | noindex, follow | 149 |
| /blog/sliding-aluminium-mosquito-net-door-prices | 200 | no |  |  | Page not found | noindex, follow | 149 |
| /blog/let-the-air-in-keep-the-bugs-out | 200 | no |  |  | Page not found | noindex, follow | 153 |
| /blog/tectone-renex-steel-singapore-strongest-for-insect-screen-systems | 200 | no |  |  | Page not found | noindex, follow | 155 |
| /blog/mosquito-netting-in-singapore | 200 | no |  |  | Page not found | noindex, follow | 145 |
| /blog/mosquito-nets-for-windows-in-singapore | 200 | no |  |  | Page not found | noindex, follow | 149 |
| /blog/aluminium-mosquito-net | 200 | no |  |  | Page not found | noindex, follow | 143 |
| /contact-us | 200 | yes | https://tectonesteel.com/contact-us/ | Contact Us \| Tectone Renex Steel | Get In Touch |  | 224 |
| /quote | 200 | yes | https://tectonesteel.com/quote/ | Get An Instant Quote \| Tectone Renex Steel | Get Your Custom Quote |  | 250 |
