import type { Meta, StoryObj } from "@storybook/react-vite";
import { Section } from ".";

const meta: Meta<typeof Section> = {
  title: "Elements/Section",
  component: Section,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          `Componente de **Seção** responsiva, usado para estruturar áreas de páginas com título, subtítulo, imagem de fundo e conteúdo arbitrário.\n\n` +
          `### Props\n` +
          `- **size** *(obrigatório)*: \`"full" | "middle"\` – define a largura da seção (\`full\` ocupa 100% e \`middle\` centraliza em largura máxima).\n` +
          `- **title?** *(string)* – título exibido no topo da seção.\n` +
          `- **subtitle?** *(string)* – subtítulo abaixo do título.\n` +
          `- **backgroundImageLocalPath?** *(string)* – caminho local para imagem de fundo.\n` +
          `- **sectionClassName?** *(string)* – classes extras para o contêiner externo.\n` +
          `- **titleClassName?** *(string)* – classes extras para o título.\n` +
          `- **subtitleClassName?** *(string)* – classes extras para o subtítulo.\n` +
          `- **children?** *(ReactNode)* – qualquer conteúdo interno adicional.\n\n` +
          `Ideal para compor **landing pages, dashboards e seções de destaque**, suportando dark mode (usa tokens de cor).`,
      },
    },
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["full", "middle"],
      description: "Define a largura da seção.",
    },
    title: { control: "text", description: "Título da seção." },
    subtitle: { control: "text", description: "Subtítulo da seção." },
    backgroundImageLocalPath: {
      control: "text",
      description: "Caminho ou URL da imagem de fundo.",
    },
    sectionClassName: {
      control: false,
      description: "Classes CSS adicionais aplicadas ao `<section>`.",
    },
    titleClassName: {
      control: false,
      description: "Classes CSS adicionais aplicadas ao título.",
    },
    subtitleClassName: {
      control: false,
      description: "Classes CSS adicionais aplicadas ao subtítulo.",
    },
    children: {
      control: false,
      description: "Conteúdo arbitrário exibido dentro da seção.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

/** ========== Seção padrão centralizada ========== */
export const Default: Story = {
  args: {
    size: "middle",
    title: "Seção de Exemplo",
    subtitle: "Um subtítulo para complementar o título principal.",
    children: (
      <p className="mt-6 text-center text-foreground/70">
        Aqui você pode adicionar qualquer conteúdo, como textos, botões ou
        componentes customizados.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo padrão com `title`, `subtitle` e conteúdo arbitrário centralizado.",
      },
    },
  },
};

/** ========== Seção com largura total ========== */
export const FullWidth: Story = {
  args: {
    size: "full",
    title: "Seção em Largura Total",
    subtitle: "Ideal para blocos de destaque ou heros em landing pages.",
    children: (
      <div className="mt-6 w-full flex justify-center">
        <button className="mt-4 px-6 py-2 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition">
          Call to Action
        </button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "O modo `full` expande a seção para 100% da largura da tela, útil para blocos de destaque.",
      },
    },
  },
};

/** ========== Seção com imagem de fundo ========== */
export const WithBackgroundImage: Story = {
  args: {
    size: "middle",
    title: "Seção com Imagem de Fundo",
    subtitle: "Perfeita para destacar áreas importantes.",
    backgroundImageLocalPath: "https://picsum.photos/1200/400",
    sectionClassName: "text-white",
    titleClassName: "text-3xl font-bold drop-shadow-md",
    subtitleClassName: "text-lg drop-shadow-sm text-white",

  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstra o uso de `backgroundImageLocalPath` para aplicar uma imagem de fundo customizada.",
      },
    },
  },
};
