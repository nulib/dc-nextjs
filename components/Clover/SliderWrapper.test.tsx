import { render, waitFor } from "@testing-library/react";
import Slider from "@samvera/clover-iiif/slider";
import SliderWrapper from "./SliderWrapper";

jest.mock("@samvera/clover-iiif/slider", () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

const originalFetch = global.fetch;
afterEach(() => {
  global.fetch = originalFetch;
  jest.clearAllMocks();
});

it("loads a collection with credentials and supplies the resolved items to Clover", async () => {
  const collection = {
    type: "Collection",
    label: { en: ["Collection"] },
    summary: { en: ["Summary"] },
    items: [{ id: "https://example.org/manifest", type: "Manifest" }],
  };
  const fetchMock = jest
    .fn()
    .mockResolvedValue({ ok: true, json: async () => collection });
  global.fetch = fetchMock;
  render(
    <SliderWrapper
      collectionId={new URL("https://example.org/collection")}
      customViewAll="/search?collection=test"
    />,
  );
  await waitFor(() => expect(Slider).toHaveBeenCalled());
  expect(fetchMock).toHaveBeenCalledWith("https://example.org/collection", {
    credentials: "include",
    signal: expect.any(AbortSignal),
  });
  expect(jest.mocked(Slider).mock.calls[0][0]).toMatchObject({
    items: collection.items,
    label: collection.label,
    summary: collection.summary,
    options: { customViewAll: "/search?collection=test" },
  });
});

it("aborts a stale collection request on navigation and unmount", () => {
  const fetchMock = jest.fn().mockImplementation(() => new Promise(() => {}));
  global.fetch = fetchMock;
  const { rerender, unmount } = render(
    <SliderWrapper
      collectionId={new URL("https://example.org/first")}
      customViewAll="/search"
    />,
  );
  const firstSignal = fetchMock.mock.calls[0][1].signal;
  rerender(
    <SliderWrapper
      collectionId={new URL("https://example.org/second")}
      customViewAll="/search"
    />,
  );
  expect(firstSignal.aborted).toBe(true);
  const secondSignal = fetchMock.mock.calls[1][1].signal;
  expect(secondSignal.aborted).toBe(false);
  unmount();
  expect(secondSignal.aborted).toBe(true);
});
