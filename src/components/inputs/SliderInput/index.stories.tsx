// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import SliderInput, { type SliderInputProps } from ".";

const meta: Meta<typeof SliderInput> = {
  title: "Inputs/SliderInput",
  component: SliderInput,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Controle deslizante (slider) para selecionar valores numéricos. " +
          "Suporta modo controlado/não-controlado, tooltip de valor, dark mode e estilos customizados.",
      },
    },
  },
  args: {
    label: "Defina um valor",
    helperText: "Arraste o controle ou clique na barra",
    minValue: 0,
    maxValue: 100,
    stepValue: 1,
    defaultValue: 50,
    disabled: false,
    showValue: false,
  } as SliderInputProps,
  argTypes: {
    minValue: { control: { type: "number", min: 0 } },
    maxValue: { control: { type: "number", min: 1 } },
    stepValue: { control: { type: "number", min: 1 } },
    defaultValue: { control: "number" },
    value: { control: "number" },
    disabled: { control: "boolean" },
    showValue: { control: "boolean" },
    customStyles: { table: { disable: true } },
    onChange: { action: "changed" },
    containerClassName: { table: { disable: true } },
    errorMessage: { control: "text" },
    helperText: { control: "text" },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showValue: true,
    formatValue: (v: number) => `${v}%`,
    defaultValue: 10,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exibe um **tooltip** acima do *handle* mostrando o valor atual formatado em porcentagem.",
      },
    },
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [val, setVal] = useState(25);
    return (
      <div className="max-w-3xl">
        <p className="mb-1 text-sm text-foreground/70">Valor: {val}</p>
        <SliderInput
          {...args}
          value={val}
          onChange={(n) => setVal(n as number)}
          showValue
          formatValue={(v) => `${v} pts`}
        />
      </div>
    );
  },
  args: {
    label: "Valor controlado",
    helperText: "Este exemplo usa estado React (value/onChange).",
    defaultValue: undefined,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 30,
    helperText: "Estado desabilitado.",
  },
};

export const Error: Story = {
  args: {
    errorMessage: "Valor inválido para a faixa definida.",
    defaultValue: 110,
  },
};

export const Custom: Story = {
  args: {
    defaultValue: 35,
    showValue: true,
    formatValue: (v: number) => `R$ ${v},00`,
    customStyles: {
      track: { backgroundColor: "#1a55ea" },
      handle: { borderColor: "#1045b9" },
      rail: { backgroundColor: "rgba(16, 64, 185, 0.15)" },
    },
    helperText: "Exemplo com cores personalizadas (track/handle/rail).",
  },
};
