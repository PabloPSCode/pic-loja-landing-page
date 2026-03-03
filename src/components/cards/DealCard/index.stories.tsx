// index.stories.tsx
import { CpuIcon, RocketLaunchIcon, StarIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import DealCard, { type DealCardProps } from "./index";

type Story = StoryObj<typeof DealCard>;

const meta: Meta<typeof DealCard> = {
  title: "Cards/DealCard",
  component: DealCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
        description: {
        component:
          `Cartão de oferta de planos/serviços com título, subtítulo, preço atual e antigo, lista de recursos e botão de ação.\n\n` +
          `### Props principais\n` +
          `- **title**: título do plano/serviço\n` +
          `- **subtitle?**: subtítulo do plano/serviço\n` +
          `- **currentPrice**: preço atual (ex: "R$ 49,90/mês")\n` +
          `- **oldPrice?**: preço antigo (ex: "R$ 69,90")\n` +
          `- **resources**: lista de recursos (strings ou objetos com ícone e label)\n` +
          `- **buttonTitle?**: texto do botão de ação (padrão: "Ver detalhes")\n` +
          `- **onSeeDetails**: callback ao clicar no botão\n` +
          `- **isBestOption?**: destaca o cartão como a melhor opção\n` +
          `- **discountPercentage?**: percentual de desconto (ex: 20 para "20% OFF")`,
      },
    }
  },
  args: {
    title: "Plano Starter",
    subtitle: "Para começar sem complicações",
    currentPrice: "R$ 49,90/mês",
    oldPrice: "R$ 69,90",
    resources: ["Suporte por e-mail", "Relatórios básicos", "1 projeto ativo"],
    buttonTitle: "Escolher plano",
    onSeeDetails: () => alert("Detalhes do plano"),
  },
  argTypes: {
    title: { control: "text" },
    subtitle: { control: "text" },
    currentPrice: { control: "text" },
    oldPrice: { control: "text" },
    discountPercentage: { control: { type: "number", min: 0, max: 100 } },
    isBestOption: { control: "boolean" },
    buttonTitle: { control: "text" },
    className: { control: "text" },
    titleClassName: { control: "text" },
    subtitleClassName: { control: "text" },
    buttonClassName: { control: "text" },
    currentPriceClassName: { control: "text" },
    oldPriceClassName: { control: "text" },
    resourcesClassName: { control: "text" },
  },
};
export default meta;

/* -------------------- Stories -------------------- */

export const Default: Story = {
  args: {
    title: "Plano Pro",
    subtitle: "Mais performance e recursos",
    currentPrice: "R$ 99,90/mês",
    oldPrice: "R$ 149,90",
    discountPercentage: 33,
    resources: [
      "Suporte prioritário",
      "Relatórios avançados",
      "Até 10 projetos",
    ],
  },
};

export const BestOption: Story = {
  args: {
    title: "Plano Business",
    subtitle: "O melhor custo-benefício",
    currentPrice: "R$ 199,90/mês",
    oldPrice: "R$ 249,90",
    discountPercentage: 20,
    isBestOption: true,
    resources: [
      { icon: <StarIcon size={16} />, label: "Atendimento dedicado" },
      { icon: <RocketLaunchIcon size={16} />, label: "Builds aceleradas" },
      { icon: <CpuIcon size={16} />, label: "Infra premium" },
    ],
  },
};

export const GridShowcase: Story = {
  render: () => (
    <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <DealCard {...(Default.args as DealCardProps)} />
      <DealCard {...(BestOption.args as DealCardProps)} />
    </div>
  ),
  parameters: { layout: "centered" },
  args: {},
};
