import { styled } from "@/stitches.config";

const StyledChatContextFacetsItem = styled("div", {
  display: "flex",
  gap: "0.2em",
});

const StyledChatContextFacets = styled("div", {
  background: "rgba(255, 255, 255, 0.618)",
  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.06)",
  padding: "$gr2",
  borderRadius: "3px",
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  fontSize: "$gr2",
  gap: "$gr1",
  display: "flex",
  flexDirection: "column",

  em: {
    color: "$black50",
  },

  strong: {
    fontFamily: "$northwesternSansBold",
    fontWeight: "400",
  },
});

export { StyledChatContextFacets, StyledChatContextFacetsItem };
