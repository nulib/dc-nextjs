import { CopyStatus, useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import React, { ReactElement } from "react";
import {
  StyledCopyText,
  StyledStatus,
} from "@/components/Shared/CopyText.styled";

export const CopyTextStatus: React.FC<{ status: CopyStatus }> = ({
  status,
}) => {
  if (!status) return null;

  return <StyledStatus data-copy-status={status}>{status}</StyledStatus>;
};

export const CopyText: React.FC<{
  renderIcon?: () => ReactElement;
  textPrompt: string;
  textToCopy: string;
}> = ({ renderIcon, textPrompt, textToCopy }) => {
  const [copyStatus, copyText] = useCopyToClipboard(textToCopy);
  const icon = renderIcon ? renderIcon() : null;

  return (
    <StyledCopyText onClick={copyText}>
      {icon} {textPrompt} <CopyTextStatus status={copyStatus} />
    </StyledCopyText>
  );
};

export default CopyText;
