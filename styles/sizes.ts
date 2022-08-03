/* eslint sort-keys: 0 */

export const gr = (multiplier: number) => 1.618 ** multiplier;

/**
 * calculated via golden ratio
 */

const sizes = {
  1: `calc(1rem / ${gr(2)})`, // 7.25765912227px
  2: `calc(1rem / ${gr(1)})`, // 11.7428924598px
  3: `1rem`, // 19px (base rem)
  4: `calc(1rem * ${gr(1)})`, // 30.742px
  5: `calc(1rem * ${gr(2)})`, // 49.740556px
  6: `calc(1rem * ${gr(3)})`, // 80.480219608px
  7: `calc(1rem * ${gr(4)})`,
  8: `calc(1rem * ${gr(5)})`,
  9: `calc(1rem * ${gr(6)})`,
  10: `calc(1rem * ${gr(7)})`,
  11: `calc(1rem * ${gr(8)})`,
  12: `calc(1rem * ${gr(9)})`,
};

export default sizes;
