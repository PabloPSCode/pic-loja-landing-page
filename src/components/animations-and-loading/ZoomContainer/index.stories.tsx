import type { Meta, StoryObj } from "@storybook/react-vite";
import ZoomContainer from ".";

const meta = {
  title: "Animations and Loading/ZoomContainer",
  component: ZoomContainer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    once: { control: "boolean" },
    visibilityAmount: { control: "number" },
    scale: { control: "number" },
    children: { control: "object" },
  },
} satisfies Meta<typeof ZoomContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <span>Hello World</span>,
  },
};
