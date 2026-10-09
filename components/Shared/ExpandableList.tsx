import styles from "@/components/Shared/ExpandableList.module.css";
import * as Accordion from "@radix-ui/react-accordion";
import React, { ReactNode } from "react";
import { IconChevronDown } from "@/components/Shared/SVG/Icons";
interface ExpandableListItemProps {
  children: ReactNode | ReactNode[];
  indicator?: string;
  title: string;
  value: string;
}
export const ExpandableListItem: React.FC<ExpandableListItemProps> = ({
  children,
  indicator,
  title,
  value,
}) => {
  return (
    <Accordion.Item
      value={value}
      key={value}
      data-dc-slot="expandable-list-item"
      className={styles.expandableListItemStyled}
    >
      <Accordion.Header asChild>
        <Accordion.Trigger className={styles.expandableListItemTrigger}>
          <IconChevronDown />
          <span className={styles.expandableListItemHeading}>{title}</span>
          {indicator && (
            <span className={styles.expandableListItemIndicator}>
              {indicator}
            </span>
          )}
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content>{children}</Accordion.Content>
    </Accordion.Item>
  );
};
interface ExpandableListComposition {
  Item: React.FC<ExpandableListItemProps>;
}
interface ExpandableListProps {
  children: ReactNode | ReactNode[];
  defaultValue?: string;
}
const ExpandableList: ExpandableListComposition &
  React.FC<ExpandableListProps> = ({ children, defaultValue }) => {
  return (
    <Accordion.Root
      type="single"
      collapsible={true}
      defaultValue={defaultValue}
    >
      {children}
    </Accordion.Root>
  );
};
ExpandableList.Item = ExpandableListItem;
export default ExpandableList;
