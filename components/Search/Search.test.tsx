import { render, screen } from "@/test-utils";
import Search from "./Search";
import userEvent from "@testing-library/user-event";

const mockIsSearchActive = jest.fn();

jest.mock("next/router", () => require("next-router-mock"));

describe("Search component", () => {
  it("renders the search ui component", () => {
    render(<Search isSearchActive={() => ({})} />);
    const wrapper = screen.getByTestId("search-ui-component");
    expect(wrapper).toBeInTheDocument();
  });

  it("does not render the SearchJumpTo component on Search page", async () => {
    const user = userEvent.setup();
    render(<Search isSearchActive={mockIsSearchActive} />);
    const form = screen.getByTestId("search-ui-component");

    await user.type(screen.getByRole("search"), "foo");

    expect(form).toHaveFormValues({ search: "foo" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("conditionally renders the SearchJumpTo component", async () => {
    const user = userEvent.setup();
    render(
      <div data-testid="page">
        <span>Outside search form</span>
        <Search isSearchActive={mockIsSearchActive} jumpTo="collection" />
      </div>
    );
    const form = screen.getByTestId("search-ui-component");

    await user.type(screen.getByRole("search"), "foo");

    // JumpTo should be visible
    expect(form).toHaveFormValues({ search: "foo" });
    expect(screen.getByRole("listbox"));

    // Click outside Search form, it should close JumpTo
    await user.click(screen.getByText("Outside search form"));

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    // Type back in main search input, it should re-open JumpTo
    await user.type(screen.getByRole("search"), "baz");

    expect(form).toHaveFormValues({
      search: "foobaz",
    });
    expect(screen.getByRole("listbox"));
  });
});
