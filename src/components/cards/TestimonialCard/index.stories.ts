// TestimonialCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import TestimonialCard from ".";
import { womanAvatarURL } from "@/mocks/index";

const meta = {
  title: "Cards/TestimonialCard",
  component: TestimonialCard,
  tags: ["autodocs"],
  argTypes: {
    rating: {
      control: { type: "number", min: 0, max: 5, step: 1 },
    },
  },
} satisfies Meta<typeof TestimonialCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { layout: "centered" },
  args: {
    avatarUrl: womanAvatarURL,
    userName: "Samantha Lee",
    userRole: "Designer",
    rating: 4,
    testimonial:
      "Lorem Ipsum é simplesmente um texto fictício da indústria tipográfica e de impressão. Tem sido o texto padrão desde os anos 1500.",
  },
};
