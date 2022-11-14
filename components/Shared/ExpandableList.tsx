import * as Accordion from "@radix-ui/react-accordion";
import {
  ExpandableListItemHeading,
  ExpandableListItemIndicator,
  ExpandableListItemStyled,
  ExpandableListItemTrigger,
} from "@/components/Shared/ExpandableList.styled";
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
    <ExpandableListItemStyled value={value} key={value}>
      <Accordion.Header asChild>
        <ExpandableListItemTrigger>
          <IconChevronDown />
          <ExpandableListItemHeading>{title}</ExpandableListItemHeading>
          {indicator && (
            <ExpandableListItemIndicator>
              {indicator}
            </ExpandableListItemIndicator>
          )}
        </ExpandableListItemTrigger>
      </Accordion.Header>
      <Accordion.Content>{children}</Accordion.Content>
    </ExpandableListItemStyled>
  );
};

interface ExpandableListComposition {
  Item: React.FC<ExpandableListItemProps>;
}

interface ExpandableListProps {
  children: ReactNode | ReactNode[];
}

const ExpandableList: ExpandableListComposition &
  React.FC<ExpandableListProps> = ({ children }) => {
  return (
    <Accordion.Root type="single" collapsible={true}>
      {children}
    </Accordion.Root>
  );
};

ExpandableList.Item = ExpandableListItem;

export default ExpandableList;
