import { act, fireEvent, render, screen, waitFor } from "@/test-utils";
import React, { useEffect, useState } from "react";

import WorkViewerWrapper from "@/components/Clover/ViewerWrapper";

const ABOUT = "manifest-about";
const SEARCH = "manifest-content-search";

/**
 * Mimics Clover's InformationPanel: the Search tab is committed to the DOM
 * already selected, then a mount effect resets the active tab to About
 * (Clover does this while annotations have not loaded yet).
 */
function mockFakeCloverViewer() {
  const [active, setActive] = useState(SEARCH);
  useEffect(() => {
    setActive(ABOUT);
  }, []);

  return (
    <div role="tablist">
      {[ABOUT, SEARCH].map((value) => (
        <button
          key={value}
          role="tab"
          id={`trigger-${value}`}
          aria-controls={`content-${value}`}
          aria-selected={active === value ? "true" : "false"}
          onClick={() => setActive(value)}
        >
          {value === ABOUT ? "About" : "Search"}
        </button>
      ))}
    </div>
  );
}

// next/dynamic never resolves under jsdom, so render the fake viewer directly.
jest.mock("next/dynamic", () => {
  const ReactActual = jest.requireActual("react");
  return {
    __esModule: true,
    default: () =>
      function DynamicMock(props: Record<string, unknown>) {
        return ReactActual.createElement(mockFakeCloverViewer, props);
      },
  };
});

const searchTab = () => screen.getByRole("tab", { name: "Search" });
const aboutTab = () => screen.getByRole("tab", { name: "About" });

describe("WorkViewerWrapper content search tab", () => {
  it("keeps the Search tab selected after Clover resets it to About", async () => {
    render(
      <WorkViewerWrapper
        iiifContent="http://testing.com"
        searchQuery="excuse"
      />,
    );

    await waitFor(() => {
      expect(searchTab()).toHaveAttribute("aria-selected", "true");
    });
    expect(aboutTab()).toHaveAttribute("aria-selected", "false");
  });

  it("stops enforcing the Search tab once the user interacts", async () => {
    render(
      <WorkViewerWrapper
        iiifContent="http://testing.com"
        searchQuery="excuse"
      />,
    );
    await waitFor(() => {
      expect(searchTab()).toHaveAttribute("aria-selected", "true");
    });

    await act(async () => {
      fireEvent.pointerDown(aboutTab());
      fireEvent.click(aboutTab());
    });

    await waitFor(() => {
      expect(aboutTab()).toHaveAttribute("aria-selected", "true");
    });
    expect(searchTab()).toHaveAttribute("aria-selected", "false");
  });

  it("leaves the default tab alone without a search query", async () => {
    render(<WorkViewerWrapper iiifContent="http://testing.com" />);

    await waitFor(() => {
      expect(aboutTab()).toHaveAttribute("aria-selected", "true");
    });
    expect(searchTab()).toHaveAttribute("aria-selected", "false");
  });
});
