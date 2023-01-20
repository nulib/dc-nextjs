import { IconAudio, IconImage, IconVideo } from "@/components/Shared/SVG/Icons";
import {
  WorkCountTotal as Total,
  WorkCountType as Type,
  WorkCountTypes as Types,
  WorkCountStyled,
} from "@/components/Shared/WorkCount/WorkCount.styled";
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
    <WorkCountStyled>
      <Total data-testid="work-count-total">{pluralize("Work", total)}</Total>
      <Types>
        {image ? (
          <Type
            aria-label={`${image} image works`}
            data-testid="work-count-type"
            data-type="image"
          >
            {formatNumber(image)} <IconImage />
          </Type>
        ) : (
          <></>
        )}
        {audio ? (
          <Type
            aria-label={`${audio} audio works`}
            data-testid="work-count-type"
            data-type="audio"
          >
            {formatNumber(audio)} <IconAudio />
          </Type>
        ) : (
          <></>
        )}
        {video ? (
          <Type
            aria-label={`${video} video works`}
            data-testid="work-count-type"
            data-type="video"
          >
            {formatNumber(video)} <IconVideo />
          </Type>
        ) : (
          <></>
        )}
      </Types>
    </WorkCountStyled>
  );
};

export default WorkCount;
