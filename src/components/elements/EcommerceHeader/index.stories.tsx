import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import EcommerceHeader from ".";

const meta: Meta<typeof EcommerceHeader.Root> = {
  title: "Elements/EcommerceHeader",
  component: EcommerceHeader.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Um flexível header para **e-commerces**. " +
          "Inclui **Logo**, **Busca**, **Botões (Favoritos, Carrinho)**, **Menu do usuário** (visitante/autenticado) e **CEP Popover**.",
      },
    },
  },
  args: {
    size: "md",
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

/** Visitante: logo, botão CEP (que abre popover), busca, ações à direita */
export const DefaultVisitor: Story = {
  render: (args) => {
    const [search, setSearch] = useState("");
    const [openCep, setOpenCep] = useState(false);

    return (
      <EcommerceHeader.Root {...args}>
        <EcommerceHeader.LeftContainer
          logoSrc="https://dummyimage.com/96x40/ddd/333&text=Loja"
          logoAlt="Logo"
        >
          {/* Logo já é exibido pela prop logoSrc quando mobile; em desktop, colocamos manualmente */}
          <EcommerceHeader.Logo
            src="https://dummyimage.com/96x40/ddd/333&text=Loja"
            alt="Logo"
          />

          {/* Botão que alterna o popover do CEP */}
          <EcommerceHeader.InformCepButton
            onClick={() => setOpenCep((v) => !v)}
          />

          {/* Popover posicionado relativamente ao rail da esquerda */}
          <div className="relative">
            <EcommerceHeader.CepPopOverInput
              shouldBeShown={openCep}
              align="left"
              onSearchCep={() => {
                // Simula busca de frete / salvamento de CEP
                setOpenCep(false);
              }}
            />
          </div>

          <EcommerceHeader.Search
            search={search}
            setSearch={setSearch}
            placeholder="Pesquise o seu produto"
          />
        </EcommerceHeader.LeftContainer>

        <EcommerceHeader.RightContainer>
          <EcommerceHeader.FavoritesButton
            count={0}
            onClick={() => alert("Abrir favoritos")}
          />
          <EcommerceHeader.CartButton
            count={0}
            onClick={() => alert("Abrir carrinho")}
          />
          <EcommerceHeader.UserMenu
            isAuthenticated={false}
            onSignIn={() => alert("Entrar")}
            onSignUp={() => alert("Cadastrar")}
          />
        </EcommerceHeader.RightContainer>
      </EcommerceHeader.Root>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Cenário para **visitante**. O botão **Informe o CEP** abre o popover `CepPopOverInput`.",
      },
    },
  },
};

/** Usuário autenticado: saudação + Minha Conta + Sair */
export const Authenticated: Story = {
  render: (args) => {
    const [search, setSearch] = useState("");
    const [openCep, setOpenCep] = useState(false);

    return (
      <EcommerceHeader.Root {...args}>
        <EcommerceHeader.LeftContainer>
          <EcommerceHeader.Logo
            src="https://dummyimage.com/96x40/ddd/333&text=Shop"
            alt="Logo"
          />
          <EcommerceHeader.InformCepButton
            onClick={() => setOpenCep((v) => !v)}
          />
          <div className="relative">
            <EcommerceHeader.CepPopOverInput
              shouldBeShown={openCep}
              align="left"
              onSearchCep={(cep) => {
                console.log("CEP escolhido:", cep);
                setOpenCep(false);
              }}
            />
          </div>
          <EcommerceHeader.Search
            search={search}
            setSearch={setSearch}
            placeholder="Buscar no catálogo"
          />
        </EcommerceHeader.LeftContainer>

        <EcommerceHeader.RightContainer>
          <EcommerceHeader.FavoritesButton count={7} />
          <EcommerceHeader.CartButton count={3} />
          <EcommerceHeader.UserMenu
            isAuthenticated
            userName="Pablo"
            onMyAccount={() => alert("Minha Conta")}
            onSignOut={() => alert("Sair")}
          />
        </EcommerceHeader.RightContainer>
      </EcommerceHeader.Root>
    );
  },
};

