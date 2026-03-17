"use client";

import GoogleSignInButton from "@/components/buttons/GoogleButton";
import type { FirebaseError } from "firebase/app";
import { signInWithGooglePopup } from "@/lib/firebase/auth";
import { syncAuthenticatedUserProfile } from "@/lib/firebase/users";
import GenericModal from "@/components/modals/GenericModal";
import type { AuthUser } from "@/stores/auth-store";
import { useEffect, useState } from "react";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onAuthenticate?: (user: AuthUser) => Promise<void> | void;
}

function getFriendlyAuthErrorMessage(error: unknown) {
  const firebaseErrorCode =
    typeof error === "object" && error !== null && "code" in error
      ? (error as FirebaseError).code
      : null;

  switch (firebaseErrorCode) {
    case "auth/configuration-not-found":
    case "auth/operation-not-allowed":
      return "Google login is not enabled in Firebase Authentication. Enable Authentication > Sign-in method > Google in the Firebase Console.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized in Firebase Authentication. Add localhost to Authentication > Settings > Authorized domains.";
    case "auth/popup-blocked":
      return "The Google login popup was blocked by the browser. Allow popups for this site and try again.";
    case "auth/popup-closed-by-user":
      return "Google login was canceled before completion.";
    case "auth/cancelled-popup-request":
      return "Another Google login attempt is already in progress.";
    case "auth/invalid-api-key":
    case "auth/app-not-authorized":
      return "Your Firebase web config does not match the current project. Check NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, and NEXT_PUBLIC_FIREBASE_PROJECT_ID.";
    default:
      return error instanceof Error
        ? error.message
        : "Nao foi possivel concluir o login com o Google.";
  }
}

export default function LoginModal({
  open,
  onClose,
  onAuthenticate,
}: LoginModalProps) {
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (!open) {
      setAuthError(null);
      setIsAuthenticating(false);
    }
  }, [open]);

  const handleGoogleAuthentication = async () => {
    setAuthError(null);
    setIsAuthenticating(true);

    try {
      const credentialResult = await signInWithGooglePopup();
      const resolvedName = credentialResult.user.displayName ?? undefined;
      const resolvedEmail = credentialResult.user.email ?? undefined;
      const resolvedAvatarUrl = credentialResult.user.photoURL ?? undefined;

      if (!resolvedName || !resolvedEmail) {
        throw new Error("O Google nao retornou nome e email para esta conta.");
      }

      const syncedUser = await syncAuthenticatedUserProfile(credentialResult.user.uid, {
        name: resolvedName,
        email: resolvedEmail,
        avatarUrl: resolvedAvatarUrl,
      });

      try {
        await onAuthenticate?.({
          id: credentialResult.user.uid,
          name: resolvedName,
          email: resolvedEmail,
          activePlan: syncedUser.activePlan,
          availableCredits: syncedUser.availableCredits,
          consumedCredits: syncedUser.consumedCredits,
          avatarUrl: resolvedAvatarUrl,
        });
      } catch (syncError) {
        console.error("Failed to sync authenticated user to app state:", syncError);
        throw syncError;
      }
    } catch (error) {
      setAuthError(getFriendlyAuthErrorMessage(error));
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <GenericModal
      title="Login"
      description="Faça login para acessar sua conta e aproveitar todos os recursos do Pic Loja."
      open={open}
      onClose={onClose}
    >
      <div className="space-y-3">
        <GoogleSignInButton
          disabled={isAuthenticating}
          label={isAuthenticating ? "Entrando..." : "Entrar com o Google"}
          loading={isAuthenticating}
          onClick={handleGoogleAuthentication}
          type="button"
        />
        {authError && (
          <p className="text-sm text-red-600" role="alert">
            {authError}
          </p>
        )}
      </div>
    </GenericModal>
  );
}
