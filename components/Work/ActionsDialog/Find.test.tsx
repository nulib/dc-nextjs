import { render, screen, within } from "@testing-library/react";
import WorkDialogFind from "@/components/Work/ActionsDialog/Find";
import { WorkProvider } from "@/context/work-context";
import { sampleWork1 } from "@/mocks/sample-work1";

describe("WorkDialogFind", () => {
  function setup() {
    return render(
      <WorkProvider initialState={{ manifest: undefined, work: sampleWork1 }}>
        <WorkDialogFind />
      </WorkProvider>
    );
  }
  it("renders thumbnail column content", async () => {
    setup();
    const div = screen.getByTestId("actions-dialog-aside");
    expect(within(div).getByAltText(`${sampleWork1.title}`));
    expect(within(div).getByText(sampleWork1.work_type_labels));
  });

  it("renders expected metadata content", () => {
    const {
      accession_number,
      box_names,
      box_numbers,
      catalog_keys,
      folder_names,
      folder_numbers,
    } = sampleWork1;

    const metadataValues = [
      accession_number,
      box_names.join(", "),
      box_numbers.join(", "),
      catalog_keys.join(", "),
      folder_names.join(", "),
      folder_numbers.join(", "),
    ];

    setup();
    const div = screen.getByTestId("metadata");

    // <dt>s
    expect(within(div).getAllByText(/accession/i)).toHaveLength(2);
    expect(within(div).getAllByText(/box name/i));
    expect(within(div).getByText(/ima box/i));
    expect(within(div).getByText(/box number/i));
    expect(within(div).getByText(/53/i));
    expect(within(div).getByText(/citation/i));
    expect(within(div).getByText(/folder name/i));
    expect(within(div).getByText(/ima folder/i));
    expect(within(div).getByText(/folder number/i));
    expect(within(div).getByText(/102, 103/i));

    // <dl>s
    metadataValues.forEach((value) => {
      expect(within(div).getByText(value));
    });
  });
});
