import React from "react";
import { NextPage } from "next";
import Layout from "components/layout";
import Container from "components/Container";
import useApiSearch from "hooks/useApiSearch";

const ALL_FACETS = ["subject", "genre"];

const requestBody = {
  query: {
    simple_query_string: {
      query: '"fried eggs" +(eggplant | potato) -frittata',
      fields: ["title^5", "body"],
      default_operator: "and",
    },
  },
};

//const stringBody = JSON.stringify();

const url = `https://dcapi.stack.rdc-staging.library.northwestern.edu/search/meadow/_search`;

const SearchPage: NextPage = () => {
  const [esData, setEsData] = React.useState();
  const { defaultQuery, updateSearch } = useApiSearch();
  const [searchTerm, setSearchTerm] = React.useState("");

  React.useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateSearch(searchTerm)),
    })
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((moreData) => {
        console.log("moreData", moreData);
        setEsData(moreData);
      });
  }, [searchTerm]);

  // TODO: Put a debounce on this
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFacetChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.dataset.facet);
    console.log(e.target.dataset.label);

    // {
    //   genre: [
    //     "", ""
    //   ],
    //   subject: [],
    // }
  };

  const facets = Object.entries(esData.aggregations).map((facet) => {
    console.log(`facet`, facet);
    return { facetLabel: facet[0], ...facet[1] };
  });

  return (
    <Layout>
      <Container>
        <h1>Search ES Throwaway</h1>
        <label>Search term:</label>
        <input type="text" name="search" onChange={handleSearchChange} />
        <button>Submit</button>

        <h2>Facets</h2>

        <ul>
          {facets &&
            facets.map((facet) => (
              <li>
                {facet.facetLabel}
                <input name={`${facet.facetLabel}-filter`} />
                <ul>
                  {facet.buckets &&
                    facet.buckets.map((bucket, index) => (
                      <li>
                        <input
                          type="checkbox"
                          id={`${facet.facetLabel}-${index}`}
                          name={`${facet.facetLabel}-${index}`}
                          data-label={bucket.key}
                          data-facet={facet.facetLabel}
                          onChange={handleFacetChange}
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
