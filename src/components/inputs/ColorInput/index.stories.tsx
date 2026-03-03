import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import ColorInput from ".";

const meta = {
  title: "Inputs/ColorInput",
  component: ColorInput,
  tags: ["autodocs"],
  args: {
    label: "Seleção de cor",
    helperText: "Escolha uma cor",
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
          "Campo de seleção de cores para formulários.",
      },
    },
  },
} satisfies Meta<typeof ColorInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Seleção de cor",
    helperText: "Escolha uma cor",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Seleção de cor",
    helperText: "Escolha uma cor",
    errorMessage: "É obrigatório selecionar uma cor",
  },
};

export const Disabled: Story = {
  args: {
    label: "Seleção de cor",
    helperText: "Escolha uma cor",
    disabled: true,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="w-[320px]">
        <ColorInput
          {...args}
          label="Seleção de cor"
          helperText="Escolha uma cor"
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
