import Figure from "@/components/Figure/Figure";
import Link from "next/link";
import { LinkedAnchor } from "@/components/Shared/Card.styled";
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
    src: imageUrl,
    supplementalInfo,
    title,
  };

  return (
    <div data-testid="card-wrapper">
      <h3 data-testid="card-title">{title}</h3>
      {href ? (
        <Link href={href}>
          <LinkedAnchor>
            <Figure data={data} />
          </LinkedAnchor>
        </Link>
      ) : (
        <Figure data={data} />
      )}

      <p data-testid="card-description">{description}</p>
    </div>
  );
};

export default Card;
