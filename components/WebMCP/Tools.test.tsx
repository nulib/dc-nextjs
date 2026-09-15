import { act, render, waitFor } from "@testing-library/react";
import {
  SearchPageWebMcpTools,
  SiteWebMcpTools,
  WorkPageWebMcpTools,
} from "./Tools";
import type { ApiSearchResponse } from "@/types/api/response";
import type { Manifest } from "@iiif/presentation-3";
import { WorkProvider } from "@/context/work-context";
import mockRouter from "next-router-mock";
import { mockSearchResponse1 } from "@/mocks/search-response1";
import { sampleWork1 } from "@/mocks/sample-work1";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import axios, { AxiosError, CanceledError } from "axios";

jest.mock("@/lib/constants/endpoints", () => ({
  ...jest.requireActual("@/lib/constants/endpoints"),
  DCAPI_ENDPOINT: "https://api.example.test/api/v2",
}));

const installModelContext = () => {
  const tools = new Map<string, WebMCP.ModelContextTool>();
  Object.defineProperty(document, "modelContext", {
    configurable: true,
    value: {
      registerTool: jest.fn(
        async (
          tool: WebMCP.ModelContextTool,
          options?: WebMCP.ModelContextRegisterToolOptions,
        ) => {
          tools.set(tool.name, tool);
          options?.signal?.addEventListener(
            "abort",
            () => {
              if (tools.get(tool.name) === tool) tools.delete(tool.name);
            },
            { once: true },
          );
        },
      ),
    },
  });
  return tools;
};

const execute = async (
  tool: WebMCP.ModelContextTool | undefined,
  input: Record<string, unknown> = {},
) => {
  if (!tool) throw new Error("Expected WebMCP tool to be registered");
  return tool.execute(input, { signal: new AbortController().signal });
};

afterEach(() => {
  Reflect.deleteProperty(document, "modelContext");
  Reflect.deleteProperty(global, "fetch");
  jest.restoreAllMocks();
});

