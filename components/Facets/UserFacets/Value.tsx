import { Icon, StyledValue, Text } from "./UserFacets.styled";
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
    <StyledValue
      aria-label={`Remove ${value} of type ${label}`}
      onClick={() => handleRemoval(instance)}
      data-testid="facet-user-value-component"
    >
      <Icon>
        <IconClear />
      </Icon>
      <Text>
        <strong>{value} </strong>
        <span>{label}</span>
      </Text>
    </StyledValue>
  );
};

export default FacetsCurrentUserValue;
