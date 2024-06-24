import * as Dialog from "@radix-ui/react-dialog";
import { act, render, screen } from "@/test-utils";
import FilterModal from "@/components/Facets/Filter/Modal";
import mockRouter from "next-router-mock";
import singletonRouter from "next/router";

// mock jest request for lib/dc-api.ts apiPostRequest
jest.mock("@/lib/dc-api", () => {
  /* eslint sort-keys: 0 */
  const mockData = {
    data: [
      {
        representative_file_set: {
          aspect_ratio: 1.4828,
          id: "55c4ff8f-f3fe-46b5-a023-b78d919958de",
          url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/55c4ff8f-f3fe-46b5-a023-b78d919958de",
        },
        thumbnail:
          "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/25014240-8cda-4bd1-8203-380bd195de38/thumbnail",
        visibility: "Public",
        work_type: "Image",
        iiif_manifest:
          "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/25014240-8cda-4bd1-8203-380bd195de38?as=iiif",
        id: "25014240-8cda-4bd1-8203-380bd195de38",
        title: "J.E. Mainer's Mountaineers",
      },
      {
        representative_file_set: {
          aspect_ratio: 0.65487,
          id: "11606928-655a-449d-a73d-9d591ac20876",
          url: "https://iiif.stack.rdc-staging.library.northwestern.edu/iiif/2/11606928-655a-449d-a73d-9d591ac20876",
        },
        thumbnail:
          "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/2803e4aa-3656-459d-b9a8-e4225ebf78f2/thumbnail",
        visibility: "Public",
        work_type: "Image",
        iiif_manifest:
          "https://dcapi.rdc-staging.library.northwestern.edu/api/v2/works/2803e4aa-3656-459d-b9a8-e4225ebf78f2?as=iiif",
        id: "2803e4aa-3656-459d-b9a8-e4225ebf78f2",
        title: "Pete Seeger, Berkeley Folk Music Festival",
      },
    ],
    pagination: {
      total_hits: 20,
    },
    info: {},
  };

  return {
    apiPostRequest: jest.fn().mockReturnValue(mockData),

    /** An alternative way to write the above, for interest */
    // apiPostRequest: jest.fn(() => {
    //   return Promise.resolve(mockData);
    // }),
  };
});

// This is needed for mocking 'next/link':
jest.mock("next/dist/client/router", () => require("next-router-mock"));

describe("FilterModal component while `open`", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/search");
  });

  const renderHelper = () =>
    render(
      <Dialog.Root open={true}>
        <Dialog.Portal>
          <Dialog.Content data-testid="modal-content">
            <FilterModal q="joan" setIsModalOpen={() => false} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>,
    );

  it("Has text rendering the search query param.", async () => {
    await singletonRouter.push("/search?q=joan");
    renderHelper();

    const content = await screen.findByTestId("modal-content");
    expect(content).toContainHTML(
      `<em>Results for “<strong>joan</strong>”</em>`,
    );
    expect(singletonRouter).toMatchObject({
      asPath: "/search?q=joan",
      pathname: "/search",
      query: { q: "joan" },
    });
  });

  it("Has cancel button(s) with aria labels of `Cancel`.", async () => {
    renderHelper();
    const cancelButtons = await screen.findAllByTestId("facets-filter-close");
    cancelButtons.forEach((button) => {
      expect(button.getAttribute("aria-label")).toBe("Cancel");
    });
  });

  it("Has a visible submit button with a total.", async () => {
    renderHelper();

    const submit = await screen.findByRole("button", {
      name: "View Results (20)",
    });
    expect(submit).toBeInTheDocument();
  });

  it("Updates the url with applied user facets", async () => {
    act(() => {
      singletonRouter.push("/search?foo=bar");
    });

    expect(singletonRouter).toMatchObject({
      asPath: "/search?foo=bar",
      pathname: "/search",
      query: {
        foo: "bar",
      },
    });
  });
});
