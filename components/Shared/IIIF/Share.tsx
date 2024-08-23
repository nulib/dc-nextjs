import * as Dropdown from "@radix-ui/react-dropdown-menu";

import CopyText from "../CopyText";
import IIIFLogo from "../SVG/IIIF";
import Icon from "../Icon";
import { IconArrowForward } from "../SVG/Icons";
import { styled } from "@/stitches.config";

const IIIFShare = ({ uri }: { uri: string }) => {
  return (
    <StyledIIIFShare>
      <Dropdown.Root>
        <Dropdown.Trigger>
          <Icon>
            <IIIFLogo />
          </Icon>
          View as IIIF
          <Icon>
            <IconArrowForward />
          </Icon>
        </Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item>
            <CopyText textPrompt="Copy IIIF" textToCopy={uri} />
          </Dropdown.Item>
          <Dropdown.Item>
            <a href={uri} target="_blank" rel="noreferrer">
              View IIIF JSON
            </a>
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
        </Dropdown.Content>
      </Dropdown.Root>
    </StyledIIIFShare>
  );
};

const StyledIIIFShare = styled("div", {
  position: "relative",
  zIndex: 1,

  "> button": {
    backgroundColor: "$gray6",
    color: "$black50",
    fill: "$black50",
    fontFamily: "$northwesternSansRegular",
    fontSize: "$gr2",
    borderRadius: "38px",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",

    "&:hover, &:active ": {
      color: "$black",
      fill: "$black",
      backgroundColor: "$black10",
    },
  },

  [`${Dropdown.Content}`]: {
    backgroundColor: "$white",
  },
});

export default IIIFShare;
