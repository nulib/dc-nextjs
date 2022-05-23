import React from "react";
import useFetchApiData from "@/hooks/useFetchApiData";
import { useFilterState } from "@/context/filter-context";
import { useSearchState } from "@/context/search-context";

const Preview: React.FC = () => {
  const {
    searchState: { q },
  } = useSearchState();
  const {
    filterState: { userFacetsUnsubmitted },
  } = useFilterState();

  const { data, error, loading } = useFetchApiData({
    searchTerm: q,
    size: 5,
    userFacets: userFacetsUnsubmitted,
  });

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <p>[Preview]</p>
      <ul>
        {data?.data.map((item) => (
          <li key={item.id}>{item.accession_number}</li>
        ))}
      </ul>
    </div>
  );
};

export default Preview;
