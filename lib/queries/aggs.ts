export const aggs = {
  aggs: {
    contributor: {
      terms: {
        field: "descriptiveMetadata.contributor.displayFacet",
        size: 10,
        order: {
          _count: "desc",
        },
      },
    },
    genre: {
      terms: {
        field: "descriptiveMetadata.genre.displayFacet",
        size: 10,
        order: {
          _count: "desc",
        },
      },
    },
    subject: {
      terms: {
        field: "descriptiveMetadata.subject.displayFacet",
        size: 10,
        order: {
          _count: "desc",
        },
      },
    },
  },
};
