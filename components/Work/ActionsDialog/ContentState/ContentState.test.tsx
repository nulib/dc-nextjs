import { render, screen } from "@testing-library/react";
import WorkDialogContentState from "./ContentState";
import { WorkProvider } from "@/context/work-context";
import { samplePublicWork } from "@/mocks/sample-public-work";

const canvasId = "https://example.org/canvas/1";

const manifestWith = (type: string) =>
  ({
    id: "https://example.org/manifest",
    type: "Manifest",
    label: { none: ["Fixture"] },
    items: [
      {
        id: canvasId,
        type: "Canvas",
        items: [{ items: [{ body: { id: "https://example.org/b", type } }] }],
      },
    ],
  }) as any;

// Clover 4's onContentStateChange output: it always writes a FragmentSelector.
const contentStateWith = (value: string) =>
  ({
    encoded: "",
    json: {
      type: "Annotation",
      motivation: ["contentState"],
      target: {
        type: "SpecificResource",
        source: { id: canvasId, type: "Canvas" },
        selector: { type: "FragmentSelector", value },
      },
    },
  }) as any;

const renderDialog = (type: string, value: string) =>
  render(
    <WorkProvider
      initialState={{
        manifest: manifestWith(type),
        work: samplePublicWork,
        contentState: contentStateWith(value),
      }}
    >
      <WorkDialogContentState />
    </WorkProvider>,
  );

describe("WorkDialogContentState", () => {
  it("shows a video's current time from a Clover 4 time fragment", () => {
    renderDialog("Video", "t=72.4");
    expect(
      screen.getByText(/Start video at current time/i).querySelector("em"),
    ).toHaveTextContent("1:12");
  });

  it("offers the current view for an image's region fragment", () => {
    renderDialog("Image", "xywh=0,0,100,100");
    expect(
      screen.getByText(/Zoom to current view of the image/i),
    ).toBeInTheDocument();
  });

  it("opens for an image whose content state targets the Canvas itself", () => {
    // With no time or region to keep, Clover 4 targets the bare Canvas.
    render(
      <WorkProvider
        initialState={{
          manifest: manifestWith("Image"),
          work: samplePublicWork,
          contentState: {
            encoded: "",
            json: { target: { id: canvasId, type: "Canvas" } },
          } as any,
        }}
      >
        <WorkDialogContentState />
      </WorkProvider>,
    );
    expect(screen.getByText(/Jump to current image/i)).toHaveTextContent(
      "(1 of 1)",
    );
    expect(screen.queryByText(/Zoom to current view/i)).not.toBeInTheDocument();
  });

  it("leaves out the time option when a recording's fragment has no time", () => {
    renderDialog("Sound", "xywh=0,0,100,100");
    expect(screen.queryByText(/at current time/i)).not.toBeInTheDocument();
  });
});
