import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import DestructiveModal, { type DestructiveModalProps } from ".";

const meta: Meta<DestructiveModalProps> = {
  title: "Modals/DestructiveModal",
  component: DestructiveModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          `Modal de **confirmação destrutiva** (ex.: excluir/remover), responsivo e com suporte a *dark mode*.\n\n` +
          `### Principais props\n` +
          `- **open** *(boolean)*: controla a abertura.\n` +
          `- **onClose** *(function)*: chamado ao fechar (overlay, ESC, ícone ou botão Cancelar).\n` +
          `- **onConfirm** *(function)*: ação de confirmação.\n` +
          `- **title / description**: cabeçalho do modal.\n` +
          `- **confirmMessage**: mensagem padrão quando não há \`children\`.\n` +
          `- **size**: "sm" | "md" | "lg" | "xl" (default: "md").\n` +
          `- **confirmButtonLabel / cancelButtonLabel**, **confirmButtonDisabled**.\n`,
      },
    },
  },
  argTypes: {
    // controlados nas histórias
    open: { table: { disable: true } },
    onClose: { action: "close", table: { category: "Events" } },
    onConfirm: { action: "confirm", table: { category: "Events" } },

    title: { control: "text" },
    description: { control: "text" },
    confirmMessage: { control: "text" },
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
    center: { control: "boolean" },
    closeOnOverlayClick: { control: "boolean" },
    showCloseButton: { control: "boolean" },

    confirmButtonLabel: { control: "text" },
    cancelButtonLabel: { control: "text" },
    confirmButtonDisabled: { control: "boolean" },

    className: { control: false },
    overlayClassName: { control: false },
    containerClassName: { control: false },
    ariaLabelledby: { control: false },
    ariaDescribedby: { control: false },
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/* ===================== WithButtons ===================== */
export const WithButtons: Story = {
  args: {
    title: "Excluir item",
    description: "Essa ação é irreversível.",
    confirmMessage: "Tem certeza que deseja excluir este registro?",
    confirmButtonLabel: "Excluir",
    cancelButtonLabel: "Cancelar",
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
          className="rounded-md bg-red-500 px-4 py-2 text-white"
          onClick={() => setOpen(true)}
        >
          Abrir modal destrutivo
        </button>

        <DestructiveModal
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
        />
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo padrão com **botões Cancelar/Confirmar** e mensagem destrutiva.",
      },
    },
  },
};

/* ===================== Size variations ===================== */
export const SizeVariations: Story = {
  args: {
    title: "Variações de tamanho",
    confirmButtonLabel: "Confirmar",
    cancelButtonLabel: "Cancelar",
  },
  render: (args) => {
    const [openSize, setOpenSize] = useState<
      DestructiveModalProps["size"] | null
    >(null);
    const sizes: DestructiveModalProps["size"][] = ["sm", "md", "lg", "xl"];

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
          <DestructiveModal
            key={sz}
            {...args}
            size={sz}
            open={openSize === sz}
            onClose={() => setOpenSize(null)}
          >
            <p className="text-sm sm:text-base">
              Este é o tamanho <b>{sz!.toUpperCase()}</b>. O cartão interno
              limita a altura ao viewport e rola o conteúdo quando necessário.
            </p>
          </DestructiveModal>
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
