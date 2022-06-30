import { render, screen, waitFor } from "@/test-utils";
import WorkViewerWrapper from "@/components/Work/ViewerWrapper";

// TODO: Why is this throwing an async warning?
xdescribe("WorkViewerWrapper", () => {
  it("renders a wrapping element for Clover", async () => {
    render(<WorkViewerWrapper manifestId="http:testing.com" />);
    await waitFor(() => {
      const el = screen.getByTestId("work-viewer-wrapper");
      expect(el).toBeInTheDocument();
    });
  });
});
