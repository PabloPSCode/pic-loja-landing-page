import type { Meta, StoryObj } from "@storybook/react-vite";
import Title from ".";

const meta = {
  title: "Typography/Title",
  component: Title,
  tags: ["autodocs"],
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "Title",
    weight: "bold",
    element: "h1",
  },
};
