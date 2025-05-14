import { render, screen, within } from "@/test-utils";
import HeaderSuper from "@/components/Header/Super";

describe("PlaceholderBlock component", () => {
  it("renders super navigation items", () => {
    render(<HeaderSuper />);
    const navEl = screen.getByRole("navigation");
    const navItems = within(navEl).getAllByRole("link");

    expect(navItems[0]).toHaveTextContent("Libraries");
    expect(navItems[1]).toHaveTextContent("About");
    expect(navItems[2]).toHaveTextContent("Contact");
    const signInButton = within(navEl).getByRole("button", {
      name: /Sign In/i,
    });
    expect(signInButton).toBeInTheDocument();
  });
});
