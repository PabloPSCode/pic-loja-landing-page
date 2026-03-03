import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Carousel, { type CarouselBreakpoint, type CarouselProps } from ".";

// ---- Mocks simples (poderiam vir do seu /mocks) -----------------------------
type CardData = { id: number; title: string; subtitle?: string; color: string };

const demoItems: CardData[] = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  subtitle: "Demo card",
  color: ["#FDE68A", "#A7F3D0", "#BFDBFE", "#FCA5A5"][i % 4],
}));

const renderDemoCard = (item: CardData) => (
  <div
    className="h-full rounded-lg border border-foreground/10 bg-card p-4 text-foreground
               shadow-sm flex flex-col justify-center items-center text-center"
    style={{ background: item.color }}
  >
    <strong className="text-sm sm:text-base">{item.title}</strong>
    <span className="text-xs sm:text-sm opacity-80">{item.subtitle}</span>
  </div>
);

// ---- Storybook meta ---------------------------------------------------------
const meta: Meta<typeof Carousel<CardData>> = {
  title: "Navigation/Carousel",
  component: Carousel as unknown as React.FC<CarouselProps<CardData>>,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Carrossel genérico e **flexível** baseado em `swiper`, com suporte a **breakpoints**, " +
          "**grid (linhas)**, **modo escuro** e navegação com botões externos. " +
          "Use `items` + `renderItem` para controlar totalmente o conteúdo renderizado.",
      },
    },
  },
  args: {
    items: demoItems,
    renderItem: renderDemoCard,
    title: "Demo Carousel",
    slidesPerView: 1,
    rows: 1,
    spaceBetween: 16,
    loop: false,
    showNavigation: true,
    breakpoints: {
      640: { slidesPerView: 2, rows: 1, spaceBetween: 12 },
      768: { slidesPerView: 3, rows: 1, spaceBetween: 16 },
      1024: { slidesPerView: 4, rows: 1, spaceBetween: 20 },
    } as Record<number, CarouselBreakpoint>,
  } satisfies Partial<CarouselProps<CardData>>,
  argTypes: {
    items: { table: { disable: true } },
    renderItem: { table: { disable: true } },
    className: { table: { disable: true } },
    onSlideChange: { action: "slideChanged" },
    // Controles principais
    slidesPerView: { control: { type: "number", min: 1, step: 1 } },
    rows: { control: { type: "number", min: 1, step: 1 } },
    spaceBetween: { control: { type: "number", min: 0, step: 2 } },
    loop: { control: "boolean" },
    showNavigation: { control: "boolean" },
    // Breakpoints costumam ser um objeto complexo — deixar somente leitura no painel
    breakpoints: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ---- Stories ----------------------------------------------------------------

export const Default: Story = {};

export const WithTitle: Story = {
  args: {
    title: "Featured items",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Mostra um título acima do carrossel. Em telas pequenas, o título aparece antes do slider.",
      },
    },
  },
};

export const GridRows: Story = {
  args: {
    title: "Two rows",
    rows: 2,
    slidesPerView: 2,
    breakpoints: {
      640: { slidesPerView: 2, rows: 2, spaceBetween: 12 },
      768: { slidesPerView: 3, rows: 2, spaceBetween: 16 },
      1024: { slidesPerView: 4, rows: 2, spaceBetween: 20 },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo usando **grid de 2 linhas**. O `Swiper` distribui os itens por linha (`fill: row`).",
      },
    },
  },
};

export const Breakpoints: Story = {
  args: {
    title: "Responsive breakpoints",
    slidesPerView: 1,
    rows: 1,
    breakpoints: {
      320: { slidesPerView: 1, rows: 1, spaceBetween: 8 },
      640: { slidesPerView: 2, rows: 1, spaceBetween: 12 },
      768: { slidesPerView: 3, rows: 1, spaceBetween: 16 },
      1024: { slidesPerView: 4, rows: 1, spaceBetween: 20 },
      1280: { slidesPerView: 5, rows: 1, spaceBetween: 24 },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstra **quebras de layout** por largura, alterando `slidesPerView` e `spaceBetween`.",
      },
    },
  },
};

export const Looping: Story = {
  args: {
    title: "Looping",
    loop: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Habilita **loop infinito**.",
      },
    },
  },
};

export const WithoutNav: Story = {
  args: {
    title: "No external navigation",
    showNavigation: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Remove os botões de navegação externos. A navegação continua disponível por gesto/arraste.",
      },
    },
  },
};

export const CustomItemRender: Story = {
  args: {
    title: "Custom item renderer",
    renderItem: (item: CardData) => (
      <div className="h-full rounded-lg border border-foreground/20 bg-background p-4 flex">
        <div
          className="w-10 h-10 rounded-md mr-3 shrink-0"
          style={{ background: item.color }}
        />
        <div className="flex flex-col">
          <strong className="text-sm sm:text-base">{item.title}</strong>
          <span className="text-xs sm:text-sm opacity-70">Custom layout</span>
        </div>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo substituindo o `renderItem` para personalizar completamente o conteúdo de cada slide.",
      },
    },
  },
};
