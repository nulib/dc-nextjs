import {
  GridControls,
  GridItem,
  GridStyled,
} from "@/components/Grid/Grid.styled";
import Figure from "@/components/Figure/Figure";
import Filter from "@/components/Filter/Filter";
import Sticky from "react-sticky-el";
import Topics from "@/components/Topics/Topics";

export default function Grid({ hits }) {
  return (
    <>
      <GridControls>
        <Sticky topOffset={-81} stickyClassName="sticky-filter">
          <Filter />
        </Sticky>
        <Topics />
      </GridControls>

      <GridStyled breakpointCols={4}>
        {hits.hits.map((hit) => (
          <GridItem key={hit._source.accessionNumber}>
            <Figure data={{ height: "200", title: "garbage", type: "stuff" }} />
          </GridItem>
        ))}
      </GridStyled>
    </>
  );
}
