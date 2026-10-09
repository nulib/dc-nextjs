import styles from "@/components/Shared/IIIF/Share.module.css";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import CopyText from "../CopyText";
import IIIFLogo from "../SVG/IIIF";
import IIIFShareHelperLink from "./HelperLink";
import IIIFViewerLink from "./ViewerLink";
import Icon from "../Icon";
import { IconChevronDown } from "../SVG/Icons";
import Link from "next/link";
const IIIFShare = ({
  uri,
  dropdownMenuProps,
}: {
  uri: string;
  dropdownMenuProps?: Dropdown.DropdownMenuProps;
}) => {
  return (
    <div
      data-iiif-uri={uri}
      data-testid="iiif-share"
      className={styles.styledIIIFShare}
    >
      <Dropdown.Root {...dropdownMenuProps}>
        <Dropdown.Trigger data-testid="iiif-share-trigger">
          <Icon>
            <IIIFLogo />
          </Icon>
          <em>View as IIIF</em>
          <Icon>
            <IconChevronDown />
          </Icon>
        </Dropdown.Trigger>
        <Dropdown.Content
          data-testid="iiif-share-content"
          side="bottom"
          sideOffset={3}
          collisionPadding={19}
          className={styles.styledIIIFShareContent}
        >
          <Dropdown.Separator className={styles.styledDropdownLabel}>
            View in...
          </Dropdown.Separator>
          <Dropdown.Item>
            <IIIFViewerLink
              viewer={{
                label: "Clover IIIF",
                href: "https://samvera-labs.github.io/clover-iiif/docs/viewer/demo",
              }}
              uri={uri}
            />
          </Dropdown.Item>
          <Dropdown.Item>
            <IIIFViewerLink
              viewer={{
                label: "Mirador",
                href: "https://projectmirador.org/embed",
              }}
              uri={uri}
            />
          </Dropdown.Item>
          <Dropdown.Item>
            <IIIFViewerLink
              viewer={{
                label: "Theseus",
                href: "https://theseusviewer.org",
              }}
              uri={uri}
            />
          </Dropdown.Item>
          <Dropdown.Separator className={styles.styledDropdownSeparator} />
          <Dropdown.Item>
            <Link href={uri} target="_blank" rel="noreferrer">
              View JSON
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <CopyText textPrompt="Copy IIIF JSON" textToCopy={uri} />
          </Dropdown.Item>
          <Dropdown.Separator className={styles.styledDropdownSeparator} />
          <Dropdown.Item>
            <IIIFShareHelperLink />
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown.Root>
    </div>
  );
};
export default IIIFShare;
