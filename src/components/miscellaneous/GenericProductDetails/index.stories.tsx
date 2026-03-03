// components/product/GenericProductDetails/index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import GenericProductDetails from "./index";

// ====== Mocks ======
const PHOTOS = [
  {
    src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop",
    alt: "Produto — vista frontal",
  },
  {
    src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    alt: "Produto — detalhes",
  },
  {
    src: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?q=80&w=1200&auto=format&fit=crop",
    alt: "Produto — embalagem",
  },
];

const BASE_PRODUCT = {
  id: "p-1",
  name: "Headphone Wireless XZ Pro — Noise Cancelling",
  price: 899.9,
  description:
    "Headphone sem fio com cancelamento ativo de ruído, drivers de alta fidelidade e autonomia de até 40h. Conforto premium para longas sessões.",
  photos: PHOTOS,
};

const meta: Meta<typeof GenericProductDetails> = {
  title: "Miscellaneous/GenericProductDetails",
  component: GenericProductDetails,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Detalhes de produto genérico com galeria (imagem principal + thumbnails), **zoom on hover**, e ações (favoritar, compartilhar e adicionar ao carrinho). Responsivo e com suporte a dark mode.",
      },
    },
  },
  argTypes: {
    product: { control: "object" },
    className: { control: "text" },
    mainImageClassName: { control: "text" },
    thumbClassName: { control: "text" },
    showHelperText: { control: "boolean" },

    onAddToCart: { action: "addToCart", table: { category: "events" } },
    onAddToFavorites: { action: "addToFavorites", table: { category: "events" } },
    onShare: { action: "share", table: { category: "events" } },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[80vh] w-full bg-background text-foreground p-4 sm:p-8">
        <div className="mx-auto max-w-6xl">
          <Story />
        </div>
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof GenericProductDetails>;

/* ===================== Stories ===================== */

export const Default: Story = {
  args: {
    product: BASE_PRODUCT,
    showHelperText: true,
  },
};

export const WithOldPriceAndAutoDiscount: Story = {
  args: {
    product: {
      ...BASE_PRODUCT,
      id: "p-2",
      price: 799.9,
      oldPrice: 999.9, // desconto será derivado automaticamente
    },
    showHelperText: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo com `oldPrice` — o componente calcula o **percentual de desconto** automaticamente.",
      },
    },
  },
};

export const WithExplicitDiscountPercent: Story = {
  args: {
    product: {
      ...BASE_PRODUCT,
      id: "p-3",
      price: 749.9,
      // pode ser 0–100 (percentual) OU 0–1 (fração). Aqui, 15%.
      discount: 15,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo usando a prop `discount` explicitamente (aceita **0–100** ou **0–1**).",
      },
    },
  },
};

export const FewImages: Story = {
  args: {
    product: {
      ...BASE_PRODUCT,
      id: "p-4",
      photos: PHOTOS.slice(0, 2), // apenas 2 imagens
    },
  },
};

export const NoHelperText: Story = {
  args: {
    product: BASE_PRODUCT,
    showHelperText: false,
  },
};

export const CustomStyling: Story = {
  args: {
    product: BASE_PRODUCT,
    mainImageClassName: "rounded-2xl",
    thumbClassName: "rounded-lg",
    className: "md:grid-cols-[96px_1fr] gap-4", // exemplo de override leve
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrando personalização via `className`, `mainImageClassName` e `thumbClassName`.",
      },
    },
  },
};
