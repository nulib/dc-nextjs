import Container from "@/components/Container";
import Layout from "@/components/layout";
import { NextPage } from "next";
import Heading from "@/components/Heading/Heading";
import React from "react";
import { FilteredFacets, UserFacets } from "types";
import { SearchResponse, Source } from "types/elasticsearch";
import { API_PRODUCTION_URL } from "lib/queries/endpoints";
import ActiveFacets from "components/ActiveFacets/ActiveFacets";
import Facet from "components/Facet/Facet";
import { facetFilterQuery } from "lib/queries/facet-filter";
import useApiSearch from "hooks/useApiSearch";
import Grid from "@/components/Grid/Grid";

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
  const [userFacets, setUserFacets] = React.useState<UserFacets>({});
  const [searchTerm, setSearchTerm] = React.useState("");
  const [facetFilterResults, setFacetFilterResults] =
    React.useState<FilteredFacets>({});
  const { updateQuery } = useApiSearch();

  const getAPIData = React.useCallback(async () => {
    const response = await fetch(API_PRODUCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateQuery(searchTerm, userFacets)),
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

    setUserFacets(newObj);
  };

  const clearFacetFilters = () => {
    setFacetFilterResults({});
  };

  const handleFacetFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value === "") {
      return;
    } else {
      fetch(API_PRODUCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          facetFilterQuery(searchTerm, name, value, userFacets)
        ),
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
      <Heading as="h1" title="Search" isHidden />
      <ResultCount count={esData?.hits.total} />
      {esData && <Grid hits={esData.hits} />}
    </Layout>
  );
};

/**
 *
 * @param count
 * @returns
 */
const ResultCount = ({ count }) => <span>{count}</span>;

export default SearchPage;
