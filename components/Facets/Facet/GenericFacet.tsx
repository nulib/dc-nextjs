import styles from "@/components/Facets/Facet/GenericFacet.module.css";
import { ChangeEvent } from "react";
import FacetOptions from "@/components/Facets/Facet/Options";
import { FacetsInstance } from "@/types/components/facets";
import Heading from "@/components/Heading/Heading";
import { IconSearch } from "@/components/Shared/SVG/Icons";
import React from "react";
import { debounce } from "@/lib/utils/debounce";
interface GenericFacetProps {
  facet: FacetsInstance;
}
const GenericFacet: React.FC<GenericFacetProps> = ({ facet }) => {
  const { id, label } = facet;
  const [aggsFilterValue, setAggsFilterValue] = React.useState("");
  const handleFindChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setAggsFilterValue(e.target.value);
  };
  /* eslint-disable */
  const debouncedHandler = React.useCallback(
    debounce(handleFindChange, 200),
    [],
  );
  /* eslint-enable */
  return (
    <div
      data-testid="facet-multi-component"
      id={`facet--${id}`}
      className={styles.styledGenericFacet}
    >
      <Heading as="h3">{facet ? label : id}</Heading>
      <div
        data-testid="facet-find"
        className={[styles.find, "facet-find"].filter(Boolean).join(" ")}
      >
        <IconSearch />
        <input
          aria-label={`Find ${id}`}
          placeholder={`Find ${label}`}
          onChange={(e: ChangeEvent<HTMLInputElement>) => debouncedHandler(e)}
          type="text"
          className={styles.findInput}
        />
      </div>
      <FacetOptions aggsFilterValue={aggsFilterValue} facet={facet} />
    </div>
  );
};
export default GenericFacet;
