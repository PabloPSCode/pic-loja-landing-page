import type { Meta, StoryObj } from "@storybook/react-vite";
import Phrase from ".";

const meta = {
  title: "Typography/Phrase",
  component: Phrase,
  tags: ["autodocs"],
} satisfies Meta<typeof Phrase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: "Phrase",
    weight: "regular",
  },
};
