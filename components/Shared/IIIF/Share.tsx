import * as Dropdown from "@radix-ui/react-dropdown-menu";

import { IconChevronDown, IconExternalLink } from "../SVG/Icons";

import CopyText from "../CopyText";
import IIIFLogo from "../SVG/IIIF";
import IIIFViewerLink from "./ViewerLink";
import Icon from "../Icon";
import Link from "next/link";
import { styled } from "@/stitches.config";

const IIIFShare = ({
  uri,
  dropdownMenuProps,
}: {
  uri: string;
  dropdownMenuProps?: Dropdown.DropdownMenuProps;
}) => {
  return (
    <StyledIIIFShare data-iiif-uri={uri} data-testid="iiif-share">
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
        <StyledIIIFShareContent
          data-testid="iiif-share-content"
          side="bottom"
          sideOffset={3}
          collisionPadding={19}
        >
          <StyledDropdownLabel>View in...</StyledDropdownLabel>
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
          <StyledDropdownSeparator />
          <Dropdown.Item>
            <Link href={uri} target="_blank" rel="noreferrer">
              View Raw JSON
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <CopyText textPrompt="Copy IIIF JSON" textToCopy={uri} />
          </Dropdown.Item>
          <StyledDropdownSeparator />
          <Dropdown.Item>
            <Link
              href="https://iiif.io/get-started/why-iiif/"
              target="_blank"
              rel="noreferrer"
              data-id="what-is-iiif"
            >
              What is IIIF?
              <Icon
                style={{
                  display: "inline-flex",
                  width: "12px",
                  height: "12px",
                  color: "$black50",
                  fill: "$black50",
                  marginLeft: "0.25em",
                }}
                hasSVGPadding={false}
              >
                <IconExternalLink />
              </Icon>
            </Link>
          </Dropdown.Item>
        </StyledIIIFShareContent>
      </Dropdown.Root>
    </StyledIIIFShare>
  );
};

const StyledIIIFShare = styled("div", {
  position: "relative",
  zIndex: 1,

  "> button": {
    backgroundColor: "transparent",
    color: "$black50",
    fontFamily: "$northwesternSansRegular",
    fontSize: "$gr3",
    borderRadius: "38px",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    gap: "$gr1",
    padding: "0 $gr1",
    margin: "0",

    "> span": {
      svg: {
        padding: "7px",
        path: {
          fill: "$purple !important",
        },
      },

      "&:last-child": {
        display: "inline-flex",
        alignItems: "center",
        gap: "$gr1",

        "svg path": {
          stroke: "$black50 !important",
          fill: "none !important",
        },
      },
    },

    em: {
      fontStyle: "normal",
      display: "inline-flex",
      marginBottom: "-3px",
    },

    "&:hover, &:active ": {
      color: "$purple",
      fill: "$black",
      backgroundColor: "$purple10",

      "> span:last-child svg path": {
        stroke: "$purple !important",
      },
    },
  },
});

const StyledIIIFShareContent = styled(Dropdown.Content, {
  zIndex: 1,
  backgroundColor: "$white",
  padding: "$gr3",
  borderRadius: "3px",
  boxShadow: "5px 5px 19px 0 #0002",
  display: "flex",
  flexDirection: "column",
  fontSize: "$gr2 ",
  minWidth: "160px",
  gap: "$gr2",

  a: {
    color: "$purple",
    display: "flex",

    svg: {
      color: "$purple",
      fill: "$purple",
    },
  },

  button: {
    fontSize: "$gr2",
    margin: "0 !important",
    padding: "0 !important",
    fontWeight: "400",
    lineHeight: "inherit !important",
    textDecoration: "none",
    color: "$purple",
  },
});

const StyledDropdownLabel = styled(Dropdown.Separator, {
  fontSize: "$gr2 ",
  color: "$black50",
});

const StyledDropdownSeparator = styled(Dropdown.Separator, {
  height: "1px",
  backgroundColor: "$gray6",
});

export default IIIFShare;
