import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import ScrollButton from ".";

const meta: Meta<typeof ScrollButton> = {
  title: "Buttons/ScrollButton",
  component: ScrollButton,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Botão fixo para **voltar ao topo**. " +
          "Só aparece após rolagem (`showAfterPx`) e usa rolagem suave por padrão.",
      },
    },
  },
  args: {
    variant: "filled",
    showAfterPx: 200,
    smooth: true,
  },
  argTypes: {
    variant: { control: "radio", options: ["filled", "outlined"] },
    showAfterPx: { control: { type: "number", min: 0, step: 50 } },
    smooth: { control: "boolean" },
    className: { control: false },
    icon: { control: false },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

/** Container alto para permitir rolagem nas histórias */
const TallContent: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-background text-foreground">
    <header className="mx-auto max-w-5xl px-6 py-6">
      <h1 className="text-2xl font-bold">Página de Exemplo</h1>
      <p className="text-foreground/70">
        Role para baixo para que o ScrollButton apareça no canto inferior direito.
      </p>
    </header>
    <main className="mx-auto max-w-5xl px-6">
      {/* cria bastante conteúdo */}
      {Array.from({ length: 20 }).map((_, i) => (
        <p key={i} className="mb-6 leading-7 text-foreground/80">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores,
          debitis. Parágrafo {i + 1}.
        </p>
      ))}
    </main>
    {children}
  </div>
);

export const Default: Story = {
  render: (args) => (
    <TallContent>
      <ScrollButton {...args} />
    </TallContent>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Variação **filled** (padrão). O botão surge após passar de `showAfterPx` pixels e volta ao topo ao clicar.",
      },
    },
  },
};

export const Outlined: Story = {
  args: { variant: "outlined" },
  render: (args) => (
    <TallContent>
      <ScrollButton {...args} />
    </TallContent>
  ),
  parameters: {
    docs: {
      description: {
        story: "Variação **outlined** com borda e hover invertendo as cores.",
      },
    },
  },
};

export const LowerThreshold: Story = {
  args: { showAfterPx: 50 },
  render: (args) => (
    <TallContent>
      <ScrollButton {...args} />
    </TallContent>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Aparece quase imediatamente ao rolar (limiar reduzido para 50px).",
      },
    },
  },
};

export const NoSmoothScroll: Story = {
  args: { smooth: false },
  render: (args) => (
    <TallContent>
      <ScrollButton {...args} />
    </TallContent>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Desativa a rolagem suave (`smooth = false`) e faz o salto imediato para o topo.",
      },
    },
  },
};
