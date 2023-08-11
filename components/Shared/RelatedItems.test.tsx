import RelatedItems, {
  RelatedItemsProps,
} from "@/components/Shared/RelatedItems";
import { render, screen } from "@/test-utils";

jest.mock("../Clover/SliderWrapper.tsx");

const props: RelatedItemsProps = {
  collectionUris: ["http://localhost:3000/something.json"],
  title: "Explore Further",
};

describe("RelatedItems component", () => {
  it("renders the component and proper heading", async () => {
    render(<RelatedItems {...props} />);
    expect(await screen.findByTestId("related-items")).toBeInTheDocument();
    expect(await screen.findByRole("heading", { level: 2 })).toHaveTextContent(
      "Explore Further"
    );
  });

  it("renders multiple SliderWrappers if passed multiple Collection URIs", async () => {
    const multipleUris = {
      collectionUris: [
        "http://localhost:3000/something",
        "http://localhost:3000/another-thing",
      ],
      title: "Multiple Related Items",
    };

    render(<RelatedItems {...multipleUris} />);
    for (const uri of multipleUris.collectionUris) {
      expect(await screen.findByText(uri, { exact: false }));
    }
  });
});
