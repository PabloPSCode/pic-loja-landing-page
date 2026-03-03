import type { Meta, StoryObj } from "@storybook/react-vite";
import SkeletonContainer from ".";

const meta = {
  title: "Animations and Loading/SkeletonContainer",
  component: SkeletonContainer,
  tags: ["autodocs"],
} satisfies Meta<typeof SkeletonContainer>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    children: "Conteúdo carregado",
    isLoading: true,
  },
};

export const Text: StoryObj<typeof meta> = {
  args: {
    children: (
      <>
        <h3 className="text-lg font-semibold">Título</h3>
        <p>Descrição longa...</p>
      </>
    ),
    isLoading: true,
    lines: 2,
    shape: "text",
  },
};
