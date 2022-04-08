import {
  GridControls,
  GridItem,
  GridStyled,
} from "@/components/Grid/Grid.styled";
import Figure from "@/components/Figure/Figure";
import Filter from "@/components/Filter/Filter";
import Sticky from "react-sticky-el";
import Topics from "@/components/Topics/Topics";
import { results } from "@/mocks/results";

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
