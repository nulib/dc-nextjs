import { render, screen } from "@/test-utils";

import { Collection } from "@nulib/dcapi-types";
import CollectionTabsExplore from "./Explore";
import { sampleCollection1 } from "@/mocks/sample-collection1";

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

const sampleCollection: Collection = sampleCollection1;

describe("CollectionTabsExplore", () => {
  it("renders the description", async () => {
    render(
      <CollectionTabsExplore
        collection={sampleCollection}
        topMetadata={topMetadata}
      />,
    );
    expect(screen.getByTestId("explore-wrapper"));
  });
});
