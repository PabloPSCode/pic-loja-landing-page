import type { Meta, StoryObj } from "@storybook/react-vite";
import ProfileCard from ".";
import { womanAvatarURL } from "@/mocks/index";

const meta = {
  title: "Cards/ProfileCard",
  component: ProfileCard,
  tags: ["autodocs"],
} satisfies Meta<typeof ProfileCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: { layout: "centered" },
  args: {
    avatarUrl: womanAvatarURL,
    userName: "Samantha Lee",
    userRole: "Designer",
    bio:
      "Trabalho com design de interfaces e experiência do usuário. Conhecimento em ferramentas como Figma e Adobe XD.",
  },
};
