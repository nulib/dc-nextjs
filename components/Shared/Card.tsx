import Figure from "@/components/Figure/Figure";
import React from "react";

export interface CardProps {
  description?: string;
  imageUrl: string;
  supplementalInfo?: string;
  title: string;
}

const Card: React.FC<CardProps> = ({
  description,
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
      <Figure data={data} />
      <p data-testid="card-description">{description}</p>
    </div>
  );
};

export default Card;
