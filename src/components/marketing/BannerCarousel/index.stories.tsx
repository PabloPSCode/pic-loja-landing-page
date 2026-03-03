// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import BannerCarousel, { type BannerCarouselProps } from ".";
import Image from "next/image";

const makeSlides = (count = 5) =>
  Array.from({ length: count }).map((_, i) => (
    <Image
      key={i}
      src={`https://picsum.photos/seed/banner-${i}/1280/480`}
      alt={`Banner ${i + 1}`}
      className="w-full h-auto object-cover"
      loading="lazy"
    />
  ));

const meta: Meta<typeof BannerCarousel> = {
  title: "Marketing/BannerCarousel",
  component: BannerCarousel,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Carrossel de **banners** baseado em Swiper.\n\n" +
          "- Sempre exibe **1 slide por vez** (sem cortes/peek).\n" +
          "- Suporte a **dark mode** via tokens (`bg-background`, `text-foreground`).\n" +
          "- Botões de navegação e **dots** opcionais.\n" +
          "- **Autoplay**, **loop** e pausa no hover configuráveis.",
      },
    },
  },
  args: {
    items: makeSlides(6),
    showNavigation: true,
    hidePrevButton: false,
    hideNextButton: false,
    showDots: true,
    loop: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    rows: 1,
    className: "max-w-5xl mx-auto",
  } as BannerCarouselProps,
  argTypes: {
    items: { table: { disable: true } },
    showNavigation: { control: "boolean" },
    hidePrevButton: { control: "boolean" },
    hideNextButton: { control: "boolean" },
    showDots: { control: "boolean" },
    loop: { control: "boolean" },
    autoplay: { control: "object" },
    className: { control: "text" },
    // Mantidos por compatibilidade, mas sem efeito prático neste componente:
    slidesPerView: { table: { disable: true } },
    spaceBetween: { table: { disable: true } },
    breakpoints: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutDots: Story = {
  name: "Without dots",
  args: {
    showDots: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo com os **dots desativados**. Os botões de navegação permanecem visíveis.",
      },
    },
  },
};

export const WithoutNavigation: Story = {
  name: "Without navigation",
  args: {
    showNavigation: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo **sem botões de navegação**. A troca ocorre via **autoplay** (se ativo) ou swipe.",
      },
    },
  },
};

export const AutoplayLoop: Story = {
  name: "Autoplay + Loop",
  args: {
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo com **loop** habilitado e **autoplay** mais rápido (2s).",
      },
    },
  },
};

export const DarkBackground: Story = {
  name: "Dark background",
  args: {
    className: "max-w-5xl mx-auto rounded-lg p-2 bg-[#0f172a]",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstra o componente em um contêiner com **fundo escuro**, útil para validar o suporte a *dark mode*.",
      },
    },
  },
};
