import { NavTab, NavTabTitle, NavTabsStyled } from "./NavTabs.styled";
import React from "react";

const CollectionNavTabs = () => {
  return (
    <NavTabsStyled>
      <NavTab>
        <NavTabTitle>Explore</NavTabTitle>
      </NavTab>
      <NavTab>
        <NavTabTitle>Subjects</NavTabTitle>
      </NavTab>
      <NavTab>
        <NavTabTitle>Collection Organization</NavTabTitle>
      </NavTab>
    </NavTabsStyled>
  );
};

export default CollectionNavTabs;
