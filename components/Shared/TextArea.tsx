import styles from "@/components/Shared/TextArea.module.css";
import React, { ChangeEvent, TextareaHTMLAttributes, useState } from "react";
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
    <div className={styles.styledSharedTextArea}>
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
    </div>
  );
};
export default SharedTextArea;