describe("WebMCP page tools", () => {
  it("returns only the JSON server card and forwards invocation cancellation", async () => {
    const tools = installModelContext();
    const card = {
      $schema:
        "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
      name: "io.github.nulib/dc-api",
      version: "2.11.15",
      remotes: [{ type: "streamable-http", url: `${DCAPI_ENDPOINT}/mcp` }],
    };
    // Transport objects can contain circular references and functions that
    // cannot be serialized or cloned by a WebMCP host.
    const request: Record<string, unknown> = {};
    request.self = request;
    const get = jest.spyOn(axios, "get").mockResolvedValue({
      data: card,
      status: 200,
      config: { transformResponse: [() => card] },
      request,
    });
    render(<SiteWebMcpTools />);

    const signal = new AbortController().signal;
    const result = await tools
      .get("describe_remote_mcp")!
      .execute({}, { signal });

    expect(get).toHaveBeenCalledWith(`${DCAPI_ENDPOINT}/mcp/server-card`, {
      signal,
    });
    expect(result).toEqual(card);
    expect(JSON.parse(JSON.stringify(result))).toEqual(card);
  });

  it("does not request a server card for an already canceled invocation", async () => {
    const tools = installModelContext();
    const get = jest.spyOn(axios, "get");
    render(<SiteWebMcpTools />);
    const controller = new AbortController();
    controller.abort();

    await expect(
      tools
        .get("describe_remote_mcp")!
        .execute({}, { signal: controller.signal }),
    ).rejects.toMatchObject({ name: "AbortError" });
    expect(get).not.toHaveBeenCalled();
  });

  it.each([404, 503])(
    "reports server-card HTTP %s failures with the requested URL",
    async (status) => {
      const tools = installModelContext();
      const error = new AxiosError(`Request failed with status code ${status}`);
      error.response = { status } as NonNullable<AxiosError["response"]>;
      jest.spyOn(axios, "get").mockRejectedValue(error);
      render(<SiteWebMcpTools />);

      await expect(execute(tools.get("describe_remote_mcp"))).rejects.toThrow(
        `Remote MCP server card request failed with status ${status}: ${DCAPI_ENDPOINT}/mcp/server-card`,
      );
    },
  );

  it("reports network failures without returning Axios transport details", async () => {
    const tools = installModelContext();
    jest.spyOn(axios, "get").mockRejectedValue(new AxiosError("Network Error"));
    render(<SiteWebMcpTools />);

    await expect(execute(tools.get("describe_remote_mcp"))).rejects.toThrow(
      `Unable to retrieve the remote MCP server card: ${DCAPI_ENDPOINT}/mcp/server-card`,
    );
  });

  it("preserves cancellation errors from an in-flight server-card request", async () => {
    const tools = installModelContext();
    const error = new CanceledError();
    jest.spyOn(axios, "get").mockRejectedValue(error);
    render(<SiteWebMcpTools />);

    await expect(execute(tools.get("describe_remote_mcp"))).rejects.toBe(error);
  });

  it("uses the site router to show a requested search", async () => {
    const tools = installModelContext();
    mockRouter.setCurrentUrl("/about");
    render(<SiteWebMcpTools />);

    await waitFor(() => expect(tools.has("search_works")).toBe(true));
    let result: unknown;
    await act(async () => {
      result = await execute(tools.get("search_works"), {
        query: "Berkeley Folk Music Festival",
      });
    });

    expect(mockRouter.asPath).toBe("/search?q=Berkeley+Folk+Music+Festival");
    expect(result!).toMatchObject({
      query: "Berkeley Folk Music Festival",
      status: "Search results are now visible.",
    });
  });

  it("returns concise structured data from the current search page", async () => {
    const tools = installModelContext();
    render(
      <SearchPageWebMcpTools
        filters={{ subject: ["Folk music"] }}
        query="music"
        results={{
          data: mockSearchResponse1 as ApiSearchResponse,
          error: "",
          loading: false,
        }}
      />,
    );

    await waitFor(() => expect(tools.has("get_search_results")).toBe(true));
    const result = await execute(tools.get("get_search_results"));

    expect(result).toMatchObject({
      query: "music",
      filters: { subject: ["Folk music"] },
      status: "ready",
      totalResults: 20,
    });
    expect((result as { results: unknown[] }).results[0]).toMatchObject({
      id: "25014240-8cda-4bd1-8203-380bd195de38",
      title: "J.E. Mainer's Mountaineers",
      type: "Image",
    });
  });

  it("registers authorized work tools against the live WorkProvider state", async () => {
    const tools = installModelContext();
    mockRouter.setCurrentUrl(`/items/${sampleWork1.id}`);
    render(
      <WorkProvider initialState={{ manifest: undefined, work: sampleWork1 }}>
        <WorkPageWebMcpTools enabled />
      </WorkProvider>,
    );

    await waitFor(() => expect(tools.has("get_current_work")).toBe(true));
    const result = await execute(tools.get("get_current_work"));

    expect(result).toMatchObject({
      id: sampleWork1.id,
      title: sampleWork1.title,
      collection: {
        id: sampleWork1.collection?.id,
        title: sampleWork1.collection?.title,
      },
      type: "Image",
    });
  });

  it.each([
    {
      items: [{}],
      matchCount: 1,
      status: "The viewer Search panel is open with 1 matching annotation.",
    },
    {
      items: [],
      matchCount: 0,
      status:
        "The viewer Search panel is open; no transcript, caption, or OCR matches were found in this work.",
    },
  ])(
    "reports $matchCount content-search matches and only updates Clover",
    async ({ items, matchCount, status }) => {
      const tools = installModelContext();
      const fetchMock = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ items }),
      } as Response);
      Object.defineProperty(global, "fetch", {
        configurable: true,
        value: fetchMock,
      });
      const manifest = {
        id: sampleWork1.iiif_manifest,
        type: "Manifest",
        service: [
          {
            id: "https://api.example.test/works/current/search?as=iiif",
            type: "SearchService2",
          },
        ],
      } as unknown as Manifest;
      mockRouter.setCurrentUrl(`/items/${sampleWork1.id}?q=global-search`);
      render(
        <WorkProvider initialState={{ manifest, work: sampleWork1 }}>
          <WorkPageWebMcpTools enabled />
        </WorkProvider>,
      );

      await waitFor(() => expect(tools.has("search_within_work")).toBe(true));
      let result: unknown;
      await act(async () => {
        result = await execute(tools.get("search_within_work"), {
          query: "excuse",
        });
      });

      const searchUrl = new URL(String(fetchMock.mock.calls[0][0]));
      expect(searchUrl.searchParams.get("q")).toBe("excuse");
      expect(fetchMock.mock.calls[0][1]).toMatchObject({
        credentials: "include",
      });
      expect(mockRouter.query.q).toBeUndefined();
      expect(mockRouter.query["content-search"]).toBe("excuse");
      expect(result!).toMatchObject({
        query: "excuse",
        matchCount,
        searchAvailable: true,
        status,
      });
    },
  );
});
