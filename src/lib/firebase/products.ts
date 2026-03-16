import type {
  ICreateProductDTO,
  IProductDocumentDTO,
  IUpdateProductDTO,
} from "@/dtos/product.dto";
import {
  collection,
  deleteDoc,
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
import { deleteGeneratedProductImage } from "./storage";

const PRODUCTS_COLLECTION = "products";

function buildProductUpdatePayload(
  data: IUpdateProductDTO,
): Partial<Pick<FirestoreProductDocument, "title" | "description" | "price" | "bgColor">> {
  return {
    ...(data.title !== undefined ? { title: data.title } : {}),
    ...(data.description !== undefined ? { description: data.description } : {}),
    ...(data.price !== undefined ? { price: data.price } : {}),
    ...(data.bgColor !== undefined ? { bgColor: data.bgColor } : {}),
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
    .sort((left, right) => right.createdAt.getTime() - left.createdAt.getTime());
}

export async function updateProduct(
  productId: string,
  data: IUpdateProductDTO,
): Promise<IProductDocumentDTO | null> {
  const productRef = doc(db, PRODUCTS_COLLECTION, productId);
  const payload = buildProductUpdatePayload(data);

  await updateDoc(productRef, {
    ...payload,
    updatedAt: new Date(),
  });

  return getProductById(productId);
}

export async function deleteProduct(productId: string): Promise<void> {
  const productRef = doc(db, PRODUCTS_COLLECTION, productId);
  const existingProduct = await getProductById(productId);

  if (!existingProduct) {
    throw new Error("Produto não encontrado.");
  }

  await deleteDoc(productRef);
  await deleteGeneratedProductImage(existingProduct.imageUrl);
}
