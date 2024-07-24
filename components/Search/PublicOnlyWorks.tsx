import {
  Label,
  StyledSwitch,
  StyledThumb,
  StyledToggle,
  Wrapper,
} from "@/components/Shared/Switch.styled";

import React from "react";
import useQueryParams from "@/hooks/useQueryParams";
import { useRouter } from "next/router";

const SearchPublicOnlyWorks = () => {
  const router = useRouter();
  const { urlFacets } = useQueryParams();
  const { query: q } = router;

  const switchId = `public-works-toggle`;
  const checked =
    urlFacets?.visibility && urlFacets?.visibility[0] === "Public";

  const handleCheckedChange = (value: boolean) => {
    const newObj = { ...urlFacets };
    newObj["visibility"] = value ? ["Public"] : [];

    router.push({
      pathname: "/search",
      query: { ...(q && q), ...newObj },
    });
  };

  return (
    <StyledToggle>
      <Wrapper>
        <Label htmlFor={switchId} css={checked ? { opacity: "1" } : {}}>
          Public only
        </Label>
        <StyledSwitch
          checked={checked}
          id={switchId}
          onCheckedChange={handleCheckedChange}
        >
          <StyledThumb />
        </StyledSwitch>
      </Wrapper>
    </StyledToggle>
  );
};

export default SearchPublicOnlyWorks;
