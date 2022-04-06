import * as Accordion from "@radix-ui/react-accordion";
import * as Popover from "@radix-ui/react-popover";
import * as Dialog from "@radix-ui/react-dialog";
import { styled } from "@stitches/react";
import Input from "./Input";

const Facets: React.FC = () => {
  return (
    <Items type="single">
      <Item value="Creators & Contributors">
        <Accordion.Header>
          <Trigger>Creators & Contributors</Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <Popover.Root>
            <Popover.Trigger>Creators</Popover.Trigger>
            <Popover.Anchor />
            <Facet>
              Creator Stuff
              <Popover.Close />
              <Popover.Arrow />
            </Facet>
          </Popover.Root>
          <Popover.Root>
            <Popover.Trigger>Contributors</Popover.Trigger>
            <Popover.Anchor />
            <Facet>
              Contributors Stuff
              <Popover.Close />
              <Popover.Arrow />
            </Facet>
          </Popover.Root>
        </Accordion.Content>
      </Item>
      <Item value="Descriptive">
        <Accordion.Header>
          <Trigger>Descriptive</Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <Popover.Root>
            <Popover.Trigger>Genre</Popover.Trigger>
            <Popover.Anchor />
            <Facet>
              Genre Stuff
              <Popover.Close />
              <Popover.Arrow />
            </Facet>
          </Popover.Root>
          <Popover.Root>
            <Popover.Trigger>Language</Popover.Trigger>
            <Popover.Anchor />
            <Facet>
              Language Stuff
              <Popover.Close />
              <Popover.Arrow />
            </Facet>
          </Popover.Root>
        </Accordion.Content>
      </Item>
      <Item value="Location">
        <Accordion.Header>
          <Trigger>Location</Trigger>
        </Accordion.Header>
        <Accordion.Content></Accordion.Content>
      </Item>
      <Item value="Rights & Usage">
        <Accordion.Header>
          <Trigger>Rights & Usage</Trigger>
        </Accordion.Header>
        <Accordion.Content></Accordion.Content>
      </Item>
    </Items>
  );
};

const Items = styled(Accordion.Root, {});

const Item = styled(Accordion.Item, {
  //
});

const Trigger = styled(Accordion.Trigger, {
  fontFamily: "'Helvetica Neue',system-ui, -apple-system, sans-serif",
  fontSize: "1rem",
  background: "none",
  border: "none",
});

const Overlay = styled(Dialog.Overlay, {
  position: "fixed",
  width: "100%",
  height: "100%",
  backgroundColor: "#342F2Ecc",
  backdropFilter: "blur(8px)",
});

const Content = styled(Dialog.Content, {
  position: "fixed",
  display: "flex",
  width: "calc(100%)",
  height: "auto",
  backgroundColor: "white",
  flexDirection: "column",
  boxShadow: "0px 0px 1rem #00000033",
});

const Facet = styled(Popover.Content, {
  position: "fixed",
  left: "250px",
  top: "-100px",
  width: "600px",
  height: "250px",
  backgroundColor: "#f6f6f6",
});

export default Facets;
