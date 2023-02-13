/* eslint sort-keys: 0 */

export const seconds = 0.2;
export const timingFunction = `cubic-bezier(0.3, 1, 0.3, 1)`;

const transitions = {
  dcAll: `all ${seconds}s ${timingFunction}`,
  dcOpacity: `opacity ${seconds}s ${timingFunction}`,
  dcImageLoad: `all 1s ${timingFunction}`,
  dcWidth: `width ${seconds}s ${timingFunction}`,
};

export default transitions;
