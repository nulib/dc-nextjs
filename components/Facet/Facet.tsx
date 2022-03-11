import React from "react";

interface FacetBuckets {
  key: string;
  doc_count: string;
}
export interface FacetProps {
  activeValues: [string];
  label: string;
  buckets: FacetBuckets[];
  handleFacetChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Facet: React.FC<FacetProps> = ({
  activeValues,
  label,
  buckets,
  handleFacetChange,
}) => {
  return (
    <div key={label}>
      <h3>{label}</h3>
      <input name={`${label}-filter`} />
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
