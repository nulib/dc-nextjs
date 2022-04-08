import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders the page component", () => {
    render(<Home />);
    const wrapper = screen.getByTestId("home-page-wrapper");
    expect(wrapper).toBeInTheDocument();
  });
});
