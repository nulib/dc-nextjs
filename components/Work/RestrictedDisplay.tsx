import Announcement from "@/components/Shared/Announcement";
import BlurredBgImage from "@/components/Shared/BlurredBgImage";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import Link from "next/link";
import React from "react";

interface Props {
  thumbnail: string | null;
  workId?: string;
  workTitle?: string | null;
}

const WorkRestrictedDisplay: React.FC<Props> = ({
  thumbnail,
  workId,
  workTitle = "",
}) => {
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
          <a
            target="_blank"
            rel="noreferrer"
            href={`mailto:repository@northwestern.edu?subject=${encodeURIComponent(
              `Work ID: ${workId} access request`,
            )}&body=${encodeURIComponent(
              `Hello, I have a question about "${workTitle}".\n\nhttps://dc.library.northwestern.edu/items/${workId}\n\nQUESTION: `,
            )}`}
          >
            repository@northwestern.edu
          </a>{" "}
          to request access. Please include a short description of your research
          needs.
        </p>
      </Announcement>
    </div>
  );
};

export default WorkRestrictedDisplay;
