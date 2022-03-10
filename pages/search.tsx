import React from "react";
import { NextPage } from "next";
import Layout from "components/layout";
import Container from "components/Container";
import useApiSearch from "hooks/useApiSearch";

const ALL_FACETS = ["subject", "genre"];
const url = `https://dcapi.stack.rdc-staging.library.northwestern.edu/search/meadow/_search`;

const SearchPage: NextPage = () => {
  const [esData, setEsData] = React.useState();
  const [aggregatedFacets, setAggregatedFacets] = React.useState([]);
  const { defaultQuery, facetQuery, filteredQuery, updateSearch } =
    useApiSearch();
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
        return { facetLabel: facet[0], ...facet[1] };
      })
    );
  }, [esData]);

  // TODO: Put a debounce on this
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFacetChange = (e) => {
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

        <ul>
          {aggregatedFacets &&
            aggregatedFacets.map((facet) => (
              <li key={facet.label}>
                {facet.facetLabel}
                <input name={`${facet.facetLabel}-filter`} />
                <ul>
                  {facet.buckets &&
                    facet.buckets.map((bucket, index) => (
                      <li key={index}>
                        <input
                          type="checkbox"
                          id={`${facet.facetLabel}-${index}`}
                          name={`${facet.facetLabel}`}
                          data-label={bucket.key}
                          data-facet={facet.facetLabel}
                          onChange={handleFacetChange}
                          value={bucket.key}
                        />
                        <label htmlFor={`${facet.facetLabel}-${index}`}>
                          {bucket.key} ({bucket.doc_count})
                        </label>
                      </li>
                    ))}
                </ul>
              </li>
            ))}
        </ul>

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
