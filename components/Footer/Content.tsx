import {
  FooterContentColumn,
  FooterContentWrapper,
  FooterCopyright,
  FooterIcon,
  FooterList,
  FooterStyled,
  Social,
} from "./Footer.styled";

import React from "react";

export const FooterContent: React.FC = () => {
  const currentYear = () => {
    const today = new Date();
    return today.getFullYear();
  };

  return (
    <FooterStyled>
      <FooterContentWrapper>
        {/* Column 1 */}
        <FooterContentColumn>
          <a href="https://www.northwestern.edu">
            <div className="footer-logo">
              <img
                alt="Northwestern University logo"
                src="https://common.northwestern.edu/v8/css/images/northwestern-university.svg"
                style={{
                  maxWidth: "200px",
                  marginBottom: "1rem",
                }}
              />
            </div>
          </a>
          <FooterList>
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
              <a href="#" className="cky-banner-element">
                Cookie Settings
              </a>
            </li>
          </FooterList>
        </FooterContentColumn>

        {/* Column 2 */}
        <FooterContentColumn className="contact">
          <FooterList as="div">
            <FooterIcon
              css={{
                background:
                  "url('https://common.northwestern.edu/v8/css/images/icons/pin-drop.svg') no-repeat",
              }}
            >
              <span className="hide-label">Address</span>
            </FooterIcon>
            <span>
              1970 Campus Drive
              <br /> Evanston, IL 60208
            </span>
          </FooterList>
          <FooterList as="div">
            <FooterIcon
              css={{
                background:
                  "url('https://common.northwestern.edu/v8/css/images/icons/mobile-phone.svg') no-repeat",
              }}
            >
              <span className="hide-label">Phone number</span>
            </FooterIcon>
            <span>(847) 491-7658</span>
          </FooterList>
          <FooterList as="div">
            <FooterIcon
              css={{
                background:
                  "url('https://common.northwestern.edu/v8/css/images/icons/email.svg') no-repeat",
                top: "2px",
              }}
            >
              <span className="hide-label">Email Address</span>
            </FooterIcon>

            <span>
              <a href="mailto:library@northwestern.edu">
                library@northwestern.edu
              </a>
            </span>
          </FooterList>
        </FooterContentColumn>

        {/* Column 3 */}
        <FooterContentColumn>
          <p style={{ lineHeight: "1", margin: "0 0 1rem" }}>
            <strong>Social Media</strong>
          </p>
          <Social
            className="facebook"
            href="https://www.facebook.com/NorthwesternLibrary"
          >
            Facebook
          </Social>

          <Social className="twitter" href="https://twitter.com/nu_library">
            Twitter
          </Social>
          <Social
            className="instagram"
            href="https://www.instagram.com/nu_library/"
          >
            Instagram
          </Social>
          <br />
          <Social
            className="youtube"
            href="https://www.youtube.com/user/NorthwesternLib"
          >
            YouTube
          </Social>
          <Social
            className="wordpress"
            href="http://sites.northwestern.edu/northwesternlibrary/"
          >
            WordPress
          </Social>
        </FooterContentColumn>

        {/* Column 4 */}
        <FooterContentColumn>
          <div>
            <FooterList>
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
            </FooterList>
          </div>
        </FooterContentColumn>
      </FooterContentWrapper>

      <FooterCopyright>
        <p>
          Northwestern University Libraries is dedicated to the fair and ethical
          preservation, digitization, curation, and use of its collections. The
          works on this Web site are made available to the public under Fair Use
          (Section 107 of the Copyright Act) for learning and teaching purposes,
          as well as to promote the mission and activities of Northwestern
          University Libraries. Northwestern University Libraries does not claim
          the copyright of any materials on this site. If you are the copyright
          holder of any item(s) in this collection or have questions, comments
          or concerns about this exhibit, please contact us via email at{" "}
          <a href="library@northwestern.edu">library@northwestern.edu</a>.
        </p>
        <p>
          Northwestern University Libraries&apos; Digital Collections contain
          materials that reflect the beliefs and norms of their eras and culture
          in which they were created or collected. The site may contain imagery,
          language, or opinions that are offensive and may not be appropriate
          for all audiences.
        </p>
      </FooterCopyright>
    </FooterStyled>
  );
};
