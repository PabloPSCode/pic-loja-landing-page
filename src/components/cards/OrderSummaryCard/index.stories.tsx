import type { Meta, StoryObj } from "@storybook/react-vite";
import OrderSummaryCard, { type OrderSummaryItem } from "./index";

type Story = StoryObj<typeof OrderSummaryCard>;

const SAMPLE_ITEMS: OrderSummaryItem[] = [
  { id: "1", name: "Camisa Tech Minimal", price: 79.9, quantity: 1 },
  { id: "2", name: "Mochila Urban 20L", price: 259.0, quantity: 2 },
  { id: "3", name: "Garrafa Térmica 500ml", price: 119.5, quantity: 1 },
];

const meta: Meta<typeof OrderSummaryCard> = {
  title: "Cards/OrderSummaryCard",
  component: OrderSummaryCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Cartão de **resumo do pedido** com cálculo de subtotal e total. Responsivo e com suporte a dark mode.",
      },
    },
  },
  argTypes: {
    items: { control: "object" },
    title: { control: "text" },
    helperText: { control: "text" },
    checkoutLabel: { control: "text" },
    onCheckout: { action: "checkout", table: { category: "events" } },
    className: { control: "text" },
  },
};
export default meta;

/* ===================== Stories ===================== */

export const Default: Story = {
  args: {
    items: SAMPLE_ITEMS,
    title: "Resumo do pedido",
    helperText: "Frete e impostos serão calculados na finalização.",
    checkoutLabel: "Prosseguir para o checkout",
  },
};

export const Empty: Story = {
  args: {
    items: [],
    title: "Resumo do pedido",
    helperText: "Adicione itens ao carrinho para visualizar o total.",
    checkoutLabel: "Prosseguir para o checkout",
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      ...SAMPLE_ITEMS,
      { id: "4", name: "Boné Street", price: 89.9, quantity: 3 },
      { id: "5", name: "Mousepad XL", price: 59.9, quantity: 2 },
      { id: "6", name: "Fone In-Ear", price: 199.9, quantity: 1 },
    ],
    helperText: "Valores estimados. Impostos no checkout.",
  },
};

export const LongNames: Story = {
  args: {
    items: [
      {
        id: "7",
        name: "Tênis Corrida Pro Max Ultra Confort – Edição Limitada Neon 2025 (numeração 42)",
        price: 499.9,
        quantity: 1,
      },
      {
        id: "8",
        name: "Jaqueta Impermeável Técnica para Trilhas e Trekking – Reforço Antiabrasão",
        price: 699.0,
        quantity: 1,
      },
    ],
  },
};

export const CustomLabels: Story = {
  args: {
    items: SAMPLE_ITEMS.slice(0, 2),
    title: "Seu pedido",
    helperText: "Entrega expressa disponível para alguns CEPs.",
    checkoutLabel: "Pagar agora",
  },
};

export const DarkModePreview: Story = {
  args: {
    items: SAMPLE_ITEMS,
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: { description: { story: "Pré-visualização em tema escuro." } },
  },
};
