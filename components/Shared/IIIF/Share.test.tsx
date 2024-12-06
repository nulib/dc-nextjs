import { render, screen } from "@/test-utils";

import IIIFShare from "@/components/Shared/IIIF/Share";
import React from "react";

describe("IIIFShare", () => {
  const uri =
    "https://iiif.io/api/cookbook/recipe/0001-mvm-image/manifest.json";

  it("renders a dropdown with IIIF viewers", async () => {
    render(<IIIFShare uri={uri} />);

    // Verify that initial elements are present
    expect(screen.getByTestId("iiif-share")).toBeInTheDocument();

    const trigger = screen.getByTestId("iiif-share-trigger");
    expect(trigger).toHaveTextContent("View as IIIF");
  });

  it("renders dropdown content with expected items", async () => {
    render(<IIIFShare uri={uri} dropdownMenuProps={{ open: true }} />);

    const content = screen.getByTestId("iiif-share-content");
    expect(screen.getByText("View in...")).toBeInTheDocument();

    const links = Array.from(content.querySelectorAll("a"));
    const expectedLinks = {
      "Clover IIIF":
        "https://samvera-labs.github.io/clover-iiif/docs/viewer/demo?iiif-content=https%3A%2F%2Fiiif.io%2Fapi%2Fcookbook%2Frecipe%2F0001-mvm-image%2Fmanifest.json",
      Mirador:
        "https://projectmirador.org/embed?iiif-content=https%3A%2F%2Fiiif.io%2Fapi%2Fcookbook%2Frecipe%2F0001-mvm-image%2Fmanifest.json",
      Theseus:
        "https://theseusviewer.org/?iiif-content=https%3A%2F%2Fiiif.io%2Fapi%2Fcookbook%2Frecipe%2F0001-mvm-image%2Fmanifest.json",
      "View Raw JSON": uri,
      "What is IIIF?": "https://iiif.io/get-started/why-iiif/",
    };

    // verify that the links have the expected hrefs
    expect(links.length).toEqual(Object.keys(expectedLinks).length);
    links.forEach((link) => {
      expect(link).toBeInTheDocument();
      expect(link).toBeInstanceOf(HTMLAnchorElement);
      expect(link).toHaveAttribute("target", "_blank");
      const key = link.textContent as keyof typeof expectedLinks;
      const expectedHref = expectedLinks[key];
      if (expectedHref) {
        expect(link).toHaveAttribute("href", expectedHref);
      }
    });

    // verify that the copy button is present
    const copyText = screen.getByText("Copy IIIF JSON");
    expect(copyText).toBeInTheDocument();
    expect(copyText).toBeInstanceOf(HTMLButtonElement);
  });
});
