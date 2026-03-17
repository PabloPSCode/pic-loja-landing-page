"use client";

import { PublishTabService } from "@/app/start/services/publishTabService";
import { IProductData } from "@/components/cards/ShareControllerCard";
import ProductManageCard from "@/components/cards/ProductManageCard";
import SimpleProductCard from "@/components/cards/SimpleProductCard";
import UserCard from "@/components/cards/UserCard";
import DestructiveModal from "@/components/modals/DestructiveModal";
import GenericModal from "@/components/modals/GenericModal";
import { getProductsByUserId, updateProduct, deleteProduct } from "@/lib/firebase/products";
import type { IProductDocumentDTO } from "@/dtos/product.dto";
import { useAuthStore } from "@/stores/auth-store";
import { useCallback, useEffect, useState } from "react";

interface StoredProduct extends IProductDocumentDTO {
  showPrice: boolean;
  showLogo: boolean;
}

function mapStoredProduct(product: IProductDocumentDTO): StoredProduct {
  return {
    ...product,
    showPrice: product.price > 0,
    showLogo: true,
  };
}

export default function MyProducts() {
  const user = useAuthStore((state) => state.user);
  const [products, setProducts] = useState<StoredProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<StoredProduct | null>(null);
  const [editingDraft, setEditingDraft] = useState<IProductData | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<StoredProduct | null>(null);
  const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);
  const [isDeletingProduct, setIsDeletingProduct] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const loadProducts = async () => {
      if (!user?.id) {
        setProducts([]);
        setProductsError(null);
        setIsLoadingProducts(false);
        return;
      }

      setIsLoadingProducts(true);
      setProductsError(null);

      try {
        const fetchedProducts = await getProductsByUserId(user.id);

        if (isCancelled) {
          return;
        }

        setProducts(
          fetchedProducts.map(mapStoredProduct),
        );
      } catch (error) {
        if (isCancelled) {
          return;
        }

        setProductsError(
          error instanceof Error
            ? error.message
            : "Nao foi possivel carregar os produtos do usuario.",
        );
      } finally {
        if (!isCancelled) {
          setIsLoadingProducts(false);
        }
      }
    };

    void loadProducts();

    return () => {
      isCancelled = true;
    };
  }, [user?.id]);

  const handleSave = useCallback(
    async (product: StoredProduct) => {
      try {
        await PublishTabService.downloadProductImage(product, {
          avatarUrl: user?.avatarUrl,
        });
      } catch (error) {
        console.error("Erro ao salvar imagem do produto:", error);
      }
    },
    [user?.avatarUrl],
  );

  const handleShare = useCallback(
    async (product: StoredProduct) => {
      try {
        await PublishTabService.shareProductImage(product, {
          avatarUrl: user?.avatarUrl,
        });
      } catch (error) {
        console.error("Erro ao compartilhar imagem do produto:", error);
      }
    },
    [user?.avatarUrl],
  );

  const handleOpenEditModal = useCallback((product: StoredProduct) => {
    setProductsError(null);
    setEditingProduct(product);
    setEditingDraft(product);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    if (isUpdatingProduct) {
      return;
    }

    setEditingProduct(null);
    setEditingDraft(null);
  }, [isUpdatingProduct]);

  const handleUpdateProduct = useCallback(
    async (draft: IProductData) => {
      if (!editingProduct) {
        return;
      }

      setIsUpdatingProduct(true);
      setProductsError(null);

      try {
        const updatedProduct = await updateProduct(editingProduct.id, {
          title: draft.title,
          description: draft.description,
          price: draft.showPrice === false ? 0 : draft.price,
          bgColor: draft.bgColor,
        });

        if (!updatedProduct) {
          throw new Error("Nao foi possivel atualizar o produto.");
        }

        setProducts((currentProducts) =>
          currentProducts.map((product) =>
            product.id === editingProduct.id ? mapStoredProduct(updatedProduct) : product,
          ),
        );
        setEditingProduct(null);
        setEditingDraft(null);
      } catch (error) {
        setProductsError(
          error instanceof Error
            ? error.message
            : "Nao foi possivel atualizar o produto.",
        );
      } finally {
        setIsUpdatingProduct(false);
      }
    },
    [editingProduct, handleCloseEditModal],
  );

  const handleOpenDeleteModal = useCallback((product: StoredProduct) => {
    setProductsError(null);
    setDeletingProduct(product);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    if (isDeletingProduct) {
      return;
    }

    setDeletingProduct(null);
  }, [isDeletingProduct]);

  const handleDeleteProduct = useCallback(async () => {
    if (!deletingProduct) {
      return;
    }

    setIsDeletingProduct(true);
    setProductsError(null);

    try {
      await deleteProduct(deletingProduct.id);
      setProducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== deletingProduct.id),
      );
      setDeletingProduct(null);
    } catch (error) {
      setProductsError(
        error instanceof Error
          ? error.message
          : "Nao foi possivel excluir o produto.",
      );
    } finally {
      setIsDeletingProduct(false);
    }
  }, [deletingProduct, handleCloseDeleteModal]);

  if (!user) {
    return (
      <main className="min-h-[60vh] w-full bg-white/50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 sm:gap-6">
          <h1 className="mt-12 text-center text-xl font-semibold text-foreground sm:text-2xl">
            Você precisa estar logado para acessar esta página.
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[60vh] w-full bg-white/50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:gap-6">
        <UserCard
          userName={user.name}
          availableCredits={user.availableCredits}
          consumedCredits={user.consumedCredits}
        />

        <section className="w-full rounded-xl border border-foreground/10 bg-bg-card p-5 shadow-sm sm:p-8">
          <div className="mb-5 flex flex-col gap-2">
            <h1 className="text-xl font-semibold text-foreground sm:text-2xl">
              Meus produtos
            </h1>
            <p className="text-sm text-foreground/70 sm:text-base">
              Produtos gerados prontos para salvar ou compartilhar.
            </p>
          </div>

          {productsError && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {productsError}
            </div>
          )}

          {isLoadingProducts ? (
            <div className="py-10 text-center text-sm text-foreground/70 sm:text-base">
              Carregando produtos...
            </div>
          ) : products.length === 0 ? (
            <div className="py-10 text-center text-sm text-foreground/70 sm:text-base">
              Nenhum produto salvo foi encontrado para este usuario.
            </div>
          ) : (
            <div className="flex w-full flex-col gap-4">
              {products.map((product) => (
                <SimpleProductCard
                  bgColor={product.bgColor}
                  description={product.description}
                  imgUrl={product.imageUrl}
                  key={product.id}
                  price={product.price}
                  title={product.title}
                  onSave={() => void handleSave(product)}
                  onShare={() => void handleShare(product)}
                  onDelete={() => handleOpenDeleteModal(product)}
                  onEdit={() => handleOpenEditModal(product)}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <GenericModal
        title="Editar produto"
        description="Atualize dados do seu produto."
        open={Boolean(editingProduct && editingDraft)}
        onClose={handleCloseEditModal}
        size="xl"
      >
        {editingDraft && (
          <ProductManageCard
            className="p-3 sm:min-w-[50vw] lg:min-w-[40vw]"
            disabled={isUpdatingProduct}
            layout="stacked"
            logoAvailable={Boolean(user.avatarUrl)}
            onChange={setEditingDraft}
            onSave={(payload) => void handleUpdateProduct(payload)}
            product={editingDraft}
            saveButtonLabel={isUpdatingProduct ? "Salvando..." : "Salvar alterações"}
            showLogoControl={false}
          />
        )}
      </GenericModal>

      <DestructiveModal
        open={Boolean(deletingProduct)}
        onClose={handleCloseDeleteModal}
        title="Excluir produto"
        description="Esta ação remove o produto do Firestore e apaga a imagem do Firebase Storage."
        confirmMessage={
          deletingProduct
            ? `Deseja realmente excluir o produto "${deletingProduct.title}"?`
            : undefined
        }
        confirmButtonLabel={isDeletingProduct ? "Excluindo..." : "Excluir produto"}
        confirmButtonDisabled={isDeletingProduct}
        onConfirm={() => void handleDeleteProduct()}
      />
    </main>
  );
}
