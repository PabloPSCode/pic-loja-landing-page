import type { Meta, StoryObj } from "@storybook/react-vite";
import GLBSection from ".";

const meta: Meta<typeof GLBSection> = {
  title: "Elements/GLBSection",
  component: GLBSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          "Secao com comportamento sticky (200vh) que sincroniza o progresso de scroll com o `GLBViewer`. " +
          "Ideal para blocos de destaque com modelos 3D em landing pages.",
      },
    },
  },
  args: {
    title: "Qualidade nos mínimos detalhes",
    glbModelPath: "./models/street_fighter_arcade_cabinet.glb",
    height: "100%",
    animateOnScroll: true,
    stopAtFront: false,
    frontRotationY: 0,
    lockAtScrollVH: 0.6,
    minScale: 0.8,
    maxScale: 1.5,
    enablePan: true,
  },
  argTypes: {
    title: {
      control: "text",
      description: "Titulo exibido no topo da secao.",
      table: { category: "Secao" },
    },
    titleClassName: {
      control: "text",
      description: "Classes extras para o titulo.",
      table: { category: "Secao" },
    },
    className: {
      control: "text",
      description: "Classes extras para o container da secao.",
      table: { category: "Secao" },
    },
    modelProps: {
      control: "object",
      description:
        "Objeto opcional com props de GLBViewer. Se definido, sobrescreve props diretas.",
      table: { category: "Secao" },
    },
    glbModelPath: {
      control: "text",
      description: "Caminho/URL do arquivo .glb.",
      table: { category: "GLBViewer" },
    },
    height: {
      control: "text",
      description: "Altura do viewer (numero em px ou string CSS).",
      table: { category: "GLBViewer" },
    },
    animateOnScroll: {
      control: "boolean",
      description: "Ativa animacao do modelo com o scroll.",
      table: { category: "Scroll" },
    },
    stopAtFront: {
      control: "boolean",
      description: "Quando ativo, trava gradualmente no angulo frontal.",
      table: { category: "Scroll" },
    },
    frontRotationY: {
      control: { type: "number", step: 0.1 },
      description: "Angulo frontal alvo no eixo Y (radianos).",
      table: { category: "Scroll" },
    },
    lockAtScrollVH: {
      control: { type: "number", min: 0, max: 2, step: 0.05 },
      description: "Fator da altura da viewport para o ponto de travamento.",
      table: { category: "Scroll" },
    },
    minScale: {
      control: { type: "number", min: 0.1, max: 3, step: 0.05 },
      description: "Escala minima do modelo durante o scroll.",
      table: { category: "Scroll" },
    },
    maxScale: {
      control: { type: "number", min: 0.1, max: 5, step: 0.05 },
      description: "Escala maxima do modelo durante o scroll.",
      table: { category: "Scroll" },
    },
    enablePan: {
      control: "boolean",
      description: "Permite pan manual no OrbitControls.",
      table: { category: "OrbitControls" },
    },
    scrollProgress: {
      control: false,
      description: "Controlado internamente pela propria secao.",
      table: { category: "Interno" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GLBSection>;

export const Default: Story = {};

export const StopAtFront: Story = {
  name: "Travar no frontal",
  args: {
    stopAtFront: true,
    frontRotationY: 0,
    lockAtScrollVH: 0.8,
  },
};

export const WithModelPropsOverride: Story = {
  name: "Sobrescrita via modelProps",
  args: {
    rotateY: 0.02,
    modelProps: {
      glbModelPath: "./models/street_fighter_arcade_cabinet.glb",
      rotateY: 0.008,
      minScale: 1,
      maxScale: 1.8,
      enablePan: false,
    },
  },
};
