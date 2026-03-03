import type { Meta, StoryObj } from "@storybook/react-vite";
import DiscordSignInButton from ".";

const meta = {
  title: "Buttons/DiscordSignInButton",
  component: DiscordSignInButton,
  tags: ["autodocs"],
} satisfies Meta<typeof DiscordSignInButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    layout: "centered",
  },
};
