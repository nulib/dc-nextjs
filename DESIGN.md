# Styling architecture

Updated October 9, 2026. The migration and local verification are complete;
human review is pending. No commits or GitHub changes are part of this
work. [AGENTS.md](AGENTS.md) contains the corresponding working rules.

## Decisions and scope

Application styling uses vanilla CSS, CSS Modules, and CSS custom properties.
There is no replacement CSS-in-JS API, runtime style compiler, or arbitrary `css`
prop. Stitches, `@nulib/design-system`, and the unused Framer Motion dependency
have been removed. Local Button and Notification components cover the actual
application callers. Radix still owns accessible interaction behavior.

The migration preserves the existing design and Pages Router. It does not
redesign Masonry or change React/Next.js versions. Clover was upgraded to the
latest published 4.x release candidate before slider code or styles changed.
The homepage still uses Swiper; that dependency remains necessary.

The initial audit found 101 Stitches-importing files, 330 styled definitions,
26 variant blocks, 26 JSX `css` props, six keyframe definitions, and no application
CSS files. Styles now live in 111 focused CSS Modules. The largest module is
about 230 lines; there is no project-wide component stylesheet. Most former
styled elements are now ordinary native or Radix elements with classes, rather
than replacement React wrappers.

## File ownership and loading

```text
styles/
  tokens/
    colors.css       # Northwestern and Radix palette values
    spacing.css      # Separate spacing and dimension scales
    typography.css   # Font families and font sizes
    controls.css     # Numeric scales inherited from the former design system
    motion.css       # Shared transitions and reduced-motion values
    layout.css       # Shared container dimensions
  fonts.css          # Font faces, with existing preload metadata in fonts.ts
  global.css         # Document defaults only
  metrics.ts         # Numeric values required by layout/image APIs
  media.ts           # Numeric breakpoint values required by JavaScript
components/
  Shared/
    Button/Button.tsx + Button.module.css
    Notification/Notification.tsx + Notification.module.css
  Search/
    Search.module.css
    Pagination.module.css
    Panel.module.css
  Clover/
    clover-tokens.css
    ViewerWrapper.module.css
    SliderWrapper.module.css
```

Global styles are imported once in `pages/_app.tsx`: tokens, fonts, document
rules, then Clover palette mappings. Components import the module for their
responsibility. Shared presentation modules such as Link, Block, DefinitionList,
and form controls may be composed by consumers. Feature styles stay with their
feature. Next.js can combine CSS for delivery without changing source ownership.

Do not add a large global overrides file. Split a growing module by component or
responsibility. Avoid new utility frameworks or generic style-object adapters.
The old Stitches configuration and token objects have been retired. Fonts still
have a small TypeScript metadata list because `_document.tsx` preloads them.

## Tokens, variants, and the cascade

Shared variables use `--dc-*`. Typography, spacing, and dimensions are separate:

```css
.card {
  padding: var(--dc-space-gr3);
  font-size: var(--dc-font-size-gr3);
  color: var(--dc-color-purple);
}
```

The original `$gr3` represented different values depending on the CSS property.
Keep the 19px root, original font faces, golden ratio (1.618), colors, and timing.
`controls.css` explicitly preserves the numeric scales previously supplied by
NUL's global theme; `legacy` names mark those compatibility values, not an active
runtime dependency. Previously undefined font tokens retain inherited-font
behavior instead of inventing a new face.

Use literal media-query conditions. CSS variables cannot be substituted into
media conditions. Existing max-width boundaries are 334, 575, 767, 991, 1199,
and 1439px; the largest min-width boundary is 1440px. Preserve overlapping rule
order. Numeric values in `styles/media.ts` and `styles/metrics.ts` serve Masonry,
slider options, and image requests; keep corresponding CSS values synchronized.

Finite states use classes or explicit attributes, for example
`.heading:where([data-level="h2"])`. The `:where()` keeps a migrated variant at
the specificity of the original Stitches variant class. Existing state selectors
such as Radix's `data-state` retain their original specificity. Composed styles
that must override a base across modules use deliberate extra class specificity;
do not rely on import order across routes. Keep necessary existing `!important`
rules until a separately verified cascade cleanup replaces them.

## Component contracts

- Heading, Container, Icon, and Announcement forward normal attributes,
  `className`, and refs. Heading has an explicit supported `as` union.
