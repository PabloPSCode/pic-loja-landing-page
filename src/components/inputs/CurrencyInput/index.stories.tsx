import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import CurrencyInput from ".";

const meta = {
  title: "Inputs/CurrencyInput",
  component: CurrencyInput,
  tags: ["autodocs"],
  args: {
    label: "Valor a receber",
    placeholder: "R$ 150,00",
    helperText: "Digite o valor a receber",
  },
  argTypes: {
    errorMessage: { control: "text" },
    helperText: { control: "text" },
    disabled: { control: "boolean" },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Campo de texto com formatação para o Real (BRL). Aceita apenas valores númericos como dados de entrada.",
      },
    },
  },
} satisfies Meta<typeof CurrencyInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Valor a receber",
    placeholder: "R$ 150,00",
    helperText: "Digite o valor a receber",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Valor a receber",
    placeholder: "R$ 150,00",
    helperText: "Digite o valor a receber",
    errorMessage: "Valor inválido",
  },
};

export const Disabled: Story = {
  args: {
    label: "Valor a receber",
    placeholder: "R$ 150,00",
    helperText: "Digite o valor a receber",
    disabled: true,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="w-[320px]">
        <CurrencyInput
          {...args}
          label="Valor a receber"
          placeholder="R$ 150,00"
          helperText="Digite o valor a receber"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="mt-2 text-sm text-foreground/70">
          Valor: <span className="font-medium">{value || "—"}</span>
        </div>
      </div>
    );
  },
};
