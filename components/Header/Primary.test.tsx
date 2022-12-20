import { render, screen } from "@/test-utils";
import HeaderPrimary from "./Primary";

import mockRouter from "next-router-mock";
jest.mock("next/router", () => require("next-router-mock"));

describe("HeaderPrimary", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/search");
  });

  it("renders the header-primary ui component", () => {
    render(<HeaderPrimary />);
    const wrapper = screen.getByTestId("header-primary-ui-component");
    expect(wrapper).toBeInTheDocument();
  });
});
