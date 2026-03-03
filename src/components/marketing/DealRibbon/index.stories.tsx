// index.stories.tsx
import { LightningIcon, TagIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import DealRibbon, { type DealRibbonProps } from "./index";

type Story = StoryObj<typeof DealRibbon>;

const meta: Meta<typeof DealRibbon> = {
  title: "Marketing/DealRibbon",
  component: DealRibbon,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          `Faixa promocional animada (“marquee”) para landing pages brasileiras.\n\n` +
          `### Destaques\n` +
          `- **Responsiva** e com **dark mode**\n` +
          `- Aceita **texto**, **HTML curto**, **imagem** ou **Conteúdo custom (Content)**\n` +
          `- Ícone opcional (ex.: Phosphor/Lucide)\n` +
          `- Sem “buracos”: quantidade de itens é **calculada automaticamente**\n` +
          `\n` +
          `### Props principais\n` +
          `- **text?** | **html?** | **imageUrl?**/**imageAlt?** | **Icon?** | **Content?**\n` +
          `- **speedMs?**: duração de um ciclo (quanto menor, mais rápido)\n` +
          `- **pauseOnHover?**: pausa ao passar o mouse\n` +
          `- **stickyTop?** | **stickyBottom?**: fixa no topo/rodapé\n` +
          `- **className?**: classes extras`,
      },
    },
  },
  args: {
    text: "Oferta por tempo limitado — Aproveite",
    speedMs: 20000,
    pauseOnHover: true,
  },
  argTypes: {
    // Conteúdo
    text: { control: "text" },
    html: { control: "text" },
    Icon: { control: false, description: "Componente de ícone React" },
    Content: {
      control: false,
      description: "Componente React para conteúdo custom",
    },
    contentProps: { control: false },

    // Comportamento
    speedMs: { control: { type: "number", min: 2000, step: 1000 } },
    pauseOnHover: { control: "boolean" },
    stickyTop: { control: "boolean" },
    stickyBottom: { control: "boolean" },

    // Estilo
    className: { control: "text" },
  },
};
export default meta;

/* --------------------------------- Stories --------------------------------- */

export const Default: Story = {};

export const WithIcon: Story = {
  args: {
    Icon: (props) => <LightningIcon weight="fill" {...props} />,
    text: "Até 30% OFF no Pix — Só hoje",
    speedMs: 18000,
  },
};

export const WithHTML: Story = {
  args: {
    html: `<strong>BLACK FRIDAY:</strong> use o cupom <em>BLACK30</em> até <u>23:59</u>!`,
    Icon: (props) => <TagIcon {...props} />,
    speedMs: 22000,
  },
};

export const StickyTopDemo: Story = {
  render: () => (
    <div className="w-full h-[60vh] overflow-y-auto bg-background">
      <DealRibbon
        {...(WithHTML.args as DealRibbonProps)}
        stickyTop
        speedMs={18000}
      />
      <div className="p-6 space-y-4 text-foreground">
        <p>
          Role esta área para ver a faixa fixa no topo. Ideal para campanhas
          (ex.: Black Friday, frete grátis, cupom limitado).
        </p>
        {[...Array(12)].map((_, i) => (
          <p key={i}>
            Conteúdo fictício {i + 1} — Landing/LP com seções, cards,
            depoimentos, etc.
          </p>
        ))}
      </div>
    </div>
  ),
  parameters: { layout: "fullscreen" },
  args: {},
};
