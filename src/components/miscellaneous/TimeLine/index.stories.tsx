import { PlayCircleIcon, StopIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Timeline, { type TimelineProps } from "./index";

type Story = StoryObj<typeof Timeline>;

const meta: Meta<typeof Timeline> = {
  title: "Miscellaneous/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          `Linha do tempo vertical alternando lados (em telas md+), com **espinha central** e ` +
          `pílulas de data. Suporta **dark-mode**, é responsiva e permite inverter a ordem dos eventos.\n\n` +
          `### Props principais\n` +
          `- **events**: lista de eventos { title, description, date, icon? }\n` +
          `- **reverseOrder?**: inverte a renderização (mais recente no topo)\n` +
          `- **firstIcon? / lastIcon?**: ícones opcionais nos pontos inicial e final\n` +
          `- **className?**: classes adicionais para o container externo`,
      },
    },
  },
  args: {
    events: [
      {
        title: "Evento 1",
        description: "Descrição do evento 1",
        date: "2023-01-01",
      },
      {
        title: "Evento 2",
        description: "Descrição do evento 2",
        date: "2023-02-01",
      },
      {
        title: "Evento 3",
        description: "Descrição do evento 3",
        date: "2023-03-01",
      },
      {
        title: "Evento 4",
        description: "Descrição do evento 4",
        date: "2023-04-01",
      },
    ],
    reverseOrder: false,
    className: "",
  } as TimelineProps,
  argTypes: {
    events: { control: "object" },
    reverseOrder: { control: "boolean" },
    className: { control: "text" },
    firstIcon: { table: { disable: true } },
    lastIcon: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[80vh] bg-foreground/5 dark:bg-foreground/5 p-4">
        <Story />
      </div>
    ),
  ],
};
export default meta;

/* -------------------- Stories -------------------- */

export const Default: Story = {};

export const ReverseOrder: Story = {
  args: {
    reverseOrder: true,
  },
};

export const WithCustomIcons: Story = {
  args: {
    firstIcon: (
      <PlayCircleIcon
        weight="bold"
        className="w-4 h-4 sm:w-6 sm:h-6 text-white"
      />
    ),
    lastIcon: (
      <StopIcon weight="bold" className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
    ),
  },
};
