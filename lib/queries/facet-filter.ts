import { UserFacets } from "types";
import { FacetsInstance, ALL_FACETS } from "lib/facets";

const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const facetFilter = (facetLabel: string, facets: Array<FacetsInstance>) => {
  return facets.find(({ id }) => id === facetLabel)?.field;
};

export const facetFilterQuery = (
  searchTerm: string,
  facetLabel: string,
  term: any,
  userFacets: UserFacets
) => {
  const facetFilterKey = facetFilter(facetLabel, ALL_FACETS.facets);
  const newQuery = {
    ...buildFacetFilterQuery(
      searchTerm,
      facetFilterKey,
      facetLabel,
      term,
      userFacets
    ),
  };
  return newQuery;
};

const buildFacetFilterQuery = (
  searchTerm: string,
  facetField: any,
  facetLabel: string,
  term: any,
  userFacets: UserFacets
) => {
  const regexp = userFacets[facetLabel];
  const excludes = regexp
    ? regexp.map((string) => escapeRegExp(string)).join("|")
    : null;

  const newQuery = JSON.parse(
    JSON.stringify(baseQuery(facetField, term, excludes))
  );

  /**
   * Add search term to the API query
   */
  if (searchTerm) {
    newQuery.query.bool.must.push(buildSearchQuery(searchTerm));
  }

  /**
   * Add facets to the API query
   */
  for (const [key, value] of Object.entries(userFacets)) {
    if (value?.length > 0) {
      newQuery.query.bool.must.push(buildFacetPart(key, value));
    }
  }

  /**
   * Add excludes to the API query
   */
  if (excludes) {
    newQuery.aggs.facetFilter.terms.exclude = excludes;
  }

  return newQuery;
};

const baseQuery = (facetField: any, term: any, excludes: any) => {
  return {
    size: 0,
    query: {
      bool: {
        must: [
          {
            bool: {
              must: [{ match: { "model.name": "Work" } }],
            },
          },
        ],
      },
    },
    aggs: {
      facetFilter: {
        terms: {
          field: `${facetField}`,
          include: `.*${term}.*`,
          size: 20,
        },
      },
    },
  };
};

const buildSearchQuery = (term: string) => {
  return {
    simple_query_string: {
      query: term ? `${term}~1 | ${term}*` : "",
      fields: [
        "all_titles^5",
        "description^2",
        "all_subjects^2",
        "full_text",
        "legacy_identifier",
        "accession_number",
        "id",
      ],
      default_operator: "or",
    },
  };
};

const buildFacetPart = (name: string, values: string[]) => {
  const obj = {
    bool: {
      should: [
        {
          terms: {
            // TODO: Pull from a global mapper object which ties convenience key labels to Elasticsearch defined key values
            [`descriptiveMetadata.${name}.displayFacet`]: [...values],
          },
        },
      ],
    },
  };
  return obj;
};
