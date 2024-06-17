import { render, screen } from "@/test-utils";

import SearchSimilar from "./Similar";

describe("SearchSimilar component", () => {
  const mockSetShowSimilar = jest.fn();
  const props = {
    handleClose: mockSetShowSimilar,
    work: {
      id: "abc123",
      title: "ima source work for similar results",
    },
  };

  it("renders the Work title and a link to the Work page", () => {
    render(<SearchSimilar {...props} />);
    const title = screen.getByText(/ima source work for similar results/i);
    expect(title).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /ima source work for similar results/i,
      }),
    ).toHaveAttribute("href", "/items/abc123");
  });

  it("renders a close button, which calls a callback fn", () => {
    render(<SearchSimilar {...props} />);
    const button = screen.getByRole("button", { name: /close/i });
    expect(button).toBeInTheDocument();
    button.click();
    expect(mockSetShowSimilar).toHaveBeenCalledTimes(1);
  });
});
