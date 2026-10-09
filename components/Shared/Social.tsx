import styles from "@/components/Shared/Social.module.css";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";
import {
  IconSocialFacebook,
  IconSocialPinterest,
  IconSocialTwitter,
} from "@/components/Shared/SVG/Icons";
import Icon from "@/components/Shared/Icon";
import React from "react";
interface SharedSocialProps {
  title: string;
  description?: string[];
  media: string;
}
const SharedSocial: React.FC<SharedSocialProps> = ({
  description,
  media,
  title,
}) => {
  const currentLocation = String(window.location);
  return (
    <div className={styles.socialStyled}>
      <FacebookShareButton title={title} url={currentLocation}>
        <Icon>
          <IconSocialFacebook />
        </Icon>
      </FacebookShareButton>
      <TwitterShareButton title={title} url={currentLocation}>
        <Icon>
          <IconSocialTwitter />
        </Icon>
      </TwitterShareButton>
      <PinterestShareButton
        description={description?.join("\n")}
        media={media}
        title={title}
        url={currentLocation}
      >
        <Icon>
          <IconSocialPinterest />
        </Icon>
      </PinterestShareButton>
    </div>
  );
};
export default SharedSocial;
