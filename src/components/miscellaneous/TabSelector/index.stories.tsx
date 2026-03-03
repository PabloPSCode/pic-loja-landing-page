// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import TabSelector from "./index";

type Story = StoryObj<typeof TabSelector>;

const TABS_DEFAULT = ["Descrição", "Especificações", "Avaliações", "Perguntas"];

const meta: Meta<typeof TabSelector> = {
  title: "Navigation/TabSelector",
  component: TabSelector,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          `Seletor de abas **responsivo** com padrões do design system (dark-mode, bordas, tokens).\n\n` +
          `### Recursos\n` +
          `- Acessível: \`role="tablist"\`, \`role="tab"\`, \`role="tabpanel"\` e navegação por setas\n` +
          `- Responsivo: barra de abas com \`overflow-x-auto\` em telas pequenas\n` +
          `- Customização: \`className\` (container) e \`tabClassName\` (cada aba)\n` +
          `- Callback \`onTabChange\` para integrar com estado externo`,
      },
    },
  },
  args: {
    tabs: TABS_DEFAULT,
    selectedTab: TABS_DEFAULT[0],
    activeTabContent: (tab) => (
      <div className="text-sm sm:text-base">Conteúdo de “{tab}”.</div>
    ),
  },
  argTypes: {
    tabs: { control: "object" },
    selectedTab: { control: "text" },
    className: { control: "text" },
    tabClassName: { control: "text" },
    onTabChange: { action: "tab changed" },
    activeTabContent: { control: false }, // conteúdo é definido no render
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl bg-background text-foreground p-6 rounded-lg">
        <Story />
      </div>
    ),
  ],
};
export default meta;

/* --------------------------------- Stories --------------------------------- */

export const Default: Story = {
  args: {
    tabClassName: "uppercase tracking-wide",
    className: "border-primary-600/20",
  },
  render: (args) => (
    <TabSelector
      {...args}
      activeTabContent={(tab) => (
        <div className="text-sm sm:text-base">Conteúdo de “{tab}”.</div>
      )}
    />
  ),
};
