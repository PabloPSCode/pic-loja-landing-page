import type { Meta, StoryObj } from "@storybook/react-vite";
import MaskedTextInput from ".";

const meta = {
  title: "Inputs/MaskedTextInput",
  component: MaskedTextInput,
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
          "Campo de texto com máscara, responsivo, com suporte ao modo escuro e estados de erro/disabled. Ideal para coletar dados como CPF, CNPJ, telefone, datas e entre outros.",
      },
    },
  },
} satisfies Meta<typeof MaskedTextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "CEP",
    placeholder: "Digite seu CEP",
    helperText: "CEP no formato 00000-000",
    mask: "00000-000",
  },
};

export const ErrorState: Story = {
  args: {
    label: "CEP",
    placeholder: "Digite seu CEP",
    helperText: "CEP no formato 00000-000",
    mask: "00000-000",
    errorMessage: "CEP inválido",
  },
};

export const Disabled: Story = {
  args: {
    label: "CEP",
    placeholder: "Digite seu CEP",
    helperText: "CEP no formato 00000-000",
    mask: "00000-000",
    disabled: true,
  },
};
