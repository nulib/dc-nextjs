import { act, fireEvent, render, screen, waitFor } from "@/test-utils";
import React, { useEffect, useState } from "react";

import type { Manifest } from "@iiif/presentation-3";
import type { ViewerConfigOptions } from "@samvera/clover-iiif";
import { WorkProvider } from "@/context/work-context";
import WorkViewerWrapper from "@/components/Clover/ViewerWrapper";

const ABOUT = "manifest-about";
const SEARCH = "manifest-content-search";

/**
 * Mimics Clover's InformationPanel: the Search tab is committed to the DOM
 * already selected, then a mount effect resets the active tab to About
 * (Clover does this while annotations have not loaded yet).
 */
function mockFakeCloverViewer({ options }: { options?: ViewerConfigOptions }) {
  const [active, setActive] = useState(
    options?.informationPanel?.defaultTab === SEARCH ? SEARCH : ABOUT,
  );
  const renderContentSearch =
    options?.informationPanel?.renderContentSearch !== false;
  const renderAbout = options?.informationPanel?.renderAbout;
  useEffect(() => {
    if (renderAbout) setActive(ABOUT);
  }, [renderAbout]);

  return (
    <div role="tablist">
      {[ABOUT, ...(renderContentSearch ? [SEARCH] : [])].map((value) => (
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
const manifestWithContentSearch = {
  id: "http://testing.com",
  type: "Manifest",
  label: { none: ["Test manifest"] },
  items: [],
  service: [
    {
      id: "http://testing.com/search",
      type: "SearchService2",
    },
  ],
} as unknown as Manifest;

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
    expect(
      screen.queryByRole("tab", { name: "Search" }),
    ).not.toBeInTheDocument();
  });

  it("offers content search only when the manifest advertises a service", async () => {
    render(
      <WorkProvider
        initialState={{ manifest: manifestWithContentSearch, work: undefined }}
      >
        <WorkViewerWrapper iiifContent="http://testing.com" />
      </WorkProvider>,
    );

    const button = screen.getByRole("button", {
      name: "Search within document",
    });
    expect(
      screen.queryByRole("tab", { name: "Search" }),
    ).not.toBeInTheDocument();

    fireEvent.click(button);

    await waitFor(() => {
      expect(searchTab()).toHaveAttribute("aria-selected", "true");
    });
    expect(button).not.toBeInTheDocument();
  });

  it("does not offer content search without a manifest service", () => {
    render(<WorkViewerWrapper iiifContent="http://testing.com" />);

    expect(
      screen.queryByRole("button", { name: "Search within document" }),
    ).not.toBeInTheDocument();
  });
});
