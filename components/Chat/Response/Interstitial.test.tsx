import { render, screen } from "@testing-library/react";

import ResponseInterstitial from "@/components/Chat/Response/Interstitial";
import { SearchProvider } from "@/context/search-context";
import { ToolStartMessage } from "@/types/components/chat";

const mockSearchDispatch = jest.fn();
jest.mock("@/context/search-context", () => {
  const actual = jest.requireActual("@/context/search-context");

  return {
    __esModule: true,
    ...actual,
    useSearchState: () => ({
      searchDispatch: mockSearchDispatch,
      searchState: {
        panel: {
          open: false,
        },
      },
    }),
  };
});

const interstitialId = "1234";

describe("ResponseInterstitial", () => {
  it("renders the aggregate interstitial", async () => {
    const message: ToolStartMessage["message"] = {
      tool: "aggregate",
      input: {
        agg_field: "string",
        term_field: "string",
        term: "string",
      },
    };

    render(
      <SearchProvider>
        <ResponseInterstitial message={message} id={interstitialId} />
      </SearchProvider>,
    );

    const interstitial = screen.getByTestId("response-interstitial");
    expect(interstitial).toBeInTheDocument();

    expect(interstitial).toHaveTextContent("Aggregating");
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("renders the discover_fields interstitial", async () => {
    const message: ToolStartMessage["message"] = {
      tool: "discover_fields",
      input: {},
    };

    render(
      <SearchProvider>
        <ResponseInterstitial message={message} id={interstitialId} />
      </SearchProvider>,
    );

    const interstitial = screen.getByTestId("response-interstitial");
    expect(interstitial).toBeInTheDocument();

    expect(interstitial).toHaveTextContent("Discovering");
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("renders the search interstitial", async () => {
    const message: ToolStartMessage["message"] = {
      tool: "search",
      input: {
        query: "Joan Baez",
      },
    };

    render(
      <SearchProvider>
        <ResponseInterstitial message={message} id={interstitialId} />
      </SearchProvider>,
    );

    const interstitial = screen.getByTestId("response-interstitial");
    expect(interstitial).toBeInTheDocument();

    expect(interstitial).toHaveTextContent("Results for “Joan Baez”");
    expect(interstitial.querySelector("strong")).toHaveTextContent("Joan Baez");

    const action = screen.getByRole("button");
    expect(action).toHaveTextContent("View results");

    // mock the click event
    window.scrollTo = jest.fn();
    action.click();

    // mock window.scrollTo()
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "instant",
    });

    // mock the dispatch function to open panel
    expect(mockSearchDispatch).toHaveBeenCalledWith({
      type: "updatePanel",
      panel: {
        open: true,
        query: "Joan Baez",
        interstitial: interstitialId,
      },
    });
  });
});
