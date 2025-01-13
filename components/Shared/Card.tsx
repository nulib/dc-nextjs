import React, { ReactNode } from "react";

import { CardStyled } from "@/components/Shared/Card.styled";
import Figure from "@/components/Figure/Figure";
import Link from "next/link";
import { LinkStyled } from "@/components/Shared/LinkStyled";
import ReadMore from "./ReadMore";

export interface CardProps {
  description?: string | null;
  href?: string;
  imageUrl: string;
  supplementalInfo?: ReactNode;
  title: string;
}

const Card: React.FC<CardProps> = ({
  description,
  href,
  imageUrl,
  supplementalInfo,
  title,
}) => {
  const data = {
    aspectRatio: 1,
    src: imageUrl,
    supplementalInfo,
    title,
  };

  return (
    <CardStyled data-testid="card-wrapper">
      {href ? (
        <Link href={href} legacyBehavior>
          <LinkStyled>
            <Figure data={data} isPromoted />
          </LinkStyled>
        </Link>
      ) : (
        <Figure data={data} isPromoted />
      )}

      {description && (
        <p data-testid="card-description">
          <ReadMore text={description} words={30} />
        </p>
      )}
    </CardStyled>
  );
};

export default Card;
