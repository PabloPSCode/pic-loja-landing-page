// components/favorites/FavoriteItemCard/index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import FavoriteItemCard, { type Product } from "./index";

// ===== Mock data =====
const MOCK_PRODUCT: Product = {
  id: "p-1",
  name: "Fone Bluetooth Noise Canceling – Série XZ Pro",
  price: 599.9,
  imageUrl:
    "https://images.unsplash.com/photo-1518443895914-6d2a3c59b3a6?q=80&w=400&auto=format&fit=crop",
  shareUrl: "https://example.com/product/p-1",
};

const LONG_NAME_PRODUCT: Product = {
  id: "p-2",
  name: "Tênis de Corrida Super Leve, Solado com Amortecimento Multicamadas e Cabedal Respirável – Edição 2025 Ultra Marathon",
  price: 899.0,
  imageUrl:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop",
  shareUrl: "https://example.com/product/p-2",
};

const meta: Meta<typeof FavoriteItemCard> = {
  title: "Cards/FavoriteItemCard",
  component: FavoriteItemCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Cartão de **item favorito** com imagem, nome, preço e ações de remover/compartilhar. Responsivo e pronto para dark mode (tokens via classes).",
      },
    },
  },
  argTypes: {
    product: { control: "object" },
    onRemoveItem: { action: "removeItem", table: { category: "events" } },
    onShareItem: { action: "shareItem", table: { category: "events" } },
  },
};
export default meta;

type Story = StoryObj<typeof FavoriteItemCard>;

/* ===================== Stories ===================== */

export const Default: Story = {
  args: {
    product: MOCK_PRODUCT,
  },
};

export const LongName: Story = {
  args: {
    product: LONG_NAME_PRODUCT,
  },
};

export const WithoutShareUrl: Story = {
  args: {
    product: {
      ...MOCK_PRODUCT,
      id: "p-3",
      shareUrl: undefined, // demonstra o caso sem link de compartilhamento
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo sem `shareUrl`. **Atenção**: o componente atual chama `onShareItem(product.shareUrl!)`. Forneça uma URL para evitar erros de runtime.",
      },
    },
  },
};

export const InteractiveList: Story = {
  render: (args) => {
    const [items, setItems] = useState<Product[]>([
      MOCK_PRODUCT,
      LONG_NAME_PRODUCT,
      {
        id: "p-4",
        name: "Camisa Tech Minimal – Azul Marinho",
        price: 129.9,
        imageUrl:
          "https://images.unsplash.com/photo-1520975922284-8b456906c813?q=80&w=400&auto=format&fit=crop",
        shareUrl: "https://example.com/product/p-4",
      },
    ]);

    const handleRemove = (productId: string) => {
      setItems((prev) => prev.filter((p) => p.id !== productId));
      // também despacha o action logger do Storybook
      args.onRemoveItem?.(productId);
    };

    const handleShare = (shareUrl: string) => {
      // aqui você poderia abrir um modal/toast; no Storybook apenas logamos
      args.onShareItem?.(shareUrl);
    };

    return (
      <div className="w-full max-w-xl p-4 space-y-2 bg-background text-foreground rounded-lg border border-border-card">
        {items.map((product) => (
          <FavoriteItemCard
            key={product.id}
            product={product}
            onRemoveItem={handleRemove}
            onShareItem={handleShare}
          />
        ))}
        {!items.length && (
          <p className="text-sm text-foreground/70">
            Sem itens na lista de favoritos.
          </p>
        )}
      </div>
    );
  },
  args: {
    // Para permitir o Action Logger nas callbacks internas:
    onRemoveItem: (id: string) => {
      // noop (Action logger é anexado via argTypes)
    },
    onShareItem: (url: string) => {
      // noop
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Story interativo que permite **remover itens** e aciona os *actions* do Storybook nas callbacks.",
      },
    },
  },
};
