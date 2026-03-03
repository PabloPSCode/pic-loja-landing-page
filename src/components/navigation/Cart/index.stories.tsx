import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { mockedProducts } from "../../../mocks";
import Cart from "./index";

type Story = StoryObj<typeof Cart>;

const meta: Meta<typeof Cart> = {
  title: "Navigation/Cart",
  component: Cart,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Drawer de **carrinho** fixo à direita com overlay. Controlado via props `isOpen` e `onToggleOpen`. " +
          "Os itens são passados por `products` e o total é calculado automaticamente.",
      },
    },
  },
  args: {
    products: mockedProducts,
    emptyCartMessage: "Seu carrinho está vazio.",
    checkoutButtonText: "Finalizar compra",
    keepBuyingButtonText: "Continuar comprando",
    isOpen: true,
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Estado de abertura do drawer.",
    },
    products: {
      control: "object",
      description:
        "Lista de produtos do carrinho. Cada item deve conter ao menos `{ id, price, quantity }`.",
    },
    emptyCartMessage: { control: "text" },
    checkoutButtonText: { control: "text" },
    keepBuyingButtonText: { control: "text" },
    onToggleOpen: { action: "toggle", table: { category: "events" } },
    onProceedToCheckout: { action: "checkout", table: { category: "events" } },
  },
};
export default meta;

/* ===================== Stories ===================== */

export const DefaultOpen: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <div className="w-full h-full">
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-[60] rounded-md bg-primary-600 px-3 py-2 text-white"
        >
          Abrir carrinho
        </button>
        <Cart {...args} isOpen={open} onToggleOpen={() => setOpen((v) => !v)} />
      </div>
    );
  },
  args: {
    products: mockedProducts,
    emptyCartMessage: "Seu carrinho está vazio.",
    checkoutButtonText: "Finalizar compra",
    keepBuyingButtonText: "Continuar comprando",
  },
};

export const EmptyCart: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-[60] rounded-md bg-primary-600 px-3 py-2 text-white"
        >
          Abrir carrinho
        </button>
        <Cart {...args} isOpen={open} onToggleOpen={() => setOpen((v) => !v)} />
      </>
    );
  },
  args: {
    products: [],
    emptyCartMessage: "Nada por aqui ainda. 😊",
    checkoutButtonText: "Ir para o checkout",
    keepBuyingButtonText: "Voltar às compras",
  },
};

export const ManyItems: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-[60] rounded-md bg-primary-600 px-3 py-2 text-white"
        >
          Abrir carrinho
        </button>
        <Cart
          {...args}
          products={mockedProducts}
          isOpen={open}
          onToggleOpen={() => setOpen((v) => !v)}
        />
      </>
    );
  },
  args: {
    emptyCartMessage: "Sem itens.",
    checkoutButtonText: "Pagar agora",
    keepBuyingButtonText: "Continuar comprando",
  },
};

export const Closed: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-[60] rounded-md bg-primary-600 px-3 py-2 text-white"
        >
          Abrir carrinho
        </button>
        <Cart {...args} isOpen={open} onToggleOpen={() => setOpen((v) => !v)} />
      </>
    );
  },
  args: {
    products: mockedProducts.slice(0, 2),
  },
};
