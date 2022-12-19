import { render, screen } from "@/test-utils";
import SearchJumpTo from "@/components/Search/JumpTo";
import userEvent from "@testing-library/user-event";

const mockIsSearchActive = jest.fn();

jest.mock("next/router", () => require("next-router-mock"));

describe("SearchJumpTo component", () => {
  it("renders the component", () => {
    render(<SearchJumpTo isSearchActive={() => ({})} />);
    const wrapper = screen.getByTestId("search-jump-to-form");
    expect(wrapper).toBeInTheDocument();
  });

  it("conditionally renders the SearchJumpTo component", async () => {
    const user = userEvent.setup();
    render(
      <div data-testid="page">
        <span>Outside search form</span>
        <SearchJumpTo isSearchActive={mockIsSearchActive} />
      </div>
    );
    const form = screen.getByTestId("search-jump-to-form");

    await user.type(screen.getByRole("search"), "foo");

    // JumpTo should be visible
    expect(form).toHaveFormValues({ search: "foo" });
    expect(screen.getByRole("listbox"));

    // Click outside SearchJumpTo form, it should close JumpTo
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
