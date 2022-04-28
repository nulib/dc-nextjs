import { FacetOption } from "@/types/components/facets";

const Option: React.FC<FacetOption> = ({ bucket, facet, index, type }) => {
  const { doc_count, key } = bucket;
  const id = `${facet}-${index}`;
  return (
    <li>
      <input id={id} name={`facet--${facet}`} type={type} />
      <label htmlFor={id}>{key}</label>
      <span>{doc_count}</span>
    </li>
  );
};

export default Option;
