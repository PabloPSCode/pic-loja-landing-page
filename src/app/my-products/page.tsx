"use client";

import { IProductData } from "@/components/cards/ShareControllerCard";
import SimpleProductCard from "@/components/cards/SimpleProductCard";
import UserCard from "@/components/cards/UserCard";
import { getProductsByUserId } from "@/lib/firebase/products";
import { PublishTabService } from "@/app/start/services/publishTabService";
import { mockedUserData } from "@/mocks";
import { useAuthStore } from "@/stores/auth-store";
import { useCallback, useEffect, useState } from "react";

export default function MyProducts() {
  const user = useAuthStore((state) => state.user);
  const [products, setProducts] = useState<IProductData[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState<string | null>(null);

  if (!user) {
    return (
      <main className="min-h-[60vh] w-full bg-white/50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:gap-6 items-center">
          <h1 className="text-center text-xl font-semibold text-foreground sm:text-2xl mt-12">
            Você precisa estar logado para acessar esta página.
          </h1>
        </div>
      </main>
    );
  }

  useEffect(() => {
    let isCancelled = false;

    const loadProducts = async () => {
      setIsLoadingProducts(true);
      setProductsError(null);

      try {
        const fetchedProducts = await getProductsByUserId(user.id);

        if (isCancelled) {
          return;
        }

        setProducts(
          fetchedProducts.map((product) => ({
            title: product.title,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
            userId: product.userId,
            bgColor: product.bgColor,
            showPrice: true,
            showLogo: true,
          })),
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
  }, [user.id]);

  const handleSave = useCallback(
    async (product: IProductData) => {
      try {
        await PublishTabService.downloadProductImage(product, {
          avatarUrl: user.avatarUrl,
        });
      } catch (error) {
        console.error("Erro ao salvar imagem do produto:", error);
      }
    },
    [user.avatarUrl],
  );

  const handleShare = useCallback(
    async (product: IProductData) => {
      try {
        await PublishTabService.shareProductImage(product, {
          avatarUrl: user.avatarUrl,
        });
      } catch (error) {
        console.error("Erro ao compartilhar imagem do produto:", error);
      }
    },
    [user.avatarUrl],
  );

  return (
    <main className="min-h-[60vh] w-full bg-white/50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:gap-6">
        <UserCard
          userName={user.name}
          usedCredits={mockedUserData.usedCredits}
          totalCredits={mockedUserData.totalCredits}
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
                key={`${product.userId}-${product.imageUrl}`}
                onSave={() => void handleSave(product)}
                onShare={() => void handleShare(product)}
                price={product.price}
                title={product.title}
              />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
