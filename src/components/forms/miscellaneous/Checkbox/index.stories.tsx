import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Checkbox from ".";

const meta = {
  title: "Inputs/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    helperText: "Aceito os termos e condições",
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
          "Campo de seleção (checkbox) para formulários. Use para opções binárias, como aceitar termos e condições.",
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(false);
    return (
      <div>
        <Checkbox
          {...args}
          checked={value}
          onChange={(e) => setValue(e.target.checked)}
        />
        <div className="mt-2 text-sm text-foreground/70">
          Valor:{" "}
          <span className="font-medium">{value ? "Aceito" : "Não aceito"}</span>
        </div>
      </div>
    );
  },
};

export const WithoutHelperText: Story = {
  render: () => {
    const [value, setValue] = useState(false);
    return (
      <Checkbox checked={value} onChange={(e) => setValue(e.target.checked)} />
    );
  },
};

export const ErrorState: Story = {
  args: {
    helperText: "Aceito os termos e condições",
    errorMessage: "Você precisa aceitar os termos.",
    checked: false,
  },
};
