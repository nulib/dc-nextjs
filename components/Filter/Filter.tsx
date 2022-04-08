import * as Dialog from "@radix-ui/react-dialog";
import { FilterContent, FilterOverlay, FilterTrigger } from "./Filter.styled";

export default function Filter() {
  return (
    <Dialog.Root>
      <FilterTrigger>
        <span></span>
        <label>Filter</label>
      </FilterTrigger>
      <Dialog.Portal>
        <FilterOverlay />
        <FilterContent>
          <div>
            <header>
              <div>
                <Dialog.Title>Filter</Dialog.Title>
                <Dialog.Close>Close</Dialog.Close>
              </div>
              <Dialog.Description>
                Vivamus magna lacus, fermentum ac posuere eget, ornare vel ante.
                Donec bibendum porta augue et auctor.{" "}
              </Dialog.Description>
            </header>
            <div>[Facets]</div>
          </div>
        </FilterContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
