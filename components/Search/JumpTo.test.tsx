import { render, screen } from "@/test-utils";

import SearchJumpTo from "@/components/Search/JumpTo";

describe("SearchJumpTo component", () => {
  it("conditionally renders the SearchJumpTo component", async () => {
    render(
      <SearchJumpTo
        searchFocus={true}
        searchValue={"foo"}
        top={45}
        handleOnClick={jest.fn()}
        handleScopeValue={jest.fn()}
      />,
    );

    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();
    expect(listbox).toHaveStyle({ top: "45px" });

    for (let i = 0; i < listbox.children.length; i++) {
      const item = listbox.children[i];
      expect(item).toBeInTheDocument();
      expect(item).toHaveTextContent("foo");
    }
  });
});
