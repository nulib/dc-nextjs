import CopyText from "@/components/Shared/CopyText";
import SharedDialog from "@/components/Shared/Dialog";
import { encodeContentState } from "@iiif/helpers";
import { useState } from "react";

interface IIIFContentStateProps {
  contentState: any;
}

const IIIFContentState: React.FC<IIIFContentStateProps> = ({
  contentState,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const title = "Demo Content State";

  function handleClick() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const uri = new URL(window.location.href);
  uri.searchParams.set("iiif-content", encodeContentState(contentState));
  const shareUrl = uri.toString();

  return (
    <div>
      <button onClick={handleClick}>{title}</button>
      <SharedDialog
        title={title}
        handleCloseClick={close}
        isOpen={isOpen}
        size="small"
      >
        <>
          <textarea style={{ width: "100%" }}>{contentState}</textarea>
          <CopyText textPrompt="Share Current State" textToCopy={shareUrl} />
        </>
      </SharedDialog>
    </div>
  );
};

export default IIIFContentState;
