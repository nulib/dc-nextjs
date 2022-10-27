import { render, screen } from "@/test-utils";
import WorkRestrictedDisplay from "@/components/Work/RestrictedDisplay";

describe("WorkRestrictedDisplay component", () => {
  it("renders the component image and message", () => {
    render(<WorkRestrictedDisplay thumbnail="foobar.jpg" />);
    expect(screen.getByTestId("restricted-display"));
    expect(screen.getByTestId("bg-image"));
    expect(screen.getByTestId("announcement"));
  });
});
