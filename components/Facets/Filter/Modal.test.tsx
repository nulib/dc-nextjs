import * as Dialog from "@radix-ui/react-dialog";
import { render, screen } from "@/test-utils";
import FilterModal from "@/components/Facets/Filter/Modal";

jest.mock("@/hooks/useFetchApiData", () => {
  return jest.fn(() => ({
    data: { data: [], info: { total: 20 } },
    error: "",
    loading: "",
  }));
});

describe("FilterModal component while `open`", () => {
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

  it("Has text rendering the search query param.", () => {
    renderHelper();
    const content = screen.getByTestId("modal-content");
    expect(content).toContainHTML(
      `<em>Results for “<strong>joan</strong>”</em>`
    );
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
});
