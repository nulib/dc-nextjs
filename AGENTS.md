# Repository working instructions

## Styling direction

Read [DESIGN.md](DESIGN.md) before styling work. It records the migration plan,
component contracts, verification gates, and current implementation status.

- Use vanilla CSS in colocated `.module.css` files for new or migrated styles.
  Split large features into focused component/responsibility files. Keep globals
  small; split shared tokens across `styles/tokens/*.css`.
- Use `--dc-*` CSS custom properties for shared visual values. Keep typography,
  spacing, and dimension scales distinct when translating Stitches tokens.
- Do not add CSS-in-JS libraries, new Stitches usage, arbitrary `css` props,
  styled-jsx rules, or a replacement style-object abstraction. The application
  migration is complete; do not reintroduce Stitches.
- Put finite states in classes or attributes and all styling rules in CSS.
  Permit narrowly typed inline custom-property values only for genuinely dynamic
  data/measurements. Move static inline styles into modules. Preserve necessary
  vendor-managed geometry; document third-party styling boundaries.
- Import global styles from `pages/_app.tsx`; import CSS Modules from their
  owners. Scope vendor overrides with local classes. Style portaled content on
  the portaled element, not through the trigger's ancestors.
- Forward attributes, classes, and refs where required. Use explicit slot or
  custom-property contracts for cross-component customization; do not couple
  parents to generated class names or private child module classes.
- Preserve existing appearance, breakpoint behavior, interaction semantics,
  accessibility, and WebMCP-facing behavior. Separate intentional fixes from the
  style translation and verify them explicitly.

## Dependencies and protected behavior

- Use the local CSS-based Button and Notification components. Stitches,
  `@nulib/design-system`, and the unused Framer Motion dependency are removed.
  Keep native button/link semantics and explicit variant props.
- Keep `react-masonry-css`. Do not overhaul Masonry, substitute another layout
  algorithm, or change its breakpoints, column counts, item distribution/order,
  gutters, or loading behavior. Grid work is limited to equivalent presentation
  migration, preserving the contract in DESIGN.md.
- Clover was upgraded to exact `4.0.0-rc.2` before slider edits, then pinned to
  exact stable `3.17.0` (October 14, 2026) for an upstream viewer fix. For
  subsequent upgrades, query published versions/tags; do not assume `latest`,
  `next`, or `rc` selects the intended line. Use Node 24.11.1 as recorded in
  `.tool-versions`.
- Inspect the installed Clover API/DOM, not old Swiper assumptions. Keep slider
  CSS card counts/gaps synchronized with group-size breakpoints. Clover 3.17.0
  (like RC.2) ignores its fetch credentials option, so retain SliderWrapper's credentialed fetch
  and abort handling until that upstream issue is verified fixed.
- Use Clover's public exports and types. Verify viewer, primitives, content
  search, media, embeds, and sliders after upgrades. The homepage still uses
  Swiper; keep that dependency.

## Verification and documentation

- Use `npm ci`; the project `.npmrc` preserves the lockfile's
  `legacy-peer-deps` mode. Do not substitute `--force`. Both CI workflows read
  the Node version from `.tool-versions` to match local verification.
- For Playwright production builds, set `NEXT_PUBLIC_DC_URL` to the same origin
  as `BASE_URL` before building, and keep `NEXT_PUBLIC_DCAPI_ENDPOINT` consistent
  through build and server startup. Public variables are compiled into browser
  code; setting them only at startup cannot repair a missing build-time value.
  Reproduce CI without local `.env*` files, using the workflow's environment.
- Capture visual/behavior baselines before migration and use stable fixtures.
  Validate changed desktop/mobile states, affected breakpoint boundaries, focus,
  portals, loading, and reduced motion. Preserve Masonry across resize and mixed
  image aspect ratios.
- Run relevant Jest tests, type checking, a production build, and targeted
  Playwright/visual checks for implementation batches. Use the commands and
  setup notes in DESIGN.md. Report pre-existing failures or unavailable checks.
- For documentation-only work, check formatting, links, and the diff; application
  tests are not required.
- Keep DESIGN.md and these instructions current when conventions, the Clover
  target/compatibility result, migration status, or approved exceptions change.
- Preserve unrelated working-tree changes. This task is strictly local
  development pending human review: NEVER commit, push, create/update pull
  requests, or make GitHub changes. A human handles that work.
