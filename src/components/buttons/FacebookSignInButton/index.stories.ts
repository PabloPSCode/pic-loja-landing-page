import type { Meta, StoryObj } from "@storybook/react-vite";
import FacebookSignInButton from ".";

const meta = {
  title: "Buttons/FacebookSignInButton",
  component: FacebookSignInButton,
  tags: ["autodocs"],
} satisfies Meta<typeof FacebookSignInButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { layout: "centered" },
  args: {
    label: "Entrar com o Facebook",
    loading: false,
    iconVariant: "scale",
    iconColor: "#ffffff",
  },
};
