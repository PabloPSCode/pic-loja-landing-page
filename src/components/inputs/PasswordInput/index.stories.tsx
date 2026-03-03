import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import PasswordInput from ".";

const meta = {
  title: "Inputs/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
  args: {
    label: "Sua senha",
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
          "Campo de texto responsivo para senhas, com suporte ao modo escuro e estados de erro/disabled.",
      },
    },
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ErrorState: Story = {
  args: {
    label: "Sua senha",
    placeholder: "Digite sua senha",
    errorMessage: "Senha inválida",
  },
};

export const Disabled: Story = {
  args: {
    label: "Sua senha",
    placeholder: "Digite sua senha",
    disabled: true,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="w-[320px]">
        <PasswordInput
          {...args}
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
