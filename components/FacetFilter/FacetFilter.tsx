export interface FacetFilterProps {
  facetLabel: string;
  handleFacetFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FacetFilter: React.FC<FacetFilterProps> = ({
  facetLabel,
  handleFacetFilterChange,
}) => {
  return (
    <input
      type="text"
      id={`${facetLabel}-filter`}
      name={facetLabel}
      onChange={handleFacetFilterChange}
    />
  );
};

export default FacetFilter;
