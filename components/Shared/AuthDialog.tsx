import loaderStyles from "@/components/Shared/Loader.module.css";
import authDialogStyles from "@/components/Shared/AuthDialog.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { Button } from "@/components/Shared/Button/Button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import { UserContext } from "@/context/user-context";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { apiGetRequest } from "@/lib/dc-api";
import axios from "axios";
import { useContext } from "react";
import { useRouter } from "next/router";
export default function AuthDialog() {
  const { closeSignInModal, isSignInModalOpen, user } = useContext(UserContext);
  const router = useRouter();
  const [ssoUrl, setSsoUrl] = useState("");
  const [magicLinkResponse, setMagicLinkResponse] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [disableMagicLinkButton, setDisableMagicLinkButton] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [shouldRenderMagicLink, setShouldRenderMagicLink] = useState(false);
  function handleClose() {
    closeSignInModal();
    setMagicLinkResponse("idle");
  }
  function getGotoLocation(window: Window) {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    url.searchParams.delete("login_modal");
    return url.toString();
  }
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDisableMagicLinkButton(!e.target.validity.valid);
    setUserEmail(e.target.value);
  }
  async function handleMagicLinkRequest() {
    setMagicLinkResponse("sending");
    setDisableMagicLinkButton(true);
    apiGetRequest({
      url: `${DCAPI_ENDPOINT}/auth/login/magic?email=${encodeURIComponent(userEmail)}&goto=${encodeURIComponent(getGotoLocation(window))}`,
    })
      .then(() => {
        setMagicLinkResponse("success");
        setTimeout(() => {
          setMagicLinkResponse("idle");
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        setMagicLinkResponse("error");
      });
    setDisableMagicLinkButton(false);
  }
  useEffect(() => {
    axios
      .get(`${DCAPI_ENDPOINT}/capabilities/magic/login`)
      .then((response) => {
        const resp: {
          enabled: boolean;
          provider: string;
          feature: string;
        } = response.data;
        setShouldRenderMagicLink(resp.enabled);
      })
      .catch((error) => {
        console.error("Error fetching magic link availability:", error);
        setShouldRenderMagicLink(false);
      });
  }, []);
  useEffect(() => {
    // If a user is logged in via magic link, we don't want to show the magic link option
    // Note: getUser() in UserContext and the axios call above are both async
    // so this useEffect tracks both values in orders to run after they have completed.
    if (user && user.isLoggedIn && user.provider === "magic") {
      setShouldRenderMagicLink(false);
    }
  }, [shouldRenderMagicLink, user]);
  useEffect(() => {
    if (!window) return;
    setSsoUrl(
      `${DCAPI_ENDPOINT}/auth/login?goto=${encodeURIComponent(getGotoLocation(window))}`,
    );
  }, [router.isReady]);
  return (
    <Dialog.Root open={isSignInModalOpen} onOpenChange={handleClose}>
      <Dialog.Overlay className={authDialogStyles.authDialogOverlay} />
      <Dialog.Portal>
        <Dialog.Content
          onEscapeKeyDown={closeSignInModal}
          data-testid="auth-dialog"
          className={authDialogStyles.authDialogContent}
        >
          <div
            data-testid="dialog-header"
            className={authDialogStyles.authDialogColumn}
          >
            <Dialog.Title className={authDialogStyles.authDialogTitle}>
              Sign in to Digital Collections
            </Dialog.Title>
            {!shouldRenderMagicLink ? (
              <VisuallyHidden asChild>
                <Dialog.Description
                  className={authDialogStyles.authDialogDescription}
                >
                  Sign in with your Northwestern NetID
                </Dialog.Description>
              </VisuallyHidden>
            ) : (
              <Dialog.Description
                className={authDialogStyles.authDialogDescription}
              >
                Choose your preferred method
              </Dialog.Description>
            )}
          </div>

          <div className={authDialogStyles.authDialogOptions}>
            <div
              data-testid="sso-login"
              className={authDialogStyles.authDialogColumn}
            >
              Sign in with your NetID{" "}
              {shouldRenderMagicLink && "for full access"}
              <Button variant="primary" textCase="normal" href={ssoUrl}>
                Northwestern NetID
              </Button>
            </div>

            {shouldRenderMagicLink && (
              <>
                <div className={authDialogStyles.authDialogColumn}>
                  <div className={authDialogStyles.authDialogDivider}>OR</div>
                </div>
                <div
                  data-testid="magic-link"
                  className={authDialogStyles.authDialogColumn}
                >
                  <p>
                    Temporary access enables use of the{" "}
                    <strong>AI search tool only</strong>. It does not grant
                    access to restricted collection items.
                  </p>
                  <input
                    data-testid="magic-link-input"
                    type="email"
                    onChange={handleEmailChange}
                    aria-label="Enter your email address"
                    placeholder="name@email.com"
                    className={authDialogStyles.magicLinkInput}
                  />
                  <Button
                    variant={
                      magicLinkResponse === "error" ? "danger" : "default"
                    }
                    onClick={handleMagicLinkRequest}
                    textCase="normal"
                    disabled={disableMagicLinkButton}
                    data-testid="magic-link-button"
                  >
                    {magicLinkResponse === "idle" &&
                      (disableMagicLinkButton
                        ? "Enter a valid email"
                        : "Get temporary access")}
                    {magicLinkResponse === "sending" && (
                      <span
                        data-testid="spin-loader"
                        data-size={"small"}
                        className={loaderStyles.spinLoader}
                      />
                    )}
                    {magicLinkResponse === "success" &&
                      "Sent! Check your email."}
                    {magicLinkResponse === "error" &&
                      "There was an error sending the link. Please try again."}
                  </Button>
                </div>
              </>
            )}
          </div>

          <a
            href="https://www.northwestern.edu/privacy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>

          <Dialog.Close asChild>
            <button aria-label="Close" className={authDialogStyles.iconButton}>
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
