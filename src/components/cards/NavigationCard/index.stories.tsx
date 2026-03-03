import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import NavigationCard from "./index";

const meta: Meta<typeof NavigationCard> = {
  title: "Cards/NavigationCard",
  component: NavigationCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Cartão de navegação com botões **Voltar** e **Continuar**. Suporta estados desabilitados, rótulos/ícones customizados e classes extras.",
      },
    },
  },
  argTypes: {
    onAdvance: { action: "onAdvance" },
    onBack: { action: "onBack" },
    advanceLabel: { control: "text" },
    backLabel: { control: "text" },
    advanceDisabled: { control: "boolean" },
    backDisabled: { control: "boolean" },
    className: { control: "text" },
    advanceButtonClassName: { control: "text" },
    backButtonClassName: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[40vh] bg-background p-6 text-foreground">
        <div className="mx-auto max-w-2xl">
          <Story />
        </div>
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof NavigationCard>;

export const Default: Story = {
  args: {
    onAdvance: () => {},
    onBack: () => {},
  },
};

export const WithCustomLabelsAndIcons: Story = {
  args: {
    onAdvance: () => {},
    onBack: () => {},
    backLabel: "Etapa anterior",
    advanceLabel: "Próxima etapa",
    backIcon: <ArrowLeftIcon className="mr-1 h-4 w-4" weight="bold" />,
    advanceIcon: <ArrowRightIcon className="mr-1 h-4 w-4" weight="bold" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo com rótulos e ícones personalizados usando **Phosphor Icons**.",
      },
    },
  },
};

export const DisabledStates: Story = {
  args: {
    onAdvance: () => {},
    onBack: () => {},
    advanceDisabled: true,
    backDisabled: true,
    advanceLabel: "Continuar",
    backLabel: "Voltar",
    advanceIcon: <CheckCircleIcon className="mr-1 h-4 w-4" weight="bold" />,
    backIcon: <XCircleIcon className="mr-1 h-4 w-4" weight="bold" />,
  },
};

export const WithCustomClasses: Story = {
  args: {
    onAdvance: () => {},
    onBack: () => {},
    advanceLabel: "Salvar e continuar",
    backLabel: "Cancelar",
    advanceButtonClassName:
      "bg-primary-600 hover:bg-primary-700 shadow-sm px-6",
    backButtonClassName:
      "border-foreground/40 text-foreground/80 hover:bg-foreground/5",
    className: "border-border-card",
  },
};

export const ControlledExample: Story = {
  render: (args) => {
    const Controlled = () => {
      const [step, setStep] = useState(1);
      const max = 3;

      return (
        <div className="space-y-4">
          <p className="text-sm">
            <span className="font-semibold">Etapa atual:</span> {step} / {max}
          </p>
          <NavigationCard
            {...args}
            onBack={() => setStep((s) => Math.max(1, s - 1))}
            onAdvance={() => setStep((s) => Math.min(max, s + 1))}
            backDisabled={step === 1}
            advanceDisabled={step === max}
            backIcon={<ArrowLeftIcon className="mr-1 h-4 w-4" weight="bold" />}
            advanceIcon={
              <ArrowRightIcon className="mr-1 h-4 w-4" weight="bold" />
            }
            backLabel="Voltar"
            advanceLabel={step === max ? "Finalizar" : "Continuar"}
          />
        </div>
      );
    };
    return <Controlled />;
  },
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "Demonstração controlada com avanço/retrocesso de etapas e desativação condicional dos botões.",
      },
    },
  },
};
