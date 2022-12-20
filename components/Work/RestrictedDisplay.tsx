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
          This Work requires Northwestern University NetID authentication.
          Please{" "}
          <a style={{ cursor: "pointer" }} onClick={handleScrollToTop}>
            sign in
          </a>{" "}
        </p>
        <p>
          If you are not a member of the Northwestern Community, you can{" "}
          <a href="mailto:repository@northwestern.edu">request access</a>.
          Please include a short description of your research needs.
        </p>
      </Announcement>
    </div>
  );
};

export default WorkRestrictedDisplay;
