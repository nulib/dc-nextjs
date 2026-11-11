import {
  getContentStateCanvasId,
  getContentStateMetadata,
} from "@/lib/iiif/content-state-helpers";

const canvasId = "https://example.org/canvas/1";
const canvas = { id: canvasId, type: "Canvas" };
const withTarget = (target: unknown) => ({ json: { target } });

describe("getContentStateCanvasId", () => {
  it("reads Clover 4's bare Canvas target (no time or region)", () => {
    expect(getContentStateCanvasId(withTarget(canvas))).toBe(canvasId);
  });

  it("reads a SpecificResource's source, as an object or a string", () => {
    const selector = { type: "FragmentSelector", value: "xywh=0,0,10,10" };
    expect(
      getContentStateCanvasId(
        withTarget({ type: "SpecificResource", source: canvas, selector }),
      ),
    ).toBe(canvasId);
    expect(
      getContentStateCanvasId(
        withTarget({ type: "SpecificResource", source: canvasId }),
      ),
    ).toBe(canvasId);
  });

  it("reads a URI target without its fragment, and the first of several", () => {
    expect(getContentStateCanvasId(withTarget(`${canvasId}#t=12`))).toBe(
      canvasId,
    );
    expect(getContentStateCanvasId(withTarget([canvas, "other"]))).toBe(
      canvasId,
    );
  });

  it("has no Canvas without a target", () => {
    expect(getContentStateCanvasId(undefined)).toBeUndefined();
    expect(getContentStateCanvasId({ json: {} })).toBeUndefined();
  });
});

describe("getContentStateMetadata", () => {
  const manifest = {
    id: "https://example.org/manifest",
    type: "Manifest",
    items: [
      {
        ...canvas,
        items: [
          { items: [{ body: { id: "https://example.org/b", type: "Image" } }] },
        ],
      },
    ],
  } as any;

  it("finds the Canvas for a bare Canvas target", () => {
    const metadata = getContentStateMetadata({
      manifest,
      contentState: withTarget(canvas),
    });
    expect(metadata.activeCanvasId).toBe(canvasId);
    expect(metadata.activeCanvasIndex).toBe(1);
    expect(metadata.activeCanvasResourceType).toBe("Image");
  });

  it("does not throw for a Canvas missing from the Manifest", () => {
    expect(() =>
      getContentStateMetadata({
        manifest,
        contentState: withTarget({ id: "https://example.org/other" }),
      }),
    ).not.toThrow();
  });
});
