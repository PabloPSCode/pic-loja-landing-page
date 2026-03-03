// components/hero/TechParticlesHeroSection/index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import TechParticlesHeroSection from "./index";

type Story = StoryObj<typeof TechParticlesHeroSection>;

const meta: Meta<typeof TechParticlesHeroSection> = {
  title: "Elements/TechParticlesHeroSection",
  component: TechParticlesHeroSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Seção de topo com partículas **tech** usando `@tsparticles/preset-links`. " +
          "É responsiva, suporta **dark mode** e permite controlar a velocidade da animação e as cores.",
      },
    },
  },
  args: {
    animationSpeed: "medium",
    className: "w-full h-[70vh]",
    particlesColors: [
      "#d44277",
      "#6c0d30",
      "#bd2f61",
      "#4a0a0a",
      "#dd1d1d",
      "#fbcadd",
    ],
    children: (
      <div className="relative z-10 text-center">
        <h1 className="text-white text-3xl md:text-5xl font-extrabold drop-shadow">
          Bem-vindo ao 🔥 TechParticlesHeroSection
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
