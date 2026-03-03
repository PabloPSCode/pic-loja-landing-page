import type { Meta, StoryObj } from "@storybook/react";
import InfoLinkCard from ".";

const meta = {
  title: "Cards/InfoLinkCard",
  component: InfoLinkCard,
  tags: ["autodocs"],
} satisfies Meta<typeof InfoLinkCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Ficou com alguma dúvida?",
    text: "Entre em contato com o suporte. Estamos disponíveis 7 dias por semana, 24 horas por dia.",
    url: "#",
  },
  parameters: {
    layout: "centered",
  },
};
