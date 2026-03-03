import type { Meta, StoryObj } from "@storybook/react-vite";
import LottieAnimation from ".";
import { reactLottieAnimation } from "@/mocks/index";

const meta = {
  title: "Animations and Loading/Lottie",
  component: LottieAnimation,
  tags: ["autodocs"],
  argTypes: {
    animation: { control: "object" },
    height: { control: "number" },
    width: { control: "number" },
    loop: { control: "boolean" },
    autoplay: { control: "boolean" },
    style: { control: "object" },
  },
} satisfies Meta<typeof LottieAnimation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    animation: reactLottieAnimation,
    height: 240,
    width: 240,
    loop: true,
    autoplay: true,
  },
};
