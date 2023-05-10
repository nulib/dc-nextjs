import {
  mockPrivateUnpublishedWork,
  mockPrivateUnpublishedWorkManifest,
} from "@/mocks/private-unpublished-work";
import { render, screen } from "@testing-library/react";

import DownloadAndShare from "./DownloadAndShare";
import { WorkProvider } from "@/context/work-context";
import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";

mockRouter.setCurrentUrl("/shared/5e6e61f3-0402-454a-9bea-3fed834ac60c");

const embedWarningText =
  "Embed is not available for works restricted to the Northwestern University community";

describe("DownloadAndShare", () => {
  it("renders", () => {
    render(
      <WorkProvider
        initialState={{
          manifest: mockPrivateUnpublishedWorkManifest,
          work: mockPrivateUnpublishedWork,
        }}
      >
        <DownloadAndShare />
      </WorkProvider>
    );
    expect(screen.getByText("Adam Test Work")).toBeInTheDocument();
    expect(screen.getByTestId("download-embed-items")).toBeInTheDocument();
  });

  it("renders warning on a private unpublished work for embed", () => {
    render(
      <WorkProvider
        initialState={{
          manifest: mockPrivateUnpublishedWorkManifest,
          work: mockPrivateUnpublishedWork,
        }}
      >
        <DownloadAndShare />
      </WorkProvider>
    );
    expect(screen.getByText("Embed Viewer")).toBeInTheDocument();
    expect(screen.getByText(embedWarningText)).toBeInTheDocument();
    expect(screen.getByText("Download and Embed Images")).toBeInTheDocument();
  });

  it("renders download but not embed HTML for a private, unpublished work", async () => {
    const user = userEvent.setup();

    render(
      <WorkProvider
        initialState={{
          manifest: mockPrivateUnpublishedWorkManifest,
          work: mockPrivateUnpublishedWork,
        }}
      >
        <DownloadAndShare />
      </WorkProvider>
    );

    expect(screen.getByText("Midnight")).toBeInTheDocument();
    expect(screen.getAllByText("Download JPG")).toHaveLength(2);
    expect(screen.getAllByText("Embed HTML")).toHaveLength(2);

    expect(screen.getAllByText(embedWarningText)).toHaveLength(1);

    await user.click(screen.getAllByText("Embed HTML")[0]);
    expect(screen.getAllByText(embedWarningText)).toHaveLength(2);

    await user.click(screen.getAllByText("Embed HTML")[1]);
    expect(screen.getAllByText(embedWarningText)).toHaveLength(3);
  });
});
