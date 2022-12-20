import { useCallback, useEffect, useState } from "react";

export type CopyStatus = "copied" | "failed" | undefined;

export const useCopyToClipboard = (
  text: string,
  notifyTimeout = 2500
): [CopyStatus, () => void] => {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>();
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(
      () => setCopyStatus("copied"),
      () => setCopyStatus("failed")
    );
  }, [text]);

  useEffect(() => {
    if (!copyStatus) {
      return;
    }

    const timeoutId = setTimeout(() => setCopyStatus(undefined), notifyTimeout);

    return () => clearTimeout(timeoutId);
  }, [copyStatus, notifyTimeout]);

  return [copyStatus, copy];
};
