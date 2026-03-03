// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FadeText } from "./index";

type Story = StoryObj<typeof FadeText>;

const meta: Meta<typeof FadeText> = {
  title: "Animations and Loading/FadeText",
  component: FadeText,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          "Componente para **transicionar textos** com efeito de **fade in/out**. Útil para slogans, headlines e chamadas curtas. Acessível (usa `aria-live='polite'`).",
      },
    },
  },
  args: {
    items: ["Rápido", "Confiável", "Seguro"],
    intervalMs: 2500,
    fadeMs: 500,
    wrapper: "div",
    loop: true,
    className:
      "text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground",
  },
  argTypes: {
    items: {
      control: "object",
      description: "Lista de textos que serão exibidos em rotação.",
    },
    intervalMs: {
      control: { type: "number", min: 500, step: 100 },
      description:
        "Tempo total (ms) que **cada item** permanece visível antes de trocar.",
    },
    fadeMs: {
      control: { type: "number", min: 100, step: 50 },
      description: "Duração (ms) da transição de opacidade (fade).",
    },
    startIndex: {
      control: { type: "number", min: 0, step: 1 },
      description: "Índice inicial (padrão: 0).",
    },
    loop: {
      control: "boolean",
      description:
        "Quando **true**, reinicia do primeiro item ao chegar no fim.",
    },
    wrapper: {
      control: "select",
      options: ["div", "span", "p", "h1", "h2", "h3", "h4", "h5", "h6"],
      description: "Tag HTML usada como wrapper do texto (padrão: `div`).",
    },
    className: {
      control: "text",
      description: "Classes utilitárias (ex.: Tailwind) aplicadas ao wrapper.",
    },
  },
};
export default meta;

/* ===================== Histórias ===================== */

export const Padrao: Story = {};

export const CicloRapido: Story = {
  name: "Ciclo rápido",
  args: {
    items: ["Entregue mais rápido", "Quebre menos coisas", "Durma melhor"],
    intervalMs: 1500,
    fadeMs: 300,
  },
};

export const HeadlineH2: Story = {
  name: "Headline (h2)",
  args: {
    wrapper: "h2",
    className: "text-3xl sm:text-4xl font-black leading-tight text-foreground",
    items: [
      "Construa uma vez.",
      "Publique em qualquer lugar.",
      "Escale fácil.",
    ],
    intervalMs: 3000,
  },
};

export const FraseInline: Story = {
  name: "Frase inline (span)",
  render: (args) => (
    <p className="text-base sm:text-lg text-foreground">
      Nossa plataforma é{" "}
      <FadeText
        {...args}
        wrapper="span"
        className="font-semibold underline decoration-primary-500"
        items={["privada por padrão", "acessível", "simples de integrar"]}
      />{" "}
      para times de todos os tamanhos.
    </p>
  ),
  args: {
    intervalMs: 1800,
    fadeMs: 300,
  },
};

export const IniciaNoMeio: Story = {
  name: "Inicia no meio",
  args: {
    items: ["Um", "Dois", "Três", "Quatro"],
    startIndex: 2,
  },
};

export const SemLoopParaNoFim: Story = {
  name: "Sem loop (para no último)",
  args: {
    items: ["Alfa", "Beta", "Gama"],
    loop: false,
  },
};

export const EstiloSutil: Story = {
  name: "Estilo sutil",
  args: {
    className: "text-sm sm:text-base font-medium text-foreground/80 italic",
    intervalMs: 2200,
    fadeMs: 400,
    items: ["Sem lock-in", "Zero config", "Ótima DX"],
  },
};

export const ListaLonga: Story = {
  name: "Lista longa",
  args: {
    items: [
      "Analytics",
      "Auth",
      "Pagamentos",
      "Storage",
      "Filas",
      "Jobs",
      "Busca",
    ],
    intervalMs: 1200,
    fadeMs: 250,
    className:
      "text-xl sm:text-2xl font-semibold text-foreground tracking-tight",
  },
};
