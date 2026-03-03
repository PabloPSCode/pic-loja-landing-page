import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import TextInput from "."; // ajuste o caminho se necessário

const meta = {
  title: "Inputs/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  args: {
    label: "Seu e-mail",
    placeholder: "nome@empresa.com.br",
    helperText: "Usaremos seu e-mail para contato.",
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
          "Campo de texto responsivo, com suporte ao modo escuro e estados de erro/disabled.",
      },
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLeftIcon: Story = {
  args: {
    label: "Pesquisar",
    placeholder: "O que você procura?",
    helperText: "Digite ao menos 3 caracteres.",
  },
};

export const ErrorState: Story = {
  args: {
    label: "E-mail",
    placeholder: "nome@empresa.com.br",
    errorMessage: "E-mail inválido",
  },
};

export const Disabled: Story = {
  args: {
    label: "Usuário",
    placeholder: "Desabilitado",
    disabled: true,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="w-[320px]">
        <TextInput
          {...args}
          label="Nome completo"
          placeholder="Digite seu nome"
          helperText="Como consta no seu documento."
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
