import { render, screen } from "@/test-utils";
import Search from "./Search";
import mockRouter from "next-router-mock";
import { renderHook } from "@testing-library/react";
import { useRouter } from "next/router";
import userEvent from "@testing-library/user-event";

const mockIsSearchActive = jest.fn();

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

  it("populates the search query param in browser url bar", async () => {
    const user = userEvent.setup();
    mockRouter.setCurrentUrl("/search");
    const { result } = renderHook(() => {
      return useRouter();
    });

    expect(result.current).toMatchObject({
      asPath: "/search",
    });

    render(<Search isSearchActive={mockIsSearchActive} />);

    await user.type(screen.getByRole("search"), "foo");
    await user.click(screen.getByTestId("submit-button"));

    expect(result.current).toMatchObject({
      asPath: "/search?q=foo",
    });
  });

  it("retains filter query params in browser url bar when searching", async () => {
    const user = userEvent.setup();
    mockRouter.setCurrentUrl("/search?subject=baz");
    const { result } = renderHook(() => {
      return useRouter();
    });

    render(<Search isSearchActive={mockIsSearchActive} />);

    await user.type(screen.getByRole("search"), "foo");
    await user.click(screen.getByTestId("submit-button"));

    expect(result.current).toMatchObject({
      asPath: "/search?q=foo&subject=baz",
    });
  });
});
