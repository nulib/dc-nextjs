import * as Dialog from "@radix-ui/react-dialog";
import { styled } from "@stitches/react";

const Input: React.FC = () => {
  return (
    <Wrapper>
      <input placeholder="Search by keyword, artist, or reference" />
    </Wrapper>
  );
};

const Wrapper = styled("div", {
  width: "100%",

  input: {
    padding: "0 1rem",
    fontSize: "19px",
    margin: "0 0 1rem",
    width: "100%",
    height: "50px",
    border: "none",
    backgroundColor: "#e0e0e0",
  },
});

export default Input;
