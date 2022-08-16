import { render, screen } from "@/test-utils";
import GenericFacet from "./GenericFacet";
import { response } from "@/mocks/use-fetch-api-response";

jest.mock("@/hooks/useFetchApiData", () => {
  return jest.fn(() => response);
});

describe("Facet GenericFacet UI component", () => {
  function setup() {
    return render(
      <GenericFacet
        facet={{
          field: "genre.label",
          id: "genre",
          label: "Genre",
        }}
      />
    );
  }
  it("renders facet title", () => {
    setup();
    expect(screen.getByText("Genre"));
  });
  it("renders the filter input", () => {
    setup();
    expect(screen.getByLabelText("Find genre"));
  });
  it("renders the facet options", async () => {
    setup();
    expect(await screen.findByTestId("facet-options"));
  });
});
