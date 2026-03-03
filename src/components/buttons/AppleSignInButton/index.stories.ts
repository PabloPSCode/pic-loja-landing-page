import type { Meta, StoryObj } from "@storybook/react-vite";
import AppleSignInButton from ".";

const meta = {
  title: "Buttons/AppleSignInButton",
  component: AppleSignInButton,
  tags: ["autodocs"],
} satisfies Meta<typeof AppleSignInButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { layout: "centered" },
  args: {
    label: "Entrar com a Apple",
    variant: "black",
    loading: false,
    iconVariant: "scale",
    iconColor: "#ffffff",
  },
};
