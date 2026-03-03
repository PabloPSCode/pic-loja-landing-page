import type { Meta, StoryObj } from "@storybook/react-vite";
import ImageLink from "./index";

const meta: Meta<typeof ImageLink> = {
  title: "Media/ImageLink",
  component: ImageLink,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Banner responsivo baseado em imagem. Mantém a proporção original informada via `width` e `height`, permitindo reutilizar artes enviadas pelo marketing sem precisar recortar manualmente.",
      },
    },
  },
  args: {
    imgUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1600&auto=format&fit=crop",
    href: "https://kabum.com.br",
    width: 640,
    height: 220,
    alt: "Banner promocional - caixas de som premium",
    className: "",
  },
  argTypes: {
    imgUrl: { control: "text" },
    width: { control: { type: "number" } },
    height: { control: { type: "number" } },
    href: { control: "text" },
    alt: { control: "text" },
    className: { control: "text" },
    imageClassName: { control: "text" },
    newTab: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof ImageLink>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-4xl p-6">
      <ImageLink {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exibe um único banner, ideal para áreas de destaque ou sessões hero em landing pages.",
      },
    },
  },
};

const gridBanners = [
  {
    imgUrl:
      "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?q=80&w=1400&auto=format&fit=crop",
    href: "https://kabum.com.br/assistente-app",
    width: 530,
    height: 190,
    alt: "Oferta exclusiva no app",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1400&auto=format&fit=crop",
    href: "https://kabum.com.br/blog/tech-gamer",
    width: 530,
    height: 190,
    alt: "Conteúdo Tech & Gamer",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1545239351-b362cb2a9bb3?q=80&w=1400&auto=format&fit=crop",
    href: "https://kabum.com.br/afiliados",
    width: 530,
    height: 190,
    alt: "Programa de afiliados KaBuM!",
  },
] as const;

const spotlightCollection = [
  {
    imgUrl:
      "https://images.unsplash.com/photo-1470294402047-1bb7d407d229?q=80&w=1400&auto=format&fit=crop",
    width: 420,
    height: 420,
    href: "https://kabum.com.br/esquenta-black",
    alt: "Esquenta Black com grandes descontos",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop",
    width: 720,
    height: 260,
    href: "https://kabum.com.br/pc-gamer",
    alt: "Linha gamer com até 800 reais off",
  },
] as const;

export const ResponsiveShowcase: Story = {
  render: () => (
    <div className="w-full space-y-6 bg-background p-6 text-foreground">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {gridBanners.map((banner) => (
          <ImageLink
            key={banner.alt}
            {...banner}
            className="hover:border-primary-400"
          />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_1.4fr]">
        {spotlightCollection.map((banner) => (
          <ImageLink
            key={banner.alt}
            {...banner}
            className="hover:border-primary-400"
          />
        ))}
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Demonstra banners com proporções diferentes. Cada imagem mantém sua proporção e se adapta ao grid responsivo com `gap`. Ideal para vitrines de promoções utilizando assets enviados pelo marketing.",
      },
    },
  },
};

export const WithCustomStyling: Story = {
  args: {
    className:
      "rounded-none border-dashed border-primary-300 shadow-none hover:shadow-lg",
    imageClassName: "object-contain bg-white",
  },
  render: (args) => (
    <div className="w-full max-w-3xl space-y-4 bg-foreground/5 p-4 dark:bg-white/5">
      <ImageLink
        {...args}
        imgUrl="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
        width={560}
        height={200}
        alt="Upload de imagem com moldura personalizada"
        href="#"
      />
      <p className="text-sm text-foreground/80">
        É possível aplicar classes próprias para adequar o banner a uploads
        de sellers ou parceiros, mantendo bordas padronizadas do marketplace.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstra como sobrescrever borda, raio e comportamento do `object-fit` para acomodar imagens enviadas por usuários.",
      },
    },
  },
};
