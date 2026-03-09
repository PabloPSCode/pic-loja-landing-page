"use client";

import GoogleSignInButton from "@/components/buttons/GoogleButton";
import GenericModal from "@/components/modals/GenericModal";
import type { AuthUser } from "@/stores/auth-store";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const GOOGLE_AUTH_SCOPE = "openid email profile";
const GOOGLE_USERINFO_ENDPOINT = "https://openidconnect.googleapis.com/v1/userinfo";

interface GoogleTokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
}

interface GoogleUserInfoResponse {
  name?: string;
  email?: string;
  picture?: string;
}

interface GoogleTokenClient {
  requestAccessToken: (overrideConfig?: { prompt?: string }) => void;
}

interface GoogleWindow extends Window {
  google?: {
    accounts?: {
      oauth2?: {
        initTokenClient: (config: {
          client_id: string;
          scope: string;
          callback: (response: GoogleTokenResponse) => void;
          error_callback?: () => void;
        }) => GoogleTokenClient;
      };
    };
  };
}

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onAuthenticate?: (user: AuthUser) => void;
}

export default function LoginModal({
  open,
  onClose,
  onAuthenticate,
}: LoginModalProps) {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const tokenClientRef = useRef<GoogleTokenClient | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false);

  useEffect(() => {
    const googleWindow = window as GoogleWindow;

    if (googleWindow.google?.accounts?.oauth2) {
      setIsGoogleScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!open) {
      setAuthError(null);
      setIsAuthenticating(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open || !isGoogleScriptLoaded || !googleClientId) {
      return;
    }

    const googleWindow = window as GoogleWindow;
    const oauthClient = googleWindow.google?.accounts?.oauth2;

    if (!oauthClient) {
      setAuthError("Nao foi possivel inicializar o login do Google.");
      return;
    }

    tokenClientRef.current = oauthClient.initTokenClient({
      client_id: googleClientId,
      scope: GOOGLE_AUTH_SCOPE,
      callback: async ({ access_token, error, error_description }) => {
        if (error || !access_token) {
          setAuthError(error_description || "Nao foi possivel autenticar com o Google.");
          setIsAuthenticating(false);
          return;
        }

        try {
          const response = await fetch(GOOGLE_USERINFO_ENDPOINT, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });

          if (!response.ok) {
            throw new Error("Falha ao carregar os dados da conta Google.");
          }

          const profile = (await response.json()) as GoogleUserInfoResponse;

          if (!profile.name || !profile.email) {
            throw new Error("O Google nao retornou nome e email para esta conta.");
          }

          setAuthError(null);
          setIsAuthenticating(false);
          onAuthenticate?.({
            name: profile.name,
            email: profile.email,
            avatarUrl: profile.picture,
          });
        } catch (error) {
          setAuthError(
            error instanceof Error
              ? error.message
              : "Nao foi possivel concluir o login com o Google.",
          );
          setIsAuthenticating(false);
        }
      },
      error_callback: () => {
        setAuthError("Nao foi possivel abrir o login do Google.");
        setIsAuthenticating(false);
      },
    });

    return () => {
      tokenClientRef.current = null;
    };
  }, [googleClientId, isGoogleScriptLoaded, onAuthenticate, open]);

  const handleGoogleAuthentication = () => {
    if (!googleClientId) {
      setAuthError("Defina NEXT_PUBLIC_GOOGLE_CLIENT_ID para habilitar o login Google.");
      return;
    }

    if (!isGoogleScriptLoaded) {
      setAuthError("O SDK do Google ainda esta carregando. Tente novamente em instantes.");
      return;
    }

    if (!tokenClientRef.current) {
      setAuthError("O login Google ainda nao foi inicializado.");
      return;
    }

    setAuthError(null);
    setIsAuthenticating(true);
    tokenClientRef.current.requestAccessToken({ prompt: "select_account" });
  };

  const buttonLabel = isAuthenticating
    ? "Entrando..."
    : isGoogleScriptLoaded
      ? "Entrar com o Google"
      : "Carregando Google...";

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setIsGoogleScriptLoaded(true)}
        onError={() =>
          setAuthError("Nao foi possivel carregar o SDK do Google.")
        }
      />
      <GenericModal
        title="Login"
        description="Faça login para acessar sua conta e aproveitar todos os recursos do Pic Loja."
        open={open}
        onClose={onClose}
      >
        <div className="space-y-3">
          <GoogleSignInButton
            disabled={!googleClientId || !isGoogleScriptLoaded || isAuthenticating}
            label={buttonLabel}
            loading={isAuthenticating}
            onClick={handleGoogleAuthentication}
            type="button"
          />
          {authError && (
            <p className="text-sm text-red-600" role="alert">
              {authError}
            </p>
          )}
          {!googleClientId && (
            <p className="text-xs text-foreground/70">
              Configure a variavel de ambiente{" "}
              <code>NEXT_PUBLIC_GOOGLE_CLIENT_ID</code> para habilitar este login.
            </p>
          )}
        </div>
      </GenericModal>
    </>
  );
}
