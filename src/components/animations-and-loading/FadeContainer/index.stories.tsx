import type { Meta, StoryObj } from "@storybook/react-vite";
import FadeContainer from ".";

const meta = {
  title: "Animations and Loading/FadeContainer",
  component: FadeContainer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    once: { control: "boolean" },
    visibilityAmount: { control: "number" },
    children: { control: "object" },
  },
} satisfies Meta<typeof FadeContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <span>Hello World</span>,
  },
};
