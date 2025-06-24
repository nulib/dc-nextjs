import * as Dialog from "@radix-ui/react-dialog";

import {
  AuthDialogColumn,
  AuthDialogContent,
  AuthDialogDescription,
  AuthDialogDivider,
  AuthDialogOptions,
  AuthDialogOverlay,
  AuthDialogTitle,
  IconButton,
  MagicLinkInput,
} from "@/components/Shared/AuthDialog.styled";
import { useEffect, useState } from "react";

import { Button } from "@nulib/design-system";
import { Cross2Icon } from "@radix-ui/react-icons";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import { SpinLoader } from "@/components/Shared/Loader.styled";
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
        const resp: { enabled: boolean; provider: string; feature: string } =
          response.data;
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
      <AuthDialogOverlay />
      <Dialog.Portal>
        <AuthDialogContent
          onEscapeKeyDown={closeSignInModal}
          data-testid="auth-dialog"
        >
          <AuthDialogColumn data-testid="dialog-header">
            <AuthDialogTitle>Sign in to Digital Collections</AuthDialogTitle>
            {!shouldRenderMagicLink ? (
              <VisuallyHidden asChild>
                <AuthDialogDescription>
                  Sign in with your Northwestern NetID
                </AuthDialogDescription>
              </VisuallyHidden>
            ) : (
              <AuthDialogDescription>
                Choose your preferred method
              </AuthDialogDescription>
            )}
          </AuthDialogColumn>

          <AuthDialogOptions>
            <AuthDialogColumn data-testid="sso-login">
              Sign in with your NetID{" "}
              {shouldRenderMagicLink && "for full access"}
              <Button
                as="a"
                isPrimary
                isLowercase
                //@ts-ignore - by setting as="a" we lose the type but href is set
                href={ssoUrl}
              >
                Northwestern NetID
              </Button>
            </AuthDialogColumn>

            {shouldRenderMagicLink && (
              <>
                <AuthDialogColumn>
                  <AuthDialogDivider>OR</AuthDialogDivider>
                </AuthDialogColumn>
                <AuthDialogColumn data-testid="magic-link">
                  <MagicLinkInput
                    data-testid="magic-link-input"
                    type="email"
                    onChange={handleEmailChange}
                    aria-label="Enter your email address"
                    placeholder="name@email.com"
                  />
                  <Button
                    isDanger={magicLinkResponse === "error"}
                    onClick={handleMagicLinkRequest}
                    isLowercase
                    disabled={disableMagicLinkButton}
                    data-testid="magic-link-button"
                  >
                    {magicLinkResponse === "idle" &&
                      (disableMagicLinkButton
                        ? "Enter a valid email"
                        : "Get temporary access")}
                    {magicLinkResponse === "sending" && (
                      <SpinLoader data-testid="spin-loader" size={"small"} />
                    )}
                    {magicLinkResponse === "success" &&
                      "Sent! Check your email."}
                    {magicLinkResponse === "error" &&
                      "There was an error sending the link. Please try again."}
                  </Button>
                </AuthDialogColumn>
              </>
            )}
          </AuthDialogOptions>

          <a
            href="https://www.northwestern.edu/privacy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>

          <Dialog.Close asChild>
            <IconButton aria-label="Close">
              <Cross2Icon />
            </IconButton>
          </Dialog.Close>
        </AuthDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
