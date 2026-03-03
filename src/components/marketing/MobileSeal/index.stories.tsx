// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import MobileSeal, { type MobileSealProps } from "./index";

type Story = StoryObj<typeof MobileSeal>;

const meta: Meta<typeof MobileSeal> = {
  title: "Marketing/MobileSeal",
  component: MobileSeal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          `Selos/links para as lojas **App Store** e **Google Play**, pensados para o mercado brasileiro.\n\n` +
          `### Destaques\n` +
          `- Fundo **sempre escuro** para maximizar contraste dos selos\n` +
          `- **Responsivo** (ícones aumentam em telas maiores)\n` +
          `- **Acessível**: alt/aria-label e foco visível\n\n` +
          `- Rodapés e páginas de produto com chamadas para iOS/Android\n\n` +
          `### Props principais\n` +
          `- **showAppStoreLogo?** | **showGooglePlayLogo?**: exibir selos\n` +
          `- **appStoreLink?** | **googlePlayLink?**: URLs oficiais das lojas\n` +
          `- **appStoreText?** | **googlePlayText?**: textos em PT-BR\n` +
          `- **containerClassName?** | **itemClassName?** | **imageClassName?** | **textClassName?**: customização`,
      },
    },
  },
  args: {
    showAppStoreLogo: true,
    showGooglePlayLogo: true,
    appStoreLink: "https://apps.apple.com/br/app/id1234567890",
    googlePlayLink: "https://play.google.com/store/apps/details?id=com.exemplo.app",
    appStoreText: "Disponível na App Store",
    googlePlayText: "Disponível no Google Play",
  },
  argTypes: {
    // toggles
    showAppStoreLogo: { control: "boolean" },
    showGooglePlayLogo: { control: "boolean" },
    // links
    appStoreLink: { control: "text" },
    googlePlayLink: { control: "text" },
    // texts
    appStoreText: { control: "text" },
    googlePlayText: { control: "text" },
    // style hooks
    containerClassName: { control: "text" },
    itemClassName: { control: "text" },
    imageClassName: { control: "text" },
    textClassName: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-background text-foreground">
        <Story />
      </div>
    ),
  ],
};
export default meta;

/* --------------------------------- Stories --------------------------------- */

export const Default: Story = {};

export const OnlyAppStore: Story = {
  args: {
    showAppStoreLogo: true,
    showGooglePlayLogo: false,
    appStoreLink: "https://apps.apple.com/br/app/id1234567890",
  },
};

export const OnlyGooglePlay: Story = {
  args: {
    showAppStoreLogo: false,
    showGooglePlayLogo: true,
    googlePlayLink:
      "https://play.google.com/store/apps/details?id=com.exemplo.app",
  },
};

export const CustomTextsAndClasses: Story = {
  args: {
    appStoreText: "Baixe no iOS",
    googlePlayText: "Baixe no Android",
    containerClassName: "gap-3",
    itemClassName:
      "ring-1 ring-primary-500/30 hover:ring-primary-500 transition-shadow",
    imageClassName: "drop-shadow",
    textClassName: "tracking-wide",
  },
};

export const NoLinks: Story = {
  args: {
    appStoreLink: undefined,
    googlePlayLink: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Sem links, cada selo é renderizado como `<div>` mantendo o visual escuro e acessível.",
      },
    },
  },
};

export const GridShowcase: Story = {
  render: () => (
    <div className="grid gap-6 sm:grid-cols-2">
      <MobileSeal
        {...(Default.args as MobileSealProps)}
        appStoreText="Disponível na App Store"
        googlePlayText="Disponível no Google Play"
      />
      <MobileSeal
        {...(CustomTextsAndClasses.args as MobileSealProps)}
        appStoreLink="https://apps.apple.com/br/app/id1234567890"
        googlePlayLink="https://play.google.com/store/apps/details?id=com.exemplo.app"
      />
    </div>
  ),
  parameters: { layout: "centered" },
  args: {},
};
