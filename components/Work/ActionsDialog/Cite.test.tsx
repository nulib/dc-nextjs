import { render, screen, within } from "@/test-utils";
import WorkDialogCite from "@/components/Work/ActionsDialog/Cite";
import { sampleWork1 } from "@/mocks/sample-work1";

xdescribe("WorkDialogCite", () => {
  it("renders thumbnail column content", async () => {
    render(<WorkDialogCite />);
    const div = screen.getByTestId("thumbnail-col-wrapper");
    expect(within(div).getByAltText(`${sampleWork1.title} thumbnail`));
    expect(within(div).getByText(sampleWork1.work_type_labels));
  });

  it("renders expected metadata content", () => {
    const { ark, identifiers, terms_of_use, title } = sampleWork1;

    const metadataValues = [ark, identifiers.join(", "), terms_of_use, title];

    render(<WorkDialogCite />);
    const div = screen.getByTestId("metadata");

    // <dt>s
    expect(within(div).getByText(/IDENTIFIER/i));
    expect(within(div).getAllByText(/title/i));
    expect(within(div).getByText(/USE STATEMENT/i));
    expect(within(div).getAllByText(/ark/i));
    expect(within(div).getByText(/apa format/i));
    expect(within(div).getByText(/chicago\/turabian format/i));
    expect(within(div).getByText(/mla format/i));
    expect(within(div).getByText(/wiki citation/i));

    // <dl>s
    metadataValues.forEach((value) => {
      expect(within(div).getByText(value));
    });
  });
});
