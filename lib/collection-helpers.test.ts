import {
  GenericAggsReturn,
  GetTopMetadataAggsReturn,
  getCollectionWorkCounts,
  isCollectionPage,
  sortAggsByKey,
} from "@/lib/collection-helpers";

import { apiPostRequest } from "@/lib/dc-api";
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

describe("sortAggsByKey() function", () => {
  const givenAggs: GenericAggsReturn[] = [
    {
      key: "Sample -- 1.",
      doc_count: 1,
    },
    {
      key: "Sample -- 10.",
      doc_count: 2,
    },
    {
      key: "Sample -- 2.",
      doc_count: 3,
    },
  ];

  const expectedAggs: GenericAggsReturn[] = [
    {
      key: "Sample -- 1.",
      doc_count: 1,
    },
    {
      key: "Sample -- 2.",
      doc_count: 3,
    },
    {
      key: "Sample -- 10.",
      doc_count: 2,
    },
  ];

  it("sorts generic agg arrays numerically by key value", () => {
    const output = sortAggsByKey(givenAggs);
    output.forEach((agg, index) => {
      expect(agg.key).toBe(expectedAggs[index].key);
    });
  });
});

describe("isCollectionPage", () => {
  it("should return true for valid collection page paths", () => {
    const pathname = "/collections/123";
    expect(isCollectionPage(pathname)).toBe(true);
  });

  it('should return false if the first part of the path is not "collections"', () => {
    const pathname = "/items/123";
    expect(isCollectionPage(pathname)).toBe(false);
  });

  it("should return false if the second part of the path is undefined or empty", () => {
    const pathname1 = "/collections/";
    const pathname2 = "/collections";

    expect(isCollectionPage(pathname1)).toBe(false);
    expect(isCollectionPage(pathname2)).toBe(false);
  });

  it("should handle edge cases with extra slashes", () => {
    const pathname = "//collections//123/";
    expect(isCollectionPage(pathname)).toBe(true);
  });
});

describe("getCollectionWorkCounts() function", () => {
  const collectionId = "3c863d97-07c2-4a75-bcb5-5ad3bfb3bcd0";

  const mockWorkCountResponse = {
    aggregations: {
      collections: {
        buckets: [
          {
            key: collectionId,
            doc_count: 100,
            workTypes: {
              buckets: [
                { key: "Image", doc_count: 80 },
                { key: "Audio", doc_count: 15 },
                { key: "Video", doc_count: 5 },
              ],
            },
          },
        ],
      },
    },
  };

  it("returns correct work type counts for a collection", async () => {
    (apiPostRequest as jest.Mock).mockResolvedValueOnce(mockWorkCountResponse);
    const result = await getCollectionWorkCounts([collectionId]);
    expect(result).toEqual({
      [collectionId]: {
        totalWorks: 100,
        totalImage: 80,
        totalAudio: 15,
        totalVideo: 5,
      },
    });
  });

  it("uses a must query to filter by collection IDs, not a bare should", async () => {
    (apiPostRequest as jest.Mock).mockResolvedValueOnce(mockWorkCountResponse);
    await getCollectionWorkCounts([collectionId]);
    const { body } = (apiPostRequest as jest.Mock).mock.calls.at(-1)[0];
    expect(body.query.bool.must).toBeDefined();
    expect(body.query.bool.should).toBeUndefined();
  });

  it("returns zero counts for a collection ID not in the aggregation response", async () => {
    (apiPostRequest as jest.Mock).mockResolvedValueOnce({
      aggregations: { collections: { buckets: [] } },
    });
    const result = await getCollectionWorkCounts(["missing-collection-id"]);
    expect(result).toEqual({
      "missing-collection-id": {
        totalWorks: 0,
        totalImage: 0,
        totalAudio: 0,
        totalVideo: 0,
      },
    });
  });
});
