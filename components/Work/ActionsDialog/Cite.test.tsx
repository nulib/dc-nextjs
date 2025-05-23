import { render, screen, within } from "@testing-library/react";

import WorkDialogCite from "@/components/Work/ActionsDialog/Cite";
import { WorkProvider } from "@/context/work-context";
import { sampleWork1 } from "@/mocks/sample-work1";

describe("WorkDialogCite", () => {
  function setup() {
    return render(
      <WorkProvider initialState={{ manifest: undefined, work: sampleWork1 }}>
        <WorkDialogCite />
      </WorkProvider>,
    );
  }
  it("renders thumbnail column content", async () => {
    setup();

    const div = screen.getByTestId("actions-dialog-aside");

    expect(within(div).getByAltText(`${sampleWork1.title}`));
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
      within(div).getByText(/chicago\/turabian format/i, { exact: false }),
    );
    expect(within(div).getByText(/mla format/i, { exact: false }));
    expect(within(div).getByText(/wiki citation/i, { exact: false }));

    // <dd>s
    metadataValues.forEach((value) => {
      expect(
        within(div).getAllByText(value as string, { exact: false }).length,
      ).toBeGreaterThan(0);
    });
  });

  it("renders copy links for all metadata", () => {
    setup();

    expect(screen.getAllByText(/copy/i).length).toEqual(7);
  });

  it("renders today's date (date accessed) in MLA and APA Formats", () => {
    setup();

    const div = screen.getByTestId("metadata");
    const today = new Date().toDateString();

    const apaFormatEl = within(div).getByText(
      `University Archives, Northwestern University Libraries. (${today}). Hawking dental products in outdoor market, Cuernavaca, Mexico, Retrieved from http://localhost/items/c16029ff-d027-496a-98b7-6f259395a8f7`,
      { exact: false },
    );
    const mlaFormatEl = within(div).getByText(
      `University Archives, Northwestern University Libraries. "Hawking dental products in outdoor market, Cuernavaca, Mexico", Jim Roberts Photographs, 1968-1972 ${today}. http://localhost/items/c16029ff-d027-496a-98b7-6f259395a8f7`,
      { exact: false },
    );

    expect(apaFormatEl).toBeVisible();
    expect(mlaFormatEl).toBeVisible();
  });
});
