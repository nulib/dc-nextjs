// next/dynamic resolves its target with `require.resolveWeak`, which fails on
// @nulib/clover's import-only `exports`. Dynamically importing this local
// module instead keeps the package behind an ordinary static ESM import.
export { default } from "@nulib/clover";
