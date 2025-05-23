import {
  mockPrivateUnpublishedWork,
  mockPrivateUnpublishedWorkManifest,
} from "@/mocks/private-unpublished-work";
import { render, screen, waitFor } from "@testing-library/react";
import {
  samplePublicWork,
  samplePublicWorkManifest,
} from "@/mocks/sample-public-work";

import DownloadAndShare from "./DownloadAndShare";
import { Work } from "@nulib/dcapi-types";
import { WorkProvider } from "@/context/work-context";
import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";

mockRouter.setCurrentUrl("/shared/5e6e61f3-0402-454a-9bea-3fed834ac60c");

const embedWarningText =
  "Embed is not available for works restricted to the Northwestern University community";

describe("DownloadAndShare", () => {
  const user = userEvent.setup();
  it("renders embed resources after opening accordion", async () => {
    render(
      <WorkProvider
        initialState={{
          manifest: mockPrivateUnpublishedWorkManifest,
          work: mockPrivateUnpublishedWork,
        }}
      >
        <DownloadAndShare />
      </WorkProvider>,
    );

    await expect(screen.getByText("Adam Test Work")).toBeInTheDocument();

    // get button element with text "Download and Embed"
    const button = screen.getByRole("button", { name: /download and embed/i });
    await user.click(button);

    // check if the embed resources are visible
    const embedResources = screen.getByTestId("download-embed-items");
    expect(embedResources).toBeInTheDocument();
  });

  it("renders warning on a private unpublished work for embed", async () => {
    render(
      <WorkProvider
        initialState={{
          manifest: mockPrivateUnpublishedWorkManifest,
          work: mockPrivateUnpublishedWork,
        }}
      >
        <DownloadAndShare />
      </WorkProvider>,
    );

    // get button element with text "Download and Embed"
    const embedButton = await screen.getByRole("button", {
      name: /embed viewer/i,
    });
    await user.click(embedButton);
    await expect(screen.getByText(embedWarningText)).toBeInTheDocument();
  });

  it("renders download but not embed HTML for a private, unpublished work", async () => {
    render(
      <WorkProvider
        initialState={{
          manifest: mockPrivateUnpublishedWorkManifest,
          work: mockPrivateUnpublishedWork,
        }}
      >
        <DownloadAndShare />
      </WorkProvider>,
    );

    const downloadButton = await screen.getByRole("button", {
      name: /download and embed/i,
    });
    await user.click(downloadButton);

    await expect(screen.getByText("Midnight")).toBeInTheDocument();
    await expect(screen.getAllByText("Download JPG")).toHaveLength(2);
    await expect(screen.getAllByText("Embed HTML")).toHaveLength(2);
  });

  it("renders a iiif manifest section without a warning message", async () => {
    mockRouter.setCurrentUrl("/items/8163f95b-cd40-4210-a7ff-e25b7b39c8d6");

    render(
      <WorkProvider
        initialState={{
          // @ts-ignore
          manifest: samplePublicWorkManifest,
          work: samplePublicWork,
        }}
      >
        <DownloadAndShare />
      </WorkProvider>,
    );

    const iiifButton = await screen.getByRole("button", {
      name: /iiif manifest/i,
    });
    await user.click(iiifButton);

    const textbox = await screen.getByRole("textbox");
    await expect(textbox).toHaveValue(
      "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/8163f95b-cd40-4210-a7ff-e25b7b39c8d6?as=iiif",
    );
    await expect(screen.getByText("View as IIIF")).toBeInTheDocument();

    // get href with text "What is IIIF?"
    const iiifHelperLink = await screen.getByRole("link", {
      name: /what is iiif/i,
    });
    await expect(iiifHelperLink).toHaveAttribute(
      "href",
      "https://iiif.io/get-started/why-iiif/",
    );
  });

  it("renders a warning message for an Institution and Private Work", async () => {
    const viewerWarningText =
      "Opening in external applications using IIIF Viewers such as Clover, Mirador, and Theseus is not supported for works that require authentication.";
    mockRouter.setCurrentUrl("/items/8163f95b-cd40-4210-a7ff-e25b7b39c8d6");

    // Institution Work
    let work = {
      ...samplePublicWork,
      visibility: "Institution" as Work["visibility"],
    };

    const { rerender } = render(
      <WorkProvider
        initialState={{
          // @ts-ignore
          manifest: samplePublicWorkManifest,
          work,
        }}
      >
        <DownloadAndShare />
      </WorkProvider>,
    );

    const iiifButton = await screen.getByRole("button", {
      name: /iiif manifest/i,
    });
    await user.click(iiifButton);

    // expect the warning message to be in the document
    await expect(screen.getByText(viewerWarningText)).toBeInTheDocument();

    // Private Work
    work = {
      ...samplePublicWork,
      visibility: "Private" as Work["visibility"],
    };

    rerender(
      <WorkProvider
        initialState={{
          // @ts-ignore
          manifest: samplePublicWorkManifest,
          work,
        }}
      >
        <DownloadAndShare />
      </WorkProvider>,
    );

    const iiifButton2 = await screen.getByRole("button", {
      name: /iiif manifest/i,
    });
    await user.click(iiifButton2);

    await expect(screen.queryByText(viewerWarningText)).not.toBeInTheDocument();
  });
});
