import styles from "@/components/Shared/CopyText.module.css";
import { CopyStatus, useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import React, { ReactElement } from "react";
export const CopyTextStatus: React.FC<{
  status: CopyStatus;
}> = ({ status }) => {
  if (!status) return null;
  return (
    <span data-copy-status={status} className={styles.styledStatus}>
      {status}
    </span>
  );
};
export const CopyText: React.FC<{
  renderIcon?: () => ReactElement;
  textPrompt: string;
  textToCopy: string;
}> = ({ renderIcon, textPrompt, textToCopy }) => {
  const [copyStatus, copyText] = useCopyToClipboard(textToCopy);
  const icon = renderIcon ? renderIcon() : null;
  return (
    <button
      onClick={copyText}
      data-dc-slot="copy-text"
      className={styles.styledCopyText}
    >
      {icon} {textPrompt} <CopyTextStatus status={copyStatus} />
    </button>
  );
};
export default CopyText;
