import RelatedItems, {
  RelatedItemsProps,
} from "@/components/Shared/RelatedItems";
import { render, screen } from "@/test-utils";

jest.mock("../Clover/SliderWrapper.tsx");

const props: RelatedItemsProps = {
  collections: [
    {
      iiifCollectionId: "http://localhost:3000/something.json",
      customViewAll: "http://localhost:3000/something",
    },
  ],
  title: "Explore Further",
};

describe("RelatedItems component", () => {
  it("renders the component and proper heading", async () => {
    render(<RelatedItems {...props} />);
    expect(await screen.findByTestId("related-items")).toBeInTheDocument();
    expect(await screen.findByRole("heading", { level: 2 })).toHaveTextContent(
      "Explore Further",
    );
  });

  it("renders multiple SliderWrappers if passed multiple Collection URIs", async () => {
    const multipleUris = {
      collections: [
        {
          iiifCollectionId: "http://localhost:3000/something.json",
          customViewAll: "http://localhost:3000/something",
        },
        {
          iiifCollectionId: "http://localhost:3000/another.json",
          customViewAll: "http://localhost:3000/another",
        },
      ],
      title: "Multiple Related Items",
    };

    render(<RelatedItems {...multipleUris} />);
    for (const collection of multipleUris.collections) {
      expect(
        await screen.findByText(collection.iiifCollectionId, { exact: false }),
      );
    }
  });
});
