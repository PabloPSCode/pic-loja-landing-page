import { RocketLaunchIcon, StarIcon, WrenchIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import ItemListCard, { type ItemListCardProps } from "./index";

type Story = StoryObj<typeof ItemListCard>;

const meta: Meta<typeof ItemListCard> = {
  title: "Cards/ItemListCard",
  component: ItemListCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          `Cartão simples para listas (features, benefícios, tópicos) com ícone, título e descrição.\n\n` +
          `### Uso no mercado brasileiro\n` +
          `Ideal para destacar benefícios de planos, módulos de sistemas (ERP, CRM), diferenciais de serviços e tópicos de landing pages.\n\n` +
          `### Props principais\n` +
          `- **icon**: nó React do ícone (ex.: <RocketLaunchIcon />)\n` +
          `- **title**: título do item\n` +
          `- **description?**: texto auxiliar\n` +
          `- **containerClassName?**: classes extras para o container\n` +
          `- **titleClassName?** e **descriptionClassName?**: customização fina de tipografia`,
      },
    },
  },
  args: {
    icon: <RocketLaunchIcon size={24} className="text-primary-600 dark:text-primary-400" />,
    title: "Lance rápido com IA",
    description: "Acelere do briefing ao deploy com automações e componentes prontos.",
  },
  argTypes: {
    icon: { control: false, description: "ReactNode (ícone renderizável)" },
    title: { control: "text" },
    description: { control: "text" },
    containerClassName: { control: "text" },
    titleClassName: { control: "text" },
    descriptionClassName: { control: "text" },
  },
};
export default meta;

/* -------------------- Stories -------------------- */

export const Default: Story = {};

export const WithLongDescription: Story = {
  args: {
    icon: <StarIcon size={24} className="text-yellow-500" />,
    title: "Atendimento 5★",
    description:
      "Suporte prioritário em português, SLA claro e Canais oficiais (e-mail e WhatsApp comercial).",
  },
};

export const CustomClasses: Story = {
  args: {
    icon: <WrenchIcon size={24} className="text-emerald-600 dark:text-emerald-400" />,
    title: "Integração sob medida",
    description: "SDKs para Node.js/React e webhooks para ERPs brasileiros.",
    containerClassName: "bg-white dark:bg-zinc-900 border-dashed",
    titleClassName: "text-lg",
    descriptionClassName: "text-sm text-foreground/80",
  },
};

export const GridShowcase: Story = {
  render: () => (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ItemListCard {...(Default.args as ItemListCardProps)} />
      <ItemListCard {...(WithLongDescription.args as ItemListCardProps)} />
      <ItemListCard {...(CustomClasses.args as ItemListCardProps)} />
    </div>
  ),
  parameters: { layout: "centered" },
  args: {},
};
