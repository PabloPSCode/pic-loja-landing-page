// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import SplitText from "./index";

type Story = StoryObj<typeof SplitText>;

const meta: Meta<typeof SplitText> = {
  title: "Animations and Loading/SplittedText",
  component: SplitText,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          "Animação de texto com **GSAP + ScrollTrigger + SplitText**. Suporta divisão por **caracteres**, **palavras**, **linhas** ou **words, chars**, com controle de `delay`, `duration`, `ease`, `threshold` e `rootMargin`.",
      },
    },
  },
  args: {
    text: "Construa experiências incríveis com animações performáticas.",
    className:
      "text-3xl md:text-5xl font-extrabold tracking-tight text-foreground",
    splitType: "chars",
    delay: 40,
    duration: 0.6,
    ease: "power3.out",
    threshold: 0.15,
    rootMargin: "-80px",
    tag: "h2",
    textAlign: "center",
  },
  argTypes: {
    text: { control: "text", description: "Texto a ser animado." },
    className: {
      control: "text",
      description: "Classes utilitárias do wrapper.",
    },
    splitType: {
      control: "select",
      options: ["chars", "words", "lines", "words, chars"],
      description: "Estratégia de divisão do SplitText.",
    },
    delay: {
      control: { type: "number", min: 0, step: 10 },
      description: "Atraso (ms) entre elementos (stagger).",
    },
    duration: {
      control: { type: "number", min: 0.1, step: 0.1 },
      description: "Duração (s) da animação de cada elemento.",
    },
    ease: {
      control: "text",
      description: "Easing da animação (ex.: 'power3.out').",
    },
    threshold: {
      control: { type: "number", min: 0, max: 1, step: 0.05 },
      description: "Percentual do elemento visível para disparar a animação.",
    },
    rootMargin: {
      control: "text",
      description:
        "Margem do gatilho (ex.: '-100px', '0px'), ajusta início da animação no scroll.",
    },
    tag: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span"],
      description: "Tag usada no render.",
    },
    textAlign: {
      control: "select",
      options: ["left", "center", "right", "justify"],
      description: "Alinhamento do texto.",
    },
    from: { control: "object", description: "Tween inicial (GSAP vars)." },
    to: { control: "object", description: "Tween final (GSAP vars)." },
    onLetterAnimationComplete: {
      action: "completed",
      description: "Callback após concluir a animação das letras.",
    },
  },
};

export default meta;

/* ========== Histórias ========== */

export const Default: Story = {};

export const Words: Story = {
  args: {
    splitType: "words",
    text: "Texto dividido por palavras: acessível, performático e elegante.",
  },
};

export const Lines: Story = {
  args: {
    splitType: "lines",
    tag: "h3",
    className:
      "text-2xl md:text-4xl font-bold tracking-tight text-foreground leading-tight",
    text: "Animação por linhas.\nIdeal para títulos longos.\nCompatível com quebra manual.",
    delay: 80,
  },
};

export const WordsAndChars: Story = {
  args: {
    splitType: "words, chars",
    text: "Camada dupla: palavras e caracteres para efeitos mais ricos.",
    delay: 30,
    duration: 0.5,
  },
};

export const CustomFromTo: Story = {
  name: "Tweens personalizados (from/to)",
  args: {
    from: { opacity: 0, y: 24, rotateX: -30 },
    to: { opacity: 1, y: 0, rotateX: 0 },
    ease: "power2.out",
    delay: 60,
    text: "Entre em cena com suavidade e profundidade.",
  },
};

export const ScrollPlayground: Story = {
  name: "Playground com scroll (fullscreen)",
  render: (args) => (
    <div className="w-full min-h-[200vh] bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-24 space-y-32">
        <p className="text-center text-foreground/70">
          Role a página para ver as animações dispararem pelo ScrollTrigger.
        </p>

        <SplitText
          {...args}
          tag="h2"
          text="Primeiro bloco animado com SplitText — chars"
          splitType="chars"
        />

        <div className="h-[40vh] grid place-items-center">
          <SplitText
            {...args}
            tag="h2"
            text="Segundo bloco animado — words"
            splitType="words"
            className="text-3xl md:text-5xl font-extrabold"
          />
        </div>

        <SplitText
          {...args}
          tag="h2"
          text={
            "Terceiro bloco — lines\nCom quebra manual e easing customizado"
          }
          splitType="lines"
          ease="power4.out"
          delay={70}
          className="text-2xl md:text-4xl font-bold leading-tight"
        />
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
  args: {
    delay: 50,
    duration: 0.6,
    ease: "power3.out",
    rootMargin: "-120px",
    threshold: 0.2,
  },
};

export const DarkModeDemo: Story = {
  render: (args) => (
    <div className="w-full max-w-3xl mx-auto rounded-2xl p-10 bg-black/90">
      <SplitText {...args} />
    </div>
  ),
  args: {
    text: "Perfeito para dark mode também.",
    splitType: "chars",
    className: "text-white text-3xl md:text-5xl font-extrabold",
  },
  parameters: { backgrounds: { default: "dark" } },
};
