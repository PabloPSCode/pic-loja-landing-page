// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import PhotoVisualizer from "./index";
import { samplePhotos } from "@/mocks/index";

type Story = StoryObj<typeof PhotoVisualizer>;

/* Helper: fotos de exemplo (públicas) */

const meta: Meta<typeof PhotoVisualizer> = {
  title: "Media/PhotoVisualizer",
  component: PhotoVisualizer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          `Galeria de miniaturas com **lightbox** baseado na biblioteca *react-photo-view*.\n\n` +
          `### Padrões adotados\n` +
          `- **Responsivo** (thumbnails com wrap) e **dark-mode**\n` +
          `- Acessível: \`alt\`, foco visível, \`role=list\`\n` +
          `- Customização via \`containerClassName\`, \`thumbsContainerClassName\`, \`thumbClassName\` e \`className\` por imagem\n\n` +
          `> Dica: as imagens abaixo usam URLs públicas apenas para demonstração.`,
      },
    },
  },
  args: {
    photos: samplePhotos,
  },
  argTypes: {
    photos: { control: false },
    containerClassName: { control: "text" },
    thumbsContainerClassName: { control: "text" },
    thumbClassName: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl bg-background text-foreground p-4 rounded-lg">
        <Story />
      </div>
    ),
  ],
};
export default meta;

/* --------------------------------- Stories --------------------------------- */

export const Default: Story = {};

export const ManyImages: Story = {
  args: {
    photos: [...samplePhotos, ...samplePhotos].map((p, i) => ({
      ...p,
      alt: `${p.alt} #${i + 1}`,
    })),
  },
};

export const CustomSpacingAndThumbSize: Story = {
  args: {
    thumbsContainerClassName: "gap-3 sm:gap-4",
    thumbClassName:
      "h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-md border border-border-card shadow-sm",
  },
};
