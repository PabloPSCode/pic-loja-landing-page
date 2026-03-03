import type { Meta, StoryObj } from "@storybook/react-vite";
import LoadingIndicator from ".";

const meta = {
  title: "Animations and Loading/LoadingIndicator",
  component: LoadingIndicator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    color: { control: "color" },
  },
} satisfies Meta<typeof LoadingIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "#000000",
    loading: true,
  },
};
