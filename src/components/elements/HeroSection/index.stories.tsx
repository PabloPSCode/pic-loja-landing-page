import type { Meta, StoryObj } from "@storybook/react-vite";
import { HeroSection } from ".";
import bgImage from "../../../assets/bg-test.jpg";
// import bgImage from "../../assets/bg-test.jpg";

const meta: Meta<typeof HeroSection> = {
  title: "Elements/HeroSection",
  component: HeroSection,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["full", "middle"],
    },
    title: { control: "text" },
    subtitle: { control: "text" },
    buttonText: { control: "text" },
  },
};
export default meta;

type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {
    size: "middle",
    title: "Componentes web para aplicações React por um preço justo",
    subtitle:
      "Acelere o desenvolvimento do seu projeto pagando muito menos. Pare de pagar 5x mais por um mesmo produto!",
    buttonText: "Conhecer soluções",
    sectionClassName:
      "bg-gradient-to-r from-yellow-400 via-emerald-500 to-blue-500",
    titleClassName: "text-4xl font-bold mb-8 text-white",
    subtitleClassName: "text-2xl text-white mb-8",
    buttonClassName: "text-white text-lg font-semibold hover:bg-primary-600",
  },
};

export const WithBackgroundImage: Story = {
  args: {
    size: "full",
    title: "Seção com imagem de fundo",
    subtitle: "Testando imagem local como background.",
    buttonText: "Saiba mais",
    backgroundImageLocalPath: bgImage,
    titleClassName:
      "text-4xl font-bold mb-4 bg-clip-text bg-gradient-to-r from-green-400 via-yellow-400 to-blue-400",
    subtitleClassName: "text-2xl mb-4 text-gray-600",
    buttonClassName: "bg-primary-500 text-white hover:bg-primary-600",
  },
};

export const CustomClasses: Story = {
  args: {
    size: "middle",
    title: "Título com classes customizadas",
    subtitle: "Subtítulo estilizado via className",
    buttonText: "Ação",
    titleClassName: "text-5xl text-primary-500",
    subtitleClassName: "italic text-white",
    buttonClassName: "bg-blue-500 hover:bg-secondary-600",
    sectionClassName: "bg-gradient-to-r from-gray-700 via-gray-900 to-black",
  },
};
