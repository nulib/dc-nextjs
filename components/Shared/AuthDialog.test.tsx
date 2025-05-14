import { act, render, screen, waitFor } from "@testing-library/react";
import { UserContext } from "@/context/user-context";
import { UserContext as UserContextType } from "@/types/context/user";
import React from "react";
import AuthDialog from "./AuthDialog";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock("axios");
jest.mock("@/lib/dc-api", () => ({
  apiGetRequest: jest.fn(
    () => new Promise((resolve) => setTimeout(resolve, 1000)),
  ),
}));

const defaultUserContext: UserContextType = {
  user: null,
  isSignInModalOpen: true,
  openSignInModal: jest.fn(() => {
    defaultUserContext.isSignInModalOpen = true;
  }),
  closeSignInModal: jest.fn(() => {
    defaultUserContext.isSignInModalOpen = false;
  }),
};

const withUserProvider = (
  Component: React.ReactNode,
  userContext: UserContextType = defaultUserContext,
) => {
  return (
    <UserContext.Provider value={userContext}>{Component}</UserContext.Provider>
  );
};

describe("AuthDialog", () => {
  let mockedAxios: jest.Mocked<typeof axios>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.get.mockResolvedValue({ data: { enabled: true } });
  });

  it("renders the primary components", async () => {
    render(withUserProvider(<AuthDialog />));

    // uesEfect will be called immediately, so we can check if the API was called
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled();
    });

    const dialogHeader = screen.getByTestId("dialog-header");
    expect(dialogHeader).toBeInTheDocument();

    const ssoLogin = screen.getByTestId("sso-login");
    expect(ssoLogin).toBeInTheDocument();

    const closeButton = screen.getByRole("button", {
      name: /Close/i,
    });

    expect(closeButton).toBeInTheDocument();
  });

  describe("Magic Link section", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      let mockedAxios = axios as jest.Mocked<typeof axios>;
      mockedAxios.get.mockResolvedValue({ data: { enabled: true } });
    });

    it("should not render magic link section when API returns false", async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { enabled: false } });

      render(withUserProvider(<AuthDialog />));

      // uesEfect will be called immediately, so we can check if the API was called
      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalled();
      });

      const magicLinkSection = screen.queryByTestId("magic-link");
      expect(magicLinkSection).not.toBeInTheDocument();
    });

    it("should render magic link section", async () => {
      render(withUserProvider(<AuthDialog />));

      // uesEfect will be called immediately, so we can check if the API was called
      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalled();
      });

      const magicLinkSection = screen.queryByTestId("magic-link");
      expect(magicLinkSection).toBeInTheDocument();
    });

    it("should disable magic link button with invalid email", async () => {
      render(withUserProvider(<AuthDialog />));

      // uesEfect will be called immediately, so we can check if the API was called
      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalled();
      });

      const emailInput = screen.getByTestId("magic-link-input");
      const magicLinkButton = screen.getByTestId("magic-link-button");

      await userEvent.type(emailInput, "invalid-email");

      expect(magicLinkButton).toBeDisabled();

      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, "valid@example.com");

      expect(magicLinkButton).not.toBeDisabled();
    });

    it("should show loading spinner when magic link is requested", async () => {
      render(withUserProvider(<AuthDialog />));

      // uesEfect will be called immediately, so we can check if the API was called
      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalled();
      });

      const emailInput = screen.getByTestId("magic-link-input");
      const magicLinkButton = screen.getByTestId("magic-link-button");

      await userEvent.type(emailInput, "valid@example.com");
      await userEvent.click(magicLinkButton);

      const spinner = screen.getByTestId("spin-loader");
      expect(spinner).toBeInTheDocument();
    });

    it("should show success message after successful magic link request", async () => {
      render(withUserProvider(<AuthDialog />));

      // uesEfect will be called immediately, so we can check if the API was called
      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalled();
      });

      const emailInput = screen.getByTestId("magic-link-input");
      const magicLinkButton = screen.getByTestId("magic-link-button");

      await userEvent.type(emailInput, "valid@example.com");
      await userEvent.click(magicLinkButton);

      await waitFor(() => {
        expect(magicLinkButton).toHaveTextContent("Sent! Check your email.");
      });
    });

    it("should show error message when magic link request fails", async () => {
      // mock failed magic link request
      require("@/lib/dc-api").apiGetRequest = jest.fn(() => {
        return new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error("Network error"));
          }, 200);
        });
      });

      // Mock console.error to avoid polluting test output
      jest.spyOn(console, "error").mockImplementation(() => {});

      render(withUserProvider(<AuthDialog />));

      // uesEfect will be called immediately, so we can check if the API was called
      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalled();
      });

      const emailInput = screen.getByTestId("magic-link-input");
      const magicLinkButton = screen.getByTestId("magic-link-button");

      await userEvent.type(emailInput, "valid@example.com");
      await userEvent.click(magicLinkButton);

      await waitFor(() => {
        expect(magicLinkButton).toHaveClass(/isDanger/);
      });
    });
  });
});
