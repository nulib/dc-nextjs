import styles from "@/components/Shared/WorkCount/WorkCount.module.css";
import { IconAudio, IconImage, IconVideo } from "@/components/Shared/SVG/Icons";
import { formatNumber, pluralize } from "@/lib/utils/count-helpers";
import React from "react";
export interface WorkCountProps {
  audio?: number;
  image?: number;
  video?: number;
}
const WorkCount: React.FC<WorkCountProps> = ({
  audio = 0,
  image = 0,
  video = 0,
}) => {
  const total = audio + image + video;
  return (
    <div className={styles.workCountStyled}>
      <span data-testid="work-count-total" className={styles.workCountTotal}>
        {pluralize("Work", total)}
      </span>
      <div className={styles.workCountTypes}>
        {image ? (
          <span
            aria-label={`${image} image works`}
            data-testid="work-count-type"
            data-type="image"
            className={styles.workCountType}
          >
            {formatNumber(image)} <IconImage />
          </span>
        ) : (
          <></>
        )}
        {audio ? (
          <span
            aria-label={`${audio} audio works`}
            data-testid="work-count-type"
            data-type="audio"
            className={styles.workCountType}
          >
            {formatNumber(audio)} <IconAudio />
          </span>
        ) : (
          <></>
        )}
        {video ? (
          <span
            aria-label={`${video} video works`}
            data-testid="work-count-type"
            data-type="video"
            className={styles.workCountType}
          >
            {formatNumber(video)} <IconVideo />
          </span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default WorkCount;
