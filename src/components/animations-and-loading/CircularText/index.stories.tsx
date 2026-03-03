// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import CircularText from "./index";

type Story = StoryObj<typeof CircularText>;

const meta: Meta<typeof CircularText> = {
  title: "Animations and Loading/CircularText",
  component: CircularText,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          "Renderiza um texto distribuído em **círculo** com rotação contínua (Framer Motion). " +
          "A rotação é controlada por `spinDuration` (segundos por volta) e o comportamento ao passar o mouse é definido por `onHover`: " +
          "`slowDown`, `speedUp`, `pause` ou `goBonkers`.",
      },
    },
  },
  args: {
    text: "React Ultimate * Components * ",
    spinDuration: 32,
    onHover: "speedUp",
  },
  argTypes: {
    text: {
      control: "text",
      description: "Texto a ser distribuído ao redor do círculo.",
    },
    spinDuration: {
      control: { type: "number", min: 2, step: 1 },
      description:
        "Duração (em segundos) para completar **uma volta**. Valores menores = rotação mais rápida.",
    },
    onHover: {
      control: "select",
      options: ["slowDown", "speedUp", "pause", "goBonkers"],
      description:
        "Comportamento ao passar o mouse: desacelerar, acelerar, pausar ou girar muito rápido.",
    },
    className: {
      control: "text",
      description:
        "Classes utilitárias (ex.: Tailwind) aplicadas ao container circular (cores, sombras, tamanho).",
    },
  },
};

export default meta;

/* ===================== Histórias ===================== */

export const Padrao: Story = {};

export const PausarAoHover: Story = {
  name: "Pausar ao hover (pause)",
  args: {
    onHover: "pause",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const MuitoRapidoAoHover: Story = {
  name: "Muito rápido ao hover (goBonkers)",
  args: {
    onHover: "goBonkers",
    spinDuration: 32,
  },
};



export const FundoEscuro: Story = {
  name: "Em fundo escuro (dark)",
  render: (args) => (
    <div className="w-full max-w-3xl rounded-2xl p-8 sm:p-10 bg-black/90">
      <CircularText {...args} />
    </div>
  ),
  args: {
    className: "bg-white text-black",
    text: "Dark mode ready · ",
    onHover: "speedUp",
  },
  parameters: {
    backgrounds: { default: "dark" },
    layout: "centered",
  },
};
