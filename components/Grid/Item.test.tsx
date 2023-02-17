import { render, screen } from "@/test-utils";
import GridItem from "./Item";
import { SearchShape } from "@/types/api/response";

const mockItem = {
  api_model: "Work",
  id: "370f880c-9083-4d9b-9129-45a924522d11",
  iiif_manifest:
    "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/370f880c-9083-4d9b-9129-45a924522d11?as=iiif",
  representative_file_set: {
    aspect_ratio: 1.48565,
    id: "b92874a0-72b7-4479-979e-38860c412a13",
    url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/b92874a0-72b7-4479-979e-38860c412a13",
  },
  thumbnail:
    "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/370f880c-9083-4d9b-9129-45a924522d11/thumbnail",

  title:
    "Andrews Gospel Singers, Richmond Festival of the Arts folk song concert",
  visibility: "Public",
  work_type: "Image",
};

describe("GridItem component", () => {
  it("renders the item, link and image", () => {
    render(<GridItem item={mockItem as SearchShape} />);

    expect(screen.getByTestId("grid-item")).toBeInTheDocument();
    expect(screen.getByTestId("grid-item-link")).toBeInTheDocument();
    expect(screen.getByAltText(mockItem.title)).toBeInTheDocument();
    expect(screen.queryByAltText("booya")).not.toBeInTheDocument();
  });

  it("renders the expected default image source", () => {
    render(<GridItem item={mockItem as SearchShape} />);

    expect(screen.getByAltText(mockItem.title).getAttribute("src")).toContain(
      mockItem.thumbnail
    );
  });

  it("renders the full resolution image source is featured", () => {
    render(<GridItem item={mockItem as SearchShape} isFeatured />);

    expect(
      screen.getByAltText(mockItem.title).getAttribute("src")
    ).not.toContain(mockItem.thumbnail);

    expect(screen.getByAltText(mockItem.title).getAttribute("src")).toContain(
      "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/b92874a0-72b7-4479-979e-38860c412a13/square/512,/0/default.jpg"
    );
  });
});
