import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { UserContext } from "@/context/user-context";
import {
  AuthDialogContent,
  AuthDialogColumn,
  AuthDialogDivider,
  AuthDialogOverlay,
  AuthDialogTitle,
  IconButton,
  MagicLinkInput,
} from "@/components/Shared/AuthDialog.styled";
import { Button } from "@nulib/design-system";
import { useContext } from "react";
import { DCAPI_ENDPOINT } from "@/lib/constants/endpoints";
import { Cross2Icon } from "@radix-ui/react-icons";
import { SpinLoader } from "@/components/Shared/Loader.styled";
import { useRouter } from "next/router";
import { apiGetRequest } from "@/lib/dc-api";
import axios from "axios";

export default function AuthDialog() {
  const { closeSignInModal, isSignInModalOpen } = useContext(UserContext);
  const router = useRouter();
  const [gotoUrl, setGotoUrl] = useState("");
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
      url: `${DCAPI_ENDPOINT}/auth/login/magic?email=${encodeURIComponent(userEmail)}`,
    })
      .then(() => {
        setMagicLinkResponse("success");
      })
      .catch((error) => {
        console.error(error);
        setMagicLinkResponse("error");
      });
    setTimeout(() => {
      setMagicLinkResponse("idle");
    }, 2000);
    setDisableMagicLinkButton(false);
  }

  useEffect(() => {
    axios
      .get(`${DCAPI_ENDPOINT}/capabilities/magic/chat`)
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
    if (!window) return;
    setGotoUrl(
      `${DCAPI_ENDPOINT}/auth/login?goto=${encodeURIComponent(getGotoLocation(window))}`,
    );
  }, [router.isReady]);

  return (
    <Dialog.Root open={isSignInModalOpen} onOpenChange={handleClose}>
      <Dialog.Portal>
        <AuthDialogOverlay />
        <AuthDialogContent
          onEscapeKeyDown={closeSignInModal}
          data-testid="auth-dialog"
        >
          <AuthDialogColumn data-testid="dialog-header">
            <AuthDialogTitle>Sign in to Digital Collections</AuthDialogTitle>
            {!shouldRenderMagicLink ? (
              <VisuallyHidden asChild>
                <Dialog.Description>
                  Sign in with your Northwestern NetID
                </Dialog.Description>
              </VisuallyHidden>
            ) : (
              <Dialog.Description>
                Choose your preferred login method below
              </Dialog.Description>
            )}
          </AuthDialogColumn>

          <AuthDialogColumn data-testid="sso-login">
            Login with your NetID {shouldRenderMagicLink && "for full access"}
            <Button
              as="a"
              isPrimary
              isLowercase
              //@ts-ignore - by setting as="a" we lose the type but href is set
              href={gotoUrl}
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
                  isLight={magicLinkResponse !== "error"}
                  isDanger={magicLinkResponse === "error"}
                  onClick={handleMagicLinkRequest}
                  isLowercase
                  disabled={disableMagicLinkButton}
                  data-testid="magic-link-button"
                >
                  {magicLinkResponse === "idle" &&
                    (disableMagicLinkButton
                      ? "Enter a valid email"
                      : "Get a temporary magic link")}
                  {magicLinkResponse === "sending" && (
                    <SpinLoader data-testid="spin-loader" size={"small"} />
                  )}
                  {magicLinkResponse === "success" && "Sent! Check your email."}
                  {magicLinkResponse === "error" &&
                    "There was an error sending the link. Please try again."}
                </Button>
              </AuthDialogColumn>
            </>
          )}

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
