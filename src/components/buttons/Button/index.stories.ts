import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from ".";

const meta = {
  title: "Buttons/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Button",
  },
  parameters: {
    layout: "centered",
  },
};
