import type {
  ICreateProductDTO,
  IProductDocumentDTO,
  IUpdateProductDTO,
} from "@/dtos/product.dto";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "./client";
import {
  type FirestoreProductDocument,
  mapProductDocument,
} from "./firestore-mappers";

const PRODUCTS_COLLECTION = "products";

function buildProductPayload(
  data: ICreateProductDTO | IUpdateProductDTO,
): Partial<FirestoreProductDocument> {
  return {
    ...(data.title !== undefined ? { title: data.title } : {}),
    ...(data.description !== undefined ? { description: data.description } : {}),
    ...(data.price !== undefined ? { price: data.price } : {}),
    ...(data.imageUrl !== undefined ? { imageUrl: data.imageUrl } : {}),
    ...(data.bgColor !== undefined ? { bgColor: data.bgColor } : {}),
    ...("userId" in data && data.userId !== undefined ? { userId: data.userId } : {}),
  };
}

export async function createProduct(
  data: ICreateProductDTO,
): Promise<IProductDocumentDTO> {
  const productRef = doc(collection(db, PRODUCTS_COLLECTION));
  const now = new Date();
  const payload: FirestoreProductDocument = {
    title: data.title,
    description: data.description,
    price: data.price,
    imageUrl: data.imageUrl,
    userId: data.userId,
    bgColor: data.bgColor,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  };

  await setDoc(productRef, payload);

  return mapProductDocument(productRef.id, payload);
}

export async function getProductById(
  productId: string,
): Promise<IProductDocumentDTO | null> {
  const productSnapshot = await getDoc(doc(db, PRODUCTS_COLLECTION, productId));

  if (!productSnapshot.exists()) {
    return null;
  }

  return mapProductDocument(
    productSnapshot.id,
    productSnapshot.data() as FirestoreProductDocument,
  );
}

export async function getProductsByUserId(
  userId: string,
): Promise<IProductDocumentDTO[]> {
  const productsQuery = query(
    collection(db, PRODUCTS_COLLECTION),
    where("userId", "==", userId),
  );
  const productsSnapshot = await getDocs(productsQuery);

  return productsSnapshot.docs
    .map((productDocument) =>
      mapProductDocument(
        productDocument.id,
        productDocument.data() as FirestoreProductDocument,
      ),
    )
    .filter((product) => !product.deletedAt)
    .sort((left, right) => right.createdAt.getTime() - left.createdAt.getTime());
}

export async function updateProduct(
  productId: string,
  data: IUpdateProductDTO,
): Promise<IProductDocumentDTO | null> {
  const productRef = doc(db, PRODUCTS_COLLECTION, productId);
  const payload = buildProductPayload(data);

  await updateDoc(productRef, {
    ...payload,
    updatedAt: new Date(),
  });

  return getProductById(productId);
}
