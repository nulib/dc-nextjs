import Layout from "@/components/layout";
import Overview from "@/components/Home/Overview";
import { PlaceholderBlock } from "@/components/Shared/PlaceholderBlock.styled";
import { buildDataLayer } from "@/lib/ga/data-layer";

const HomePage: React.FC = () => {
  return (
    <Layout header="hero">
      <Overview />
      <PlaceholderBlock css={{ height: "100vh" }} />
    </Layout>
  );
};

export async function getStaticProps() {
  const dataLayer = buildDataLayer({
    pageTitle: "Homepage",
  });

  return {
    props: { dataLayer },
  };
}

export default HomePage;
