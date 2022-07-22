import {
  IconSocialFacebook,
  IconSocialPinterest,
  IconSocialTwitter,
} from "@/components/Shared/SVG/Icons";
import Icon from "@/components/Shared/Icon";
import React from "react";
import { SocialStyled } from "@/components/Shared/Social.styled";

const SharedSocial: React.FC = () => {
  return (
    <SocialStyled>
      <Icon>
        <IconSocialFacebook />
      </Icon>
      <Icon>
        <IconSocialTwitter />
      </Icon>
      <Icon>
        <IconSocialPinterest />
      </Icon>
    </SocialStyled>
  );
};

export default SharedSocial;
