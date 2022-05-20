import * as Dialog from "@radix-ui/react-dialog";
import { IconStyled } from "@/components/Shared/Icon";
import { PopoverToggle } from "@/components/Facets/UserFacets/UserFacets.styled";
import { styled } from "@/stitches.config";

/* eslint sort-keys: 0 */

const FilterActivate = styled(Dialog.Trigger, {
  height: "38px",
  cursor: "pointer",
  backgroundColor: "$white",
  border: "0",
  color: "$black",
  fontWeight: "700",
  fontSize: "1rem",
  borderRadius: "50px",
  transition: "all 200ms ease-in-out",
  display: "flex",
  alignItems: "center",
  padding: "0 1rem 0 0.5rem",

  [`& ${IconStyled}`]: {
    fill: "$black50",
    marginBottom: "-1px",
  },

  "&:hover": {
    backgroundColor: "$purple",
    color: "$white",
    boxShadow: "2px 2px 5px #0002",

    [`& ${IconStyled}`]: {
      fill: "$purple30",
    },
  },
});

const FilterFloating = styled("div", {
  display: "flex",
  backgroundColor: "$white",
  position: "relative",
  borderRadius: "50px",
  boxShadow: "2px 2px 5px #0002",
  transition: "all 200ms ease-in-out",

  [`& ${FilterActivate}`]: {
    boxShadow: "1px 1px 2px #0002",
  },

  "&:hover": {
    backgroundColor: "$purple10",
    boxShadow: "2px 2px 5px #0004",

    [`& ${PopoverToggle}`]: {
      fill: "$purple",

      svg: {
        color: "$purple",
        fill: "$purple",
        marginTop: "-2px",
        transform: "rotate(-90deg)",
      },
    },
  },
});

const FilterOverlay = styled(Dialog.Overlay, {
  background: "rgba(0 0 0 / 0.5)",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "grid",
  placeItems: "center",
  overflowY: "auto",
  zIndex: "1",
});

const FilterBody = styled("div", {
  padding: "1rem",
});

const FilterHeader = styled("header", {
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",

  h2: {
    fontSize: "25px",
    padding: "0",
    margin: "0",
  },
});

const FilterContent = styled(Dialog.Content, {
  width: "80vw",
  height: "60vh",
  background: "white",
  position: "fixed",
  top: "81px",
  left: "10vw",
  right: 0,
  bottom: 0,
  overflowY: "auto",
  zIndex: "2",
});

export {
  FilterActivate,
  FilterBody,
  FilterContent,
  FilterFloating,
  FilterHeader,
  FilterOverlay,
};
