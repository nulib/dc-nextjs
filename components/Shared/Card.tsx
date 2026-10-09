import linkStyles from "@/components/Shared/Link.module.css";
import cardStyles from "@/components/Shared/Card.module.css";
import React, { ReactNode } from "react";
import Figure from "@/components/Figure/Figure";
import Link from "next/link";
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
    <div data-testid="card-wrapper" className={cardStyles.cardStyled}>
      {href ? (
        <Link href={href} legacyBehavior>
          <a data-dc-slot="link" className={linkStyles.linkStyled}>
            <Figure data={data} isPromoted />
          </a>
        </Link>
      ) : (
        <Figure data={data} isPromoted />
      )}

      {description && (
        <p data-testid="card-description">
          <ReadMore text={description} words={30} />
        </p>
      )}
    </div>
  );
};
export default Card;
