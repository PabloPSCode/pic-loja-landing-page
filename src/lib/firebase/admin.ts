import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function getRequiredAdminEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing Firebase admin environment variable: ${name}`);
  }

  return value;
}

function getFirebaseAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0]!;
  }

  return initializeApp({
    credential: cert({
      projectId: getRequiredAdminEnv("FIREBASE_ADMIN_PROJECT_ID"),
      clientEmail: getRequiredAdminEnv("FIREBASE_ADMIN_CLIENT_EMAIL"),
      privateKey: getRequiredAdminEnv("FIREBASE_ADMIN_PRIVATE_KEY").replace(
        /\\n/g,
        "\n",
      ),
    }),
  });
}

const adminApp = getFirebaseAdminApp();

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
