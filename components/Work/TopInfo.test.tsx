import { manifest, work } from "@/mocks/sample-work-image";
import { render, screen } from "@/test-utils";

import { Work } from "dcapi-types";
import WorkTopInfo from "@/components/Work/TopInfo";

describe("WorkTopInfo component", () => {
  function renderHelper() {
    return render(
      <WorkTopInfo manifest={manifest} work={work as unknown as Work} />
    );
  }

  it("renders", async () => {
    renderHelper();
    expect(screen.getByTestId("work-top-info-wrapper"));
  });

  it("renders title and description", async () => {
    renderHelper();
    expect(screen.getByTestId("title")).toHaveTextContent(
      manifest?.label?.none?.join(",") as string
    );
    expect(screen.getByTestId("summary")).toHaveTextContent(
      manifest?.summary?.none?.join(",") as string
    );
  });

  it("renders Action buttons", async () => {
    renderHelper();
    expect(screen.getByText(/find this item/i));
    expect(screen.getByText(/cite this item/i));
    expect(screen.getByText(/download and share/i));
  });

  it("renders metadata", async () => {
    renderHelper();
    expect(screen.getByTestId("metadata"));
  });
});
