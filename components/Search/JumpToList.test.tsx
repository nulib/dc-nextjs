import SearchJumpToList from "@/components/Search/JumpToList";
import { act } from "@testing-library/react";
import { render } from "@/test-utils";
import { screen } from "@testing-library/react";
import singletonRouter from "next/router";
import userEvent from "@testing-library/user-event";

// This is needed for mocking 'next/link':
jest.mock("next/dist/client/router", () => require("next-router-mock"));

/** Mock getCollection() to return a Collection title for tests */
jest.mock("../../lib/collection-helpers", () => ({
  getCollection: jest.fn().mockResolvedValue({
    title: "Best Collection Ever",
  }),
}));

const mockSetShowJumpTo = jest.fn();

describe("SearchJumpToList component", () => {
  it("renders search value in list items", () => {
    render(
      <SearchJumpToList
        searchValue="Dylan"
        setShowJumpTo={mockSetShowJumpTo}
        top={0}
        handleOnClick={jest.fn()}
        setScopeValue={jest.fn()}
      />,
    );
    expect(screen.getByTestId("jump-to-wrapper"));
    expect(screen.getAllByText("Dylan")).toHaveLength(2);
  });

  it("renders helper text for collection and all collections", () => {
    render(
      <SearchJumpToList
        searchValue="foo"
        setShowJumpTo={mockSetShowJumpTo}
        top={0}
        handleOnClick={jest.fn()}
        setScopeValue={jest.fn()}
      />,
    );
    const helpers = screen.getAllByTestId("helper");
    expect(helpers[0]).toHaveTextContent(/in this collection/i);
    expect(helpers[1]).toHaveTextContent(/all digital collections/i);
  });

  it.only("renders route query params in JumpTo items", async () => {
    render(
      <SearchJumpToList
        searchValue="foo"
        setShowJumpTo={mockSetShowJumpTo}
        top={0}
        handleOnClick={jest.fn()}
        setScopeValue={jest.fn()}
      />,
    );

    await act(async () => {
      await singletonRouter.push({
        pathname: "/collections/[id]",
        query: { id: "abc123" },
      });
    });

    expect(
      await screen.findByTestId("helper-anchor-collection"),
    ).toHaveAttribute("data-value", "collection");

    expect(screen.getByTestId("helper-anchor-all")).toHaveAttribute(
      "data-value",
      "all",
    );
  });

  it("selects items correctly on arrow key presses", async () => {
    const user = userEvent.setup();
    render(
      <SearchJumpToList
        searchValue="foo"
        setShowJumpTo={mockSetShowJumpTo}
        top={0}
        handleOnClick={jest.fn()}
        setScopeValue={jest.fn()}
      />,
    );
    const listItems = await screen.findAllByRole("option");

    expect(listItems[0]).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{ArrowDown}");

    expect(listItems[0]).toHaveAttribute("aria-selected", "false");
    expect(listItems[1]).toHaveAttribute("aria-selected", "true");

    // Can't select any other lower options (only 2 exist)
    await user.keyboard("{ArrowDown}");

    expect(listItems[0]).toHaveAttribute("aria-selected", "false");
    expect(listItems[1]).toHaveAttribute("aria-selected", "true");

    // Go back up (even more than allowed)
    await user.keyboard("{ArrowUp}{ArrowUp}{ArrowUp}");
    expect(listItems[0]).toHaveAttribute("aria-selected", "true");
    expect(listItems[1]).toHaveAttribute("aria-selected", "false");
  });

  it("handles the Escape key press", async () => {
    const user = userEvent.setup();
    render(
      <SearchJumpToList
        searchValue="foo"
        setShowJumpTo={mockSetShowJumpTo}
        top={0}
        handleOnClick={jest.fn()}
        setScopeValue={jest.fn()}
      />,
    );

    await user.keyboard("{Escape}");
    expect(mockSetShowJumpTo).toHaveBeenCalled();
  });
});
