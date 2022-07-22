import { CopyStatus, useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import {
  StyledCopyText,
  StyledStatus,
} from "@/components/Shared/CopyText.styled";
import React from "react";

const CopyTextStatus: React.FC<{ status: CopyStatus }> = ({ status }) => {
  if (!status) return null;

  return <StyledStatus data-copy-status={status}>{status}</StyledStatus>;
};

export const CopyText: React.FC<{ textPrompt: string; textToCopy: string }> = ({
  textPrompt,
  textToCopy,
}) => {
  const [copyStatus, copyText] = useCopyToClipboard(textToCopy);
  return (
    <StyledCopyText onClick={copyText}>
      {textPrompt} <CopyTextStatus status={copyStatus} />
    </StyledCopyText>
  );
};

export default CopyText;
