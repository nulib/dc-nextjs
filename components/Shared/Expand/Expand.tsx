import { Button } from "@/components/Shared/Button/Button";
import styles from "@/components/Shared/Expand/Expand.module.css";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
export interface ExpandProps {
  buttonText?: string;
  children: ReactNode | ReactNode[];
  initialHeight?: number;
}
const Expand: React.FC<ExpandProps> = ({
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
    <div
      data-is-expanded={isExpanded}
      style={{ "--expand-height": `${maxHeight}px` } as CSSProperties}
      data-testid="expand"
      className={styles.expandStyled}
    >
      <div ref={contentRef} className={styles.expandContent}>
        {children}
      </div>
      <div className={styles.expandEdge}>
        <Button
          onClick={handleExpand}
          textCase="normal"
          variant="primary"
          disabled={isExpanded}
          className={styles.expandButton}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
export default Expand;
