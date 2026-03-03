import type { Meta, StoryObj } from "@storybook/react-vite";
import SystemHeader from ".";

const meta: Meta<typeof SystemHeader.Root> = {
  title: "Elements/SystemHeader",
  component: SystemHeader.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Header para **sistemas internos** (ERP, LMS, dashboards). " +
          "Inclui containers `LeftContainer`, `RightContainer` e pode receber mais informações via children para flexibilidade. " +
          "Suporta logo, busca, notificações, ajuda, troca de tema e menu de usuário.",
      },
    },
  },
  args: {
    size: "md",
    bordered: true,
    sticky: false,
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    bordered: { control: "boolean" },
    sticky: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Caso padrão: logo + informações da empresa + ações do usuário */
export const Default: Story = {
  render: (args) => (
    <SystemHeader.Root {...args}>
      <SystemHeader.LeftContainer>
        <SystemHeader.Logo
          src="https://dummyimage.com/80x40/ddd/333&text=LOGO"
          alt="logo"
        />
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-sm sm:text-base">
            ID – Nome da Empresa
          </span>
          <span className="text-xs text-foreground/60">
            Texto alteranativo via children
          </span>
        </div>
      </SystemHeader.LeftContainer>

      <SystemHeader.RightContainer>
        <SystemHeader.Help onHelp={() => alert("Ajuda")} />
        <SystemHeader.Notifications
          count={3}
          onSeeNotifications={() => alert("Ver notificações")}
        />
        <SystemHeader.ThemeSwitcher onToggleTheme={() => alert("Tema alterado")} />
        <SystemHeader.UserMenu
          name="Pablo Silva"
          email="pablo@empresa.com.br"
          onSignOut={() => alert("Sair")}
        />
      </SystemHeader.RightContainer>
    </SystemHeader.Root>
  ),
};

/** Exemplo com busca ao lado do logo */
export const WithSearch: Story = {
  render: (args) => (
    <SystemHeader.Root {...args}>
      <SystemHeader.LeftContainer>
        <SystemHeader.Logo
          src="https://dummyimage.com/80x40/ddd/333&text=GX"
          alt="logo"
        />
        <SystemHeader.Search search="" setSearch={() => {}} />
      </SystemHeader.LeftContainer>

      <SystemHeader.RightContainer>
        <SystemHeader.Notifications count={5} />
        <SystemHeader.UserMenu name="Usuário" email="usuario@empresa.com" />
      </SystemHeader.RightContainer>
    </SystemHeader.Root>
  ),
};

/** Menu de usuário minimalista (sem email, só avatar/nome) */
export const MinimalUserMenu: Story = {
  render: (args) => (
    <SystemHeader.Root {...args}>
      <SystemHeader.LeftContainer>
        <SystemHeader.Logo
          src="https://dummyimage.com/80x40/ddd/333&text=ERP"
          alt="logo"
        />
      </SystemHeader.LeftContainer>

      <SystemHeader.RightContainer>
        <SystemHeader.Help />
        <SystemHeader.UserMenu name="João" onSignOut={() => alert("Logout")} />
      </SystemHeader.RightContainer>
    </SystemHeader.Root>
  ),
};

/** Exemplo Mobile-first: tamanho pequeno, apenas logo e ações rápidas */
export const MobileFriendly: Story = {
  args: { size: "sm" },
  render: (args) => (
    <SystemHeader.Root {...args}>
      <SystemHeader.LeftContainer>
        <div className="h-6 w-6 rounded bg-primary/80" />
        <span className="font-semibold text-sm">Empresa X</span>
      </SystemHeader.LeftContainer>

      <SystemHeader.RightContainer>
        <SystemHeader.Notifications count={2} />
        <SystemHeader.ThemeSwitcher />
      </SystemHeader.RightContainer>
    </SystemHeader.Root>
  ),
};

/** Header sem logo, usado em contexto reduzido */
export const WithoutLogo: Story = {
  render: (args) => (
    <SystemHeader.Root {...args}>
      <SystemHeader.LeftContainer>
        <span className="font-semibold">Módulo Fiscal</span>
      </SystemHeader.LeftContainer>

      <SystemHeader.RightContainer>
        <SystemHeader.Notifications />
        <SystemHeader.UserMenu name="Operador" />
      </SystemHeader.RightContainer>
    </SystemHeader.Root>
  ),
};
