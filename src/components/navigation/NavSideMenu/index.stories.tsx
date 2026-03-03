import {
  ChatCircleIcon,
  HouseIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { NavSideMenu, type NavSideMenuProps } from ".";

const sampleMenu: NavSideMenuProps["menuItems"] = [
  {
    label: "Início",
    href: "/",
    icon: <HouseIcon size={18} weight="regular" />,
  },
  {
    label: "Projetos",
    icon: <SquaresFourIcon size={18} weight="regular" />,
    subItems: [
      { label: "Dashboard", href: "/projetos/dashboard" },
      { label: "Relatórios", href: "/projetos/relatorios" },
      { label: "Times", href: "/projetos/times" },
      { label: "Configurações", href: "/projetos/configuracoes" },
    ],
  },
  {
    label: "Mensagens",
    href: "/mensagens",
    icon: <ChatCircleIcon size={18} weight="regular" />,
  },
];

const meta: Meta<NavSideMenuProps> = {
  title: "Navigation/NavSideMenu",
  component: NavSideMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Menu lateral responsivo com **modo acordeão**, tema dark e comportamento **sticky** abaixo do header. " +
          "Ele **colapsa automaticamente** em telas menores (controlado por `collapseAt`) e mostra rótulos por tooltip quando colapsado.",
      },
    },
  },
  argTypes: {
    menuItems: { control: false },
    className: { control: "text" },
    activePath: {
      control: "text",
      description: "Rota atual para destacar o item/subitem correspondente.",
    },
    collapsedWidth: {
      control: { type: "number", min: 56, max: 160, step: 4 },
      defaultValue: 80,
    },
    expandedWidth: {
      control: { type: "number", min: 200, max: 400, step: 10 },
      defaultValue: 320,
    },
    headerHeight: {
      control: { type: "number", min: 0, max: 120, step: 4 },
      defaultValue: 64,
    },
    stickyUnderHeader: { control: "boolean", defaultValue: true },
    collapseAt: {
      control: { type: "number", min: 300, max: 1600, step: 10 },
      description:
        "Breakpoint (px) abaixo do qual o menu colapsa automaticamente.",
      defaultValue: 1024,
    },
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-background text-foreground">
    {/* header fake para ver o sticky funcionar */}
    <header className="h-16 px-4 flex items-center border-b border-foreground/10">
      <div className="font-medium">Header (64px)</div>
    </header>

    <div className="flex min-h-[calc(100vh-64px)]">{children}</div>
  </div>
);

/** ========== Padrão (expandido) ========== */
export const Default: Story = {
  args: {
    menuItems: sampleMenu,
    activePath: "/projetos/relatorios",
    expandedWidth: 300,
    collapsedWidth: 80,
    headerHeight: 64,
    stickyUnderHeader: true,
    collapseAt: 768, // normalmente ficará expandido em viewport >= 768px
  },
  render: (args) => (
    <Shell>
      <NavSideMenu {...args} />
      <main className="flex-1 p-6">
        <h2 className="text-lg font-semibold mb-2">Conteúdo</h2>
        <p className="text-sm text-foreground/70">
          Abra/feche as seções para ver o acordeão. O menu rola internamente,
          enquanto a página permanece fixa.
        </p>
      </main>
    </Shell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo básico com acordeão e item ativo. O menu fica **sticky** sob o header e rola dentro do próprio container.",
      },
    },
  },
};

/** ========== Com conteúdo extra no topo (ex.: busca) ========== */
export const WithSearch: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => (
    <Shell>
      <NavSideMenu
        {...args}
        children={
          <div className="mb-2">
            <input
              type="search"
              placeholder="Buscar…"
              className="w-full h-9 rounded-md px-3 text-sm bg-background border border-foreground/15"
            />
          </div>
        }
      />
      <main className="flex-1 p-6">
        <h2 className="text-lg font-semibold mb-2">Com Busca</h2>
        <p className="text-sm text-foreground/70">
          O `children` é renderizado no topo do menu quando expandido.
        </p>
      </main>
    </Shell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstra como injetar componentes no topo do menu (ex.: campo de busca) via prop `children`.",
      },
    },
  },
};

/** ========== Colapsado (forçado) ========== */
export const Collapsed: Story = {
  args: {
    ...Default.args,
    // Força estado colapsado em qualquer largura: qualquer viewport será <= 99999
    collapseAt: 99999,
  },
  render: (args) => (
    <Shell>
      <NavSideMenu {...args} />
      <main className="flex-1 p-6">
        <h2 className="text-lg font-semibold mb-2">Colapsado</h2>
        <p className="text-sm text-foreground/70">
          Passe o mouse sobre os ícones para ver os **tooltips**. Labels ficam
          ocultas para economizar espaço.
        </p>
      </main>
    </Shell>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo **colapsado**. Para forçar o estado em Storybook, elevamos `collapseAt` para um valor alto.",
      },
    },
  },
};
