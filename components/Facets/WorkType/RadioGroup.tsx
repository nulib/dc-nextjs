import styles from "@/components/Facets/WorkType/WorkType.module.css";
import * as Radio from "@radix-ui/react-radio-group";
import { CSSProperties, MouseEvent, useRef, useState } from "react";
import { FACETS_WORK_TYPE } from "@/lib/constants/facets-model";
import type { WorkTypeWithAll } from "@/components/Facets/WorkType/WorkType";
interface RadioGroupProps {
  currentValue: WorkTypeWithAll;
  handleValueChange: (value: string) => void;
}
const RadioGroup: React.FC<RadioGroupProps> = ({
  currentValue,
  handleValueChange,
}) => {
  const [itemBoundingBox, setItemBoundingBox] = useState<DOMRect>();
  const [wrapperBoundingBox, setWrapperBoundingBox] = useState<DOMRect>();
  const [highlightedItem, setHighlightedItem] = useState<string>();
  const [isHoveredFromNull, setIsHoveredFromNull] = useState(true);
  const highlightRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const repositionHighlight = (
    e: MouseEvent<HTMLButtonElement>,
    option: string,
  ) => {
    if (!option || !wrapperRef?.current) return;
    const item = e.target as HTMLButtonElement;
    setItemBoundingBox(item.getBoundingClientRect());
    setWrapperBoundingBox(wrapperRef.current.getBoundingClientRect());
    setIsHoveredFromNull(!highlightedItem);
    setHighlightedItem(option);
  };
  const resetHighlight = () => setHighlightedItem(undefined);
  // Measured geometry is passed as values; CSS owns the highlight rules.
  let highlightStyles: CSSProperties = {};
  if (itemBoundingBox && wrapperBoundingBox) {
    highlightStyles = {
      "--highlight-opacity": highlightedItem ? 0.1 : 0,
      "--highlight-x": `${itemBoundingBox.left - wrapperBoundingBox.left}px`,
      "--highlight-duration": isHoveredFromNull ? "0ms" : "200ms",
      "--highlight-width": `${itemBoundingBox.width}px`,
    } as CSSProperties;
  }
  return (
    <Radio.Root
      onMouseLeave={resetHighlight}
      onValueChange={handleValueChange}
      orientation="horizontal"
      ref={wrapperRef}
      value={currentValue || ""}
      data-dc-slot="work-type"
      className={styles.wrapper}
    >
      <div
        ref={highlightRef}
        style={highlightStyles}
        className={styles.highlight}
      />
      <ul
        data-testid="facet-inline-component"
        id={`facet--workType`}
        className={styles.styledWorkType}
      >
        {FACETS_WORK_TYPE.options.map((option, index) => {
          const optionId = `workType-${index}`;
          return (
            <li key={option}>
              <Radio.Item
                id={optionId}
                value={option}
                onMouseOver={(e: MouseEvent<HTMLButtonElement>) =>
                  repositionHighlight(e, option)
                }
              >
                <label htmlFor={optionId}>{option}</label>
              </Radio.Item>
            </li>
          );
        })}
      </ul>
    </Radio.Root>
  );
};
export default RadioGroup;
