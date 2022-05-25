import { render, screen } from "@/test-utils";
import Card from "@/components/Shared/Card";

const props = {
  description: "Ima description",
  metadata: ["123 items"],
  title: "Yellow Submarine",
};

describe("Card component", () => {
  it("renders title, metadata and description", () => {
    render(<Card {...props} />);
    expect(screen.getByTestId("card-wrapper"));
    expect(screen.getByText(props.description));
    expect(screen.getByText(props.metadata[0]));
    expect(screen.getByText(props.title));
  });
});
