import React from "react";

interface FacetBuckets {
  key: string;
  doc_count: string;
}

interface FacetData {
  label: string;
  buckets: FacetBuckets[];
}

interface FacetProps {
  data: FacetData;
}

const Facet: React.FC<FacetProps> = ({ data }) => {
  const handleFacetChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e);
  };

  return (
    <div key={data.label}>
      <h3>{data.label}</h3>
      <input name={`${data.label}-filter`} />
      <ul>
        {data.buckets &&
          data.buckets.map((bucket, index) => (
            <li key={index}>
              <input
                id={`${data.label}-${index}`}
                name={`${data.label}`}
                onChange={handleFacetChange}
                type="checkbox"
                value={bucket.key}
              />
              <label htmlFor={`${data.label}-${index}`}>
                {bucket.key} ({bucket.doc_count})
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Facet;
