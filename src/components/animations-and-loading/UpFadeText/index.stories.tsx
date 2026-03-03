import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef } from "react";
import UpFadeText, { type UpFadeTextRef } from "./index";

type Story = StoryObj<typeof UpFadeText>;

const meta: Meta<typeof UpFadeText> = {
  title: "Animations and Loading/UpFadeText",
  component: UpFadeText,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          "Texto rotativo com animação de entrada/saída por **caractere/palavra/linha** (Framer Motion). " +
          "Permite **auto-rotação**, controle por **ref** (next/previous/jumpTo/reset), *stagger* configurável e diferentes estratégias de divisão (`splitBy`).",
      },
    },
  },
  args: {
    texts: [
      "Construa produtos de forma elegante.",
      "Animações suaves, UX feliz.",
      "Componentes reutilizáveis, sem dor.",
    ],
    splitBy: "characters",
    auto: true,
    loop: true,
    rotationInterval: 2000,
    staggerDuration: 0.02,
    staggerFrom: "first",
    mainClassName:
      "text-2xl md:text-4xl font-extrabold tracking-tight text-foreground",
    elementLevelClassName: "will-change-transform",
  },
  argTypes: {
    texts: {
      control: "object",
      description: "Lista de textos a serem exibidos em rotação.",
    },
    splitBy: {
      control: "select",
      options: ["characters", "words", "lines", " "],
      description:
        "Estratégia de divisão: por caracteres, palavras, linhas (\\n) ou um separador customizado.",
    },
    auto: {
      control: "boolean",
      description: "Ativa rotação automática pelo intervalo configurado.",
    },
    loop: {
      control: "boolean",
      description: "Reinicia no primeiro item ao chegar no fim.",
    },
    rotationInterval: {
      control: { type: "number", min: 500, step: 100 },
      description:
        "Intervalo (ms) entre trocas de texto quando `auto` for true.",
    },
    staggerDuration: {
      control: { type: "number", min: 0, step: 0.01 },
      description:
        "Atraso entre elementos (caracteres/palavras) para efeito de *stagger*.",
    },
    staggerFrom: {
      control: "select",
      options: ["first", "last", "center", "random", 0, 1, 2, 3],
      description:
        "Origem do *stagger*: início, fim, centro, aleatório ou índice numérico.",
    },
    animatePresenceMode: {
      control: "select",
      options: ["wait", "sync"],
      description: "Modo do `AnimatePresence`.",
    },
    animatePresenceInitial: {
      control: "boolean",
      description: "Se o `AnimatePresence` deve animar no primeiro render.",
    },
    mainClassName: {
      control: "text",
      description: "Classes do wrapper principal.",
    },
    splitLevelClassName: {
      control: "text",
      description: "Classes do nível de *split* (palavra/linha).",
    },
    elementLevelClassName: {
      control: "text",
      description: "Classes aplicadas em cada caractere/palavra.",
    },
  },
};

export default meta;

/* ===================== Histórias ===================== */

export const Padrao: Story = {};

export const PorPalavras: Story = {
  name: "Divisão por palavras",
  args: {
    splitBy: "words",
    texts: [
      "Desenvolva rápido. Entregue melhor.",
      "Qualidade de código importa.",
      "UX acima de tudo.",
    ],
    staggerDuration: 0.06,
    elementLevelClassName: "px-0.5",
  },
};

export const PorLinhas: Story = {
  name: "Divisão por linhas",
  args: {
    splitBy: "lines",
    texts: [
      "Código limpo\nDesign system\nDeploy feliz",
      "Componentes\nHooks\nTestes",
      "Ship it\nMeasure it\nImprove it",
    ],
    staggerDuration: 0.08,
    splitLevelClassName: "items-baseline gap-1",
    elementLevelClassName: "block",
    mainClassName:
      "text-xl md:text-3xl font-bold leading-tight text-foreground",
  },
};

export const CustomSeparator: Story = {
  name: "Separador customizado (vírgula)",
  args: {
    splitBy: ",",
    texts: ["Rápido,Seguro,Moderno", "Acessível,Responsivo,Intuitivo"],
    elementLevelClassName: "px-1",
    staggerFrom: "center",
    staggerDuration: 0.05,
  },
};

export const SemAutoRotacao: Story = {
  name: "Sem rotação automática",
  args: {
    auto: false,
    texts: ["Troque manualmente com os botões abaixo."],
  },
};

export const ComControlesManuais: Story = {
  name: "Controles manuais (ref: next/previous/jumpTo/reset)",
  render: (args) => {
    const ref = useRef<UpFadeTextRef>(null);

    return (
      <div className="flex flex-col items-center gap-6">
        <UpFadeText ref={ref} {...args} auto={false} />
        <div className="flex flex-wrap items-center gap-3">
          <button
            className="px-3 py-1.5 rounded-md bg-bg-card border border-border-card text-foreground hover:bg-foreground/5"
            onClick={() => ref.current?.previous()}
          >
            Previous
          </button>
          <button
            className="px-3 py-1.5 rounded-md bg-primary-600 text-white hover:bg-primary-700"
            onClick={() => ref.current?.next()}
          >
            Next
          </button>
          <button
            className="px-3 py-1.5 rounded-md bg-bg-card border border-border-card text-foreground hover:bg-foreground/5"
            onClick={() => ref.current?.jumpTo(0)}
          >
            Jump to 0
          </button>
          <button
            className="px-3 py-1.5 rounded-md bg-bg-card border border-border-card text-foreground hover:bg-foreground/5"
            onClick={() => ref.current?.reset()}
          >
            Reset
          </button>
        </div>
      </div>
    );
  },
  args: {
    texts: ["Primeiro", "Segundo", "Terceiro", "Quarto"],
    splitBy: "characters",
    elementLevelClassName: "px-[1px]",
  },
};

export const DarkModeDemo: Story = {
  name: "Dark mode (container escuro)",
  render: (args) => (
    <div className="w-full max-w-3xl rounded-2xl p-8 sm:p-10 bg-black/90">
      <UpFadeText {...args} />
    </div>
  ),
  args: {
    texts: ["Feito para dark mode.", "Tipografia robusta.", "Animação fluida."],
    mainClassName: "text-3xl md:text-5xl font-extrabold text-white",
    elementLevelClassName: "will-change-transform",
  },
  parameters: { backgrounds: { default: "dark" } },
};

export const StaggerAvancado: Story = {
  name: "Stagger avançado (from center)",
  args: {
    texts: ["Stagger vindo do centro.", "Experimente diferentes padrões."],
    splitBy: "characters",
    staggerFrom: "center",
    staggerDuration: 0.04,
    elementLevelClassName: "px-[1px]",
  },
};
