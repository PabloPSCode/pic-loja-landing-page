// components/hero/FireParticlesHeroSection/index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import FireParticlesHeroSection from "./index";

type Story = StoryObj<typeof FireParticlesHeroSection>;

const meta: Meta<typeof FireParticlesHeroSection> = {
  title: "Elements/FireParticlesHeroSection",
  component: FireParticlesHeroSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Seção de topo com partículas de **fogo** usando `@tsparticles/preset-fire`. " +
          "É responsiva, suporta **dark mode** e permite controlar a velocidade da animação e as cores.",
      },
    },
  },
  args: {
    animationSpeed: "medium",
    className: "w-full h-[70vh]",
    particlesColors: [
      "#f6ebef",
      "#f9d6e3",
      "#f4e0e7",
      "#ffffff",
      "#ffffff",
      "#fbcadd",
    ],
    children: (
      <div className="relative z-10 text-center">
        <h1 className="text-white text-3xl md:text-5xl font-extrabold drop-shadow">
          Bem-vindo ao 🔥 FireParticlesHeroSection
        </h1>
        <p className="mt-3 text-white/80 text-sm md:text-base">
          Ajuste a velocidade e as cores nas **Controls**.
        </p>
      </div>
    ),
  },
  argTypes: {
    animationSpeed: {
      control: { type: "radio" },
      options: ["slow", "medium", "fast"],
      description: "Velocidade da animação das partículas.",
    },
    particlesColors: {
      control: "object",
      description:
        "Paleta (array de strings) aplicada às partículas. Se vazio, usa o padrão.",
    },
    className: { control: "text" },
  },
};
export default meta;

/* ===================== Stories ===================== */

export const Default: Story = {};
