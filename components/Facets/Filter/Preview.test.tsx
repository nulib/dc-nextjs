import { render, screen } from "@/test-utils";
import Preview from "@/components/Facets/Filter//Preview";
import { sampleSearchShape } from "@/mocks/sample-search-shape";

describe("Submit component", () => {
  function renderHelper() {
    return render(<Preview items={sampleSearchShape} />);
  }

  it("renders the component with heading 3", () => {
    renderHelper();
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Preview Results"
    );
  });

  it("renders 2 items from search response", () => {
    renderHelper();
    const items = screen.getAllByTestId("facets-filter-preview-item");
    expect(items.length).toBe(2);
    expect(items[0]).toHaveTextContent("Voyager:RL03108");
    expect(items[0]).toHaveTextContent("Image");
    expect(items[1]).toHaveTextContent("Cakrasamvara Mandala");
    expect(items[1]).toHaveTextContent("Image");
  });

  it("renders figures in horizontal orientation", () => {
    renderHelper();
    const links = screen.getAllByRole("link");
    expect(links.length).toBe(2);
    links.forEach((link, index) => {
      expect(link.getAttribute("href")).toBe(
        `/items/${sampleSearchShape[index].id}`
      );
    });
  });

  it("renders figures in horizontal orientation", () => {
    renderHelper();
    const figures = screen.getAllByRole("figure");
    expect(figures.length).toBe(2);
    figures.forEach((figure) => {
      expect(figure.getAttribute("data-orientation")).toBe("horizontal");
    });
  });
});
