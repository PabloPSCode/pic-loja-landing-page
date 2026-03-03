import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import StarsRating from "./index";

type Story = StoryObj<typeof StarsRating>;

const meta: Meta<typeof StarsRating> = {
  title: "Ratings/StarsRating",
  component: StarsRating,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          `Controle de avaliação por estrelas baseado na biblioteca **@smastrom/react-rating** com rótulo dinâmico.\n\n` +
          `### Destaques\n` +
          `- **Responsivo**: o tamanho ajusta pela largura do wrapper.\n` +
          `- **Dark-mode** via tokens do design system.\n` +
          `- Rótulo muda ao **hover** e acompanha o **value** controlado.\n\n` +
          `### Props principais\n` +
          `- **value / onChange**: controle da nota (0–5)\n` +
          `- **labels?**: textos para notas 1..5\n` +
          `- **showLabels?**: exibe/oculta o rótulo\n` +
          `- **containerClassName? / labelClassName?**: personalização visual`,
      },
    },
  },
  argTypes: {
    value: { control: false }, // controlado internamente nas stories
    onChange: { control: false },
    onHoverChange: { control: false },
    labels: { control: "object" },
    showLabels: { control: "boolean" },
    containerClassName: { control: "text" },
    labelClassName: { control: "text" },
    readOnly: { control: "boolean" },
    halfFillMode: {
      control: "radio",
      options: [undefined, "svg", "box"],
      description: "Prop da lib @smastrom/react-rating (opcional)",
    },
  },
};
export default meta;

/* --------------------------------- Stories --------------------------------- */

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(3);
    return <StarsRating {...args} value={value} onChange={setValue} />;
  },
  args: {
    showLabels: true,
    labels: ["Terrível", "Ruim", "Ok", "Bom", "Excelente"],
  },
};

export const CustomLabels: Story = {
  render: (args) => {
    const [value, setValue] = useState(4);
    return <StarsRating {...args} value={value} onChange={setValue} />;
  },
  args: {
    labels: ["Péssimo", "Fraco", "Mediano", "Muito bom", "Impecável"],
    showLabels: true,
  },
};

export const WithoutLabel: Story = {
  render: (args) => {
    const [value, setValue] = useState(2);
    return <StarsRating {...args} value={value} onChange={setValue} />;
  },
  args: {
    showLabels: false,
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: 4,
    showLabels: true,
    labels: ["Terrível", "Ruim", "Ok", "Bom", "Excelente"],
  },
};
