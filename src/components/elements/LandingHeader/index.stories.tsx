import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import LandingHeader from ".";

const meta: Meta<typeof LandingHeader.Root> = {
  title: "Elements/LandingHeader",
  component: LandingHeader.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Header simples para **landing pages** com trilhos `Left` (logo), `Center` (links) e `Right` (CTA). " +
          "Possui **menu mobile** (toggle + painel), é **responsivo** e suporta **dark mode** via classes `bg-background`/`text-foreground`.",
      },
    },
  },
  args: {
    size: "sm",
    bordered: true,
    sticky: true,
  },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg"] },
    bordered: { control: "boolean" },
    sticky: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Exemplo base (equivalente ao seu App) */
export const Default: Story = {
  render: (args) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
      <div className="min-h-[60vh] bg-background text-foreground">
        <LandingHeader.Root {...args}>
          <LandingHeader.Left>
            <LandingHeader.Logo
              src="https://dummyimage.com/96x40/ddd/333&text=Logo"
              alt="Logo"
            />
          </LandingHeader.Left>

          <LandingHeader.Center>
            <LandingHeader.Nav>
              <LandingHeader.Nav.Item>Produtos</LandingHeader.Nav.Item>
              <LandingHeader.Nav.Item
                target="_blank"
                href="https://www.google.com"
              >
                Serviços
              </LandingHeader.Nav.Item>
              <LandingHeader.Nav.Item>Depoimentos</LandingHeader.Nav.Item>
              <LandingHeader.Nav.Item>Trabalhe conosco</LandingHeader.Nav.Item>
            </LandingHeader.Nav>
          </LandingHeader.Center>

          <LandingHeader.Right>
            <LandingHeader.MobileMenuToggle
              open={showMobileMenu}
              onToggle={setShowMobileMenu as never}
            />
            <LandingHeader.MobileMenuPanel open={showMobileMenu}>
              <LandingHeader.Nav.Item>Produtos</LandingHeader.Nav.Item>
              <LandingHeader.Nav.Item
                target="_blank"
                href="https://www.google.com"
              >
                Serviços
              </LandingHeader.Nav.Item>
              <LandingHeader.Nav.Item>Depoimentos</LandingHeader.Nav.Item>
              <LandingHeader.Nav.Item>Trabalhe conosco</LandingHeader.Nav.Item>
            </LandingHeader.MobileMenuPanel>

            <LandingHeader.CTA
              className="rounded-sm"
              label="Começar agora"
              onClick={() => alert("Clicou!")}
            />
          </LandingHeader.Right>
        </LandingHeader.Root>

        <section className="mx-auto max-w-7xl px-3 py-12">
          <h1 className="text-2xl font-bold">Seção de conteúdo</h1>
          <p className="mt-2 text-foreground/70">
            Use os controles do Storybook para alternar tamanho, borda e sticky.
          </p>
        </section>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Header com **logo**, **links centrais**, **menu mobile** (toggle + painel) e **CTA** à direita.",
      },
    },
  },
};

/** Somente mobile (força tamanho pequeno) para validar toggle + painel */
export const MobileOnly: Story = {
  args: { size: "sm" },
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <div className="min-h-[60vh] bg-background text-foreground">
        <LandingHeader.Root {...args}>
          <LandingHeader.Left>
            <LandingHeader.Logo
              src="https://dummyimage.com/72x32/ddd/333&text=Logo"
              alt="Logo"
            />
          </LandingHeader.Left>
          <LandingHeader.Center>
            <LandingHeader.Nav>
              <LandingHeader.Nav.Item>Produtos</LandingHeader.Nav.Item>
              <LandingHeader.Nav.Item>Serviços</LandingHeader.Nav.Item>
              <LandingHeader.Nav.Item>Depoimentos</LandingHeader.Nav.Item>
              <LandingHeader.Nav.Item>Contato</LandingHeader.Nav.Item>
            </LandingHeader.Nav>
          </LandingHeader.Center>
          <LandingHeader.Right>
            <LandingHeader.MobileMenuToggle open={open} onToggle={setOpen as never} />
            <LandingHeader.MobileMenuPanel open={open}>
              <LandingHeader.Nav.Item>Produtos</LandingHeader.Nav.Item>
              <LandingHeader.Nav.Item>Serviços</LandingHeader.Nav.Item>
              <LandingHeader.Nav.Item>Depoimentos</LandingHeader.Nav.Item>
              <LandingHeader.Nav.Item>Contato</LandingHeader.Nav.Item>
            </LandingHeader.MobileMenuPanel>
            <LandingHeader.CTA label="Começar agora" />
          </LandingHeader.Right>
        </LandingHeader.Root>
        <p className="mx-auto max-w-7xl px-3 py-6 text-foreground/70">
          Reduza a janela para ver o menu mobile em ação.
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstra a interação no **mobile**: botão hamburger abre/fecha o painel de links.",
      },
    },
  },
};
