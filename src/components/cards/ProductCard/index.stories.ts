import { productCardItemURL } from "@/mocks/index";
import type { Meta, StoryObj } from "@storybook/react-vite";
import ProductCard from ".";

const meta: Meta<typeof ProductCard> = {
  title: "Cards/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  argTypes: {
    onAddToCart: { action: "added to cart" },
  },
  parameters:{
    layout: 'centered'
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrl: productCardItemURL,
    title: "Processador AMD Ryzen 7 5700G, 3.8GHz (4.6GHz Max Turbo), AM4",
    price: 99.99,
    rating: 4,
    installments: 3,
    installmentValue: 33.33,
  },
};
