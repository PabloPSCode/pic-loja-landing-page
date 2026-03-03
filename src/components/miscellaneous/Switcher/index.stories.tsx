import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Switcher from ".";

const meta: Meta<typeof Switcher> = {
  title: "Miscellaneous/Switcher",
  component: Switcher,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente **Switch** (liga/desliga) para alternar valores booleanos. " +
          "Possui suporte a **dark mode**, " +
          "**mensagens de ajuda/erro** e estado **desabilitado**.",
      },
    },
  },
  args: {
    label: "Ativar notificações",
    helperText: "Alterne para receber novidades por e-mail.",
    checked: false,
    disabled: false,
  },
  argTypes: {
    label: { control: "text" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    containerClassName: { table: { disable: true } },
    onChange: { action: "onChange" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = {
  render: (args) => {
    const [on, setOn] = useState<boolean>(false);
    return (
      <div className="max-w-md space-y-2">
        <p className="text-sm text-foreground/70">
          Valor atual: <b>{on ? "Ligado" : "Desligado"}</b>
        </p>
        <Switcher
          {...args}
          checked={on}
          onChange={(v) => setOn(v)}
          helperText="Exemplo controlado via estado React."
        />
      </div>
    );
  },
  args: {
    label: "Modo controlado",
  },
};

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
    helperText: "Switch desabilitado.",
  },
};

export const WithError: Story = {
  args: {
    checked: false,
    errorMessage: "Você precisa aceitar os termos para continuar.",
    helperText: undefined,
  },
};
