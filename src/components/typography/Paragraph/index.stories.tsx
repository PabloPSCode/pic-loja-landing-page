import type { Meta, StoryObj } from "@storybook/react-vite";
import Paragraph from ".";

const meta = {
  title: "Typography/Paragraph",
  component: Paragraph,
  tags: ["autodocs"],
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "Paragraph",
    weight: "regular",
  },
};
