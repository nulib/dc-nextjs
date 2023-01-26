import type { GetTopMetadataAggsReturn } from "@/lib/collection-helpers";
import { getTopMetadataAggs } from "@/lib/collection-helpers";

/* eslint sort-keys: 0 */

jest.mock("./dc-api", () => {
  const mockAggs = {
    aggregations: {
      "subject.label": {
        buckets: [
          {
            key: "Painting",
            doc_count: 80,
          },
          {
            key: "19th century",
            doc_count: 5,
          },
          {
            key: "Landscape painting--China",
            doc_count: 4,
          },
          {
            key: "20th century",
            doc_count: 2,
          },
          {
            key: "Female nude",
            doc_count: 2,
          },
          {
            key: "Mural painting and decoration",
            doc_count: 2,
          },
          {
            key: "Scrolls, Chinese",
            doc_count: 2,
          },
          {
            key: "Architecture",
            doc_count: 1,
          },
          {
            key: "Buddhist art",
            doc_count: 1,
          },
          {
            key: "Dunhuang Caves (China)",
            doc_count: 1,
          },
        ],
      },
    },
  };

  const mockNoAggs = { aggregations: {} };

  const mockNoBuckets = {
    aggregations: {
      "subject.label": {
        buckets: [],
      },
    },
  };

  return {
    apiPostRequest: jest
      .fn()
      /** Note these map to the 3 specs below */
      .mockReturnValueOnce(mockAggs)
      .mockReturnValueOnce(mockNoAggs)
      .mockReturnValueOnce(mockNoBuckets),
  };
});

describe("getTopMetadataAggs() function", () => {
  let response: GetTopMetadataAggsReturn[] | [];
  const possibleValues = [
    "Painting",
    "19th century",
    "Landscape painting--China",
    "20th century",
    "Female nude",
    "Mural painting and decoration",
    "Scrolls, Chinese",
    "Architecture",
    "Buddhist art",
    "Dunhuang Caves (China)",
  ];

  beforeEach(async () => {
    response = await getTopMetadataAggs({
      collectionId: "abc",
      metadataFields: ["subject.label"],
    });
  });

  it("should return an array of aggregation metadata fields, and each field should contain 3 values", async () => {
    const subjectAgg = response[0];

    expect(subjectAgg.value).toHaveLength(3);
    subjectAgg.value.forEach((metadataValue) => {
      expect(possibleValues.includes(metadataValue)).toBeTruthy();
    });
  });

  it("should return an empty array if no aggregations exist in network response", async () => {
    expect(response).toEqual([]);
  });

  it("should return an empty 'value' property if buckets are empty for an aggregated field", async () => {
    expect(response).toEqual([{ field: "subject.label", value: [] }]);
  });
});
