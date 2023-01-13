import {
  Content,
  Images,
  Inner,
  OverviewStyled,
} from "@/components/Homepage/Overview.styled";
import { Button } from "@nulib/design-system";
import Container from "@/components/Shared/Container";
import Link from "next/link";
import { Thumbnail } from "@samvera/nectar-iiif";
import { overviewThumbnails } from "@/lib/constants/homepage";

const HomepageOverview = () => {
  return (
    <OverviewStyled>
      <Container>
        <Inner>
          <Content>
            <h2>Enrich your research with primary sources</h2>
            <p>
              Explore millions of high-quality primary sources and images from
              around the world, including artworks, maps, photographs, and more.{" "}
            </p>
            <Link href="/about">
              <Button isPrimary>Learn More</Button>
            </Link>
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
