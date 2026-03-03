/* eslint-disable @typescript-eslint/no-explicit-any */
// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import EmojisRating, { type EmojisRatingProps } from "./index";

type Story = StoryObj<typeof EmojisRating>;

const meta: Meta<typeof EmojisRating> = {
  title: "Ratings/EmojisRating",
  component: EmojisRating,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          `Avaliação usando **emojis** (valores de 1 até 5) com rótulo dinâmico.\n\n` +
          `### Destaques\n` +
          `- **Responsivo** (tamanhos por breakpoint)\n` +
          `- **Dark-mode** via tokens do design system\n` +
          `- Acessível: \`role="radiogroup"\`/\`role="radio"\`, suporte a hover/focus\n\n` +
          `### Props\n` +
          `- **value / onChange**: nota controlada (0–5)\n` +
          `- **emojis?**: 5 itens (um por nível)\n` +
          `- **labels?**: rótulos para 1..5\n` +
          `- **showLabels?**: exibe/oculta rótulo\n` +
          `- **readOnly/disabled** e classes de estilo`,
      },
    },
  },
  args: {
    value: 3,
    emojis: ["😕", "😐", "🙂", "😃", "😍"],
    labels: ["Muito ruim", "Ruim", "Ok", "Bom", "Excelente"],
    showLabels: true,
  },
  argTypes: {
    value: { control: { type: "number", min: 0, max: 5, step: 1 } },
    onChange: { action: "changed" },
    onHoverChange: { action: "hovered" },
    emojis: { control: "object" },
    labels: { control: "object" },
    showLabels: { control: "boolean" },
    readOnly: { control: "boolean" },
    disabled: { control: "boolean" },
    containerClassName: { control: "text" },
    labelClassName: { control: "text" },
    emojiClassName: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md bg-background text-foreground p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
};
export default meta;

/* --------------------------------- Stories --------------------------------- */

export const Default: Story = {
  render: (args) => {
    const [val, setVal] = useState<number>(args.value ?? 3);
    return (
      <EmojisRating
        {...args}
        value={val}
        onChange={(v) => {
          setVal(v);
          (args as EmojisRatingProps).onChange?.(v);
        }}
        onHoverChange={args.onHoverChange as any}
      />
    );
  },
};

export const CustomEmojis: Story = {
  render: (args) => {
    const [val, setVal] = useState<number>(4);
    return (
      <EmojisRating
        {...args}
        value={val}
        onChange={setVal}
        emojis={["👎", "🙁", "😐", "🙂", "👍"]}
        labels={["Péssimo", "Ruim", "Mediano", "Bom", "Excelente"]}
      />
    );
  },
};

export const WithoutLabel: Story = {
  render: (args) => {
    const [val, setVal] = useState<number>(2);
    return (
      <EmojisRating
        {...args}
        value={val}
        onChange={setVal}
        showLabels={false}
      />
    );
  },
};

export const ReadOnly: Story = {
  args: {
    value: 5,
    readOnly: true,
  },
};

