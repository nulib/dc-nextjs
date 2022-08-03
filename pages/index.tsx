import Header from "@/components/Header/Header";
import { PlaceholderBlock } from "@/components/Shared/PlaceholderBlock.styled";

const HomePage: React.FC = () => {
  return (
    <div data-testid="home-page-wrapper">
      <Header isHero />
      <PlaceholderBlock css={{ height: "200vh" }}>...</PlaceholderBlock>
    </div>
  );
};

export default HomePage;
