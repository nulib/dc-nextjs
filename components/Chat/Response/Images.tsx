import GridItem from "@/components/Grid/Item";
import { StyledImages } from "@/components/Chat/Response/Response.styled";
import { Work } from "@nulib/dcapi-types";

const INITIAL_MAX_ITEMS = 5;

const ResponseImages = ({ works }: { works: Work[] }) => {
  return (
    <StyledImages>
      {works.slice(0, INITIAL_MAX_ITEMS).map((document: Work) => (
        <GridItem key={document.id} item={document} />
      ))}
    </StyledImages>
  );
};

export default ResponseImages;
