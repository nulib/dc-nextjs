export const response = {
  data: {
    aggregations: [
      {
        buckets: [
          {
            doc_count: 36,
            key: "black-and-white negatives",
          },
          { doc_count: 18, key: "black-and-white photographs" },
          { doc_count: 17, key: "clippings (information artifacts)" },
          {
            doc_count: 11,
            key: "letters (correspondence)",
          },
          {
            doc_count: 9,
            key: "sculpture (visual works)",
          },
          { doc_count: 8, key: "color photographs" },
          {
            doc_count: 7,
            key: "notes (documents)",
          },
          { doc_count: 6, key: "photographs" },
        ],
        id: "genre",
      },
    ],
    data: [],
    info: {
      total: 185,
    },
  },
  error: "",
  loading: "",
};
