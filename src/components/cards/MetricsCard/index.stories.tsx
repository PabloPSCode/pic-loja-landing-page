import type { Meta, StoryObj } from "@storybook/react-vite";
import MetricsCard from ".";
import { UsersThreeIcon } from "@phosphor-icons/react";

const meta = {
  title: "Cards/MetricsCard",
  component: MetricsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MetricsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Usuários Cadastrados",
    preTitle: "+ de",
    value: 3500,    
    countDuration: 2,
    icon: <UsersThreeIcon weight="fill" size={64} color="#048023" />,
  },
};