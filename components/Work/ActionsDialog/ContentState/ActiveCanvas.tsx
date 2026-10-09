import styles from "@/components/Work/ActionsDialog/ContentState/ActiveCanvas.module.css";
import Image from "next/image";
import { getContentStateMetadata } from "@/lib/iiif/content-state-helpers";
import { getValue } from "@iiif/helpers";
import { useWorkState } from "@/context/work-context";
const ContentStateActiveCanvas = () => {
  const {
    workState: { manifest, contentState },
  } = useWorkState();
  const metadata = getContentStateMetadata({
    manifest,
    contentState,
  });
  const currentFileLabel = `${metadata?.activeCanvasIndex} of ${metadata?.canvasCount}`;
  return (
    <div className={styles.styledActiveCanvasWrapper}>
      <header>
        Currently viewing {metadata.activeCanvasResourceLabel} (
        {currentFileLabel})
      </header>
      <div className={styles.styledActiveCanvasContent}>
        {metadata.activeCanvasThumbnail && (
          <Image
            src={metadata.activeCanvasThumbnail}
            alt={getValue(metadata.activeCanvas?.label)}
            width={48}
            height={48}
          />
        )}
        <div className={styles.styledActiveCanvasText}>
          <strong>{getValue(metadata.activeCanvas?.label)}</strong>
          <span>{metadata.activeCanvasResourceType}</span>
        </div>
      </div>
    </div>
  );
};
export default ContentStateActiveCanvas;
