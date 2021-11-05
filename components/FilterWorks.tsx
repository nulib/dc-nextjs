import * as Accordion from "@radix-ui/react-accordion";
import * as Popover from "@radix-ui/react-popover";
import * as Dialog from "@radix-ui/react-dialog";
import { styled } from "@stitches/react";
import Input from "./Input";

const FilterWorks: React.FC = () => {
  return (
    <Modal>
      <Trigger>Filter Works</Trigger>
      <Overlay className="overlay" />
      <Content>
        <div>
          <Input />
        </div>
        <div style={{ padding: "0 2rem" }}>
          <Dialog.DialogClose>Hide Filters</Dialog.DialogClose>
        </div>
        <div style={{ padding: "0 2rem" }}>
          <div>
            <Accordion.Root type="single">
              <Accordion.Item value="Creators & Contributors">
                <Accordion.Header>
                  <Accordion.Trigger>Creators & Contributors</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <Popover.Root>
                    <Popover.Trigger>Creators</Popover.Trigger>
                    <Popover.Anchor />
                    <Popover.Content>
                      Creator Stuff
                      <Popover.Close />
                      <Popover.Arrow />
                    </Popover.Content>
                  </Popover.Root>
                  <Popover.Root>
                    <Popover.Trigger>Contributors</Popover.Trigger>
                    <Popover.Anchor />
                    <Popover.Content>
                      Contributors Stuff
                      <Popover.Close />
                      <Popover.Arrow />
                    </Popover.Content>
                  </Popover.Root>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="Descriptive">
                <Accordion.Header>
                  <Accordion.Trigger>Descriptive</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <Popover.Root>
                    <Popover.Trigger>Genre</Popover.Trigger>
                    <Popover.Anchor />
                    <Popover.Content>
                      Genre Stuff
                      <Popover.Close />
                      <Popover.Arrow />
                    </Popover.Content>
                  </Popover.Root>
                  <Popover.Root>
                    <Popover.Trigger>Language</Popover.Trigger>
                    <Popover.Anchor />
                    <Popover.Content>
                      Language Stuff
                      <Popover.Close />
                      <Popover.Arrow />
                    </Popover.Content>
                  </Popover.Root>
                </Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="Location">
                <Accordion.Header>
                  <Accordion.Trigger>Location</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content></Accordion.Content>
              </Accordion.Item>
              <Accordion.Item value="Rights & Usage">
                <Accordion.Header>
                  <Accordion.Trigger>Rights & Usage</Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content></Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
          <div>Top Results</div>
        </div>
      </Content>
    </Modal>
  );
};

const Modal = styled(Dialog.Root, {
  //
});

const Trigger = styled(Dialog.Trigger, {
  //
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

export default FilterWorks;
