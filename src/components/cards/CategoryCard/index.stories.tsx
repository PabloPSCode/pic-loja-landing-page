import {
  DeviceMobileIcon,
  DesktopTowerIcon,
  GameControllerIcon,
  HeadphonesIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import CategoryCard from "./index";

const meta: Meta<typeof CategoryCard> = {
  title: "Cards/CategoryCard",
  component: CategoryCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Card clicável para destacar categorias em vitrines ou menus. Prioriza imagens enviadas pelo marketing via `imgUrl` e, na ausência delas, exibe um ícone React.",
      },
    },
  },
  args: {
    name: "Celulares & Tablets",
    href: "#celulares",
    icon: <DeviceMobileIcon size={34} weight="bold" className="text-primary-600" />,
  },
  argTypes: {
    name: { control: "text" },
    href: { control: "text" },
    className: { control: "text" },
    imgUrl: { control: "text" },
    icon: { control: false },
    newTab: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof CategoryCard>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-xs">
      <CategoryCard {...args} />
    </div>
  ),
};

const categories = [
  {
    name: "Periféricos Gamer",
    href: "#perifericos",
    icon: <GameControllerIcon size={32} weight="bold" className="text-primary-600" />,
  },
  {
    name: "Áudio Profissional",
    href: "#audio",
    icon: <HeadphonesIcon size={32} weight="bold" className="text-primary-600" />,
  },
  {
    name: "PCs e Monitores",
    href: "#pcs",
    icon: <DesktopTowerIcon size={32} weight="bold" className="text-primary-600" />,
  },
  {
    name: "Ofertas do App",
    href: "#app",
    imgUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop",
  },
] as const;

export const GridShowcase: Story = {
  render: () => (
    <div className="w-full space-y-4 bg-background p-6 text-foreground">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.name} {...category} />
        ))}
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Demonstração em grid adaptável mostrando ícones React e imagens reais em conjunto.",
      },
    },
  },
};

export const WithImage: Story = {
  args: {
    name: "Coleção Creators",
    href: "#creators",
    imgUrl:
      "https://images.unsplash.com/photo-1518972559570-0f3a6350c8ce?q=80&w=600&auto=format&fit=crop",
  },
  render: (args) => (
    <div className="w-full max-w-xs">
      <CategoryCard {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo usando uma miniatura enviada pelo marketing para representar a categoria.",
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    className:
      "bg-gradient-to-b from-primary-600 to-primary-500 text-white border-transparent hover:shadow-lg",
    icon: (
      <DeviceMobileIcon
        size={36}
        weight="fill"
        className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
      />
    ),
  },
  render: (args) => (
    <div className="w-full max-w-xs">
      <CategoryCard {...args} name="Lançamentos Mobile" href="#mobile" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstra como o `className` permite integrar o card em vitrines com fundos coloridos ou degradês.",
      },
    },
  },
};
