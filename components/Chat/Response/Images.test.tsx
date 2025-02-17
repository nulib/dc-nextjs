import ResponseImages, {
  INITIAL_MAX_ITEMS,
} from "@/components/Chat/Response/Images";
import { render, screen } from "@testing-library/react";

import { sampleWork1 } from "@/mocks/sample-work1";
import { sampleWork2 } from "@/mocks/sample-work2";

describe("ResponseImages", () => {
  it("renders the component", async () => {
    const works = [sampleWork1, sampleWork2];

    render(<ResponseImages works={works} />);

    const figures = screen.getAllByRole("figure");
    expect(figures).toHaveLength(2);
    expect(figures.length).toBeLessThanOrEqual(INITIAL_MAX_ITEMS);

    figures.forEach((figure, index) => {
      expect(figure).toBeInTheDocument();

      // find all images
      const images = figure.querySelectorAll("img");

      // expect two images
      expect(images).toHaveLength(2);

      // expect lqip
      const lqipSrc = new URL(works[index].thumbnail as string);
      lqipSrc.searchParams.set("size", "3");
      expect(images[0]).toHaveAttribute("src", lqipSrc.toString());
      expect(images[0]).toHaveAttribute("alt", "");

      // expect image
      const thumbnailSrc = works[index].thumbnail;
      expect(images[1]).toHaveAttribute("src", thumbnailSrc);
      expect(images[1]).toHaveAttribute("alt", works[index].title);

      // find all images
      const figcaption = figure.querySelector("figcaption");
      expect(figcaption).toBeInTheDocument();
      expect(figcaption).toHaveTextContent(works[index].title as string);
      expect(figcaption).toHaveTextContent(works[index].work_type as string);

      // find link parent element of figure
      const link = figure.parentElement;
      expect(link).toHaveAttribute("href", `/items/${works[index].id}`);
    });
  });
});
