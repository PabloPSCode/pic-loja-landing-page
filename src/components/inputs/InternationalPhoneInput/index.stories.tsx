// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import InternationalPhoneInput from "./index";

type Story = StoryObj<typeof InternationalPhoneInput>;

const meta: Meta<typeof InternationalPhoneInput> = {
  title: "Inputs/InternationalPhoneInput",
  component: InternationalPhoneInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          `Campo de **telefone internacional** baseado em *react-international-phone*, com visual padronizado aos componentes **TextInput/PasswordInput**.\n\n` +
          `### Destaques (Brasil)\n` +
          `- Responsivo e **dark-mode**\n` +
          `- ` +
          "`defaultCountry='br'`" +
          ` por padrão e ` +
          "`preferredCountries`" +
          ` configurável (ex.: ["br","us","pt"])\n` +
          `- Acessível: *label*, *aria-invalid* e *aria-describedby*\n\n` +
          `> Dica: importe o CSS da lib **uma vez no app** (já é importado no componente nesta demo). Caso deseje remover as bordas padrão da lib, crie um CSS de override e importe após o estilo da biblioteca.`,
      },
    },
  },
  argTypes: {
    // Conteúdo/controle
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
    defaultCountry: {
      control: "text",
      description: "Código do país (ex.: 'br', 'us', 'pt')",
    },
    preferredCountries: {
      control: "object",
      description: "Lista de países preferidos no seletor",
    },
    disabled: { control: "boolean" },

    // Classes de estilo
    containerClassName: { control: "text" },
    phoneContainerClassName: { control: "text" },
    inputClassName: { control: "text" },
    selectorButtonClassName: { control: "text" },

    // value/onChange são controlados via `render` (estado local)
    value: { control: false },
    onChange: { control: false },
  },
  args: {
    label: "Celular (com DDI)",
    placeholder: "+55 11 99999-9999",
    helperText: "Inclua DDI (ex.: +55) e DDD.",
    defaultCountry: "br",
    preferredCountries: ["br", "us", "pt"],
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md bg-background text-foreground p-4 rounded-lg">
        <Story />
      </div>
    ),
  ],
};
export default meta;

/* --------------------------------- Stories --------------------------------- */

export const Default: Story = {
  render: (args) => {
    const [phone, setPhone] = useState("+55");
    return (
      <InternationalPhoneInput {...args} value={phone} onChange={setPhone} />
    );
  },
};

export const WithError: Story = {
  args: {
    helperText: undefined,
    errorMessage: "Informe um número válido.",
  },
  render: (args) => {
    const [phone, setPhone] = useState("");
    return (
      <InternationalPhoneInput {...args} value={phone} onChange={setPhone} />
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => {
    const [phone, setPhone] = useState("+1 202 555 0123");
    return (
      <InternationalPhoneInput {...args} value={phone} onChange={setPhone} />
    );
  },
};

export const PreferredCountries: Story = {
  args: {
    defaultCountry: "us",
    preferredCountries: ["us", "br", "pt"],
    placeholder: "+1 202 555 0123",
  },
  render: (args) => {
    const [phone, setPhone] = useState("+1");
    return (
      <InternationalPhoneInput {...args} value={phone} onChange={setPhone} />
    );
  },
};
