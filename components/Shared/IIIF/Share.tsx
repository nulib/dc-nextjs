import * as Dropdown from "@radix-ui/react-dropdown-menu";

import { IconArrowForward, IconChevronDown } from "../SVG/Icons";

import CopyText from "../CopyText";
import IIIFLogo from "../SVG/IIIF";
import Icon from "../Icon";
import { styled } from "@/stitches.config";

const IIIFShare = ({ uri }: { uri: string }) => {
  return (
    <StyledIIIFShare>
      <Dropdown.Root>
        <Dropdown.Trigger>
          <Icon>
            <IIIFLogo />
          </Icon>
          <em>View as IIIF</em>
          <Icon>
            <IconChevronDown />
          </Icon>
        </Dropdown.Trigger>
        <StyledIIIFShareContent
          data-id="iiif-share-content"
          side="bottom"
          sideOffset={3}
          collisionPadding={19}
        >
          <Dropdown.Item>
            <a
              href={`https://samvera-labs.github.io/clover-iiif/docs/viewer/demo?iiif-content=${uri}`}
              target="_blank"
              rel="noreferrer"
            >
              View in Clover IIIF
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a
              href={`https://projectmirador.org/embed/?iiif-content=${uri}`}
              target="_blank"
              rel="noreferrer"
            >
              View in Mirador
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a
              href={`https://theseus-viewer.netlify.app/?iiif-content=${uri}`}
              target="_blank"
              rel="noreferrer"
            >
              View in Theseus
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a href={uri} target="_blank" rel="noreferrer">
              View Raw JSON
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <CopyText textPrompt="Copy IIIF JSON" textToCopy={uri} />
          </Dropdown.Item>
          <Dropdown.Item>
            <a
              href="https://iiif.io/get-started/why-iiif/"
              target="_blank"
              rel="noreferrer"
            >
              What is IIIF?
            </a>
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
    fontSize: "$gr2",
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
      },

      "&:last-child": {
        display: "inline-flex",
        alignItems: "center",
        gap: "$gr1",

        "svg path": {
          stroke: "$black50 !important",
        },
      },
    },

    em: {
      fontStyle: "normal",
      display: "inline-flex",
      marginBottom: "-3px",
    },

    "&:hover, &:active ": {
      color: "$black",
      fill: "$black",
      backgroundColor: "$gray6",
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
  gap: "$gr1",
  lineHeight: "1.25em",
  fontSize: "$gr2 !important",
  fontFamily: "$northwesternSansRegular",
  minWidth: "200px",

  a: {
    textDecoration: "underline",
    textDecorationThickness: "min(2px,max(1px,.05em))",
    textUnderlineOffset: "calc(.05em + 2px)",
    textDecorationColor: "$purple10",
  },

  button: {
    fontSize: "$gr2",
    margin: "0 !important",
    padding: "0 !important",
    fontWeight: "400",
    lineHeight: "inherit !important",
    textDecoration: "underline",
    textDecorationThickness: "min(2px,max(1px,.05em))",
    textUnderlineOffset: "calc(.05em + 2px)",
    textDecorationColor: "$purple10",
  },
});

export default IIIFShare;
