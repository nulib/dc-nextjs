/**
 * Helper function to get URL search params
 * @param url "http://localhost:3000/?foo=bar&baz=qux"
 * @returns obj { foo: "bar", baz: "qux" }
 */

export function getUrlSearchParams(url: string) {
  const urlParams = url.split("?")[1];
  const params = new URLSearchParams(urlParams);
  const paramsObj: { [key: string]: string } = {};

  params.forEach((value, key) => {
    paramsObj[key] = value;
  });

  return paramsObj;
}
