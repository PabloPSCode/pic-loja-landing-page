import type { FirebaseError } from "firebase/app";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "./client";

function sanitizeFilenameSegment(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateProductImagePath(userId: string, title: string) {
  const normalizedTitle = sanitizeFilenameSegment(title) || "produto";
  const uniqueId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}`;

  return `products/${userId}/${normalizedTitle}-${uniqueId}.png`;
}

export async function uploadGeneratedProductImage(
  imageUrl: string,
  userId: string,
  title: string,
) {
  const imageResponse = await fetch(imageUrl);

  if (!imageResponse.ok) {
    throw new Error("Nao foi possivel carregar a imagem gerada para upload.");
  }

  const imageBlob = await imageResponse.blob();
  const storagePath = generateProductImagePath(userId, title);
  const storageRef = ref(storage, storagePath);

  await uploadBytes(storageRef, imageBlob, {
    contentType: imageBlob.type || "image/png",
  });

  return getDownloadURL(storageRef);
}

export async function deleteGeneratedProductImage(imageUrl: string) {
  try {
    await deleteObject(ref(storage, imageUrl));
  } catch (error) {
    const firebaseErrorCode =
      typeof error === "object" && error !== null && "code" in error
        ? (error as FirebaseError).code
        : null;

    if (firebaseErrorCode === "storage/object-not-found") {
      return;
    }

    throw error;
  }
}
