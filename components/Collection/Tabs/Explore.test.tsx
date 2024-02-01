import { render, screen } from "@/test-utils";
import CollectionTabsExplore from "./Explore";

/**
 * Mocking this component to avoid a Jest error trying
 * to handle a dynamically imported module (Bloom)
 */
jest.mock("../../Shared/RelatedItems", () => () => "foo");

const topMetadata = [
  {
    field: "subject.label",
    value: ["foo", "bar", "baz"],
  },
];

describe("CollectionTabsExplore", () => {
  it("renders the description", async () => {
    render(
      <CollectionTabsExplore collectionId="abc123" topMetadata={topMetadata} />,
    );
    expect(screen.getByTestId("explore-wrapper"));
  });
});
