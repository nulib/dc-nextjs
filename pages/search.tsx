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
  const searchTerm = '"nez perce"';
  const userFacets = {};

  const [esData, setEsData] = React.useState<SearchResponse<Source>>();
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

    return data;
  }, [searchTerm, userFacets]);

  React.useEffect(() => {
    async function fn() {
      const data = await getAPIData();
      setEsData(data);
    }
    fn();
  }, [getAPIData]);

  return (
    <Layout>
      <Heading as="h1" title="Search" isHidden />
      {esData && <Grid hits={esData?.hits} />}
    </Layout>
  );
};

export default SearchPage;
