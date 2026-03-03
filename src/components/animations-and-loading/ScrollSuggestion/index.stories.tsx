import { HandPointingIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import ScrollSuggestion from ".";

const meta: Meta<typeof ScrollSuggestion> = {
  title: "Animations and Loading/ScrollSuggestion",
  component: ScrollSuggestion,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente que sugere ao usuário **rolar a página**. " +
          "Suporta **dark mode**, diferentes **animações** (`bounce` ou `pulse`), " +
          "personalização de ícone e classes utilitárias.",
      },
    },
  },
  argTypes: {
    helperText: {
      control: "text",
      description: "Texto exibido abaixo do ícone.",
    },
    animation: {
      control: { type: "select" },
      options: ["bounce", "pulse"],
      description: "Define a animação do ícone.",
    },
    containerClassName: {
      control: "text",
      table: { category: "Estilo" },
    },
    iconClassName: {
      control: "text",
      table: { category: "Estilo" },
    },
    textClassName: {
      control: "text",
      table: { category: "Estilo" },
    },
    icon: {
      control: false,
      description: "Ícone customizado opcional (sobrescreve o padrão).",
    },
  },
};
export default meta;

type Story = StoryObj<typeof ScrollSuggestion>;

export const Default: Story = {
  args: {
    helperText: "Role para ver mais",
    animation: "bounce",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo padrão com ícone de **scroll** animado em `bounce` e texto auxiliar.",
      },
    },
  },
};

export const PulseAnimation: Story = {
  args: {
    helperText: "Continue descendo",
    animation: "pulse",
  },
  parameters: {
    docs: {
      description: {
        story: "O mesmo componente, mas com animação de **pulso**.",
      },
    },
  },
};

export const CustomIcon: Story = {
  args: {
    helperText: "Veja mais abaixo",
    animation: "bounce",
    icon: (
      <HandPointingIcon size={28} weight="bold" className="text-primary-500" />
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo com **ícone customizado** (`HandPointDownIcon` do Phosphor) substituindo o padrão.",
      },
    },
  },
};

export const DarkMode: Story = {
  args: {
    helperText: "Scroll down",
    animation: "pulse",
  },
  parameters: {
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story:
          "Demonstração do componente em **modo escuro**. O texto e o ícone usam tokens de cor responsivos.",
      },
    },
  },
};
