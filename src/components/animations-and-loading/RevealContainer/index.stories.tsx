import type { Meta, StoryObj } from "@storybook/react-vite";
import RevealContainer from ".";

const meta = {
  title: "Animations and Loading/RevealContainer",
  component: RevealContainer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    once: { control: "boolean" },
    visibilityAmount: { control: "number" },
    offSet: { control: "number" },
    children: { control: "object" },
  },
} satisfies Meta<typeof RevealContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <span>Hello World</span>,
  },
};
