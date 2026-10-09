import styles from "@/components/Shared/Select.module.css";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
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
        <SelectPrimitive.SelectTrigger
          ref={forwardedRef}
          className={styles.styledTrigger}
        >
          <SelectPrimitive.Value />

          <SelectPrimitive.SelectIcon className={styles.styledIcon}>
            <ChevronDownIcon />
          </SelectPrimitive.SelectIcon>
        </SelectPrimitive.SelectTrigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className={styles.styledContent}>
            <SelectPrimitive.ScrollUpButton
              className={styles.styledScrollUpButton}
            >
              <ChevronUpIcon />
            </SelectPrimitive.ScrollUpButton>

            <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>

            <SelectPrimitive.ScrollDownButton
              className={styles.styledScrollDownButton}
            >
              <ChevronDownIcon />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    );
  },
);
type SelectItemProps = {
  children: React.ReactNode;
  value: string;
};
export const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  function SelectItem({ children, ...props }, forwardedRef) {
    return (
      <SelectPrimitive.Item
        {...props}
        ref={forwardedRef}
        className={styles.styledItem}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

        <SelectPrimitive.ItemIndicator className={styles.styledItemIndicator}>
          <CheckIcon />
        </SelectPrimitive.ItemIndicator>
      </SelectPrimitive.Item>
    );
  },
);
