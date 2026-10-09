import styles from "@/components/Chat/Response/Response.module.css";
import GridItem from "@/components/Grid/Item";
import { Work } from "@nulib/dcapi-types";
export const INITIAL_MAX_ITEMS = 5;
const ResponseImages = ({ works }: { works: Work[] }) => {
  return (
    <div
      className={[styles.styledImages, "response-images"]
        .filter(Boolean)
        .join(" ")}
    >
      {works.slice(0, INITIAL_MAX_ITEMS).map((document: Work) => (
        <GridItem key={document.id} item={document} />
      ))}
    </div>
  );
};
export default ResponseImages;
