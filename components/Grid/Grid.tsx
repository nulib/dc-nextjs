import Figure from "components/Figure/Figure";
import { results } from "mocks/results";
import { GridControls, GridFilter, GridItem, GridStyled } from "./Grid.styled";
import Topics from "components/Topics/Topics";
import Sticky from "react-sticky-el";
import * as Dialog from "@radix-ui/react-dialog";
import Filter from "components/Filter/Filter";

export default function Grid() {
  return (
    <>
      <GridControls>
        <Sticky topOffset={-81} stickyClassName="sticky-filter">
          <Filter />
        </Sticky>
        <Topics />
      </GridControls>
      <GridStyled breakpointCols={4}>
        {results.map((result, index) => (
          <GridItem key={index}>
            <Figure data={result} />
          </GridItem>
        ))}
      </GridStyled>
    </>
  );
}
