import type { Meta, StoryObj } from "@storybook/react-vite";
import GitHubSignInButton from ".";

const meta = {
  title: "Buttons/GitHubSignInButton",
  component: GitHubSignInButton,
  tags: ["autodocs"],
} satisfies Meta<typeof GitHubSignInButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { layout: "centered" },
  args: {
    label: "Entrar com o GitHub",
    variant: "black",
    loading: false,
    iconVariant: "scale",
    iconColor: "#ffffff",
  },
};
