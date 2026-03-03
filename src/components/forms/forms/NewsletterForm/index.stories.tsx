// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import NewsletterForm from "."; // adjust if your path is different

const meta: Meta<typeof NewsletterForm.Root> = {
  title: "Forms/NewsletterForm",
  tags: ["autodocs"],
  component: NewsletterForm.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          `Formulário de inscrição para newsletter com campos de entrada e botão de envio.\n\n` +
          `### Props principais\n` +
          `- **formTitle?**: título do formulário\n` +
          `- **onSubmit**: callback ao enviar o formulário\n` +
          `\n` +
          `### Subcomponentes\n` +
          `- **NewsletterForm.Input**: campo de entrada com label e texto auxiliar\n` +
          `- **NewsletterForm.Button**: botão de envio customizável\n\n`,
      },
      className: { control: "text" },
    },
  },
};
export default meta;

type Story = StoryObj<typeof NewsletterForm.Root>;

/* ---------------------------------- Basic ---------------------------------- */

export const Basic: Story = {
  args: {
    formTitle: "Assine nossa newsletter",
    onSubmit: (data) => console.log(data),
  },
  render: (args) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    return (
      <NewsletterForm.Root
        {...args}
        onSubmit={() => {
          console.log("onSubmit");
          console.log({ name, email });
        }}
      >
        <NewsletterForm.Input
          label="Nome"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <NewsletterForm.Input
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <NewsletterForm.Button buttonTitle="Inscrever-se" />
      </NewsletterForm.Root>
    );
  },
};

/* ---------------------------- With Helper Texts ---------------------------- */

export const WithHelperTexts: Story = {
  args: {
    formTitle: "Receba novidades",
  },
  render: (args) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    return (
      <NewsletterForm.Root
        {...args}
        onSubmit={() => console.log("submit-with-helper")}
      >
        <NewsletterForm.Input
          label="Nome"
          placeholder="Ex.: Maria Silva"
          helperText="Como gostaria de ser chamado(a)."
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <NewsletterForm.Input
          label="E-mail"
          type="email"
          placeholder="Ex.: maria@exemplo.com"
          helperText="Usaremos apenas para enviar novidades."
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <NewsletterForm.Button className="mb-5">Assinar</NewsletterForm.Button>
      </NewsletterForm.Root>
    );
  },
};
