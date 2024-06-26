import { render, screen } from "@/test-utils";
import SharedDialogComponent from "@/components/Shared/Dialog";

const props = {
  handleCloseClick: jest.fn(),
  isOpen: true,
  title: "Ima title",
};

describe("SharedDialog component", () => {
  it("renders title and content", () => {
    render(
      <SharedDialogComponent {...props}>
        <p>I am dialog content</p>
      </SharedDialogComponent>,
    );
    expect(screen.getByText("Ima title"));
    expect(screen.getByText("I am dialog content"));
  });
});
