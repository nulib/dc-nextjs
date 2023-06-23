import SearchPrototype from "@/components/SearchPrototype/SearchPrototype";

const HomePage: React.FC = () => {
  return (
    <>
      <SearchPrototype />
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default HomePage;
