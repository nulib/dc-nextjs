import { render, screen } from "@/test-utils";
import BlurredBgImage from "@/components/Shared/BlurredBgImage";

describe("BlurredBgImage component", () => {
  it("renders", () => {
    render(<BlurredBgImage bgImageUrl="imageXyz.jpg" />);
    expect(screen.getByTestId("blurred-bg-image"));
  });

  it("renders custom background color", () => {
    render(
      <BlurredBgImage
        bgColor="red"
        bgImageUrl="imageXyz.jpg"
        height="200px"
        width="400px"
      />
    );
    const el = screen.getByTestId("blurred-bg-image");
    expect(el).toHaveStyle("background-color: red");
  });
});
