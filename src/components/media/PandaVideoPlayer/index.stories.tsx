import type { Meta, StoryObj } from "@storybook/react-vite";
import PandaVideoPlayer, { type PandaVideoPlayerProps } from ".";

const meta: Meta<typeof PandaVideoPlayer> = {
  title: "Media/PandaVideoPlayer",
  component: PandaVideoPlayer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de player de vídeo baseado na API da **Panda Video**. " +
          "Permite configurar `videoId`, `zone` e cores do tema/controles. " +
          "Ideal para integrar vídeos em sites e sistemas corporativos que optarem por utilizarem a Panda Video. " +
          "Para mais detalhes, consulte a [documentação oficial da Panda Video](https://pandavideo.readme.io/reference/player-api).",
      },
    },
  },
  args: {
    videoId: "5b858a22-915a-4493-9fc2-dfb74da90470", // Demo público
    zone: "d031816a-48f", // Demo público
  } as PandaVideoPlayerProps,
  argTypes: {
    videoId: { control: "text" },
    zone: { control: "text" },
    themeColor: { control: "color" },
    controlsColor: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Player padrão com demo público */
export const Default: Story = {
  render: (args) => (
    <div className="w-[800px]">
      <PandaVideoPlayer {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Este é o player padrão com um vídeo de demonstração pública.",
      },
    },
  },
};

/** Exemplo com cores customizadas */
export const CustomColors: Story = {
  render: (args) => (
    <div className="w-[800px]">
      <PandaVideoPlayer {...args} />
    </div>
  ),
  args: {
    themeColor: "#0851ef",
    controlsColor: "#ffee02",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Neste exemplo o player usa uma cor primária azul (`#0851ef`) e os controles em amarelo (`#ffee02`).",
      },
    },
  },
};
