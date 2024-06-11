import * as SelectPrimitive from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import {
  StyledContent,
  StyledIcon,
  StyledItem,
  StyledItemIndicator,
  StyledScrollDownButton,
  StyledScrollUpButton,
  StyledTrigger,
} from "@/components/Shared/Select.styled";
import React from "react";

type SelectProps = {
  children: React.ReactNode;
  defaultValue: string;
};

/**
 * Example implementation

 import { Select, SelectItem } from "@/components/Shared/Select";

 <Select defaultValue="2">
    <SelectItem value="1">Subject</SelectItem>
    <SelectItem value="2">Genre</SelectItem>
  </Select>
 */

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  function Select({ children, ...props }, forwardedRef) {
    return (
      <SelectPrimitive.Root {...props}>
        <StyledTrigger ref={forwardedRef}>
          <SelectPrimitive.Value />

          <StyledIcon>
            <ChevronDownIcon />
          </StyledIcon>
        </StyledTrigger>

        <SelectPrimitive.Portal>
          <StyledContent>
            <StyledScrollUpButton>
              <ChevronUpIcon />
            </StyledScrollUpButton>

            <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>

            <StyledScrollDownButton>
              <ChevronDownIcon />
            </StyledScrollDownButton>
          </StyledContent>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  },
);

type SelectItemProps = { children: React.ReactNode; value: string };

export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItem({ children, ...props }, forwardedRef) {
    return (
      <StyledItem {...props} ref={forwardedRef}>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

        <StyledItemIndicator>
          <CheckIcon />
        </StyledItemIndicator>
      </StyledItem>
    );
  },
);
