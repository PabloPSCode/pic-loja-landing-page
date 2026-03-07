"use client";

import SimpleProductCard from "@/components/cards/SimpleProductCard";
import UserCard from "@/components/cards/UserCard";
import { mockGeneratedProducts, mockUserData } from "@/mocks";

export default function MyProducts() {
  const handleSave = (productId: string) => {
    console.log("Salvar imagem do produto:", productId);
  };

  const handleShare = (productId: string) => {
    console.log("Compartilhar imagem do produto:", productId);
  };

  return (
    <main className="min-h-[60vh] w-full bg-white/50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:gap-6">
        <UserCard
          userName={mockUserData.name}
          usedCredits={mockUserData.usedCredits}
          totalCredits={mockUserData.totalCredits}
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

          <div className="flex w-full flex-col gap-4">
            {mockGeneratedProducts.map((product) => (
              <SimpleProductCard
                bgColor={product.bgColor}
                description={product.description}
                imgUrl={product.imgUrl}
                key={product.id}
                onSave={() => handleSave(product.id)}
                onShare={() => handleShare(product.id)}
                price={product.price}
                title={product.title}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
