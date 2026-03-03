import type { Meta, StoryObj } from "@storybook/react-vite";
import VideoSection from ".";

const meta: Meta<typeof VideoSection> = {
  title: "Elements/VideoSection",
  component: VideoSection,
  tags: ["autodocs"],
  args: {
    size: "midle",
    title: "AirPods 4",
    description: "Icônicos. Supersônicos.",
    primaryButtonTitle: "Saiba mais",
    secondaryButtonTitle: "Comprar",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    showPlayPauseButton: false,
  },
  argTypes: {
    size: { control: { type: "radio" }, options: ["midle", "full"] },
    title: { control: "text" },
    description: { control: "text" },
    primaryButtonTitle: { control: "text" },
    secondaryButtonTitle: { control: "text" },
    videoUrl: { control: "text" },
    showPlayPauseButton: { control: "boolean" },
    onPrimaryClick: { action: "primary-click" },
    onSecondaryClick: { action: "secondary-click" },
  },
};

export default meta;
type Story = StoryObj<typeof VideoSection>;

export const Default: Story = {};

export const WithControls: Story = {
  args: {
    showPlayPauseButton: true,
  },
};

