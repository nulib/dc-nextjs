# CSS migration performance comparison

Recorded October 9, 2026, from local production runs started October 8.

All five screens have smaller initial JavaScript + CSS bundles and lower median
First Contentful Paint (FCP) in this controlled local comparison. This measures
the complete migration, including removal of Stitches/NUL/unused Framer Motion,
CSS Modules, Clover 3.16.1 → 4.0.0-rc.2, and resulting dependency changes. It does
not isolate the benefit of CSS Modules alone.

## Results

“First frame” means FCP: the browser's first paint of text or an image. It does
not mean that search results, the viewer, or all media are loaded or interactive.
Sizes below are gzip-compressed initial route JavaScript **plus CSS**, with
shared chunks counted once. kB means 1,000 bytes.

| Screen     | Initial JS + CSS, before → after | Smaller | Median FCP, before → after | Faster |             Clover update reductions |
| ---------- | -------------------------------: | ------: | -------------------------: | -----: | -----------------------------------: |
| Home       |                 257.8 → 230.0 kB |   10.8% |               668 → 608 ms |   9.0% |                      0.8 kB increase |
| Search     |                 347.6 → 329.4 kB |    5.2% |               692 → 640 ms |   7.5% |                      0.8 kB increase |
| Collection |                 313.0 → 294.9 kB |    5.8% |               668 → 604 ms |   9.6% |    4.5 kB increase (includes slider) |
| Work       |                 332.2 → 310.8 kB |    6.4% |               680 → 608 ms |  10.6% | 295.4 kB reduction (slider + viewer) |
| About      |                 214.6 → 186.4 kB |   13.1% |               568 → 500 ms |  12.0% |                      0.8 kB increase |

| Screen     | JavaScript, before → after | CSS, before → after | Net reduction |
| ---------- | -------------------------: | ------------------: | ------------: |
| Home       |           253.8 → 216.8 kB |       4.0 → 13.2 kB |       27.7 kB |
| Search     |           343.6 → 308.8 kB |       4.0 → 20.6 kB |       18.1 kB |
| Collection |           309.0 → 281.1 kB |       4.0 → 13.8 kB |       18.1 kB |
| Work       |           328.2 → 293.8 kB |       4.0 → 17.0 kB |       21.3 kB |
| About      |           210.7 → 174.4 kB |       4.0 → 12.1 kB |       28.2 kB |

CSS downloads increase because application styles now ship as CSS instead of
JavaScript style definitions. JavaScript reductions outweigh that increase on
every measured route. The shared `_app` JavaScript chunk falls from about
85.7 kB to 56.0 kB gzip, contributing savings across the application.

The Work screen also has a separate lazy-loaded viewer entry bundle. Its chunks
shrink from **676.2 kB to 376.3 kB gzip**, an additional **300.0 kB / 44.4%**
reduction beyond the initial route bundle. These are the chunks listed for
`ViewerWrapper → @samvera/clover-iiif/viewer`, excluding initial route chunks;
they are not a total for every possible media or map interaction. Optional
features can request further chunks. This saving includes Clover's changed
bundling and cannot be attributed to the CSS migration alone.

## Clover update reductions

The slider is loaded by **both Collection and Work**. To account for it, a third
production build holds the migrated application source and CSS constant while
using Clover 3.16.1 and the original locked dependency tree. The control retains
the original Clover 3 viewer ESM alias. Comparing that control with the existing
Clover 4.0.0-rc.2 build isolates the update and associated dependency/resolution
changes, including their effect on shared chunks. It is not a subtraction of
raw npm package files or an isolated slider-only module size.

| Screen     | Initial bundle increase from update | Viewer entry reduction from update | Net Clover update effect |
| ---------- | ----------------------------------: | ---------------------------------: | -----------------------: |
| Home       |                              0.8 kB |                                  — |            0.8 kB larger |
| Search     |                              0.8 kB |                                  — |            0.8 kB larger |
| Collection |                              4.5 kB |                                  — |            4.5 kB larger |
| Work       |                              4.6 kB |                           300.0 kB |         295.4 kB smaller |
| About      |                              0.8 kB |                                  — |            0.8 kB larger |

For **Collection**, the initial route including the slider grows by **4.5 kB**
from the Clover update. For **Work**, the initial route including the slider
and shared code grows by **4.6 kB**, while the viewer entry chunks shrink by
**300.0 kB**, giving a net **295.4 kB reduction**. This is a 30.1% reduction
across the control's initial-plus-viewer-entry payload. Work's previously
reported 44.4% applies to the viewer entry chunks alone.

The small 0.8 kB increases on the other pages reflect the update's effect on
shared dependencies/runtime chunks; they are not evidence that the slider loads
on those pages. Multiple sliders on one screen reuse the same downloaded code.

The **Clover update reductions** column overlaps with the initial-bundle column:
slider/shared-code changes are already included in initial JS + CSS. Work's
Clover figure also includes its separately loaded viewer entry. Do not add the
two columns together. The initial sizes and all original first-paint measurements
remain unchanged; no new FCP claim is made from the control build.