/** Mobile-friendly: tamanho pequeno, só o essencial (CEP via popover e carrinho) */
export const MobileFriendly: Story = {
  args: { size: "sm" },
  render: (args) => {
    const [search, setSearch] = useState("");
    const [openCep, setOpenCep] = useState(false);

    return (
      <EcommerceHeader.Root {...args}>
        <EcommerceHeader.LeftContainer
          logoSrc="https://dummyimage.com/72x32/ddd/333&text=LJ"
          logoAlt="Logo"
          onOpenMenu={() => alert("Abrir menu")}
        >
          <EcommerceHeader.Logo
            src="https://dummyimage.com/72x32/ddd/333&text=LJ"
            alt="Logo"
          />
          <EcommerceHeader.InformCepButton
            onClick={() => setOpenCep((v) => !v)}
          />
          <div className="relative">
            <EcommerceHeader.CepPopOverInput
              shouldBeShown={openCep}
              align="left"
              onSearchCep={(cep) => {
                console.log("CEP:", cep);
                setOpenCep(false);
              }}
            />
          </div>
          <EcommerceHeader.Search
            search={search}
            setSearch={setSearch}
            placeholder="Buscar…"
          />
        </EcommerceHeader.LeftContainer>

        <EcommerceHeader.RightContainer>
          <EcommerceHeader.CartButton count={1} />
        </EcommerceHeader.RightContainer>
      </EcommerceHeader.Root>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Exemplo **mobile-first** com header `size="sm"`. O CEP continua disponível via popover.',
      },
    },
  },
};

/** Stress test: muitas ações à direita; centro continua utilizável */
export const HeavyRight: Story = {
  render: (args) => {
    const [search, setSearch] = useState("");
    const [openCep, setOpenCep] = useState(false);

    return (
      <EcommerceHeader.Root {...args}>
        <EcommerceHeader.LeftContainer>
          <EcommerceHeader.Logo
            src="https://dummyimage.com/96x40/ddd/333&text=Store"
            alt="Logo"
          />
          <EcommerceHeader.InformCepButton
            onClick={() => setOpenCep((v) => !v)}
          />
          <div className="relative">
            <EcommerceHeader.CepPopOverInput
              shouldBeShown={openCep}
              align="left"
              onSearchCep={(cep) => {
                console.log("Frete para:", cep);
                setOpenCep(false);
              }}
            />
          </div>
          <EcommerceHeader.Search
            search={search}
            setSearch={setSearch}
            placeholder="Procurar ofertas…"
          />
        </EcommerceHeader.LeftContainer>

        <EcommerceHeader.RightContainer>
          <button className="hidden md:inline-block rounded-md px-2 py-1 text-xs hover:bg-primary/10">
            Cupons
          </button>
          <button className="hidden md:inline-block rounded-md px-2 py-1 text-xs hover:bg-primary/10">
            Pedidos
          </button>
          <EcommerceHeader.FavoritesButton count={12} />
          <EcommerceHeader.CartButton count={9} />
          <EcommerceHeader.UserMenu
            isAuthenticated
            userName="Cliente"
            onSignOut={() => alert("Sair")}
          />
        </EcommerceHeader.RightContainer>
      </EcommerceHeader.Root>
    );
  },
};

/** Somente título/contexto no lado esquerdo, sem logo — útil para páginas internas */
export const ContextOnlyLeft: Story = {
  render: (args) => {
    const [search, setSearch] = useState("");
    const [openCep, setOpenCep] = useState(false);

    return (
      <EcommerceHeader.Root {...args}>
        <EcommerceHeader.LeftContainer>
          <span className="font-semibold">Promoções da Semana</span>
          <EcommerceHeader.InformCepButton
            onClick={() => setOpenCep((v) => !v)}
          />
          <div className="relative">
            <EcommerceHeader.CepPopOverInput
              shouldBeShown={openCep}
              align="left"
              onSearchCep={(cep) => {
                console.log("CEP:", cep);
                setOpenCep(false);
              }}
            />
          </div>
          <EcommerceHeader.Search
            search={search}
            setSearch={setSearch}
            placeholder="Buscar categorias…"
          />
        </EcommerceHeader.LeftContainer>

        <EcommerceHeader.RightContainer>
          <EcommerceHeader.FavoritesButton />
          <EcommerceHeader.CartButton />
          <EcommerceHeader.UserMenu
            isAuthenticated
            userName="Pablo"
            onSignOut={() => alert("Sair")}
          />
        </EcommerceHeader.RightContainer>
      </EcommerceHeader.Root>
    );
  },
};
