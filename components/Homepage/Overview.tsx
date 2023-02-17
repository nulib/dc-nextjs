import {
  Content,
  Images,
  Inner,
  OverviewStyled,
} from "@/components/Homepage/Overview.styled";
import { Button } from "@nulib/design-system";
import Container from "@/components/Shared/Container";
import { Thumbnail } from "@samvera/nectar-iiif";
import { overviewThumbnails } from "@/lib/constants/homepage";
import { useRouter } from "next/router";

const HomepageOverview = () => {
  const router = useRouter();

  return (
    <OverviewStyled>
      <Container>
        <Inner>
          <Content>
            <h2>Enrich your research with primary sources</h2>
            <p>
              Explore digital resources from the Northwestern University Library
              collections – including letters, photographs, diaries, maps, and
              audiovisual materials - as well as licensed art historical images
              for teaching and reference.
            </p>
            <Button isPrimary isLowercase onClick={() => router.push("/about")}>
              Learn More
            </Button>
          </Content>
          <Images>
            {overviewThumbnails.map((item, index) => (
              <Thumbnail thumbnail={item} key={index} />
            ))}
          </Images>
        </Inner>
      </Container>
    </OverviewStyled>
  );
};

export default HomepageOverview;
