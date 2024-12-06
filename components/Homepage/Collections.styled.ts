/* eslint sort-keys: 0 */

import { FigureTitle } from "@/components/Figure/Figure.styled";
import { styled } from "@/stitches.config";

const HomepageCollectionsStyled = styled("section", {
  [`${FigureTitle}`]: {
    lineHeight: "1.25em",
    fontSize: "$gr4",

    "@md": {
      fontSize: "$gr3",
    },
  },
});

export { HomepageCollectionsStyled };
