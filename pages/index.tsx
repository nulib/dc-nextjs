import Layout from "@/components/layout";
import Overview from "@/components/Home/Overview";
import { PlaceholderBlock } from "@/components/Shared/PlaceholderBlock.styled";

const HomePage: React.FC = () => {
  return (
    <Layout header="hero">
      <Overview />
      <PlaceholderBlock css={{ height: "100vh" }} />
    </Layout>
  );
};

export default HomePage;
