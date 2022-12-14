import SearchJumpTo from "@/components/Search/JumpTo";
import { render } from "@/test-utils";
import { screen } from "@testing-library/react";
import singletonRouter from "next/router";

jest.mock("next/router", () => require("next-router-mock"));
// This is needed for mocking 'next/link':
jest.mock("next/dist/client/router", () => require("next-router-mock"));

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
    singletonRouter.push({
      pathname: "/collection/[id]",
      query: { id: "abc123" },
    });
    render(<SearchJumpTo searchValue="foo" />);

    expect(screen.getByTestId("helper-anchor-collection")).toHaveAttribute(
      "href",
      "/search?collection=abc123&q=foo"
    );
    expect(screen.getByTestId("helper-anchor-all")).toHaveAttribute(
      "href",
      "/search?q=foo"
    );
  });
});
