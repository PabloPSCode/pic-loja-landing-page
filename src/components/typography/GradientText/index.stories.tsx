// GradientText.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import GradientText from ".";

const meta = {
  title: "Typography/GradientText",
  component: GradientText,
  tags: ["autodocs"],
  args: {
    as: "h1",
    content: "Web Components BR",
    from: "from-emerald-500",
    to: "to-cyan-500",
    direction: "r",
    className: "text-4xl md:text-6xl font-extrabold tracking-tight",
  },
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "p", "span", "div"],
      description: "Elemento HTML que envolve o texto.",
    },
    from: {
      control: "text",
      description:
        "Classe Tailwind da cor inicial. Ex.: from-emerald-500 ou from-[#22c55e]",
    },
    to: {
      control: "text",
      description:
        "Classe Tailwind da cor final. Ex.: to-cyan-500 ou to-[#06b6d4]",
    },
    direction: {
      control: "select",
      options: ["r", "l", "t", "b", "tr", "tl", "br", "bl"],
      description: "Direção do gradiente: r=→ l=← t=↑ b=↓ tr=↗ tl=↖ br=↘ bl=↙",
    },
    className: {
      control: "text",
      description:
        "Classes adicionais (tamanho, peso, espaçamento de letras, responsividade).",
    },
    content: {
      control: "text",
      description: "Conteúdo do texto.",
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Texto com gradiente usando Tailwind (`bg-clip-text` + `text-transparent`). " +
          "Sem uso de dependências externas, ideal para títulos/CTAs no mercado brasileiro.",
      },
    },
  },
} satisfies Meta<typeof GradientText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "Soluções para o mercado brasileiro",
    from: "from-green-500",
    to: "to-yellow-400",
    direction: "r",
  },
};

export const Vertical: Story = {
  args: {
    content: "Gradiente Vertical",
    from: "from-indigo-300",
    to: "to-fuchsia-800",
    direction: "b",
    className: "text-4xl font-semibold",
  },
};
