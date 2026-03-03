import GoogleSignInButton from "@/components/buttons/GoogleButton";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import SignInForm, { type SignInFormProps } from ".";

const meta: Meta<SignInFormProps> = {
  title: "Forms/SignInForm",
  component: SignInForm.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      // ⬇️ Texto de alto nível (PT-BR) com explicação de props do Root e dos subcomponentes
      description: {
        component:
          `Formulário de **Login** (padrão **compound**). Use \`SignInForm.Root\` e componha com:\n\n` +
          `- \`SignInForm.Title\` – título do formulário.\n` +
          `- \`SignInForm.TextInput\` – campo de texto com \`label\`, \`helperText\`, \`errorMessage\` e acessibilidade.\n` +
          `- \`SignInForm.PasswordInput\` – campo de senha com botão de mostrar/ocultar.\n` +
          `- \`SignInForm.LoginButton\` – botão principal de ação.\n` +
          `- \`SignInForm.ActionButton\` – ação secundária (ex.: “Esqueci minha senha”).\n` +
          `- \`SignInForm.SeparatorText\` – separador com texto central.\n\n` +
          `### Props – \`SignInForm.Root\`\n` +
          `- **bordered?**: \`boolean\` – adiciona borda ao redor do formulário (padrão: \`false\`).\n` +
          `- **onSubmit?**: \`(e: React.FormEvent) => void\` – handler de envio do formulário (o componente já previne o reload e chama \`onSubmit\` se fornecido).\n` +
          `- **className?**: \`string\` – classes adicionais aplicadas ao form.\n\n` +
          `### Props – Subcomponentes (resumo)\n` +
          `**Title**\n` +
          `- **title** *(string, obrigatório)* – texto do título.\n` +
          `- **className?** *(string)* – classes extras.\n\n` +
          `**TextInput**\n` +
          `- **label** *(string, obrigatório)* – rótulo acessível.\n` +
          `- **helperText?** *(string)* – texto auxiliar exibido quando não há erro.\n` +
          `- **errorMessage?** *(string)* – mensagem de erro, muda estilos e tem prioridade sobre o helper.\n` +
          `- **containerClassName?** *(string)* – classes no wrapper externo.\n` +
          `- **...InputHTMLAttributes** – quaisquer atributos nativos de \`<input>\`.\n\n` +
          `**PasswordInput** (mesmas props do \`TextInput\` +)\n` +
          `- **showPasswordVisibility?** *(boolean)* – exibe o botão de mostrar/ocultar (padrão: \`true\`).\n` +
          `- **autoComplete?** *(string)* – padrão: \`current-password\`.\n\n` +
          `**LoginButton**\n` +
          `- **label** *(string, obrigatório)* – texto do botão.\n` +
          `- **className?** *(string)* – classes extras.\n` +
          `- **...ButtonHTMLAttributes** – atributos nativos.\n\n` +
          `**ActionButton**\n` +
          `- **label** *(string, obrigatório)* – texto da ação.\n` +
          `- **helperText?** *(string)* – texto auxiliar exibido antes do label.\n` +
          `- **className?** *(string)* – classes extras.\n\n` +
          `**SeparatorText**\n` +
          `- **text** *(string, obrigatório)* – texto no centro do separador.\n` +
          `- **className?** *(string)* – classes extras.\n`,
      },
      subcomponents: {
        Title: SignInForm.Title,
        TextInput: SignInForm.TextInput,
        PasswordInput: SignInForm.PasswordInput,
        LoginButton: SignInForm.LoginButton,
        ActionButton: SignInForm.ActionButton,
        SeparatorText: SignInForm.SeparatorText,
      },
    },
  },

  argTypes: {
    onSubmit: {
      action: "submit",
      description:
        "Callback de envio do formulário. O componente já previne o comportamento padrão e chama este handler.",
      table: { category: "Root" },
    },
    className: {
      control: false,
      description: "Classes CSS adicionais aplicadas ao `<form>` raiz.",
      table: { category: "Root" },
    },
    children: {
      control: false,
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** ========== Exemplo base (com todas as peças e controle) ========== */
export const Default: Story = {
  render: (args) => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    return (
      <SignInForm.Root {...args} onSubmit={args.onSubmit}>
        <SignInForm.Title title="Entrar" className="mb-2" />
        <p className="mb-4 text-foreground/70 text-sm">
          Acesse sua conta para continuar.
        </p>

        <SignInForm.TextInput
          label="E-mail"
          type="email"
          placeholder="voce@empresa.com"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          helperText="Use um e-mail corporativo"
          containerClassName="mb-2"
        />

        <SignInForm.PasswordInput
          label="Senha"
          placeholder="••••••••"
          value={pwd}
          onChange={(e) => setPwd(e.currentTarget.value)}
          helperText="Mínimo de 8 caracteres"
          containerClassName="mb-3"
        />

        <SignInForm.ActionButton
          label="Esqueci minha senha"
          className="px-0"
          onClick={() => alert("Recuperar senha")}
        />
        <SignInForm.LoginButton label="Entrar" className="px-4" />

        <SignInForm.SeparatorText text="ou continue com" className="my-3" />

        <GoogleSignInButton label="Entrar com o Google" />
      </SignInForm.Root>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "História padrão com `Title`, campos controlados, ação secundária, CTA principal e login social.",
      },
    },
  },
};

/** ========== Demonstra feedback de erro ========== */
export const WithErrors: Story = {
  render: (args) => (
    <SignInForm.Root {...args}>
      <SignInForm.Title title="Entrar" className="mb-3" />

      <SignInForm.TextInput
        label="E-mail"
        type="email"
        placeholder="voce@empresa.com"
        errorMessage="Informe um e-mail válido."
        containerClassName="mb-2"
      />

      <SignInForm.PasswordInput
        label="Senha"
        placeholder="••••••••"
        errorMessage="Senha incorreta."
        containerClassName="mb-3"
      />

      <div className="flex items-center justify-end">
        <SignInForm.LoginButton label="Tentar novamente" />
      </div>
    </SignInForm.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Quando `errorMessage` é informado, estilos de foco e borda mudam para o estado de erro, garantindo contraste e feedback visual.",
      },
    },
  },
};

/** ========== Versão minimalista (sem borda) ========== */
export const Minimal: Story = {
  render: (args) => (
    <SignInForm.Root {...args}>
      <SignInForm.Title title="Bem-vindo de volta" className="mb-2" />
      <SignInForm.TextInput
        label="E-mail"
        type="email"
        placeholder="voce@empresa.com"
        containerClassName="mb-2"
      />
      <SignInForm.PasswordInput
        label="Senha"
        placeholder="••••••••"
        containerClassName="mb-3"
      />
      <SignInForm.LoginButton label="Entrar" className="w-full" />
    </SignInForm.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Layout enxuto, ideal para cartões embutidos em páginas com pouco espaço.",
      },
    },
  },
};

/** ========== Tabela de Props (Docs Only) ========== */
export const _Docs_PropsOverview: Story = {
  name: "📚 Tabelas de Props (Root + Subcomponents)",
  render: () => (
    <div style={{ padding: 16 }}>
      <p>
        Consulte as <b>Tabelas de Props</b> acima (Docs) para{" "}
        <code>SignInForm.Root</code> e para cada subcomponente listado em{" "}
        <code>subcomponents</code>. Este item existe apenas para navegação.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "As **tabelas de props** dos subcomponentes são exibidas automaticamente na aba **Docs**, porque definimos `parameters.docs.subcomponents` com os composições.",
      },
    },
  },
};
