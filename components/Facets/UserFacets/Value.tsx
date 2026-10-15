import styles from "@/components/Facets/UserFacets/UserFacets.module.css";
import { CurrentFacet } from "@/components/Facets/UserFacets/UserFacets";
import { IconClear } from "@/components/Shared/SVG/Icons";
interface FacetsCurrentUserActiveProps {
  instance: CurrentFacet;
  handleRemoval: (instance: CurrentFacet) => void;
}
const FacetsCurrentUserValue: React.FC<FacetsCurrentUserActiveProps> = ({
  instance,
  handleRemoval,
}) => {
  const { label, value } = instance;
  return (
    <button
      aria-label={`Remove ${value} of type ${label}`}
      onClick={() => handleRemoval(instance)}
      data-testid="facet-user-value-component"
      className={styles.styledValue}
    >
      <span className={styles.icon}>
        <IconClear />
      </span>
      <div className={styles.text}>
        <strong>{value} </strong>
        <span>{label}</span>
      </div>
    </button>
  );
};
export default FacetsCurrentUserValue;
