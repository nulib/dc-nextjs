import { render, screen } from "@/test-utils";

import React from "react";
import { WorkProvider } from "@/context/work-context";
import WorkViewerWrapper from "@/components/Clover/ViewerWrapper";

const mockViewer = jest.fn((_props: Record<string, unknown>) => (
  <div data-testid="clover-viewer" />
));

// next/dynamic never resolves under jsdom, so render a recording stand-in.
jest.mock("next/dynamic", () => {
  const ReactActual = jest.requireActual("react");
  return {
    __esModule: true,
    default: () =>
      function DynamicMock(props: Record<string, unknown>) {
        return ReactActual.createElement(mockViewer, props);
      },
  };
});

const lastProps = () =>
  mockViewer.mock.calls[mockViewer.mock.calls.length - 1][0];

afterEach(() => mockViewer.mockClear());

describe("WorkViewerWrapper (Clover 4 props)", () => {
  it("hands a URL-driven content search to Clover and opens the panel", () => {
    render(
      <WorkViewerWrapper iiifContent="http://testing.com" searchQuery="jes" />,
    );

    expect(screen.getByTestId("clover-viewer")).toBeInTheDocument();
    expect(lastProps()).toMatchObject({
      iiifContent: "http://testing.com",
      searchQuery: "jes",
      defaultPanelOpen: true,
      header: false,
      panelLayout: "tabs",
      // About joins the panel during a content search, as in Clover 3.x.
      panelSections: [
        "about",
        "contents",
        "search",
        "transcript",
        "annotations",
      ],
      request: { credentials: "include" },
    });
  });

  it("keeps the panel closed and About out without a search query", () => {
    render(<WorkViewerWrapper iiifContent="http://testing.com" />);

    expect(lastProps()).toMatchObject({
      defaultPanelOpen: false,
      panelSections: ["contents", "search", "transcript", "annotations"],
    });
    expect(lastProps().searchQuery).toBeUndefined();
  });

  it("opens the panel for works whose canvases carry annotations", () => {
    render(
      <WorkProvider
        initialState={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          manifest: {
            id: "http://testing.com",
            type: "Manifest",
            items: [
              {
                id: "http://testing.com/canvas/1",
                type: "Canvas",
                annotations: [
                  {
                    id: "http://testing.com/annotations",
                    type: "AnnotationPage",
                  },
                ],
              },
            ],
          } as any,
          work: undefined,
        }}
      >
        <WorkViewerWrapper iiifContent="http://testing.com" />
      </WorkProvider>,
    );

    expect(lastProps()).toMatchObject({ defaultPanelOpen: true });
  });

  it("labels annotations and WebVTT transcripts as Chapters for audio/video works", () => {
    render(
      <WorkProvider
        initialState={{
          manifest: undefined,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          work: { work_type: "Video" } as any,
        }}
      >
        <WorkViewerWrapper iiifContent="http://testing.com" />
      </WorkProvider>,
    );

    expect(lastProps()).toMatchObject({
      panelLabels: { annotations: "Chapters", transcript: "Chapters" },
    });
  });

  it("lets callers override the defaults (embedded viewer)", () => {
    render(
      <WorkViewerWrapper
        iiifContent="http://testing.com"
        viewerOptions={{ header: true, panelSections: undefined }}
      />,
    );

    expect(lastProps()).toMatchObject({ header: true });
    expect(lastProps().panelSections).toBeUndefined();
  });

  it("wraps an initial canvas in a content state annotation", () => {
    render(
      <WorkViewerWrapper
        iiifContent="http://testing.com"
        initialCanvasId="http://testing.com/canvas/1"
        initialLabel="Label"
        initialSnippet="Snippet"
      />,
    );

    expect(lastProps().iiifContent).toMatchObject({
      type: "Annotation",
      motivation: ["contentState"],
      target: { source: { id: "http://testing.com/canvas/1" } },
      body: [{ type: "TextualBody", value: "Label: Snippet" }],
    });
  });
});
