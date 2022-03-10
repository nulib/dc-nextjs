import React from "react";
import { NextPage } from "next";
import Layout from "components/layout";
import Container from "components/Container";
import useApiSearch from "hooks/useApiSearch";
import Facet, { FacetProps } from "components/Facet/Facet";

const ALL_FACETS = ["subject", "genre"];
const url = `https://dcapi.stack.rdc-staging.library.northwestern.edu/search/meadow/_search`;

const SearchPage: NextPage = () => {
  const [esData, setEsData] = React.useState();
  const [aggregatedFacets, setAggregatedFacets] = React.useState([]);
  const {
    defaultQuery,
    facetQuery,
    filteredQuery,
    filteredQuery2,
    updateSearch,
  } = useApiSearch();
  const [searchTerm, setSearchTerm] = React.useState("");

  const [userFacets, setUserFacets] = React.useState({});

  React.useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(updateSearch(searchTerm)),
      body: JSON.stringify(facetQuery),
    })
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((moreData) => {
        console.log("moreData", moreData);
        setEsData(moreData);
      });
  }, [searchTerm, userFacets]);

  React.useEffect(() => {
    if (!esData?.aggregations) return;
    setAggregatedFacets(
      Object.entries(esData.aggregations).map((facet) => {
        return { label: facet[0], ...facet[1] };
      })
    );
  }, [esData]);

  // TODO: Put a debounce on this
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFacetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e", e.target.checked);
    const newObj = { ...userFacets };
    const { checked, name, value } = e.target;

    // Check on
    if (checked) {
      if (!newObj[name]) {
        newObj[name] = [value];
      } else {
        newObj[name].push(value);
      }
    } else {
      // Remove item from the array
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

        <h2>Facets</h2>
        <div>
          {aggregatedFacets &&
            aggregatedFacets.map((facet: FacetProps) => (
              <Facet
                {...facet}
                key={facet.label}
                handleFacetChange={handleFacetChange}
              />
            ))}
        </div>

        <h2>Search Results</h2>
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
