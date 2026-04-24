import { styled } from "@/stitches.config";
import Link from "next/link";

const FILESET_THUMBNAIL_SIZE = 60;

const Wrapper = styled("div", {
  padding: "0 $gr4 $gr6",
});

const WorkGroup = styled("div", {
  marginBottom: "$gr3",
  gap: "$gr5",
  display: "flex",
});

const WorkHeader = styled("div", {
  display: "flex",
  gap: "$gr3",
  width: "200px",
  flexShrink: 0,

  a: {
    minWidth: "100%",
  },
});

const WorkFilesets = styled("div", {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  gap: "$gr4",
  paddingRight: "$gr4",
});

const FileSetRow = styled("div", {
  display: "flex",
  alignItems: "flex-start",
  gap: "$gr3",
  paddingBottom: "$gr3",
  borderBottom: "1px solid $gray6",

  "&:last-child": {
    borderBottom: "none",
  },
});

const ThumbnailLink = styled(Link, {
  display: "block",
  flexShrink: 0,
});

const ThumbnailWrapper = styled("div", {
  position: "relative",
  width: `${FILESET_THUMBNAIL_SIZE}px`,
  height: `${FILESET_THUMBNAIL_SIZE}px`,
  backgroundColor: "$black10",
  borderRadius: "2px",

  [`& .icon-lock`]: {
    position: "absolute",
    bottom: 0,
    right: "$gr1",
    transform: "translateY(50%)",
    width: "$gr4",
    height: "$gr4",
    padding: "$gr1",
    fill: "$black50",
    backgroundColor: "$white",
    boxShadow: "1px 1px 2px #0003",
    borderRadius: "50%",
    zIndex: 1,
  },
});

const ThumbnailLQIP = styled("img", {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "2px",
  zIndex: 0,
});

const ThumbnailImage = styled("img", {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "2px",
  transition: "$dcImageLoad",
  zIndex: 1,

  variants: {
    isLoaded: {
      true: { opacity: 1 },
      false: { opacity: 0 },
    },
  },
});

const FileSetLabel = styled("div", {
  width: "256px",
  flexShrink: 0,
  paddingTop: "$gr1",
  fontSize: "$gr3",
  fontFamily: "$northwesternSansRegular",
  overflow: "hidden",
  wordBreak: "break-word",

  "& a": {
    color: "$purple",
    textDecoration: "none",

    "&:hover": {
      textDecoration: "underline",
    },
  },
});

const SnippetText = styled("p", {
  fontSize: "$gr3",
  margin: 0,
  lineHeight: "1.5",
  color: "$black80",
  fontFamily: "$northwesternSansLight",
  wordBreak: "break-word",

  mark: {
    backgroundColor: "#fff176",
    color: "inherit",
    fontFamily: "$northwesternSansBold",
    fontWeight: "400",
  },
});

export {
  FileSetLabel,
  FileSetRow,
  SnippetText,
  ThumbnailImage,
  ThumbnailLink,
  ThumbnailLQIP,
  ThumbnailWrapper,
  WorkFilesets,
  WorkGroup,
  WorkHeader,
  Wrapper,
};
