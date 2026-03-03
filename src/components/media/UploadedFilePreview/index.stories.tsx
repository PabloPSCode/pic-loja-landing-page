// index.stories.tsx
import { demoImage, demoPdf, demoVideo } from "@/mocks/index";
import type { Meta, StoryObj } from "@storybook/react-vite";
import UploadedFilePreview, { type UploadedFilePreviewProps } from ".";

const meta: Meta<typeof UploadedFilePreview> = {
  title: "Miscellaneous/UploadedFilePreview",
  component: UploadedFilePreview,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Componente para **pré-visualização de arquivos** enviados pelo usuário. " +
          "Suporta imagem e vídeo com preview embutido e demais tipos com mensagem orientativa. " +
          "Responsivo, com suporte a **dark mode**, rótulo e botão de remoção.",
      },
    },
  },
  argTypes: {
    onCancel: { action: "remove clicked" },
    containerClassName: { control: "text", table: { disable: true } },
    mediaClassName: { control: "text", table: { disable: true } },
    label: { control: "text" },
    enableFileOnOtherTab: { control: "boolean" },
    file: { table: { disable: true } },
  },
  args: {
    label: "Arquivo anexado",
    enableFileOnOtherTab: false,
  } as Partial<UploadedFilePreviewProps>,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    file: demoImage,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo básico exibindo **imagem** com preview. O botão de remover dispara a ação `onCancel`.",
      },
    },
  },
};

export const VideoFile: Story = {
  args: {
    file: demoVideo,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo com **vídeo** (MP4) usando player nativo dentro do componente.",
      },
    },
  },
};

export const OtherFile: Story = {
  args: {
    file: demoPdf,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Para tipos **não suportados** com preview (ex.: PDF), o componente exibe informações do arquivo e uma mensagem orientativa.",
      },
    },
  },
};

export const OpenInNewTab: Story = {
  args: {
    file: demoPdf,
    enableFileOnOtherTab: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Ativa o link **“Abrir em nova aba”** para permitir a visualização/baixa do arquivo externamente.",
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    file: demoImage,
    containerClassName: "border-foreground/20 shadow-sm",
    mediaClassName: "max-w-md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Personalização de estilos via `containerClassName` e `mediaClassName` mantendo o padrão visual do design system.",
      },
    },
  },
};
