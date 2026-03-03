// index.stories.tsx
import { samplePhotos } from "@/mocks/index";
import type { Meta, StoryObj } from "@storybook/react-vite";
import ProductImageVisualizer from "./index";

type Story = StoryObj<typeof ProductImageVisualizer>;

/* ------------------------------ Meta ------------------------------ */
const meta: Meta<typeof ProductImageVisualizer> = {
  title: "Media/ProductImageVisualizer",
  component: ProductImageVisualizer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          `Visualizador de imagens para páginas de produto, com **miniaturas** (horizontais no mobile, **verticais no desktop**), ` +
          `setas de navegação (botões/teclado) e **zoom ao passar o mouse**.\n\n` +
          `### Props\n` +
          `- **images**: lista de { src, alt, className? }\n` +
          `- **className?**: classes do container\n` +
          `- **mainImageClassName?**: classes da imagem principal\n` +
          `- **thumbClassName?**: classes aplicadas a **todas** as miniaturas\n` +
          `- **showHelperText?**: exibe dica abaixo (padrão: true)\n\n` +
          `> Responsivo e com suporte a **dark mode** (tokens \`bg-background\`, \`text-foreground\`).`,
      },
    },
  },
  args: {
    images: samplePhotos,
    showHelperText: true,
  },
  argTypes: {
    images: { control: false },
    showHelperText: { control: "boolean" },
    className: { control: "text" },
    mainImageClassName: { control: "text" },
    thumbClassName: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-5xl bg-background text-foreground p-4 rounded-lg">
        <Story />
      </div>
    ),
  ],
};
export default meta;

/* ------------------------------ Stories ------------------------------ */

export const Default: Story = {};

export const FewImages: Story = {
  args: {
    images: samplePhotos.slice(0, 3),
  },
};

export const ManyImages: Story = {
  args: {
    images: [...samplePhotos, ...samplePhotos].map((p, i) => ({
      ...p,
      alt: (p.alt ?? "Imagem") + ` #${i + 1}`,
    })),
  },
};

export const NoHelperText: Story = {
  args: { showHelperText: false },
};

export const CustomClasses: Story = {
  args: {
    className: "md:grid-cols-[104px_1fr]",
    mainImageClassName: "rounded-md",
    thumbClassName:
      "h-20 w-20 md:h-24 md:w-[88px] object-cover rounded-md border border-border-card",
  },
};

export const DarkMode: Story = {
  render: (args) => (
    <div className="dark bg-background text-foreground p-4 rounded-lg">
      <ProductImageVisualizer {...args} images={samplePhotos} />
      <p className="mt-2 text-xs text-foreground/70">
        Pré-visualização com a classe <code>dark</code> forçada.
      </p>
    </div>
  ),
  parameters: { layout: "centered" },
};
