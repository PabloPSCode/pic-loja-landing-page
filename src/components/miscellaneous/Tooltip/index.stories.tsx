// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import Tooltip from "./index";

type Story = StoryObj<typeof Tooltip>;

const meta: Meta<typeof Tooltip> = {
  title: "Miscellaneous/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          `Tooltip baseado na biblioteca **react-tooltip**.\n\n` +
          `**Como funciona:** o componente lê elementos âncora que possuam ` +
          `\`data-tooltip-id="SEU_ID"\` e \`data-tooltip-content="Texto"\`. ` +
          `O balão é posicionado com \`positionStrategy="fixed"\` para evitar deslocamentos ` +
          `em layouts com \`transform\`.\n\n` +
          `### Props\n` +
          `- **id**: identificador que deve bater com \`data-tooltip-id\` do elemento âncora\n` +
          `- **place**: "top" | "bottom" | "left" | "right"\n` +
          `- **className?**: classes extras para estilização`,
      },
    },
  },
  args: {
    id: "sb-tooltip",
    place: "top",
  },
  argTypes: {
    id: { control: "text" },
    place: {
      control: "radio",
      options: ["top", "bottom", "left", "right"],
    },
    className: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl bg-background text-foreground p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;

/* --------------------------------- Stories --------------------------------- */

export const Default: Story = {
  render: (args) => (
    <>
      <button
        type="button"
        className="rounded-md border border-border-card bg-bg-card px-3 py-2 hover:bg-foreground/5"
        data-tooltip-id={args.id}
        data-tooltip-content="Olá! Eu sou um tooltip 😄"
      >
        Passe o mouse aqui
      </button>

      {/* O componente que controla o balão */}
      <Tooltip {...args} />
    </>
  ),
};

export const PositionsGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <button
        data-tooltip-id="tip-top"
        data-tooltip-content="Posição: top"
        className="rounded-md border border-border-card bg-bg-card px-3 py-2 hover:bg-foreground/5"
      >
        Top
      </button>
      <button
        data-tooltip-id="tip-bottom"
        data-tooltip-content="Posição: bottom"
        className="rounded-md border border-border-card bg-bg-card px-3 py-2 hover:bg-foreground/5"
      >
        Bottom
      </button>
      <button
        data-tooltip-id="tip-left"
        data-tooltip-content="Posição: left"
        className="rounded-md border border-border-card bg-bg-card px-3 py-2 hover:bg-foreground/5"
      >
        Left
      </button>
      <button
        data-tooltip-id="tip-right"
        data-tooltip-content="Posição: right"
        className="rounded-md border border-border-card bg-bg-card px-3 py-2 hover:bg-foreground/5"
      >
        Right
      </button>

      {/* Instâncias com IDs/places distintos */}
      <Tooltip id="tip-top" place="top" />
      <Tooltip id="tip-bottom" place="bottom" />
      <Tooltip id="tip-left" place="left" />
      <Tooltip id="tip-right" place="right" />
    </div>
  ),
  parameters: { layout: "centered" },
};

export const CustomStyle: Story = {
  render: () => (
    <>
      <span
        data-tooltip-id="tip-custom"
        data-tooltip-content="Balão customizado com borda destacada"
        className="underline decoration-dotted underline-offset-4 cursor-help"
      >
        Passe o mouse (custom)
      </span>
      <Tooltip
        id="tip-custom"
        className="!bg-tertiary-600 !text-white !border-tertiary-400/60"
      />
    </>
  ),
};

export const LongContent: Story = {
  render: () => (
    <>
      <button
        data-tooltip-id="tip-long"
        data-tooltip-content="Texto mais longo para demonstrar quebra automática e legibilidade do balão."
        className="rounded-md border border-border-card bg-bg-card px-3 py-2 hover:bg-foreground/5"
      >
        Conteúdo longo
      </button>
      <Tooltip
        id="tip-long"
        className="!max-w-[260px] !text-center"
        place="bottom"
      />
    </>
  ),
};
