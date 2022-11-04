import Announcement from "@/components/Shared/Announcement";
import Container from "@/components/Shared/Container";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/Shared/ErrorFallback";
import { Manifest } from "@iiif/presentation-3";
import React from "react";
import RelatedItems from "@/components/Shared/RelatedItems";
import { WorkShape } from "@/types/components/works";
import WorkTopInfo from "@/components/Work/TopInfo";
import WorkViewerWrapper from "@/components/Work/ViewerWrapper";
import { getRelatedCollections } from "@/lib/iiif/collection-helpers";

interface SharedLinkProps {
  manifest: Manifest | null;
  work: WorkShape | null;
}

const SharedLink: React.FC<SharedLinkProps> = ({ manifest, work }) => {
  const related = work ? getRelatedCollections(work) : null;

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
              <p>This work was shared with you via a temporary link.</p>
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
