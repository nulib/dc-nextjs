import {
  ExpandButton,
  ExpandContent,
  ExpandEdge,
  ExpandStyled,
  ExpandVariants,
} from "@/components/Shared/Expand/Expand.styled";
import { ReactNode, useEffect, useRef, useState } from "react";

export interface ExpandProps {
  buttonText?: string;
  children: ReactNode | ReactNode[];
  initialHeight?: number;
}

const Expand: React.FC<ExpandProps & ExpandVariants> = ({
  buttonText = "Show More",
  children,
  initialHeight = 500,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [maxHeight, setMaxHeight] = useState<number>(initialHeight);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleExpand = () => setIsExpanded(true);

  useEffect(() => {
    if (isExpanded && contentRef?.current)
      setMaxHeight(contentRef?.current?.offsetHeight);
  }, [isExpanded, contentRef]);

  return (
    <ExpandStyled
      isExpanded={isExpanded}
      style={{ maxHeight: `${maxHeight}px` }}
      data-testid="expand"
    >
      <ExpandContent ref={contentRef}>{children}</ExpandContent>
      <ExpandEdge>
        <ExpandButton
          onClick={handleExpand}
          isLowercase
          isPrimary
          disabled={isExpanded}
        >
          {buttonText}
        </ExpandButton>
      </ExpandEdge>
    </ExpandStyled>
  );
};
export default Expand;