- Button renders a native action button by default (`type="button"`). Submit
  callers explicitly request `type="submit"`. `href` selects a native link.
  Variants are `default`, `primary`, `text`, and `danger`; `textCase="normal"`
  opts out of uppercase. Disabled links lose their href and keyboard stop;
  native disabled action buttons retain browser behavior.
- Notification exposes `tone` (`default`, `warning`, `danger`) and optional
  `dismissible`. Callers can supply status/alert semantics where appropriate.
- Radix still owns dialogs, menus, selects, switches, radio groups, tabs, and
  focus management. Put a portal's class on its content/overlay itself. A selector
  beneath the trigger cannot reach portaled content.
- Parent components must not depend on generated CSS hashes or private child
  classes. Deliberate cross-component selectors use documented `data-dc-slot`
  hooks, scoped beneath a local owner class. The existing hooks cover `heading`,
  `heading-subhead`, `heading-slash-title`, `container`, `nav`, `search`, `hero`,
  `icon`, `link`, `copy-text`, `expandable-list-item`, `search-results-message`,
  `stack`, `work-type`, `facet-value`, and Figure's `figure`,
  `figure-image-wrapper`, `figure-caption`, and `figure-title`.

Example of an explicit slot contract:

```css
.gridItem a:hover :global([data-dc-slot~="figure-image-wrapper"]) {
  outline: 2px solid var(--dc-color-purple60);
}
```

Preserve these hooks when changing an owner, or update all consumers together.
Use shared module classes for genuinely shared presentation, not to reach into
another component's private DOM.

## Dynamic values and vendor boundaries

All application styling rules live in CSS. The remaining application inline
styles assign custom-property values only:

| Owner                    | Values passed to CSS                       |
| ------------------------ | ------------------------------------------ |
| Container                | Measured/fixed maximum width               |
| Expand                   | Measured expanded height                   |
| WorkType radio group     | Highlight position, width, opacity, timing |
| Search JumpToList        | Measured vertical offset                   |
| HeroBasic / PhotoFeature | Data-driven background URL                 |
| BlurredBgImage           | Data-driven image, color, dimensions       |
| EmbedViewer preview      | Work thumbnail URL                         |

Keep these properties narrowly typed and owned by their component. Do not
introduce arbitrary style-object props or generate CSS rules in JavaScript.
SVG `fill` remains an ordinary SVG presentation attribute.

Clover's distribution injects its own bundled CSS. Radix, Next Image, Swiper,
OpenSeadragon, and other rendering/positioning libraries still manage inline
geometry where necessary. These are vendor boundaries, not application
CSS-in-JS. Vendor overrides stay scoped in the relevant module, and Clover's
palette is mapped to `--dc-*` in `components/Clover/clover-tokens.css`.

The old `Transition.tsx` had no consumers and was removed with Framer Motion;
there was no active route-exit animation to replace. Button uses a focus-visible
outline instead of changing its border width. Reduced-motion values are provided
for shared transition tokens, local buttons/Expand, and loading indicators.

## Masonry preservation contract

`components/Grid/Grid.tsx` still uses `react-masonry-css`. Its breakpoint object,
column wrappers, item keys, ordering, distribution, and loading behavior remain
intact. `.grid` and `.grid-column` remain stable hooks.

| Maximum viewport width | Columns |
| ---------------------- | ------- |
| 575px                  | 2       |
| 767px                  | 2       |
| 991px                  | 3       |
| 1199px                 | 4       |
| 1439px                 | 5       |
| Default                | 5       |

Preserve the first-column margin exception, outer padding, gutters, and card
aspect ratios. The overlapping original media rules yield a 19px gutter through
991px, then 30.742px. Do not "correct" the smaller-width rule order as part of
migration. Do not replace this with CSS columns, native CSS masonry, a new
library, or another distribution algorithm.

## Clover 4 compatibility

npm was queried on October 8, 2026. The highest published 4.x RC was
`4.0.0-rc.2`; `latest` still selected 3.16.2, and `next` selected an older 2.x
candidate. Both package and lockfile now pin **4.0.0-rc.2** exactly. The upgrade
preceded slider edits. `.tool-versions` now selects installed Node 24.11.1; the
old 20.5.0 runtime did not meet Clover's >=20.10.0 requirement.

The RC uses Embla for sliders. Compatibility work:

