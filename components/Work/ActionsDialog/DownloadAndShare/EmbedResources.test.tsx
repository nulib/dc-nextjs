import { render, screen } from "@testing-library/react";

import EmbedResources from "./EmbedResources";
import React from "react";
import { manifest } from "@/mocks/work-page/download-and-share";
import { work1 } from "@/mocks/work-page/work1";

const alternateFormatItems = manifest.rendering ? [...manifest.rendering] : [];

describe("EmbedResources", () => {
  it("should render the Download and Embed section with standard images ", () => {
    render(
      <EmbedResources
        manifest={manifest}
        alternateFormatItems={[]}
        showEmbedWarning={false}
        work={work1}
      />
    );
    expect(
      screen.getByRole("heading", { name: "Download and Embed" })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Images" })).toBeInTheDocument();

    const downloadEmbedItems = screen.getByTestId("download-embed-items");

    expect(downloadEmbedItems).toHaveTextContent(
      "BFMF_B06_F12_006_022n_am.tif"
    );
    expect(downloadEmbedItems).toHaveTextContent("Download JPG");
    expect(downloadEmbedItems).toHaveTextContent("Embed HTML");
    expect(downloadEmbedItems).toHaveTextContent("Copy IIIF");

    // Alternate Formats should not be rendered
    expect(
      screen.queryByRole("heading", { name: "Alternate Formats" })
    ).toBeNull();
  });

  it("should render the Download and Embed section with alternate formats. It should also include 'pdf' in the link if it's a PDF mime/type", () => {
    render(
      <EmbedResources
        manifest={manifest}
        alternateFormatItems={alternateFormatItems}
        showEmbedWarning={false}
        work={work1}
      />
    );

    expect(
      screen.getByRole("heading", { name: "Alternate Formats" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Test PDF (pdf)" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Transcript XYZ" })).toBeVisible();
  });
});
