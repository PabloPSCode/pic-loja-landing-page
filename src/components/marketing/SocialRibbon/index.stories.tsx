// components/marketing/SocialRibbon/index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import SocialRibbon, { type SocialRibbonProps } from ".";

const meta: Meta<typeof SocialRibbon> = {
  title: "Marketing/SocialRibbon",
  component: SocialRibbon,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "O **SocialRibbon** é um componente no estilo **Product Card**, responsivo e pensado para o mercado brasileiro. " +
          "Ele exibe ícones de redes sociais com links, permitindo personalizar título, subtítulo e densidade do grid.",
      },
    },
  },
  args: {
    items: [
      {
        href: "https://instagram.com",
        iconName: "instagram",
      },
      { href: "https://tiktok.com", iconName: "tiktok" },
      { href: "https://twitch.tv", iconName: "twitch" },
      { href: "https://x.com", iconName: "x" },
      { href: "https://facebook.com", iconName: "facebook" },
      { href: "https://youtube.com", iconName: "youtube" },
      { href: "https://reddit.com", iconName: "reddit" },
    ],
  } as SocialRibbonProps,
  argTypes: {
    items: { control: false },
    iconsWeight: {
      control: "radio",
      options: ["thin", "light", "regular", "bold", "fill", "duotone"],
    },
    iconsClassName: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Exemplo padrão do SocialRibbon */
export const Default: Story = {};

/** Variante simples */
export const Simple: Story = {
  args: {
    items: [
      { href: "https://facebook.com", iconName: "facebook" },
      { href: "https://youtube.com", iconName: "youtube" },
      { href: "https://reddit.com", iconName: "reddit" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exibindo apenas os ícones do Facebook, YouTube e Reddit por exemplo.",
      },
    },
  },
};

/** Variante com ícone personalizado */
export const Custom: Story = {
  args: {
    items: [
      {
        href: "https://webcomponents.br",
        iconName: "custom",
        icon: <span>🌐</span>,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exibindo um ícone personalizado (🌐).",
      },
    },
  },
};
