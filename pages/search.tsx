import React from "react";
import { NextPage } from "next";
import Layout from "components/layout";
import Container from "components/Container";
import useApiSearch from "hooks/useApiSearch";
import Facet, { FacetProps } from "components/Facet/Facet";
import { API_PRODUCTION_URL } from "lib/queries/endpoints";
import { UserFacets } from "types";
import ActiveFacets from "components/ActiveFacets/ActiveFacets";

const ALL_FACETS = ["subject", "genre"];

const SearchPage: NextPage = () => {
  const [esData, setEsData] = React.useState();
  const [aggregatedFacets, setAggregatedFacets] = React.useState([]);
  const [userFacets, setUserFacets] = React.useState({});
  const { updateQuery } = useApiSearch();
  const [searchTerm, setSearchTerm] = React.useState("");

  const getAPIData = React.useCallback(async () => {
    const response = await fetch(API_PRODUCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateQuery(searchTerm, userFacets)),
    });
    const data = await response.json();
    return data;
  }, [searchTerm, userFacets]);

  React.useEffect(() => {
    async function fn() {
      const data = await getAPIData();
      console.log("data", data);
      setEsData(data);
      setAggregatedFacets(
        Object.entries(data?.aggregations).map((facet) => {
          return { label: facet[0], ...facet[1] };
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
            aggregatedFacets.map((facet: FacetProps) => {
              return (
                <Facet
                  {...facet}
                  key={facet.label}
                  activeValues={userFacets[facet.label] || []}
                  handleFacetChange={handleFacetChange}
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
