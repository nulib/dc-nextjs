import WorkCount, {
  WorkCountProps,
} from "@/components/Shared/WorkCount/WorkCount";
import { render, screen } from "@/test-utils";

const imageOnly: WorkCountProps = {
  audio: 0,
  image: 123,
  video: 0,
};

const mixedTypes: WorkCountProps = {
  audio: 2,
  image: 123,
  video: 5,
};

describe("renders WorkCount component", () => {
  it("displays Total and individual Image counts", () => {
    render(<WorkCount {...imageOnly} />);
    const total = screen.getByTestId("work-count-total");
    expect(total).toHaveTextContent("123 Works");

    const types = screen.getAllByTestId("work-count-type");
    types.forEach((el) => {
      const type = el.getAttribute("data-type") as string;
      const count = imageOnly[type as keyof WorkCountProps];
      expect(el).toHaveAccessibleName(`${count} ${type} works`);
    });
  });

  it("displays cumulative Total, and individual Audio, Image, and Video counts", () => {
    render(<WorkCount {...mixedTypes} />);
    const total = screen.getByTestId("work-count-total");
    expect(total).toHaveTextContent("130 Works");

    const types = screen.getAllByTestId("work-count-type");
    types.forEach((el) => {
      const type = el.getAttribute("data-type") as string;
      const count = mixedTypes[type as keyof WorkCountProps];
      expect(el).toHaveAccessibleName(`${count} ${type} works`);
    });
  });
});
