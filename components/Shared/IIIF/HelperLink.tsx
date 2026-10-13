import styles from "@/components/Shared/IIIF/HelperLink.module.css";
import Icon from "../Icon";
import { IconExternalLink } from "../SVG/Icons";
import Link from "next/link";
const IIIFShareHelperLink = () => {
  return (
    <Link
      href="https://iiif.io/get-started/why-iiif/"
      target="_blank"
      rel="noreferrer"
      data-id="what-is-iiif"
      className={styles.styledIIIFShareHelperLink}
    >
      <span className={styles.styledIIIFShareHelperLinkContent}>
        What is IIIF?
        <Icon hasSVGPadding={false} className={styles.override0}>
          <IconExternalLink />
        </Icon>
      </span>
    </Link>
  );
};
export default IIIFShareHelperLink;
