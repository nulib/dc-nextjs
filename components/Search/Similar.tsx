import styles from "@/components/Search/Similar.module.css";
import Announcement from "@/components/Shared/Announcement";
import { IconClear } from "@/components/Shared/SVG/Icons";
import Link from "next/link";
import React from "react";
interface Props {
  handleClose: () => void;
  work: {
    id: string;
    title: string;
  };
}
const SearchSimilar: React.FC<Props> = ({ handleClose, work }) => {
  return (
    <Announcement className={styles.similarWrapper}>
      <div className={styles.similarStyled}>
        <p>
          You are viewing works similar to{" "}
          <Link href={`/items/${work?.id}`}>{work?.title}</Link>
        </p>
        <button type="button" onClick={handleClose}>
          <span>Close</span>
          <IconClear />
        </button>
      </div>
    </Announcement>
  );
};
export default SearchSimilar;
