import {
  CardMetadata,
  ImagePlaceholder,
} from "@/components/Shared/Card.styled";
import React from "react";

interface CardProps {
  description?: string;
  imageUrl?: string;
  metadata?: Array<string>;
  title?: string;
}

const Card: React.FC<CardProps> = ({ description, metadata, title }) => {
  return (
    <div data-testid="card-wrapper">
      <h3>{title}</h3>
      <ImagePlaceholder />
      <CardMetadata>
        {metadata?.map((meta) => (
          <span key={meta}>{meta}</span>
        ))}
      </CardMetadata>
      <p>{description}</p>
    </div>
  );
};

export default Card;
