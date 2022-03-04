import { styled } from "../../stitches.config";
import * as Dialog from "@radix-ui/react-dialog";

const FilterTrigger = styled(Dialog.Trigger, {
  width: "81px",
  height: "38px",
  cursor: "pointer",
  backgroundColor: "$slate12",
  border: "0",
  color: "$slate1",
  fontSize: "1rem",
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
  zIndex: "1",

  "> div": {
    padding: "31px",

    header: {
      h2: {
        fontSize: "25px",
        padding: "0",
        margin: "0",
      },

      "> div": {
        display: "flex",
        justifyContent: "space-between",
      },
    },
  },
});

export { FilterContent, FilterOverlay, FilterTrigger };
