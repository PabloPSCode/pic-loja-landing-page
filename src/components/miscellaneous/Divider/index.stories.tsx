import type { Meta, StoryObj } from "@storybook/react-vite";
import Divider from ".";

const meta: Meta<typeof Divider> = {
  title: "Miscellaneous/Divider",
  component: Divider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de divisor horizontal para separar seções de conteúdo. " +
          "Usa uma linha fina e sutil que se adapta ao tema claro/escuro.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div className="w-64">
        <div className="text-center mb-2">Seção 1</div>
        <Divider />
        <div className="text-center mt-2">Seção 2</div>
      </div>
    );
  }
};
