import { IconAudio, IconImage, IconVideo } from "@/components/Shared/SVG/Icons";
import {
  WorkCountTotal as Total,
  WorkCountType as Type,
  WorkCountTypes as Types,
  WorkCountStyled,
} from "@/components/Shared/WorkCount/WorkCount.styled";
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
      <Total data-testid="work-count-total">
        {total} {total !== 1 ? "Works" : "Work"}
      </Total>
      <Types>
        {image ? (
          <Type
            aria-label={`${image} image works`}
            data-testid="work-count-type"
            data-type="image"
          >
            {image} <IconImage />
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
            {audio} <IconAudio />
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
            {video} <IconVideo />
          </Type>
        ) : (
          <></>
        )}
      </Types>
    </WorkCountStyled>
  );
};

export default WorkCount;
