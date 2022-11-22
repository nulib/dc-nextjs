import { facetRegex } from "./facet-helpers";

describe("Case insensitive regex function", () => {
  it("returns expected pattern", () => {
    const response = facetRegex("21st century Boy");
    expect(response).toBe(
      ".*21(S|s)(T|t) (C|c)(E|e)(N|n)(T|t)(U|u)(R|r)(Y|y) (B|b)(O|o)(Y|y).*"
    );
    const response2 = facetRegex("Architecture");
    expect(response2).toBe(
      ".*(A|a)(R|r)(C|c)(H|h)(I|i)(T|t)(E|e)(C|c)(T|t)(U|u)(R|r)(E|e).*"
    );
  });

  it("returns empty string if passed no value", () => {
    const response = facetRegex("");
    expect(response).toBe("");
  });
});
