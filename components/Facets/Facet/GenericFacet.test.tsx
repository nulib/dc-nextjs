import { render, screen } from "@/test-utils";

import GenericFacet from "./GenericFacet";
import mockRouter from "next-router-mock";

mockRouter.setCurrentUrl("/search");

jest.mock("@/lib/dc-api", () => {
  /* eslint sort-keys: 0 */
  const mockSearchResponse1 = {
    data: [
      {
        representative_file_set: {
          aspect_ratio: 0.73066,
          id: "f58e06bc-003d-4f5a-9c05-766e49c852d5",
          url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/f58e06bc-003d-4f5a-9c05-766e49c852d5",
        },
        thumbnail:
          "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/28541ba5-afa2-47c9-a980-4d194e2781ec/thumbnail",
        visibility: "Institution",
        work_type: "Image",
        iiif_manifest:
          "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/28541ba5-afa2-47c9-a980-4d194e2781ec?as=iiif",
        id: "28541ba5-afa2-47c9-a980-4d194e2781ec",
        title: "Cave 465. Interior: Guhyasamaja () with consort",
      },
    ],
    pagination: {
      query_url:
        "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/search?searchToken=N4IgRg9g",
      current_page: 1,
      limit: 1,
      offset: 0,
      total_hits: 1,
      total_pages: 1,
      format: "default",
      search_token: "N4IgRg9g",
    },
    info: {
      name: "dc-api",
      description: "NUL Digital Collections API",
      version: "2.0.2",
    },
    aggregations: {
      genre: {
        genre: {
          buckets: [
            {
              doc_count: 36,
              key: "black-and-white negatives",
            },
            { doc_count: 18, key: "black-and-white photographs" },
            { doc_count: 17, key: "clippings (information artifacts)" },
            {
              doc_count: 11,
              key: "letters (correspondence)",
            },
            {
              doc_count: 9,
              key: "sculpture (visual works)",
            },
            { doc_count: 8, key: "color photographs" },
            {
              doc_count: 7,
              key: "notes (documents)",
            },
            { doc_count: 6, key: "photographs" },
          ],
          id: "genre",
        },
      },
    },
  };

  return {
    apiPostRequest: jest.fn().mockReturnValue(mockSearchResponse1),
  };
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
      />,
    );
  }
  it("renders facet title", async () => {
    setup();
    expect(await screen.findByText("Genre")).toBeInTheDocument();
  });
  it("renders the filter input", async () => {
    setup();
    expect(await screen.findByLabelText("Find genre")).toBeInTheDocument();
  });
  it("renders the facet options", async () => {
    setup();
    expect(await screen.findByTestId("facet-options")).toBeInTheDocument();
  });
});
