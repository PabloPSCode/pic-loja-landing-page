import type { Meta, StoryObj } from "@storybook/react-vite";
import StepProgress, { type StepProgressProps } from "./index";

type Story = StoryObj<typeof StepProgress>;

const DEFAULT_STEPS: StepProgressProps["steps"] = [
  "Aprovando pagamento",
  "Em trânsito",
  "Finalizado",
];

const meta: Meta<typeof StepProgress> = {
  title: "Miscellaneous/StepProgress",
  component: StepProgress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          `Indicador de progresso por etapas, com visual consistente ao design system (tokens, dark-mode), ` +
          `**responsivo** (horizontal/vertical) e acessível (\`<ol>\`, \`aria-current\`).\n\n` +
          `### Props\n` +
          `- **steps**: lista de rótulos (string ou { label })\n` +
          `- **currentStep**: índice do passo atual (**base 0**)\n` +
          `- **vertical?**: quando verdadeiro, exibe vertical\n` +
          `- **className?**: classes adicionais para o container`,
      },
    },
  },
  args: {
    steps: DEFAULT_STEPS,
    currentStep: 1,
    vertical: false,
  },
  argTypes: {
    steps: { control: "object" },
    currentStep: { control: { type: "number", min: 0, max: 10, step: 1 } },
    vertical: { control: "boolean" },
    className: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl bg-background text-foreground p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
};
export default meta;

/* --------------------------------- Stories --------------------------------- */

export const Default: Story = {
  args: { currentStep: 0 },
};

export const ManySteps: Story = {
  args: {
    steps: ["Pagamento", "Processando", "Em trânsito", "Entregue"],
    currentStep: 3,
  },
};

export const Vertical: Story = {
  args: { vertical: true, currentStep: 1 },
};
