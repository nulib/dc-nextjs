import {
  FactsItemBig,
  FactsItemSmall,
  FactsItemStyled,
  FactsStyled,
} from "@/components/Shared/Facts.styled";
import React, { ReactNode } from "react";

interface FactsItemProps {
  big: number | string;
  small: string;
}

const FactsItem: React.FC<FactsItemProps> = ({ big, small }) => {
  return (
    <FactsItemStyled>
      <FactsItemBig>{big}</FactsItemBig>
      <FactsItemSmall>{small}</FactsItemSmall>
    </FactsItemStyled>
  );
};

interface FactsComposition {
  Item: React.FC<FactsItemProps>;
}

interface FactsProps {
  children: ReactNode | ReactNode[];
}

const Facts: FactsComposition & React.FC<FactsProps> = ({ children }) => {
  return <FactsStyled>{children}</FactsStyled>;
};

Facts.Item = FactsItem;

export default Facts;
