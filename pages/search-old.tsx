import { FilteredFacets, UserFacets } from "types";
import { SearchResponse, Source } from "types/elasticsearch";
import { API_PRODUCTION_URL } from "@/lib/endpoints";
import ActiveFacets from "components/ActiveFacets/ActiveFacets";
import Container from "components/Container";
import Facet from "components/Facet/Facet";
import Layout from "components/layout";
import { NextPage } from "next";
import React from "react";
import { facetFilterQuery } from "lib/queries/facet-filter";
import { buildQuery } from "@/lib/queries/builder";
import { useSearchState } from "@/context/search-context";

interface FacetNoLabel {
  buckets: Array<any>;
  doc_count_error_upper_bound?: number;
  sum_other_doc_count: number;
}
export interface AggregatedFacets extends FacetNoLabel {
  label: string;
}

const SearchPage: NextPage = () => {
  const [esData, setEsData] = React.useState<SearchResponse<Source>>();
  const [aggregatedFacets, setAggregatedFacets] = React.useState<
    Array<AggregatedFacets>
  >([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [facetFilterResults, setFacetFilterResults] =
    React.useState<FilteredFacets>({});

  // New context pattern
  const { searchDispatch, searchState } = useSearchState();
  const { userFacets } = searchState;

  const getAPIData = React.useCallback(async () => {
    const response = await fetch(API_PRODUCTION_URL, {
      body: JSON.stringify(buildQuery(searchTerm, userFacets)),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const data: SearchResponse<Source> = await response.json();
    clearFacetFilters();

    return data;
  }, [searchTerm, userFacets]);

  React.useEffect(() => {
    async function fn() {
      const data = await getAPIData();
      setEsData(data);

      setAggregatedFacets(
        Object.entries(data?.aggregations).map((facet) => {
          return { label: facet[0], ...(facet[1] as FacetNoLabel) };
        })
      );
    }
    fn();
  }, [getAPIData]);

  // TODO: Put a debounce on this
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFacetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newObj: UserFacets = { ...userFacets };
    const { checked, name, value } = e.target;

    // Checkbox is checked
    if (checked) {
      if (!newObj[name]) {
        newObj[name] = [value];
      } else {
        newObj[name].push(value);
      }
    }
    // Not checked, remove value from the array
    else {
      newObj[name] = [...newObj[name]].filter((arrValue) => arrValue !== value);
    }

    searchDispatch({
      type: "updateUserFacets",
      userFacets: newObj,
    });
  };

  const clearFacetFilters = () => {
    setFacetFilterResults({});
  };

  const handleFacetFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value === "") {
      return;
    } else {
      const query = facetFilterQuery(searchTerm, name, value, userFacets);

      // fetch(API_PRODUCTION_URL, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(
      //     facetFilterQuery(searchTerm, name, value, userFacets)
      //   ),
      // })
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((facetFilterData) => {
      //     const newObj: FilteredFacets = { ...facetFilterResults };
      //     newObj[name] = facetFilterData.aggregations.facetFilter.buckets;
      //     setFacetFilterResults(newObj);
      //     return;
      //   });
    }
  };

  return (
    <Layout>
      <Container>
        <h1>Search ES Throwaway</h1>
        <label>Search term:</label>
        <input type="text" name="search" onChange={handleSearchChange} />
        <button>Submit</button>

        <h2>Active Facets</h2>
        <ActiveFacets userFacets={userFacets} />

        <h2>Facets</h2>
        <div>
          {aggregatedFacets &&
            aggregatedFacets.map((facet) => {
              return (
                <Facet
                  {...facet}
                  key={facet.label}
                  activeValues={userFacets[facet.label] || []}
                  facetFilterResults={facetFilterResults[facet.label] || []}
                  handleFacetChange={handleFacetChange}
                  handleFacetFilterChange={handleFacetFilterChange}
                />
              );
            })}
        </div>

        <h2>Search Results ({esData?.hits.total})</h2>
        <ul>
          {esData &&
            esData.hits.hits.map((hit) => (
              <li key={hit._id}>
                {hit._source.title} - {hit._source.accessionNumber}
              </li>
            ))}
        </ul>
      </Container>
    </Layout>
  );
};

export default SearchPage;
