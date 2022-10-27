import Announcement from "@/components/Shared/Announcement";
import BlurredBgImage from "@/components/Shared/BlurredBgImage";
import React from "react";

interface Props {
  thumbnail: string;
}

const WorkRestrictedDisplay: React.FC<Props> = ({ thumbnail }) => {
  function handleScrollToTop() {
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: 0,
    });
  }

  return (
    <div data-testid="restricted-display">
      <BlurredBgImage
        bgImageUrl={thumbnail}
        bgColor="black"
        data-testid="bg-image"
      />
      <Announcement data-testid="announcement">
        <h2>Authentication needed</h2>
        <p>
          This Work requires Northwestern University NetID authentication or has
          restricted access.
        </p>
        <p>
          Please{" "}
          <a style={{ cursor: "pointer" }} onClick={handleScrollToTop}>
            sign in
          </a>{" "}
          or email{" "}
          <a href="mailto:repository@northwestern.edu">
            repository@northwestern.edu
          </a>{" "}
          to request access to this work.
        </p>
      </Announcement>
    </div>
  );
};

export default WorkRestrictedDisplay;
