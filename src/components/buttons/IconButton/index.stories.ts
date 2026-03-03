import type { Meta, StoryObj } from "@storybook/react-vite";
import IconButton from ".";

const meta = {
  title: "Buttons/IconButton",
  component: IconButton,
  tags: ["autodocs"],
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    iconName: "heart",
  },
  parameters:{
    layout: "centered",
  }
};
