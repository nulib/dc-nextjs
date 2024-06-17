import { render, screen } from "@testing-library/react";

import EmbedViewer from "./EmbedViewer";
import React from "react";
import { embedWarningMessage } from "@/components/Work/ActionsDialog/DownloadAndShare/DownloadAndShare";
import { sampleWork1 } from "@/mocks/sample-work1";
import userEvent from "@testing-library/user-event";

const defaultProps = {
  manifestId:
    "https://test.edu/api/v2/works/c16029ff-d027-496a-98b7-6f259395a8f7?as=iiif",
  showEmbedWarning: false,
  work: sampleWork1,
};

describe("EmbedViewer", () => {
  it("should show Embed Warning text and not show embedded HTML if configured to show the embedded warning message", () => {
    render(<EmbedViewer {...defaultProps} showEmbedWarning={true} />);
    expect(screen.getByText(embedWarningMessage)).toBeInTheDocument();
    expect(screen.queryByTestId("embed-html")).toBeNull();
  });

  it("shows select elements for info panel and title which toggle the display of embedded query params", async () => {
    render(<EmbedViewer {...defaultProps} />);

    const infoPanelSelect = screen.getByDisplayValue("Show Info Panel: Closed");
    const showTitleSelect = screen.getByDisplayValue("Show Title");

    expect(showTitleSelect).toBeInTheDocument();
    expect(infoPanelSelect).toBeInTheDocument();

    expect(screen.getByTestId("embed-html")).toHaveTextContent(
      `<iframe src="http://localhost/embedded-viewer/https%3A%2F%2Ftest.edu%2Fapi%2Fv2%2Fworks%2Fc16029ff-d027-496a-98b7-6f259395a8f7%3Fas%3Diiif" title="Hawking dental products in outdoor market, Cuernavaca, Mexico" width="100%" height="800"></iframe>`,
    );

    // Hide the title
    await userEvent.selectOptions(showTitleSelect, "false");
    const optionFalse = screen.getByRole("option", {
      name: "Hide Title",
    }) as HTMLOptionElement;
    expect(optionFalse.selected).toBe(true);
    expect(screen.getByTestId("embed-html")).toHaveTextContent(
      `<iframe src="http://localhost/embedded-viewer/https%3A%2F%2Ftest.edu%2Fapi%2Fv2%2Fworks%2Fc16029ff-d027-496a-98b7-6f259395a8f7%3Fas%3Diiif%26showTitle%3Dfalse" title="Hawking dental products in outdoor market, Cuernavaca, Mexico" width="100%" height="800"></iframe>`,
    );

    // Show info panel open initially
    await userEvent.selectOptions(infoPanelSelect, "show initially open");
    const optionOpen = screen.getByRole("option", {
      name: "Show Info Panel: Open",
    }) as HTMLOptionElement;
    expect(optionOpen.selected).toBe(true);
    expect(screen.getByTestId("embed-html")).toHaveTextContent(
      `<iframe src="http://localhost/embedded-viewer/https%3A%2F%2Ftest.edu%2Fapi%2Fv2%2Fworks%2Fc16029ff-d027-496a-98b7-6f259395a8f7%3Fas%3Diiif%26informationPanelOpen%3Dtrue%26showTitle%3Dfalse" title="Hawking dental products in outdoor market, Cuernavaca, Mexico" width="100%" height="800"></iframe>`,
    );
  });

  it("shows Copy embed code button", () => {
    render(<EmbedViewer {...defaultProps} />);
    expect(screen.getByText("Copy")).toBeInTheDocument();
  });

  it("shows and hides the preview embed viewer visual", async () => {
    render(<EmbedViewer {...defaultProps} />);

    const infoPanelSelect = screen.getByDisplayValue("Show Info Panel: Closed");
    const showTitleSelect = screen.getByDisplayValue("Show Title");

    expect(screen.getByTestId("preview-embed-viewer")).toBeInTheDocument();
    expect(screen.getByTestId("preview-title")).toBeInTheDocument();
    expect(screen.queryByTestId("preview-info-panel")).toBeNull();

    // Toggle the title display
    await userEvent.selectOptions(showTitleSelect, "false");
    expect(screen.getByTestId("preview-title")).toHaveTextContent("");
    await userEvent.selectOptions(showTitleSelect, "true");
    expect(screen.getByTestId("preview-title")).toHaveTextContent(
      "Hawking dental products in outdoor market, Cuernavaca, Mexico",
    );

    // Toggle info panel display
    await userEvent.selectOptions(infoPanelSelect, "show initially open");
    expect(screen.getByTestId("preview-info-panel")).toBeInTheDocument();
    await userEvent.selectOptions(infoPanelSelect, "show initially closed");
    expect(screen.queryByTestId("preview-info-panel")).toBeNull();
  });
});
