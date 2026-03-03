import { brandImages } from "@/mocks/index";
import type { Meta, StoryObj } from "@storybook/react-vite";
import BrandMarquee, { type BrandMarqueeProps } from "./index";

const meta: Meta<typeof BrandMarquee> = {
  title: "Marketing/BrandMarquee",
  component: BrandMarquee,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Expositor de marcas com rolagem horizontal contínua (**infinita**) implementado baseado na biblioteca `react-fast-marquee`.\n\n" +
          "- **Responsivo** e com suporte a **dark mode**;\n" +
          "- Opções simples: velocidade, direção, espaçamento e filtro de imagem;\n" +
          "- Overlays com **fade** nas bordas para suavizar a transição no tema atual;\n" +
          "- Reomenda-se utilizar images .png sem fundo e para o dark mode, imagens com cores claras.",
      },
    },
  },
  args: {
    title: "Nossas parcerias",
    logos: brandImages,
    speed: 40,
    pauseOnHover: true,
    direction: "left",
    itemsGap: "normal",
    imageFilter: "none",
    showEdgeFade: true,
    maxLogoHeightPx: 56,
  } as BrandMarqueeProps,
  argTypes: {
    logos: { control: false },
    speed: { control: { type: "number", min: 10, max: 120, step: 5 } },
    pauseOnHover: { control: "boolean" },
    direction: {
      control: { type: "inline-radio" },
      options: ["left", "right"],
    },
    itemsGap: {
      control: { type: "inline-radio" },
      options: ["close", "normal", "wide"],
    },
    imageFilter: {
      control: { type: "inline-radio" },
      options: ["none", "grayscale", "sepia"],
    },
    showEdgeFade: { control: "boolean" },
    maxLogoHeightPx: {
      control: { type: "number", min: 24, max: 120, step: 2 },
    },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof BrandMarquee>;

export const Default: Story = {};

export const ReverseDirection: Story = {
  args: {
    direction: "right",
  },
  parameters: {
    docs: {
      description: {
        story: "Marquee rolando da **direita para a esquerda**.",
      },
    },
  },
};

export const Compact: Story = {
  args: {
    title: "Clients",
    itemsGap: "close",
    maxLogoHeightPx: 40,
    speed: 30,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Versão **compacta** com logos menores, gaps reduzidos e velocidade moderada.",
      },
    },
  },
};

export const WideAndFast: Story = {
  args: {
    title: "Trusted by",
    itemsGap: "wide",
    speed: 70,
    maxLogoHeightPx: 64,
  },
};

export const Grayscale: Story = {
  args: {
    imageFilter: "grayscale",
    title: "Partners (monochrome)",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Aplica filtro **grayscale** nos logotipos — útil para composições discretas.",
      },
    },
  },
};

export const NoEdgeFade: Story = {
  args: {
    showEdgeFade: false,
    title: "Logos",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Remove o efeito de desvanecimento nas bordas para um corte **flat**.",
      },
    },
  },
};

export const WithLinks: Story = {
  args: {
    logos: brandImages.map((b) => ({ ...b, href: "https://example.com" })),
    title: "Clientes com link",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Cada logotipo funciona como **link** (abre o mesmo endereço neste exemplo).",
      },
    },
  },
};
