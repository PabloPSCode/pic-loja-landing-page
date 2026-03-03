// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import IntervalSliderInput, { type IntervalSliderInputProps } from ".";

const meta: Meta<typeof IntervalSliderInput> = {
  title: "Inputs/IntervalSliderInput",
  component: IntervalSliderInput,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Controle deslizante (slider) para selecionar o intervalo entre dois valores numéricos. " +
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
    defaultValues: [50, 100],
    disabled: false,
    showValue: false,
  } as IntervalSliderInputProps,
  argTypes: {
    minValue: { control: { type: "number", min: 0 } },
    maxValue: { control: { type: "number", min: 1 } },
    stepValue: { control: { type: "number", min: 1 } },
    defaultValues: { control: "number" },
    values: { control: "number" },
    disabled: { control: "boolean" },
    showValues: { control: "boolean" },
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
    showValues: true,
    formatValue: (v: number) => `${v}%`,
    defaultValues: [10,100],
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
    const [val, setVal] = useState<[number, number]>([10, 100]);
    return (
      <div className="max-w-3xl">
        <p className="mb-1 text-sm text-foreground/70">Valor: {val}</p>
        <IntervalSliderInput
          {...args}
          values={val}
          onChange={(values) => setVal(values)}
          showValues
          formatValue={(v) => `${v} pts`}
        />
      </div>
    );
  },
  args: {
    label: "Valor controlado",
    helperText: "Este exemplo usa estado React (value/onChange).",
    defaultValues: undefined,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValues: [10, 100],
    helperText: "Estado desabilitado.",
  },
};

export const Error: Story = {
  args: {
    errorMessage: "Intervalo inválido para a faixa definida.",
    defaultValues: [10, 50],
  },
};

export const Custom: Story = {
  args: {
    defaultValues: [10, 100],
    showValues: true,
    formatValue: (v: number) => `R$ ${v},00`,
    customStyles: {
      track: { backgroundColor: "#1a55ea" },
      handle: { borderColor: "#1045b9" },
      rail: { backgroundColor: "rgba(16, 64, 185, 0.15)" },
    },
    helperText: "Exemplo com cores personalizadas (track/handle/rail).",
  },
};
