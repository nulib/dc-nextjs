import { keyframes, styled } from "@/stitches.config";

const gradientAnimation = keyframes({
  to: {
    backgroundSize: "500%",
    backgroundPosition: "38.2%",
  },
});

const formBreathe = keyframes({
  "0%": {
    outline: "2px solid transparent",
  },
  "50%": {
    outline: "2px solid $purple30",
    background: "$purple10",
  },
  "100%": {
    outline: "2px solid transparent",
  },
});

const StyledResetButton = styled("button", {
  border: "none",
  backgroundColor: "$white",
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "$gr1",
  fontFamily: "$northwesternSansRegular",
  fontSize: "$gr3",
  color: "$purple",
  padding: "$gr3",
  borderRadius: "3px",
  cursor: "pointer",
  transition: "$dcAll",
  textDecoration: "underline",
  textDecorationThickness: "min(2px,max(1px,.05em))",
  textUnderlineOffset: "calc(.05em + 2px)",
  textDecorationColor: "$purple10",
  margin: "0 auto",

  svg: {
    fill: "transparent",
    stroke: "$purple",
    strokeWidth: "48px",
    height: "1.25em",
    width: "1.25em",
    transform: "rotate(45deg) scaleX(-1)",
  },
});

const StyledChatConversation = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "$gr5 0 $gr4",
  gap: "$gr3",

  form: {
    position: "relative",
    transition: "$dcAll",
    borderRadius: "3px",
    flexWrap: "wrap",
    flexGrow: 1,
    zIndex: 0,
    height: "62px",
    background: "$gray6",

    ["&[data-is-focused=true]"]: {
      boxShadow: "3px 3px 11px #0001",
      outline: "2px solid $purple60",
      animation: "none !important",
      background: "$purple10",

      button: {
        backgroundColor: "$purple",
        color: "$white",
      },
    },

    ["&[data-is-focused=false]"]: {
      boxShadow: "none",
      outline: "2px solid transparent",

      textarea: {
        color: "$black50",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },

    ["&[data-is-streaming=false]"]: {
      // animation: `${formBreathe} 3s infinite`,
    },

    textarea: {
      width: "100%",
      height: "100%",
      padding: "$gr3",
      border: "none",
      resize: "none",
      fontSize: "$gr3",
      lineHeight: "147%",
      zIndex: "1",
      fontFamily: "$northwesternSansRegular",
      overflow: "hidden",
      outline: "none",
      transition: "$dcAll",
      boxSizing: "border-box",
      background: "transparent",

      "&::placeholder": {
        overflow: "hidden",
        color: "$black50",
        textOverflow: "ellipsis",
      },
    },

    button: {
      position: "absolute",
      bottom: "$gr2",
      right: "$gr2",
      height: "38px",
      borderRadius: "3px",
      background: "$purple",
      border: "none",
      color: "$white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "$dcAll",
      cursor: "pointer",
      fontSize: "$gr3",
      padding: "0 $gr2",
      gap: "$gr2",
      zIndex: 0,
      fontFamily: "$northwesternSansRegular",

      "&:hover, &:focus": {
        svg: {
          stroke: "$white",
        },
      },

      svg: {
        width: "1rem",
        height: "1rem",
        fill: "transparent",
        stroke: "$purple60 !important",
        transition: "$dcAll",

        path: {
          strokeWidth: "32px",
        },
      },

      "&:disabled": {
        background:
          "linear-gradient(73deg, $purple120 0%, $purple 50%, $brightBlueB 80%)",
        backgroundSize: "250%",
        backgroundPosition: "61.8%",
        animation: `${gradientAnimation} 3s infinite alternate`,
        color: "$purple10",

        svg: {
          stroke: "none !important",
          opacity: 0.382,
          fill: "$white",
        },
      },
    },
  },
});

export { StyledChatConversation, StyledResetButton };
