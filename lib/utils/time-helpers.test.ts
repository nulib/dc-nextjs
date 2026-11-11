import { convertTime, selectorStartTime } from "@/lib/utils/time-helpers";

describe("convertTime", () => {
  it("formats seconds as minutes and seconds", () => {
    expect(convertTime(72.4)).toBe("1:12");
  });

  it("returns an empty string rather than throwing for a non-number", () => {
    expect(convertTime(NaN)).toBe("");
    expect(convertTime(Number("t=12.34"))).toBe("");
  });
});

describe("selectorStartTime", () => {
  it("reads a Clover 4 FragmentSelector", () => {
    expect(
      selectorStartTime({ type: "FragmentSelector", value: "t=12.34" } as any),
    ).toBe(12.34);
  });

  it("reads the start of a time range and a named format", () => {
    expect(selectorStartTime({ value: "t=12.5,30" })).toBe(12.5);
    expect(selectorStartTime({ value: "t=npt:8" })).toBe(8);
  });

  it("reads a Clover 3 PointSelector", () => {
    expect(selectorStartTime({ t: 42 })).toBe(42);
  });

  it("has no time for a region or a missing selector", () => {
    expect(selectorStartTime({ value: "xywh=0,0,100,100" })).toBeUndefined();
    expect(selectorStartTime(undefined)).toBeUndefined();
    expect(selectorStartTime({})).toBeUndefined();
  });
});
