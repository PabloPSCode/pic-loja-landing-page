// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import CodeVerificationInput, {
  type CodeVerificationInputProps,
} from ".";

const meta: Meta<typeof CodeVerificationInput> = {
  title: "Inputs/CodeVerificationInput",
  component: CodeVerificationInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Campo de **verificação de código (OTP)** baseado na biblioteca `react-verification-input`.\n" +
          "- Compatível com **modo escuro** e responsivo;\n" +
          "- Aceita customização via `classNames` da própria lib;\n" +
          "- Acessível: rótulo, `aria-invalid` e mensagens de ajuda/erro.",
      },
    },
  },
  args: {
    label: "Código de verificação",
    length: 6,
    placeholder: "•",
    helperText: "Insira o código de verificação",
    validChars: "0-9A-Za-z",
    disabled: false,
  } as CodeVerificationInputProps,
  argTypes: {
    length: { control: { type: "number", min: 1, max: 10 } },
    placeholder: { control: "text" },
    validChars: {
      control: "select",
      options: ["0-9", "A-Z", "a-z", "0-9A-Z", "0-9a-z", "A-Za-z", "0-9A-Za-z"],
    },
    disabled: { control: "boolean" },
    label: { control: "text" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
    containerClassName: { table: { disable: true } },
    labelClassName: { table: { disable: true } },
    classNames: { table: { disable: true } }, // customização avançada
    onChange: { action: "changed" },
    onComplete: { action: "completed" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo padrão com 6 caracteres, placeholder em ponto e caracteres válidos alfanuméricos.",
      },
    },
  },
};

export const Error: Story = {
  args: {
    errorMessage: "Código inválido. Tente novamente.",
    helperText: undefined,
    value: "sdf23", // apenas ilustrativo
  },
  parameters: {
    docs: {
      description: {
        story:
          "Quando `errorMessage` é informado, ele tem prioridade sobre `helperText` e o estilo dos campos é destacado em vermelho.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    helperText: "Campo desativado para interação.",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Estado **desabilitado**: impede foco e entrada do usuário e aplica opacidade reduzida.",
      },
    },
  },
};

export const Controlled: Story = {
  render: (props) => {
    const [code, setCode] = useState("");
    return (
      <div className="max-w-xl">
        <p className="mb-2 text-sm text-foreground/70">
          Valor atual: <strong>{code || "(vazio)"}</strong>
        </p>
        <CodeVerificationInput
          {...props}
          value={code}
          onChange={(v) => setCode(v)}
          onComplete={(v) => setCode(v)}
          helperText="Controle o valor via estado React (value/onChange)."
        />
      </div>
    );
  },
  args: {
    label: "Código (controlado)",
    length: 6,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo **controlado** usando `value` e `onChange`. O valor também é atualizado ao completar todos os caracteres.",
      },
    },
  },
};
