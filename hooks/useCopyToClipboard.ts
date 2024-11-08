import { MouseEvent, useCallback, useEffect, useState } from "react";

export type CopyStatus = "✔" | "✗" | undefined;

export const useCopyToClipboard = (
  text: string,
  notifyTimeout = 5000,
): [CopyStatus, (event: MouseEvent) => void] => {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>();
  const copy = useCallback(
    (event: MouseEvent) => {
      event?.preventDefault();
      navigator.clipboard.writeText(text).then(
        () => setCopyStatus("✔"),
        () => setCopyStatus("✗"),
      );
    },
    [text],
  );

  useEffect(() => {
    if (!copyStatus) {
      return;
    }

    const timeoutId = setTimeout(() => setCopyStatus(undefined), notifyTimeout);

    return () => clearTimeout(timeoutId);
  }, [copyStatus, notifyTimeout]);

  return [copyStatus, copy];
};
