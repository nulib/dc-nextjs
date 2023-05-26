import Announcement from "@/components/Shared/Announcement";
import Container from "@/components/Shared/Container";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/Shared/ErrorFallback";
import { Manifest } from "@iiif/presentation-3";
import React from "react";
import RelatedItems from "@/components/Shared/RelatedItems";
import { type Work } from "@nulib/dcapi-types";
import WorkTopInfo from "@/components/Work/TopInfo";
import WorkViewerWrapper from "@/components/Work/ViewerWrapper";
import { formatDateLong } from "@/lib/utils/date-helpers";
import { getWorkSliders } from "@/lib/work-helpers";
import { styled } from "@/stitches.config";

const BoldText = styled("span", {
  fontFamily: "$northwesternSansBold",
});

interface SharedLinkProps {
  linkExpiration?: string;
  manifest: Manifest | null;
  work: Work | null;
}

const SharedLink: React.FC<SharedLinkProps> = ({
  linkExpiration,
  manifest,
  work,
}) => {
  const related = work ? getWorkSliders(work) : [];

  return (
    <div data-testid="shared-link-wrapper">
      {(!work || !manifest) && (
        <Announcement data-testid="error-announcement">
          <h2>Error retrieving Work</h2>
          <p>There was an error retrieving the Shared Link Work</p>
        </Announcement>
      )}
      {work && manifest && (
        <>
          <Announcement>
            <div data-testid="announcement">
              <h2>Shared Link </h2>
              <p>
                Access to this resource is for educational, personal and
                noncommercial use. Written permission of copyright holders is
                required for distribution.{" "}
                <a
                  href="https://www.library.northwestern.edu/about/administration/policies/rights-permissions.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read more
                </a>
              </p>
              <p>
                This work was shared with you via a temporary link. It will
                expire <BoldText>{formatDateLong(linkExpiration)}</BoldText>
              </p>
            </div>
          </Announcement>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <WorkViewerWrapper manifestId={work.iiif_manifest} />
            <Container>
              <WorkTopInfo manifest={manifest} work={work} />
              <RelatedItems collectionUris={related} title="Explore Further" />
            </Container>
          </ErrorBoundary>
        </>
      )}
    </div>
  );
};

export default SharedLink;