- Use the exported `SliderBreakpoints` type, retaining group sizes and gaps.
  `slidesPerView` no longer exists. CSS now supplies the old responsive card
  counts (2/3/4/5/6) at the previous min-width boundaries
  334/767/991/1199/1439px. Keep these separate from Masonry's max-width rules.
- Use `.clover-slider-track` and `.clover-slider-slide` hooks from the installed
  RC, including the hidden collection-slide rule. Align collection rails at
  their start and retain View All links and palette mapping.
- RC.2 declares `options.credentials` but its collection fetch does not use it.
  SliderWrapper therefore fetches with `credentials: "include"`, aborts stale
  requests, and supplies resolved items, label, and summary through the public
  API. Errors propagate to the existing feature ErrorBoundary. Revisit this
  workaround when the upstream fetch honors credentials.
- Test the normal public viewer export instead of a hardcoded internal `.mjs`
  alias. The local integration now uses that export, with Clover's published
  types for viewer, slider, and primitives. Content-state callbacks accept the
  actual object payload and check the encoded state before dispatching.
- Swiper remains in the homepage Hero, so it must not be removed.

The RC intentionally owns its internal viewer UI. Full authenticated staging,
reading-room, audio/video playback, and live content-search behavior require
human smoke testing with working data/access before release. Local mocks verify
wrapper options and content-search lifecycle; they are not proof of live media
or authentication compatibility.

## Verification and local development

Use Node 24.11.1. Install with `npm ci`; the project `.npmrc` sets
`legacy-peer-deps=true` while this repository retains the pre-existing ESLint 9 /
Next 14 peer incompatibility. Both CI workflows read `.tool-versions`. Do not
substitute `--force`: it resolves a different peer-dependency tree and can reject
the existing lockfile. This migration
does not upgrade the lint toolchain. `npm run dev` uses a custom HTTPS server and
requires local `SSL_CERT`/key configuration. For a local HTTP preview:

```sh
NEXT_PUBLIC_DC_URL=http://127.0.0.1:3001 \
node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3001
```

Supply matching `NEXT_PUBLIC_DC_URL` and `NEXT_PUBLIC_DCAPI_ENDPOINT` values for
your preview. The app waits for `auth/whoami` before showing pages; an unavailable
configured API can leave it blank. Test fixtures intercept this response instead
of modifying authentication behavior or local credentials.

The Playwright workflow uses `http://localhost:3000` for both `BASE_URL` and
`NEXT_PUBLIC_DC_URL`, with the public test API endpoint shared by build and
server startup. These values are set at job scope. Next.js compiles
`NEXT_PUBLIC_*` values into browser code during `npm run build`; supplying them
only to `next start` or Playwright is too late. Reproduce CI in an isolated
source copy without local `.env*` files so local configuration cannot hide
missing workflow values.

```sh
NEXT_PUBLIC_DC_URL=https://digitalcollections.library.northwestern.edu \
NEXT_PUBLIC_DCAPI_ENDPOINT=https://api.dc.library.northwestern.edu/api/v2 \
npm run test:ci -- --runInBand
npm run ts-lint-commit-hook -- --incremental false
npm run build
BASE_URL=http://127.0.0.1:3001 npm run test:playwright -- tests/styles-migration.spec.ts --project=chromium
```

`ts-lint-commit-hook` is only the repository's existing name for a TypeScript
check; running it creates no commit. For builds, disable Honeybadger uploads in
local environment settings. Stop the dev server before building into the same
`.next` directory, then restart it for local review.

Verification recorded during migration:

- The initial default Jest run had 19 failures in six suites because endpoint
  variables were missing. With the public variables supplied, the existing
  suites pass. Five pre-existing test-only TypeScript errors were repaired by
  updating obsolete search-context fixtures, typing metadata DOM elements, and
  completing a collection fixture; application types were not loosened.
- Regression tests cover local Button form/link/disabled/ref behavior,
  Notification dismissal, measured Expand state, attribute forwarding, and
  credentialed/aborted slider requests. Stitches-generated-class assertions now
  use component state contracts; browser tests check real computed styles.
- `tests/styles-migration.spec.ts` uses stable search/IIIF/auth fixtures. It
  checks desktop/mobile pages, portal styling, dialog keyboard focus, Masonry
  order/gutters/aspect ratios at 12 widths, and Clover sizing/navigation/viewer.
- The local Chromium check has already confirmed Masonry at 334, 335, 575, 576,
  767, 768, 991, 992, 1199, 1200, 1439, and 1440px, plus slider counts at five
  widths. CSS token references have no undefined `--dc-*` names.
