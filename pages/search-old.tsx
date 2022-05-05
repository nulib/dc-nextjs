import { FilteredFacets, UserFacets } from "types";
import { SearchResponse, Source } from "types/elasticsearch";
import ActiveFacets from "components/ActiveFacets/ActiveFacets";
import { API_PRODUCTION_URL } from "@/lib/endpoints";
import { buildQuery } from "@/lib/queries/builder";
import Container from "components/Container";
import Facet from "components/Facet/Facet";
import Layout from "components/layout";
import { NextPage } from "next";
import React from "react";
import {
  buildFacetFilterQuery,
  facetFilterQuery,
} from "lib/queries/facet-filter";
import { useSearchState } from "@/context/search-context";
import useFetchApiData from "@/hooks/useFetchApiData";
import { ApiResponseAggregation } from "@/types/api/response";

interface FacetNoLabel {
  buckets: Array<any>;
  doc_count_error_upper_bound?: number;
  sum_other_doc_count: number;
}

const SearchPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [facetFilterResults, setFacetFilterResults] =
    React.useState<FilteredFacets>({});

  const {
    searchDispatch,
    searchState: { userFacets },
  } = useSearchState();

  const {
    data: apiData,
    error,
    loading,
  } = useFetchApiData(searchTerm, userFacets);

  React.useEffect(() => {
    console.log("apiData", apiData);
    if (!apiData) return;
    clearFacetFilters();
  }, [apiData]);

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
      const query = buildFacetFilterQuery(searchTerm, name, value, userFacets);

      fetch(API_PRODUCTION_URL, {
        body: JSON.stringify(query),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((response) => {
          return response.json();
        })
        .then((facetFilterData) => {
          const newObj: FilteredFacets = { ...facetFilterResults };
          newObj[name] = facetFilterData.aggregations.facetFilter.buckets;
          setFacetFilterResults(newObj);
          return;
        });
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
          {apiData?.aggregations?.map((facet) => {
            return (
              <Facet
                buckets={facet.buckets}
                key={facet.id}
                activeValues={userFacets[facet.id] || []}
                facetFilterResults={facetFilterResults[facet.id] || []}
                handleFacetChange={handleFacetChange}
                handleFacetFilterChange={handleFacetFilterChange}
                label={facet.id}
              />
            );
          })}
        </div>

        <h2>Search Results ({apiData?.info.total})</h2>
        {loading && <p>loading...</p>}
        <ul>
          {apiData &&
            apiData.data.map((hit) => (
              <li key={hit.id}>
                {hit.title} - {hit.accession_number}
              </li>
            ))}
        </ul>
      </Container>
    </Layout>
  );
};

export default SearchPage;
