import { manifest, work } from "@/mocks/shared-link/work";
import { render, screen } from "@/test-utils";

import SharedLink from "./SharedLink";

jest.mock("../Clover/SliderWrapper.tsx");

describe("SharedLink component", () => {
  it("renders error announcment when no work or manifest passed in", async () => {
    render(<SharedLink manifest={null} work={work} />);
    expect(
      await screen.findByTestId("shared-link-wrapper"),
    ).toBeInTheDocument();
    expect(await screen.findByTestId("error-announcement")).toBeInTheDocument();
  });

  it("renders regular shared links announcement when both a work and manifest are passed in", async () => {
    render(<SharedLink manifest={manifest} work={work} />);
    expect(screen.getByTestId("announcement"));
  });

  it("renders viewer wrapper and related collections slider", async () => {
    render(<SharedLink manifest={manifest} work={work} />);
    expect(screen.getByTestId("work-viewer-wrapper"));
    expect(screen.getByTestId("related-items"));
  });
});
