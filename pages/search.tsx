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
  }, [searchTerm, updateSearch]);

  // TODO: Put a debounce on this
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
          <li>
            Subject
            <input name="subject-filter" />
            <ul>
              <li>
                <input type="checkbox" name="subject1" />
                Black and white negatives (1)
              </li>
              <li>
                <input type="checkbox" name="subject2" />
                Something else (3)
              </li>
            </ul>
          </li>
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
