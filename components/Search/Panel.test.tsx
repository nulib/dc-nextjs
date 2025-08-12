import { render, screen } from "@testing-library/react";

import SearchPanel from "@/components/Search/Panel";
import { useSearchState } from "@/context/search-context";

const mockSearchDispatch = jest.fn();

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
