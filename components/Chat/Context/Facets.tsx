import {
  StyledChatContextFacets,
  StyledChatContextFacetsItem,
} from "./Facets.styled";

import { ALL_FACETS } from "@/lib/constants/facets-model";
import { UserFacets } from "@/types/context/search-context";

interface ChatContextFacetsProps {
  facets: UserFacets;
}

const ChatContextFacets: React.FC<ChatContextFacetsProps> = ({ facets }) => {
  const facetsAsArray = Object.entries(facets).map(([key, values]) => ({
    key,
    values,
  }));

  const getFacetLabel = (key: string) => {
    // look up facet label based on key
    const facet = ALL_FACETS.facets.find((f) => f.id === key);
    return facet ? facet.label : key;
  };

  return (
    <StyledChatContextFacets>
      {facetsAsArray.map(({ key, values }) => (
        <StyledChatContextFacetsItem key={key}>
          {values && values.length > 0 ? (
            <span>
              {values.map((value, index) => (
                <strong key={`${key}-${index}`}>{value}</strong>
              ))}
            </span>
          ) : (
            <span>No values</span>
          )}
          <span>
            <em>({getFacetLabel(key)})</em>
          </span>
        </StyledChatContextFacetsItem>
      ))}
    </StyledChatContextFacets>
  );
};

export default ChatContextFacets;
