import React from "react";
import FacetFilter from "../FacetFilter/FacetFilter";
import { FacetBucketAgg } from "types";

interface FacetBuckets {
  key: string;
  doc_count: string;
}
export interface FacetProps {
  activeValues: string[];
  label: string;
  buckets: FacetBuckets[];
  facetFilterResults: FacetBucketAgg[];
  handleFacetChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFacetFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Facet: React.FC<FacetProps> = ({
  activeValues,
  label,
  buckets,
  facetFilterResults,
  handleFacetChange,
  handleFacetFilterChange,
}) => {
  return (
    <div key={label}>
      <h3>{label}</h3>
      <FacetFilter
        facetLabel={label}
        handleFacetFilterChange={handleFacetFilterChange}
      />
      {facetFilterResults.length > 0 && (
        <>
          <p>Facet filter results ({facetFilterResults.length})</p>
          <ul>
            {facetFilterResults.map((item, index) => {
              return (
                <li key={index}>
                  <input
                    id={`${label}-${index}`}
                    name={`${label}`}
                    type="checkbox"
                    value={item.key}
                  />
                  <label htmlFor={`${label}-${index}`}>
                    {item.key} ({item.doc_count})
                  </label>
                </li>
              );
            })}
          </ul>
          <hr />
        </>
      )}
      <ul>
        {buckets &&
          buckets.map((bucket, index) => (
            <li key={index}>
              <input
                id={`${label}-${index}`}
                name={`${label}`}
                onChange={handleFacetChange}
                type="checkbox"
                value={bucket.key}
                checked={activeValues?.includes(bucket.key)}
              />
              <label htmlFor={`${label}-${index}`}>
                {bucket.key} ({bucket.doc_count})
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Facet;
