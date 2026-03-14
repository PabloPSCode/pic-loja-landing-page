import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

import { app } from "./client";

export const auth = getAuth(app);

export async function signInWithGooglePopup() {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  return signInWithPopup(auth, provider);
}

export async function signOutAuthenticatedUser() {
  await signOut(auth);
}
