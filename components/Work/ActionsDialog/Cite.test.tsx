import { render, screen, within } from "@testing-library/react";
import WorkDialogCite from "@/components/Work/ActionsDialog/Cite";
import { WorkProvider } from "@/context/work-context";
import { sampleWork1 } from "@/mocks/sample-work1";

describe("WorkDialogCite", () => {
  function setup() {
    return render(
      <WorkProvider initialState={{ manifest: undefined, work: sampleWork1 }}>
        <WorkDialogCite />
      </WorkProvider>
    );
  }
  it("renders thumbnail column content", async () => {
    setup();
    const div = screen.getByTestId("actions-dialog-aside");
    expect(within(div).getByAltText(`${sampleWork1.title}`));
    expect(within(div).getByText(sampleWork1.work_type));
  });

  it("renders expected metadata content", () => {
    const { ark, terms_of_use, title } = sampleWork1;

    const metadataValues = [ark, terms_of_use, title];

    setup();
    const div = screen.getByTestId("metadata");

    // <dt>s
    expect(within(div).getAllByText(/title/i, { exact: false }));
    expect(within(div).getByText(/USE STATEMENT/i, { exact: false }));
    expect(within(div).getAllByText(/ark/i, { exact: false }));
    expect(within(div).getByText(/apa format/i, { exact: false }));
    expect(
      within(div).getByText(/chicago\/turabian format/i, { exact: false })
    );
    expect(within(div).getByText(/mla format/i, { exact: false }));
    expect(within(div).getByText(/wiki citation/i, { exact: false }));

    // <dd>s
    metadataValues.forEach((value) => {
      expect(
        within(div).getAllByText(value, { exact: false }).length
      ).toBeGreaterThan(0);
    });
  });

  it("renders copy links for all metadata", () => {
    setup();
    expect(screen.getAllByText(/copy/i).length).toEqual(7);
  });
});
