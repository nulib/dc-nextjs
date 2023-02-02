import { RelatedItemsStyled } from "@/components/Shared/RelatedItems.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const OrganizationStyled = styled(RelatedItemsStyled, {
  ".bloom-header-homepage, .bloom-header-label": {
    display: "none",
  },
});

export { OrganizationStyled };
