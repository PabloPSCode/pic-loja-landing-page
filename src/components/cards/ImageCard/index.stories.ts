import { brazilImage } from "@/mocks/index";
import type { Meta, StoryObj } from "@storybook/react-vite";
import TestimonialCard from ".";

const meta = {
  title: "Cards/ImageCard",
  component: TestimonialCard,
  tags: ["autodocs"],
} satisfies Meta<typeof TestimonialCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { layout: "centered" },
  args: {
    imgUrl: brazilImage,
    title: "Brasil",
    description: "O Brasil é o maior país da América do Sul e o quinto maior do mundo. É conhecido por sua rica cultura, biodiversidade e paisagens deslumbrantes.",
    onSeeDetails: () => alert("Ver detalhes clicado!"),
  },
};
