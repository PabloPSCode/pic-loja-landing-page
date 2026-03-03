import type { Meta, StoryObj } from "@storybook/react-vite";
import InfoCard from ".";
import { PixLogoIcon } from "@phosphor-icons/react";

const meta = {
  title: "Cards/InfoCard",
  component: InfoCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InfoCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Pix",
    text: "Realize pagamentos de maneira simples e rápida.",
    icon: <PixLogoIcon weight="fill" size={64} color="#048023" />,
  },
};