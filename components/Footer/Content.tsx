import contentStyles from "@/components/Footer/Content.module.css";
import footerStyles from "@/components/Footer/Footer.module.css";
import { getBuildInfo } from "@/lib/build-info";
import React from "react";
export const FooterContent: React.FC = () => {
  const { version, releaseUrl, commitUrl, shortSha, label } = getBuildInfo();
  const currentYear = () => {
    const today = new Date();
    return today.getFullYear();
  };
  const VersionTag = releaseUrl ? "a" : "span";
  return (
    <footer className={footerStyles.footerStyled}>
      <div className={footerStyles.footerContentWrapper}>
        {/* Column 1 */}
        <div className={footerStyles.footerContentColumn}>
          <a href="https://www.northwestern.edu">
            <div className={"footer-logo"}>
              <img
                alt="Northwestern University logo"
                src="https://common.northwestern.edu/v8/css/images/northwestern-university.svg"
                className={contentStyles.override0}
              />
            </div>
          </a>
          <ul className={footerStyles.footerList}>
            <li>&copy; {currentYear()} Northwestern University</li>
            <li>
              <a href="https://www.northwestern.edu/emergency/index.html">
                Campus Emergency Information
              </a>
            </li>
            <li>
              <a href="https://www.northwestern.edu/hr/careers/">Careers</a>
            </li>
            <li>
              <a href="https://www.northwestern.edu/contact.html">
                Contact Northwestern University
              </a>
            </li>
            <li>
              <a href="https://www.northwestern.edu/privacy/">Privacy Policy</a>
            </li>
            <li>
              <a href="https://www.northwestern.edu/disclaimer.html">
                Disclaimer
              </a>
            </li>
            <li>
              <a href="https://www.northwestern.edu/accessibility/about/report-an-accessibility-issue.html">
                Report an Accessibility Issue
              </a>
            </li>
            <li>
              <a href="https://policies.northwestern.edu/">
                University Policies
              </a>
            </li>
            <li>
              <a href="#" className={"cky-banner-element"}>
                Cookie Settings
              </a>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div
          className={[footerStyles.footerContentColumn, "contact"]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={footerStyles.footerList}>
            <li
              className={[footerStyles.footerIcon, contentStyles.override1]
                .filter(Boolean)
                .join(" ")}
            >
              <span className={"hide-label"}>Address</span>
            </li>
            <span>
              1970 Campus Drive
              <br /> Evanston, IL 60208
            </span>
          </div>
          <div className={footerStyles.footerList}>
            <li
              className={[footerStyles.footerIcon, contentStyles.override2]
                .filter(Boolean)
                .join(" ")}
            >
              <span className={"hide-label"}>Phone number</span>
            </li>
            <span>(847) 491-7658</span>
          </div>
          <div className={footerStyles.footerList}>
            <li
              className={[footerStyles.footerIcon, contentStyles.override3]
                .filter(Boolean)
                .join(" ")}
            >
              <span className={"hide-label"}>Email Address</span>
            </li>

            <span>
              <a href="mailto:library@northwestern.edu">
                library@northwestern.edu
              </a>
            </span>
          </div>
        </div>

        {/* Column 3 */}
        <div className={footerStyles.footerContentColumn}>
          <p className={contentStyles.override4}>
            <strong>Social Media</strong>
          </p>
          <a
            href="https://www.facebook.com/NorthwesternLibrary"
            className={[footerStyles.social, "facebook"]
              .filter(Boolean)
              .join(" ")}
          >
            Facebook
          </a>

          <a
            href="https://twitter.com/nu_library"
            className={[footerStyles.social, "twitter"]
              .filter(Boolean)
              .join(" ")}
          >
            Twitter
          </a>
          <a
            href="https://www.instagram.com/nu_library/"
            className={[footerStyles.social, "instagram"]
              .filter(Boolean)
              .join(" ")}
          >
            Instagram
          </a>
          <br />
          <a
            href="https://www.youtube.com/user/NorthwesternLib"
            className={[footerStyles.social, "youtube"]
              .filter(Boolean)
              .join(" ")}
          >
            YouTube
          </a>
          <a
            href="http://sites.northwestern.edu/northwesternlibrary/"
            className={[footerStyles.social, "wordpress"]
              .filter(Boolean)
              .join(" ")}
          >
            WordPress
          </a>
        </div>

        {/* Column 4 */}
        <div className={footerStyles.footerContentColumn}>
          <div>
            <ul className={footerStyles.footerList}>
              <li>
                <a href="http://northwestern.libanswers.com/">FAQs</a>
              </li>
              <li>
                <a href="https://www.library.northwestern.edu/about/support/index.html">
                  Support Us
                </a>
              </li>
              <li>
                <a href="https://www.library.northwestern.edu/about/library-jobs/index.html">
                  Library Jobs
                </a>
              </li>
              <li>
                <a href="https://www.library.northwestern.edu/about/administration/policies/index.html">
                  Library Policies
                </a>
              </li>
              <li>
                <a href="https://www.library.northwestern.edu/about/contact/general-feedback.html">
                  Provide Feedback
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={footerStyles.footerCopyright}>
        <p>
          Northwestern University Libraries is dedicated to the fair and ethical
          preservation, digitization, curation, and use of its collections. The
          works on this Web site are made available to the public under Fair Use
          (Section 107 of the Copyright Act) for learning and teaching purposes,
          as well as to promote the mission and activities of Northwestern
          University Libraries. Northwestern University Libraries does not claim
          the copyright of any materials on this site. If you are the copyright
          holder of any item(s) in this collection or have questions, comments
          or concerns about this site, please contact us via email at{" "}
          <a href="library@northwestern.edu">library@northwestern.edu</a>.
        </p>
        <p>
          Northwestern University Libraries&apos; Digital Collections contain
          materials that reflect the beliefs and norms of their eras and culture
          in which they were created or collected. The site may contain imagery,
          language, or opinions that are offensive and may not be appropriate
          for all audiences.
        </p>
        <VersionTag
          href={releaseUrl ?? undefined}
          className={footerStyles.footerVersion}
        >
          v{version}
          {label && (
            <>
              {` (${label}`}
              {commitUrl && shortSha ? (
                <>
                  {" "}
                  <a href={commitUrl}>{shortSha}</a>
                </>
              ) : (
                shortSha && ` ${shortSha}`
              )}
              {")"}
            </>
          )}
        </VersionTag>
      </div>
    </footer>
  );
};
