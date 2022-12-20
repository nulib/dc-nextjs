import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const StyledForm = styled("form", {
  margin: "1rem 0",
});

const StyledInput = styled("input", {
  display: "flex",
  fontSize: "1rem",
  padding: "0.25rem 0.5rem",
  border: "1px solid #0002",
  borderRadius: "3px",
});

export { StyledForm, StyledInput };
