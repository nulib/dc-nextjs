import Card, { CardProps } from "@/components/Shared/Card";
import { render, screen } from "@/test-utils";

const props: CardProps = {
  description: "Ima description",
  imageUrl: "http://someimage.jpg",
  supplementalInfo: "123 items",
  title: "Yellow Submarine",
};

describe("Card component", () => {
  it("renders title, metadata and description", () => {
    render(<Card {...props} />);
    expect(screen.getByTestId("card-wrapper"));
    expect(screen.getByTestId("card-description")).toHaveTextContent(
      "Ima description"
    );
    expect(screen.getByText("123 items"));
  });
});
