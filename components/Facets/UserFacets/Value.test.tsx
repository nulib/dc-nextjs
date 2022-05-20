import { render, screen } from "@/test-utils";
import React from "react";
import Value from "./Value";

const instance = {
  id: "genre",
  label: "Genre",
  value: "Foo",
};

describe("UserFacet UI component", () => {
  it("Renders a user facet component.", () => {
    render(
      <Value
        instance={instance}
        handleRemoval={() => {
          // nada
        }}
      />
    );

    const value = screen.getByRole("button");
    expect(value).toBeInTheDocument();
    expect(value).toHaveTextContent("Foo");
    expect(value).toHaveTextContent("Genre");
    expect(value.getAttribute("aria-label")).toBe("Remove Foo of type Genre");
  });
});
