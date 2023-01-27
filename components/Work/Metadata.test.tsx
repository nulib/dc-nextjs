import WorkMetadata, { ValueAsListItem } from "@/components/Work/Metadata";
import { render, screen, within } from "@/test-utils";
import { MetadataItem } from "@iiif/presentation-3";
import { manifest } from "@/mocks/sample-work-image";

describe("WorkMetadata component", () => {
  it("renders the metadata definition list", () => {
    render(<WorkMetadata metadata={manifest.metadata as MetadataItem[]} />);

    const metadataGroups = screen.getAllByRole("group");
    expect(metadataGroups.length).toBe(12);

    metadataGroups.forEach((group, index) => {
      if (manifest.metadata) {
        const { label, value } = manifest.metadata[index];
        expect(within(group).getByRole("term")).toHaveTextContent(
          label?.none?.join(", ") as string
        );
        expect(within(group).getByRole("definition")).toHaveTextContent(
          value?.none?.join("") as string
        );
      }
    });
  });

  it("renders metadata value as custom link pattern", () => {
    render(<ValueAsListItem searchParam="foo" value="bar" />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toContain(`/search?foo=bar`);
  });

  it("renders metadata value as span if no searchParam is provided", () => {
    render(<ValueAsListItem value="bar" />);
    const value = screen.getByText("bar");
    expect(value).toContainHTML(`<span>bar</span>`);
  });
});
