import { render, screen, within } from "@/test-utils";
import WorkTopInfo from "@/components/Work/TopInfo";
import { buildPres3Manifest } from "@/lib/iiif/manifest-helpers";
import { sampleWork1 } from "@/mocks/sample-work1";

describe("WorkTopInfo component", () => {
  async function renderHelper() {
    const manifest = await buildPres3Manifest(sampleWork1);
    return render(<WorkTopInfo manifest={manifest} work={sampleWork1} />);
  }

  it("renders", async () => {
    await renderHelper();
    expect(screen.getByTestId("work-top-info-wrapper"));
  });

  it("renders title and description", async () => {
    await renderHelper();
    expect(screen.getByTestId("title")).toHaveTextContent(sampleWork1.title);
    expect(screen.getByTestId("summary")).toHaveTextContent(
      sampleWork1.descriptions[0]
    );
    expect(screen.getByTestId("summary")).toHaveTextContent(
      sampleWork1.descriptions[1]
    );
  });

  it("renders Action buttons", async () => {
    await renderHelper();
    expect(screen.getByText(/find this item/i));
    expect(screen.getByText(/cite this item/i));
    expect(screen.getByText(/download and share/i));
  });

  it("renders metadata", async () => {
    await renderHelper();
    const metadataEl = screen.getByTestId("metadata");
    expect(metadataEl);

    /**
     * Test Nectar is rendering out the right info
     * We'll pick out a few to prove the point.  Once we know
     * exactly what metadata we want displayed, we add
     * that here to confirm
     */
    expect(
      within(metadataEl).getByText("Date").nextElementSibling
    ).toHaveTextContent("1971");

    expect(
      within(metadataEl).getByText(/Identifier/i).nextElementSibling
    ).toHaveTextContent("MS 63");

    expect(
      within(metadataEl).getByText(/SUBJECTS/i).nextElementSibling
    ).toHaveTextContent("Mexico--Cuernavaca, Mexicans");

    expect(
      within(metadataEl).getByText(/library unit/i).nextElementSibling
    ).toHaveTextContent("University Archives");
  });
});
