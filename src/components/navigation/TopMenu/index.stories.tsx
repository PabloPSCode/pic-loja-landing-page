// index.stories.tsx
import { topMenuItems } from "@/mocks/index";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TopMenu } from "./index";

type Story = StoryObj<typeof TopMenu>;

const meta: Meta<typeof TopMenu> = {
  title: "Navigation/TopMenu",
  component: TopMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          `Menu superior com **submenu por item** (abre ao passar o mouse / focus dentro do item).\n\n` +
          `### Padrões e UX\n` +
          `- Visual e tokens consistentes com os demais componentes (dark-mode incluso)\n` +
          `- Submenu **fica aberto** enquanto o cursor se move para ele (ponte de hover)\n` +
          `- Este componente está visível a partir de **md** (classe \`hidden md:flex\`)\n\n` +
          `### Props\n` +
          `- **menuItems**: itens de primeiro nível, cada um com \`label\`, \`icon\`, \`href\` e \`subItems\`\n` +
          `- **className**: classes para o \`<nav>\`\n` +
          `- **itemClassName**: classes para cada \`<li>\` de primeiro nível\n` +
          `- **subItemClassName**: classes para os itens do submenu`,
      },
    },
  },
  args: {
    menuItems: topMenuItems.slice(0, 4),
  },
  argTypes: {
    menuItems: { control: "object" },
    className: { control: "text" },
    itemClassName: { control: "text" },
    subItemClassName: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[60vh] w-full bg-background text-foreground p-4">
        <Story />
        <div className="max-w-7xl mx-auto mt-8 text-sm text-foreground/70">
          Passe o mouse sobre os itens para abrir os submenus.
        </div>
      </div>
    ),
  ],
};
export default meta;

/* --------------------------------- Stories --------------------------------- */

export const Default: Story = {};




