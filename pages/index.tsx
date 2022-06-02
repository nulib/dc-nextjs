import Header from "@/components/Header/Header";
import { PlaceholderBlock } from "@/components/Shared/PlaceholderBlock.styled";

const HomePage: React.FC = () => {
  return (
    <div data-testid="home-page-wrapper">
      <Header />
      <PlaceholderBlock>Home page</PlaceholderBlock>
    </div>
  );
};

export default HomePage;
