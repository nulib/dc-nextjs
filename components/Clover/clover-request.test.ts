import { CLOVER_REQUEST, cloverFetch } from "./clover-request";

const originalFetch = global.fetch;
const ok = { ok: true } as Response;
const JSON_ACCEPT = { Accept: "application/ld+json, application/json" };

afterEach(() => {
  global.fetch = originalFetch;
});

describe("cloverFetch", () => {
  it("keeps credentials on JSON requests (manifests, info.json, search)", async () => {
    const fetchMock = jest.fn().mockResolvedValue(ok);
    global.fetch = fetchMock;

    await cloverFetch("https://api.example.org/manifest", {
      credentials: "include",
      headers: JSON_ACCEPT,
    });

    expect(fetchMock.mock.calls[0][1]).toMatchObject({
      credentials: "include",
    });
  });

  it("drops cross-origin credentials for text such as WebVTT", async () => {
    const fetchMock = jest.fn().mockResolvedValue(ok);
    global.fetch = fetchMock;

    await cloverFetch("https://iiif.example.org/public/vtt/track.vtt", {
      credentials: "include",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][1]).toMatchObject({
      credentials: "same-origin",
    });
  });

  it("retries a rejected credentialed request once without credentials", async () => {
    const fetchMock = jest
      .fn()
      .mockRejectedValueOnce(new TypeError("Failed to fetch"))
      .mockResolvedValueOnce(ok);
    global.fetch = fetchMock;

    await expect(
      cloverFetch("https://static.example.org/annotations.json", {
        credentials: "include",
        headers: JSON_ACCEPT,
      }),
    ).resolves.toBe(ok);

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1][1]).toMatchObject({
      credentials: "same-origin",
    });
  });

  it("does not retry aborted requests", async () => {
    const controller = new AbortController();
    controller.abort();
    const fetchMock = jest
      .fn()
      .mockRejectedValue(new TypeError("Failed to fetch"));
    global.fetch = fetchMock;

    await expect(
      cloverFetch("https://api.example.org/manifest", {
        credentials: "include",
        headers: JSON_ACCEPT,
        signal: controller.signal,
      }),
    ).rejects.toThrow(TypeError);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("is the fetch Clover receives", () => {
    expect(CLOVER_REQUEST).toEqual({
      credentials: "include",
      fetch: cloverFetch,
    });
  });
});
