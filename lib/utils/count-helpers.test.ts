import { formatNumber } from "@/lib/utils/count-helpers";
import { pluralize } from "@/lib/utils/count-helpers";

describe("Number Format helper util", () => {
  it("renders formatted numbers", () => {
    expect(formatNumber(23)).toEqual("23");
    expect(formatNumber(123)).toEqual("123");
    expect(formatNumber(1234)).toEqual("1,234");
    expect(formatNumber(12345)).toEqual("12,345");
    expect(formatNumber(123456)).toEqual("123,456");
    expect(formatNumber(1234567)).toEqual("1,234,567");
  });
});

describe("Pluralize text helper", () => {
  it("pluralizes values accordingly", () => {
    /** Combo text and count scenario */
    expect(pluralize("zebra", 0)).toEqual("0 zebras");
    expect(pluralize("zebra", 1)).toEqual("1 zebra");
    expect(pluralize("zebra", 6)).toEqual("6 zebras");

    /** Extended suffix word */
    expect(pluralize("fox", 6, "es")).toEqual("6 foxes");
    expect(pluralize("fox", 6666, "es")).toEqual("6,666 foxes");
  });
});
