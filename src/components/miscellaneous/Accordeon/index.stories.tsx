import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordeon, type AccordeonProps } from ".";

const meta: Meta<AccordeonProps> = {
  title: "Miscellaneous/Accordeon",
  component: Accordeon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          `Componente de **FAQ (perguntas frequentes)** colapsável, no padrão **accordion**.\n\n` +
          `Permite expandir/recolher respostas de forma responsiva e com suporte a **dark mode**.\n\n` +
          `### Props principais\n` +
          `- **questions** *(QuestionItem[] obrigatório)* – array de perguntas e respostas no formato { id, question, answer }.\n` +
          `- **allowMultiple?** *(boolean)* – se permite abrir várias perguntas ao mesmo tempo (padrão: true).\n` +
          `- **defaultOpen?** *(Array<string | number>)* – IDs ou índices dos itens que iniciam abertos.\n` +
          `- **className?** *(string)* – classes adicionais para o container externo.\n` +
          `- **itemClassName?** *(string)* – classes adicionais para cada item.\n` +
          `- **showDividers?** *(boolean)* – exibe linha divisória entre os itens (padrão: true).\n` +
          `- **maxWidthClassName?** *(string)* – largura máxima opcional (ex.: "max-w-3xl").\n`,
      },
    },
  },
  argTypes: {
    questions: {
      control: false,
      description: "Array de perguntas e respostas exibidas no FAQ.",
    },
    allowMultiple: {
      control: "boolean",
      description: "Se `true`, múltiplas perguntas podem estar abertas ao mesmo tempo.",
      table: { defaultValue: { summary: "true" } },
    },
    defaultOpen: {
      control: false,
      description: "IDs ou índices que começam abertos.",
    },
    className: {
      control: false,
      description: "Classes adicionais para o container externo.",
    },
    itemClassName: {
      control: false,
      description: "Classes adicionais aplicadas a cada item de pergunta.",
    },
    showDividers: {
      control: "boolean",
      description: "Se `true`, exibe linhas divisórias entre as perguntas.",
      table: { defaultValue: { summary: "true" } },
    },
    maxWidthClassName: {
      control: "text",
      description: "Define a largura máxima do card (padrão: `max-w-3xl`).",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleQuestions = [
  {
    id: "q1",
    question: "O que é o Accordeon?",
    answer:
      "É um componente colapsável para exibir perguntas frequentes em formato de accordion, responsivo e com suporte a dark mode.",
  },
  {
    id: "q2",
    question: "Posso abrir várias perguntas ao mesmo tempo?",
    answer:
      "Sim! Por padrão, é possível abrir quantas perguntas quiser. Você também pode configurar para permitir apenas uma aberta.",
  },
  {
    id: "q3",
    question: "O componente é acessível?",
    answer:
      "Sim, o componente utiliza atributos ARIA para acessibilidade, garantindo melhor navegação com leitores de tela.",
  },
];

/** ========== Exemplo padrão (múltiplos itens podem ser abertos) ========== */
export const Default: Story = {
  args: {
    questions: sampleQuestions,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo padrão do FAQ, permitindo múltiplos itens abertos ao mesmo tempo, com divisórias e largura máxima de `max-w-3xl`.",
      },
    },
  },
};

/** ========== Apenas um item aberto de cada vez ========== */
export const SingleOpen: Story = {
  args: {
    questions: sampleQuestions,
    allowMultiple: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Com `allowMultiple = false`, somente uma pergunta pode estar aberta por vez (comportamento de *accordion* clássico).",
      },
    },
  },
};

/** ========== Sem divisórias entre os itens ========== */
export const WithoutDividers: Story = {
  args: {
    questions: sampleQuestions,
    showDividers: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Versão sem linhas divisórias (`showDividers = false`) para um layout mais limpo.",
      },
    },
  },
};

/** ========== Largura customizada (max-w-xl) ========== */
export const CustomWidth: Story = {
  args: {
    questions: sampleQuestions,
    maxWidthClassName: "max-w-xl",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Alterando a largura máxima (`maxWidthClassName = 'max-w-xl'`) para layouts mais estreitos.",
      },
    },
  },
};
