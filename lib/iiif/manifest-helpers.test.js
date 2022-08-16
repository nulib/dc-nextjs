import { buildPres3Manifest } from "@/lib/iiif/manifest-helpers";
import { sampleWork1 } from "@/mocks/sample-work1";

describe("Function to build Pres 3 manifests", () => {
  it("successfully builds a manifest", async () => {
    const { label, summary, metadata } = await buildPres3Manifest(sampleWork1);

    expect(label).toEqual({
      none: [sampleWork1.title],
    });
    expect(summary).toEqual({
      none: sampleWork1.abstract,
    });
    expect(metadata[0].label.none[0]).toEqual("Contributor");
    expect(metadata[0].value.none[0]).toEqual("Roberts, James S.");

    expect(metadata[1].label.none[0]).toEqual("Date");
    expect(metadata[1].value.none[0]).toEqual("2021-03-16T15:52:00.377715Z");

    expect(metadata[2].label.none[0]).toEqual("Identifier");
    expect(metadata[2].value.none[0]).toEqual("MS 63");
  });
});
