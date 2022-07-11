import RelatedItems, {
  RelatedItemsProps,
} from "@/components/Shared/RelatedItems";
import { render, screen, waitFor } from "@/test-utils";

const props: RelatedItemsProps = {
  collections: ["http://localhost:3000/something.json"],
  title: "Explore Further",
};

xdescribe("RelatedItems component", () => {
  it("renders a wrapping element for Clover", async () => {
    render(<RelatedItems {...props} />);
    await waitFor(() => {
      expect(screen.getByTestId("related-items")).toBeInTheDocument;
    });
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Explore Further"
      );
    });
  });
});
