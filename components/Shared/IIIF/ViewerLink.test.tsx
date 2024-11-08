import { render, screen } from "@testing-library/react";

import React from "react";
import ViewerLink from "./ViewerLink";

describe("ViewerLink", () => {
  const uri =
    "https://iiif.io/api/cookbook/recipe/0001-mvm-image/manifest.json";
  const viewer = {
    label: "IIIF Viewer",
    href: "https://example.org/iiif-viewer",
  };

  it("renders an `<a>` element to IIIF Viewer", () => {
    render(<ViewerLink viewer={viewer} uri={uri} />);
    expect(screen.getByText(viewer.label)).toBeInTheDocument();
    expect(screen.getByText(viewer.label).closest("a")).toHaveAttribute(
      "href",
      `${viewer.href}?iiif-content=${encodeURIComponent(uri)}`,
    );
  });

  it("renders an `<a>` element to IIIF Viewer with custom iiif-content param", () => {
    render(
      <ViewerLink
        viewer={{ ...viewer, iiifContentParam: "manifest" }}
        uri={uri}
      />,
    );
    expect(screen.getByText(viewer.label)).toBeInTheDocument();
    expect(screen.getByText(viewer.label).closest("a")).toHaveAttribute(
      "href",
      `${viewer.href}?manifest=${encodeURIComponent(uri)}`,
    );
  });
});
