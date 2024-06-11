import { render, screen } from "@/test-utils";

import WorkRestrictedDisplay from "@/components/Work/RestrictedDisplay";

describe("WorkRestrictedDisplay component", () => {
  it("renders the component image and message", () => {
    render(<WorkRestrictedDisplay thumbnail="foobar.jpg" />);
    expect(screen.getByTestId("restricted-display"));
    expect(screen.getByTestId("bg-image"));
    expect(screen.getByTestId("announcement"));
  });

  it("displays the work id in the email link subject and body", () => {
    const workId = "12345";
    const workTitle = "My Painting";

    render(
      <WorkRestrictedDisplay
        thumbnail="foobar.jpg"
        workId={workId}
        workTitle={workTitle}
      />,
    );
    const emailLink = screen.getByText("repository@northwestern.edu");
    expect(emailLink).toHaveAttribute("href", expect.stringContaining("12345"));
    expect(emailLink).toHaveAttribute(
      "href",
      expect.stringContaining(
        encodeURIComponent(
          `Hello, I have a question about "${workTitle}".\n\nhttps://dc.library.northwestern.edu/items/${workId}\n\nQUESTION: `,
        ),
      ),
    );
  });
});