- Pre-migration desktop/mobile screenshots were saved locally. Contact's
  typography and geometry match the captured baseline. Remote font/icon/image
  timing makes whole-page pixel comparisons unreliable; do not claim exhaustive
  visual parity. The About grid's existing 10px desktop overflow is preserved.
- Final Jest run: **80 suites passed; 314 tests passed; six existing skips**.
  TypeScript passed. `npm run build` produced the optimized application and
  completed all static pages with exit code 0. Its lint stage still reports the
  pre-existing ESLint 9 / Next 14 invalid-options error; lint is not a pass.
  The existing package-version named-import warning also remains.
- All three browser regression tests passed in Chromium against both the dev
  server and the optimized production server. This includes client navigation,
  opening the OpenSeadragon image surface, slider previous/next controls, work
  dialog styling, and sign-in focus containment. The local machine's installed
  Chromium was supplied explicitly to Playwright; other browser engines were
  not run.
- `npm ls` confirms Stitches, NUL's design system, and Framer Motion are absent.
  Source/lockfile scans and `git diff --check` passed. All changes remain local
  and uncommitted. The dev preview is left on `http://127.0.0.1:3001`.
- The live homepage loads from the configured staging API in the local preview.
  CookieYes reports that localhost differs from its registered domain; its
  external account configuration is unchanged. This is separate from styling
  and does not prevent the application from rendering.
- PR #512's initial Actions jobs stopped at dependency installation: the
  workflows used `npm ci --force` against a lockfile generated in legacy peer
  mode. Local CI fixes align install mode and Node versions, restrict the
  formatting failure message to an actual Prettier failure, and repair the
  malformed `translateX(0)` keyframe in Search Options that a full formatting
  check exposed. Clean-install validation also found that Playwright 1.46 needs
  reduced motion under `contextOptions`, and Stack unit tests left real thumbnail
  requests running after completion. The browser fixture now uses the supported
  option and Stack interaction tests mock the thumbnail lookup. A fresh install
  with the unchanged lockfile passes: formatting, TypeScript, all 80 Jest suites
  (314 tests, six skips), production build, and three fixture-based Chromium
  checks. The existing ESLint 9 / Next 14 build-lint error remains non-blocking;
  Firefox/WebKit and remote Actions were not rerun. Remote reruns remain a human
  responsibility.
- PR #512's next run passed installation and unit/code-quality checks, but the
  Clover browser test failed in all three engines when navigating to a Work.
  The recorded browser exception was an invalid URL: `NEXT_PUBLIC_DC_URL` was
  absent during the production build, so `new URL("/search", DC_URL)` crashed
  Work rendering. Earlier local checks had supplied this value and missed the
  workflow mismatch. An isolated build without the variable reproduced the
  same failure. The workflow now shares explicit local-origin and test-API
  values across build, startup, and tests. With that configuration, a clean
  install and production build in the workflow's Playwright 1.46.1 Noble image
  with Node 24.11.1 passed the full browser suite: **21 passed, 27 existing skips,
  zero failures** across Chromium, Firefox, and WebKit. This local container
  used Linux ARM64; the test configuration, assertions, and retries were
  unchanged. The existing non-blocking build-lint error remains. Formatting
  and diff checks passed; these follow-up fixes remain uncommitted, and no
  remote Actions run was triggered.

Before release, review real search/collections/work dialogs/chat on desktop and
mobile, authenticated/reading-room states, content search, audio/video, embeds,
and client navigation. Human review owns committing and all GitHub work. No
performance improvement is claimed without a measured before/after comparison.

The [October 9 local performance comparison](docs/performance/css-migration-2026-10-09.md)
records production bundle sizes and 90 cold-cache browser navigations against
the captured pre-migration source. Initial JavaScript plus CSS is 5.2–13.1%
smaller across Home, Search, Collection, Work, and About; median first contentful
paint is 52–72 ms earlier in that controlled local test. The report includes
raw samples, conditions, limits, and a Clover control build with application
CSS held constant. The Clover update adds 4.5 kB to Collection’s initial bundle
including its slider; Work saves 295.4 kB net across its initial bundle (including
the slider) and separately loaded viewer entry. These component-update effects
overlap with the overall route totals and must not be added to them.
These results cover the combined migration and dependency updates; they are not
an isolated CSS Modules comparison or a deployed performance guarantee.
