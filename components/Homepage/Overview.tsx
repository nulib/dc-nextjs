import styles from "@/components/Homepage/Overview.module.css";
import { Button } from "@/components/Shared/Button/Button";
import Container from "@/components/Shared/Container";
import { Thumbnail } from "@samvera/clover-iiif/primitives";
import { overviewThumbnails } from "@/lib/constants/homepage";
import { useRouter } from "next/router";
const HomepageOverview = () => {
  const router = useRouter();
  return (
    <section className={styles.overviewStyled}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.content}>
            <h2>Enrich your research with primary sources</h2>
            <p>
              Explore digital resources from the Northwestern University Library
              collections – including letters, photographs, diaries, maps, and
              audiovisual materials - as well as licensed art historical images
              for teaching and reference.
            </p>
            <Button
              variant="primary"
              textCase="normal"
              onClick={() => router.push("/about")}
            >
              Learn More
            </Button>
          </div>
          <div className={styles.images}>
            {overviewThumbnails.map((item, index) => (
              <Thumbnail thumbnail={item} key={index} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
export default HomepageOverview;
