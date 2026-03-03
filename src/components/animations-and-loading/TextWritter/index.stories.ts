// TypeWriter.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import TypeWriter from ".";

const meta = {
  title: "Animations and Loading/TypeWriter",
  component: TypeWriter,
  tags: ["autodocs"],
  argTypes: {
    wrapper: {
      control: "select",
      options: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "div"],
    },
    textDelayMs: { control: { type: "number", min: 0, step: 100 } },
    showsCursor: { control: "boolean" },
    repeat: {
      control: { type: "number", min: 0 },
      description:
        "Use Infinity no código para repetir indefinidamente. No Controls, defina um número.",
    },
  },
} satisfies Meta<typeof TypeWriter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { layout: "centered" },
  args: {
    wrapper: "h2",
    textList: ["Olá 👋 ", "Bem-vindo ao Web Components BR ", "Aproveite os exemplos! "],
    textDelayMs: 1500,
    showsCursor: true,
    repeat: Number.POSITIVE_INFINITY as unknown as number,
    className: "text-2xl font-semibold text-foreground",
    speed: 20,
  },
};

export const Paragraph: Story = {
  parameters: { layout: "centered" },
  args: {
    wrapper: "p",
    textList: [
      "Componentes reutilizáveis.",
      "Documentados para o mercado brasileiro.",
      "Compatíveis com Storybook.",
    ],
    textDelayMs: 1200,
    showsCursor: true,
    repeat: Number.POSITIVE_INFINITY as unknown as number,
    className: "text-base text-foreground max-w-xl text-center",
  },
};
