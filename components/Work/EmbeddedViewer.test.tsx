// write tests
import { render, screen } from "@testing-library/react";

import EmbeddedViewer from "@/components/Work/EmbeddedViewer";
import { WorkProvider } from "@/context/work-context";
import WorkRestrictedDisplay from "@/components/Work/RestrictedDisplay";
import WorkViewerWrapper from "@/components/Clover/ViewerWrapper";
import { work1 } from "@/mocks/work-page/work1";

jest.mock("@/context/work-context", () => ({
  WorkProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock("@/components/Work/RestrictedDisplay", () => () => (
  <div>WorkRestrictedDisplay</div>
));

jest.mock("@/components/Clover/ViewerWrapper", () => () => (
  <div>WorkViewerWrapper</div>
));

describe("EmbeddedViewer", () => {
  const mockWork = {
    ...work1,
  };

  it("renders WorkViewerWrapper when userCanRead is true", () => {
    render(
      <EmbeddedViewer work={mockWork} userCanRead={true} searchParams={{}} />,
    );

    expect(screen.getByText("WorkViewerWrapper")).toBeInTheDocument();
  });

  it("renders WorkRestrictedDisplay when userCanRead is false", () => {
    render(
      <EmbeddedViewer work={mockWork} userCanRead={false} searchParams={{}} />,
    );

    expect(screen.getByText("WorkRestrictedDisplay")).toBeInTheDocument();
  });
});
