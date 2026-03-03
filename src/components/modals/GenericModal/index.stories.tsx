import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import GenericModal, { type GenericModalProps } from ".";

const meta: Meta<GenericModalProps> = {
  title: "Modals/GenericModal",
  component: GenericModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          `Modal genérico, **simples** e **responsivo**, com suporte a *dark mode*.\n\n` +
          `Use as props do próprio componente para controlar a abertura/fechamento e o conteúdo.\n\n` +
          `### Principais props\n` +
          `- **open** *(boolean, obrigatório)*: controla se o modal está aberto.\n` +
          `- **onClose** *(function, obrigatório)*: chamado ao fechar (overlay, tecla ESC ou ícone de fechar).\n` +
          `- **title** *(string)* e **description?** *(string)*: cabeçalho do modal.\n` +
          `- **children** *(ReactNode)*: conteúdo do modal.\n` +
          `- **showCloseButton?** *(boolean, default: true)*: exibe o ícone de fechar no cabeçalho.\n` +
          `- **closeOnOverlayClick?** *(boolean, default: true)*: fecha ao clicar fora.\n` +
          `- **center?** *(boolean, default: true)*: centraliza verticalmente.\n` +
          `- **size?** *("sm" | "md" | "lg" | "xl", default: "md")*: largura do cartão interno.\n` +
          `- **showCancelButton? / showConfirmButton?** *(boolean)* e respectivos *handlers/labels* para ações no rodapé.\n`,
      },
    },
  },
  argTypes: {
    // controlados dentro das histórias (para não criar loop de controles)
    open: { table: { disable: true } },
    onClose: { action: "close", table: { category: "Events" } },
    onConfirm: { action: "confirm", table: { category: "Events" } },

    title: { control: "text" },
    description: { control: "text" },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    center: { control: "boolean" },
    closeOnOverlayClick: { control: "boolean" },
    showCloseButton: { control: "boolean" },

    showCancelButton: { control: "boolean" },
    showConfirmButton: { control: "boolean" },
    cancelButtonLabel: { control: "text" },
    confirmButtonLabel: { control: "text" },
    confirmButtonDisabled: { control: "boolean" },

    className: { control: false },
    overlayClassName: { control: false },
    containerClassName: { control: false },
    ariaLabelledby: { control: false },
    ariaDescribedby: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/* ===================== WithButtons ===================== */
export const WithButtons: Story = {
  args: {
    title: "Título do Modal",
    description: "Use os botões abaixo para confirmar ou cancelar.",
    size: "md",
    showCloseButton: true,
    closeOnOverlayClick: true,
    center: true,
    showCancelButton: true,
    showConfirmButton: true,
    cancelButtonLabel: "Cancelar",
    confirmButtonLabel: "Confirmar",
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button
          className="rounded-md bg-primary-500 px-4 py-2 text-white"
          onClick={() => setOpen(true)}
        >
          Abrir modal
        </button>

        <GenericModal
          {...args}
          open={open}
          onClose={() => {
            setOpen(false);
            args.onClose?.();
          }}
          onConfirm={() => {
            args.onConfirm?.();
            setOpen(false);
          }}
        >
          <p className="text-sm sm:text-base">
            Conteúdo do modal. Você pode colocar textos, formulários e qualquer
            outro componente aqui.
          </p>
        </GenericModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo completo com **botões de ação** no rodapé. O estado `open` é controlado localmente na história.",
      },
    },
  },
};

/* ===================== Center ===================== */
export const Center: Story = {
  args: {
    title: "Centralizado verticalmente",
    description:
      "Demonstração do posicionamento padrão (center=true). Clique fora para fechar.",
    size: "md",
    center: true,
    closeOnOverlayClick: true,
    showCloseButton: true,
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button
          className="rounded-md border border-foreground/20 px-4 py-2"
          onClick={() => setOpen(true)}
        >
          Abrir modal centralizado
        </button>

        <GenericModal
          {...args}
          open={open}
          onClose={() => {
            setOpen(false);
            args.onClose?.();
          }}
        >
          <p className="text-sm sm:text-base">
            O modal fica centralizado verticalmente. O overlay fecha ao clique.
          </p>
        </GenericModal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exibe o comportamento com `center` habilitado (padrão). Ideal para diálogos curtos.",
      },
    },
  },
};

/* ===================== Size variations ===================== */
export const SizeVariations: Story = {
  args: {
    title: "Variações de tamanho",
    description:
      "Abra cada opção para visualizar como o cartão interno se adapta às larguras `sm`, `md`, `lg` e `xl`.",
  },
  render: (args) => {
    const [openSize, setOpenSize] = useState<GenericModalProps["size"] | null>(
      null
    );

    const sizes: GenericModalProps["size"][] = ["sm", "md", "lg", "xl"];

    return (
      <div className="flex flex-wrap gap-2">
        {sizes.map((sz) => (
          <button
            key={sz}
            className="rounded-md bg-foreground/10 px-3 py-2 text-sm hover:bg-foreground/20"
            onClick={() => setOpenSize(sz)}
          >
            Abrir {sz!.toUpperCase()}
          </button>
        ))}

        {sizes.map((sz) => (
          <GenericModal
            key={sz}
            {...args}
            size={sz}
            open={openSize === sz}
            onClose={() => setOpenSize(null)}
            showCloseButton
          >
            <p className="text-sm sm:text-base">
              Este é o tamanho <b>{sz!.toUpperCase()}</b>. O cartão interno
              respeita a largura configurada e limita a altura ao viewport,
              rolando o conteúdo internamente quando necessário.
            </p>
          </GenericModal>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Quatro botões abrem o mesmo modal em **tamanhos diferentes** (`sm`, `md`, `lg`, `xl`).",
      },
    },
  },
};
