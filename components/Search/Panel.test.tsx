import { render, screen, waitFor } from "@testing-library/react";

import SearchPanel from "@/components/Search/Panel";
import { apiPostRequest } from "@/lib/dc-api";
import mockRouter from "next-router-mock";
import { useSearchState } from "@/context/search-context";

const mockSearchDispatch = jest.fn();

jest.mock("@/lib/dc-api", () => ({
  ...jest.requireActual("@/lib/dc-api"),
  apiPostRequest: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("@/context/search-context", () => ({
  __esModule: true,
  useSearchState: jest.fn(() => {
    return {
      searchDispatch: mockSearchDispatch,
      searchState: {
        panel: {
          open: false,
        },
      },
    };
  }),
}));

jest.mock("@/context/layout-context", () => ({
  __esModule: true,
  useLayoutState: jest.fn(() => {
    return {
      layoutDispatch: jest.fn(),
      layoutState: {
        searchFixed: false,
      },
    };
  }),
}));

describe("SearchPanel", () => {
  it("renders the search panel in closed state", async () => {
    render(<SearchPanel />);

    const searchPanel = screen.getByTestId("search-panel");

    expect(searchPanel).toBeInTheDocument();
    expect(searchPanel.nodeName).toBe("ASIDE");
    expect(searchPanel.dataset["open"]).toBe("false");
  });
});

describe("SearchPanel", () => {
  it("renders the search panel in open state", async () => {
    // @ts-ignore
    useSearchState.mockReturnValue({
      searchDispatch: mockSearchDispatch,
      searchState: {
        panel: {
          open: true,
        },
      },
    });

    render(<SearchPanel />);

    const searchPanel = screen.getByTestId("search-panel");

    expect(searchPanel).toBeInTheDocument();
    expect(searchPanel.nodeName).toBe("ASIDE");
    expect(searchPanel.dataset["open"]).toBe("true");
  });
});

describe("SearchPanel", () => {
  const originalPipeline = process.env.NEXT_PUBLIC_OPENSEARCH_PIPELINE;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_OPENSEARCH_PIPELINE = "dc-v2-work-pipeline";
    (apiPostRequest as jest.Mock).mockClear();
  });

  afterAll(() => {
    process.env.NEXT_PUBLIC_OPENSEARCH_PIPELINE = originalPipeline;
  });

  it("requests hybrid results with the search pipeline", async () => {
    mockRouter.setCurrentUrl("/search?q=muddy+waters");

    render(<SearchPanel />);

    await waitFor(() => expect(apiPostRequest).toHaveBeenCalled());

    const { body, url } = (apiPostRequest as jest.Mock).mock.calls[0][0];
    expect(body.query.hybrid).toBeDefined();
    expect(new URL(url).searchParams.get("search_pipeline")).toBe(
      "dc-v2-work-pipeline",
    );
  });
});
