import { render, waitFor } from "@testing-library/react";
import { Items } from "@nulib/clover";
import SliderWrapper from "./SliderWrapper";

jest.mock("@nulib/clover", () => ({
  __esModule: true,
  Items: jest.fn(() => null),
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
    items: [
      { id: "https://example.org/manifest", type: "Manifest" },
      { id: "https://example.org/nested", type: "Collection" },
    ],
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
  await waitFor(() => expect(Items).toHaveBeenCalled());
  expect(fetchMock).toHaveBeenCalledWith("https://example.org/collection", {
    credentials: "include",
    signal: expect.any(AbortSignal),
  });
  expect(jest.mocked(Items).mock.calls[0][0]).toMatchObject({
    layout: "slider",
    request: { credentials: "include" },
    iiifContent: {
      items: [collection.items[0]],
      label: collection.label,
      summary: collection.summary,
      homepage: [{ id: "/search?collection=test" }],
    },
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
