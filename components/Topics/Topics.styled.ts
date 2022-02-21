import { styled } from "stitches.config";

const TopicsStyled = styled("div", {
  display: "flex",
  alignItems: "center",

  "> label": {
    fontSize: "12px",
    color: "$slate10",
    textTransform: "uppercase",
  },

  ul: {
    display: "flex",
    margin: "0",
    padding: "0",

    li: {
      margin: "0 0 0 1rem",
      padding: "0",
      listStyle: "none",

      a: {
        display: "flex",
        alignItems: "center",

        "&:before": {
          display: "block",
          content: "",
          width: "1rem",
          height: "1rem",
          borderRadius: "1rem",
          backgroundColor: "$slate9",
          marginRight: "0.618rem",
        },
      },
    },
  },
});

export { TopicsStyled };
