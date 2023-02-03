import Announcement from "@/components/Shared/Announcement";
import BlurredBgImage from "@/components/Shared/BlurredBgImage";
import CopyText from "@/components/Shared/CopyText";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import Link from "next/link";
import React from "react";

interface Props {
  thumbnail: string | null;
}

const WorkRestrictedDisplay: React.FC<Props> = ({ thumbnail }) => {
  return (
    <div data-testid="restricted-display">
      {thumbnail && (
        <BlurredBgImage
          bgImageUrl={thumbnail}
          bgColor="black"
          data-testid="bg-image"
        />
      )}

      <Announcement data-testid="announcement">
        <h2>Authentication needed</h2>
        <p>
          This Work requires Northwestern University NetID authentication.
          Please{" "}
          <Link
            href={`${DCAPI_ENDPOINT}/auth/login?goto=${window.location}`}
            style={{ cursor: "pointer" }}
          >
            sign in
          </Link>
        </p>
        <p>
          If you are not a member of the Northwestern Community, email{" "}
          <CopyText
            textPrompt="repository@northwestern.edu"
            textToCopy="repository@northwestern.edu"
          />{" "}
          to request access. Please include a short description of your research
          needs.
        </p>
      </Announcement>
    </div>
  );
};

export default WorkRestrictedDisplay;
