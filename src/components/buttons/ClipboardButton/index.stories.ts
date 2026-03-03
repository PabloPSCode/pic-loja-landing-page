import type { Meta, StoryObj } from "@storybook/react-vite";
import ClipboardButton from ".";

const meta = {
  title: "Buttons/ClipboardButton",
  component: ClipboardButton,
  tags: ["autodocs"],
} satisfies Meta<typeof ClipboardButton>;

export default meta;

type Story = StoryObj<typeof ClipboardButton>;

export const Default: Story = {
  args: {
    textToCopy: "Hello World",
    label: "Copy text",
    variant: "outlined",
    onCopy: () => alert("Text copied to clipboard!"),
  },
  argTypes: {
    variant: {
      options: ["filled", "outlined"],
      control: { type: "radio" },
      type: { name: "string" },
    },
  },
  parameters: {
    layout: "centered",
  },
};
