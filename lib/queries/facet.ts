import { ALL_FACETS } from "../facets-model";

const buildFacetPart = (id: string, values: string[]) => {
  /**
   * Lookup facet field by ID to pass to query
   */
  const facet = ALL_FACETS.facets.find((item) => item.id === id);

  if (!facet) return;

  const obj = {
    bool: {
      should: [
        {
          terms: {
            [facet.field]: [...values],
          },
        },
      ],
    },
  };
  return obj;
};

export { buildFacetPart };
