import type { Meta, StoryObj } from "@storybook/react-vite";
import Subtitle from ".";

const meta = {
  title: "Typography/Subtitle",
  component: Subtitle,
  tags: ["autodocs"],
} satisfies Meta<typeof Subtitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "Subtitle",
    weight: "bold",
    element: "h2",
  },
};
