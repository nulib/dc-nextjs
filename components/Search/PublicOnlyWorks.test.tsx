import { render, screen } from "@/test-utils";

import SearchPublicOnlyWorks from "./PublicOnlyWorks";
import mockRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";

describe("SearchPublicOnlyWorks", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/search?q=northwestern");
  });

  it("adds the public visibility facet when toggled on", async () => {
    const user = userEvent.setup();
    render(<SearchPublicOnlyWorks />);

    await user.click(screen.getByRole("switch", { name: "Public only" }));

    expect(mockRouter).toMatchObject({
      asPath: "/search?q=northwestern&visibility=Public",
    });
  });

  it("removes the public visibility facet with one click when toggled off", async () => {
    const user = userEvent.setup();
    mockRouter.setCurrentUrl("/search?q=northwestern&visibility=Public");
    render(<SearchPublicOnlyWorks />);

    await user.click(screen.getByRole("switch", { name: "Public only" }));

    expect(mockRouter).toMatchObject({
      asPath: "/search?q=northwestern",
    });
  });
});