Application source and CSS rules were identical between the control and the
migrated build. CSS payload sizes were identical on four screens; Work's CSS
varied by three gzip bytes because of bundle ordering. This small difference is
included in the reported route totals. The control build succeeded with the
same production settings and validation bypasses used for the original builds.
Browser smoke checks confirmed visible slider cards on both control slug pages
and the Work viewer placeholder, with zero application errors. Sliders were
scrolled into view to trigger their lazy image loading.

The control and comparison script remain in the temporary benchmark workspace:
`css-only-clover3/`, `build-css-only.log`, `clover-size-comparison.cjs`, and
`clover-update-reductions.json`. The durable results JSON includes the control's
manifest file lists, per-route exact byte totals, and the calculated deltas.

## Repeatability

Nine cold-cache samples per screen per version, after one warm-up per pair:
90 measured navigations. Before/after order alternated each round. No measured
samples were discarded. The following ranges are the middle 50% of FCP samples
(25th–75th percentile), not confidence intervals:

| Screen     | Before FCP, middle 50% | After FCP, middle 50% |
| ---------- | ---------------------: | --------------------: |
| Home       |             664–692 ms |            600–612 ms |
| Search     |             684–696 ms |            628–648 ms |
| Collection |             652–676 ms |            596–608 ms |
| Work       |             672–684 ms |            604–612 ms |
| About      |             560–572 ms |            496–516 ms |

All 90 navigations reached their expected content selectors with zero browser
application errors. Recorded failed local-app requests were all intentionally
blocked prefetches; there were no unexpected local-app request failures.
No application changes were made for this benchmark.

## Method and limits

- Built two separate temporary production copies with Node 24.11.1 and Next
  14.2.4. Both used the same environment and disabled monitoring uploads. The
  original pre-migration archive supplied `components`, `pages`, `styles`,
  Stitches config, Next config, package manifest, and lockfile. Shared supporting
  code came from the current checkout; its only tracked diff outside those
  archived source directories was a test fixture. The baseline used its own
  locked dependencies. The current copy used the installed current dependencies.
- Type checking and lint were skipped identically in these temporary benchmark
  builds; they do not affect the runtime bundles. Migration verification results
  remain recorded separately in [DESIGN.md](../../DESIGN.md).
- Chromium 141.0.7390.37, 1440 × 900 viewport, device scale 1, reduced motion,
  4× CPU slowdown. Every navigation used a fresh browser context and disabled
  HTTP cache. Servers were warmed; this measures full navigations, not client
  transitions with previously cached shared chunks.
- A local fixture API served the same logged-out auth response, 12 mixed-aspect
  search results, public image Work (“Kathy and Carol in a tree”), and Collection
  (“Berkeley Folk Music Festival”). The fixtures exercise those route types;
  they are not a benchmark of the particular live Work open in the preview.
- Original site fonts were cached locally and returned with identical bytes.
  Remote images were replaced with the same local representative JPEG.
  Analytics, CookieYes, and Honeybadger were blocked. Requests explicitly marked
  as prefetch were blocked; some unmarked Next script preloads can still occur.
- CDP requested 10 Mbps down / 5 Mbps up and 40 ms latency. Request interception
  bypasses parts of that emulation: local document TTFB was approximately
  6–11 ms. Treat these as **controlled local comparisons**, not a calibrated
  WAN/mobile profile or a promise of deployed performance.
- Initial size sums the unique `_app` and route files in Next's build manifest,
  compressed individually at gzip level 6. It includes shared and route CSS.
  It excludes HTML, images, fonts, API responses, tiny build/SSG manifests,
  legacy-browser polyfills, lazy chunks, and other-page prefetches. It measures
  comparable code payloads, not a page's entire network transfer. Production
  compression settings may yield different wire sizes.
- FCP comes from the browser Paint Timing API. It can represent the common page
  header before route-specific results appear. The application still waits for
  its auth lookup before mounting the page; a real API delay affects both
  versions. No claim is made here about LCP, full viewer/image readiness,
  authenticated states, audio/video, mobile layouts, or field Core Web Vitals.
- Masonry behavior was preserved; this work did not change its layout algorithm.

## Evidence and reproduction

[Machine-readable results](css-migration-2026-10-09.json) preserve all 90 FCP
samples, content-presence timestamps, TTFB, quartiles, manifest file lists, exact
byte counts, viewer chunks, conditions, and the baseline archive checksum.
Content-presence timestamps are diagnostic DOM/rAF observations, not paint
metrics, and should not be described as rendering or interaction readiness.

The local benchmark workspace is `/tmp/dc-performance-20261008/`:

- `measure.cjs`: browser driver and interception rules.
- `fixtures.cjs`: deterministic API server and fixture definitions.
- `fonts/`: the nine original font files.
- `before/`, `after/`: source copies and compiled production builds.
- `initial-bundles.json`, `viewer-bundles.json`: manifest-based size evidence.
- `measurements-constrained.json`: full browser observations.
- `warmup-constrained.json`: excluded warm-up observations.
- `build-before.log`, `build-after.log`: production build output.

The temporary files are not durable project artifacts. To repeat this exact
run while they remain available, start the fixture API on port 4099 and the
before/after production servers on 3005/3006 with their matching public URLs,
then run `PROFILE=constrained SAMPLES=9 node measure.cjs` from that workspace.
Use fresh contexts and preserve the documented fixture/interception settings.
The regular development preview uses port 3001 and was left untouched.

Everything remains local and uncommitted. No GitHub actions were performed.
