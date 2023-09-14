import { getUrlSearchParams } from "./get-url-search-params";

describe("getUrlSearchParams", () => {
  test("should return an object with the query params", () => {
    const result = getUrlSearchParams("http://localhost:3000/?foo=bar&baz=qux");
    // eslint-disable-next-line sort-keys
    expect(result).toEqual({ foo: "bar", baz: "qux" });
  });

  test("should return an empty object if no query params are present", () => {
    const result = getUrlSearchParams("http://localhost:3000/");
    expect(result).toEqual({});
  });
});
