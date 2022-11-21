import { VariantProps, styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const MessageContent = styled("div", {
  display: "flex",
  padding: "$gr4 0",
  color: "$white",
  lineHeight: "1.15em",
  overflow: "hidden",

  "& div:first-child": {
    marginRight: "$gr6",
  },

  button: {
    color: "inherit",
    fontFamily: "$northwesternSansBold",
    textDecoration: "underline",
  },
});

const MessageTitle = styled("span", {
  display: "block",
  fontFamily: "$northwesternDisplayBook",
  fontSize: "$gr5",
  margin: "0 0 $gr2",
});

const MessageText = styled("span", {
  display: "block",
  fontFamily: "$northwesternSansLight",
  fontSize: "$gr3",
});

const MessageStyled = styled("div", {
  position: "fixed",
  display: "flex",
  bottom: "0",
  zIndex: "1",
  width: "100%",
  backgroundColor: "$darkBlueA",

  variants: {
    status: {
      false: {
        height: "0",
        opacity: "0",
      },
    },
  },
});

export type ExpandVariants = VariantProps<typeof MessageStyled>;

export { MessageContent, MessageTitle, MessageText, MessageStyled };
