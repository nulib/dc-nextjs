import { CardStyled, LinkedAnchor } from "@/components/Shared/Card.styled";
import Figure from "@/components/Figure/Figure";
import Link from "next/link";
import React from "react";

export interface CardProps {
  description?: string;
  href?: string;
  imageUrl: string;
  supplementalInfo?: string;
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
        <Link href={href}>
          <LinkedAnchor>
            <Figure data={data} isPromoted />
          </LinkedAnchor>
        </Link>
      ) : (
        <Figure data={data} isPromoted />
      )}

      {description && <p data-testid="card-description">{description}</p>}
    </CardStyled>
  );
};

export default Card;
