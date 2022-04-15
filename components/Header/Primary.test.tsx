import { render, screen } from "@testing-library/react";
import HeaderPrimary from "./Primary";

describe("HeaderPrimary", () => {
  it("renders the header-primary ui component", () => {
    render(<HeaderPrimary />);
    const wrapper = screen.getByTestId("header-primary-ui-component");
    expect(wrapper).toBeInTheDocument();
  });
});
