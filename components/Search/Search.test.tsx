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

  it("accepts text input as a form value", async () => {
    const user = userEvent.setup();
    render(<Search isSearchActive={mockIsSearchActive} />);
    const form = screen.getByTestId("search-ui-component");

    await user.type(screen.getByRole("search"), "foo");

    expect(form).toHaveFormValues({ search: "foo" });
  });
});
