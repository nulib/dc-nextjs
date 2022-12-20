import SearchJumpTo from "@/components/Search/JumpTo";
import { act } from "@testing-library/react";
import { render } from "@/test-utils";
import { screen } from "@testing-library/react";
import singletonRouter from "next/router";

jest.mock("next/router", () => require("next-router-mock"));
// This is needed for mocking 'next/link':
jest.mock("next/dist/client/router", () => require("next-router-mock"));

/** Mock getCollection() to return a Collection title for tests */
jest.mock("../../lib/collection-helpers", () => ({
  getCollection: jest.fn().mockResolvedValue({
    title: "Best Collection Ever",
  }),
}));

describe("SearchJumpTo component", () => {
  it("renders search value in listbox items", () => {
    render(<SearchJumpTo searchValue="Dylan" />);
    expect(screen.getByTestId("jump-to-wrapper"));
    expect(screen.getAllByText("Dylan")).toHaveLength(2);
  });

  it("renders Helper components in each JumpTo item", () => {
    render(<SearchJumpTo searchValue="foo" />);
    const helpers = screen.getAllByTestId("helper");
    expect(helpers[0]).toHaveTextContent(/in this collection/i);
    expect(helpers[1]).toHaveTextContent(/all digital collections/i);
  });

  it("renders route query params in JumpTo items", async () => {
    render(<SearchJumpTo searchValue="foo" />);

    await act(async () => {
      await singletonRouter.push({
        pathname: "/collections/[id]",
        query: { id: "abc123" },
      });
    });

    expect(
      await screen.findByTestId("helper-anchor-collection")
    ).toHaveAttribute("href", `/search?collection=Best+Collection+Ever&q=foo`);

    expect(screen.getByTestId("helper-anchor-all")).toHaveAttribute(
      "href",
      "/search?q=foo"
    );
  });
});
