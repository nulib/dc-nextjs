import * as Radio from "@radix-ui/react-radio-group";

import { Highlight, StyledWorkType, Wrapper } from "./WorkType.styled";
import { MouseEvent, useRef, useState } from "react";

import { FACETS_WORK_TYPE } from "@/lib/constants/facets-model";
import { WorkTypeOptions } from "@/types/components/facets";

interface RadioGroupProps {
  currentValue: WorkTypeOptions;
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
    option: string
  ) => {
    if (!option || !wrapperRef?.current) return;

    const item = e.target as HTMLButtonElement;
    setItemBoundingBox(item.getBoundingClientRect());
    setWrapperBoundingBox(wrapperRef.current.getBoundingClientRect());
    setIsHoveredFromNull(!highlightedItem);
    setHighlightedItem(option);
  };
  const resetHighlight = () => setHighlightedItem(undefined);

  let highlightStyles = {};

  if (itemBoundingBox && wrapperBoundingBox) {
    highlightStyles = {
      opacity: highlightedItem ? 0.1 : 0,
      transform: `translate(${
        itemBoundingBox.left - wrapperBoundingBox.left
      }px)`,
      transitionDuration: isHoveredFromNull ? "0ms" : "200ms",
      width: `${itemBoundingBox.width}px`,
    };
  }

  return (
    <Wrapper
      onMouseLeave={resetHighlight}
      onValueChange={handleValueChange}
      orientation="horizontal"
      ref={wrapperRef}
      value={currentValue}
    >
      <Highlight ref={highlightRef} css={highlightStyles} />
      <StyledWorkType
        data-testid="facet-inline-component"
        id={`facet--workType`}
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
      </StyledWorkType>
    </Wrapper>
  );
};

export default RadioGroup;
