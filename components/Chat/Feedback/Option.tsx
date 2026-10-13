import styles from "@/components/Chat/Feedback/Option.module.css";
import { useRef, useState } from "react";
const ChatFeedbackOption = ({
  name,
  label,
}: {
  name: string;
  label: string;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  function handleOnChange() {
    setIsChecked(inputRef?.current?.checked ?? false);
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === " ") {
      event.preventDefault();
      setIsChecked(!isChecked);
    }
  };
  const handleClick = () => {
    setIsChecked(!isChecked);
  };
  return (
    <label
      aria-checked={isChecked}
      data-testid={`chat-feedback-option-${name}`}
      data-is-checked={isChecked}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="checkbox"
      tabIndex={0}
      className={styles.styledChatFeedbackOption}
    >
      <input
        name={name}
        id={`chat-feedback-option-${name}`}
        onChange={handleOnChange}
        ref={inputRef}
        type="checkbox"
      />
      {label}
    </label>
  );
};
export default ChatFeedbackOption;
