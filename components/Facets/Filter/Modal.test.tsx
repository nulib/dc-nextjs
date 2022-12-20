import * as Dialog from "@radix-ui/react-dialog";
import { act, render, screen } from "@/test-utils";
import FilterModal from "@/components/Facets/Filter/Modal";
import mockRouter from "next-router-mock";
import singletonRouter from "next/router";

jest.mock("@/hooks/useFetchApiData", () => {
  return jest.fn(() => ({
    data: { data: [], info: { total: 20 } },
    error: "",
    loading: "",
  }));
});

jest.mock("next/router", () => require("next-router-mock"));
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
      </Dialog.Root>
    );

  it("Has text rendering the search query param.", async () => {
    await singletonRouter.push("/search?q=joan");
    renderHelper();

    const content = screen.getByTestId("modal-content");
    expect(content).toContainHTML(
      `<em>Results for “<strong>joan</strong>”</em>`
    );
    expect(singletonRouter).toMatchObject({
      asPath: "/search?q=joan",
      pathname: "/search",
      query: { q: "joan" },
    });
  });

  it("Has cancel button(s) with aria labels of `Cancel`.", () => {
    renderHelper();
    const cancelButtons = screen.getAllByTestId("facets-filter-close");
    cancelButtons.forEach((button) => {
      expect(button.getAttribute("aria-label")).toBe("Cancel");
    });
  });

  it("Has a visible submit button with a total.", () => {
    renderHelper();
    const submit = screen.getByTestId("facets-submit");
    expect(submit).toHaveTextContent("View Results (20)");
  });

  it("Updates the url with applied user facets", () => {
    renderHelper();

    act(() => {
      // Mimic what the search button would/should do
      singletonRouter.push({
        pathname: "/search",
        query: {
          foo: "bar",
        },
      });
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
