import React, { ChangeEvent, TextareaHTMLAttributes, useState } from "react";

import { styled } from "@/stitches.config";

interface SharedTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const SharedTextArea: React.FC<SharedTextAreaProps> = ({
  maxLength,
  value,
  onChange,
  ...textareaProps
}) => {
  const [internalValue, setInternalValue] = useState("");

  const currentValue = typeof value === "string" ? value : internalValue;
  const charCount = currentValue.length;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!maxLength) return;

    const input = e.target.value;
    if (input.length <= maxLength) {
      if (onChange) onChange(e);
      else setInternalValue(input);
    }
  };

  return (
    <StyledSharedTextArea>
      <textarea
        {...textareaProps}
        value={currentValue}
        onChange={handleChange}
        maxLength={maxLength}
      />
      {maxLength && (
        <span
          data-testid="shared-textarea-character count"
          data-currentlength={charCount}
          data-maxlength={maxLength}
        >
          {charCount}/{maxLength} characters
        </span>
      )}
    </StyledSharedTextArea>
  );
};

const StyledSharedTextArea = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$gr1",
  marginBottom: "$gr2",

  span: {
    fontSize: "$gr2 !important",
    color: "$black50",
  },
});

export default SharedTextArea;
