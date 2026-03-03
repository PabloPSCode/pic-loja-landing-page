// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import AvatarImage from ".";
import { avatarImagePlaceholder } from "@/mocks/index";

const meta: Meta<typeof AvatarImage> = {
  title: "Media/AvatarImage",
  component: AvatarImage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Imagem de **avatar** redonda, responsiva e pronta para **modo escuro** (usa apenas classes utilitárias). " +
          "Recebe `imageUrl` (opcional) e aplica um *placeholder* quando não for informado.",
      },
    },
  },
  args: {
    imageUrl: avatarImagePlaceholder,
    className: "",
  },
  argTypes: {
    imageUrl: {
      control: "text",
      description: "URL da imagem do usuário. Se não informado, usa *placeholder*.",
    },
    className: {
      control: "text",
      description: "Classes extras para ajustar tamanho/borda/sombras, etc.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-24 h-24">
      <AvatarImage {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exibição padrão com contêiner de **96px** (`w-24 h-24`). O componente ocupa **100%** do contêiner.",
      },
    },
  },
};

export const DifferentSizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-6">
      <div className="w-12 h-12">
        <AvatarImage {...args} />
      </div>
      <div className="w-16 h-16">
        <AvatarImage {...args} />
      </div>
      <div className="w-24 h-24">
        <AvatarImage {...args} />
      </div>
      <div className="w-32 h-32">
        <AvatarImage {...args} />
      </div>
    </div>
  ),
  args: {
    imageUrl: avatarImagePlaceholder,
  },
  parameters: {
    docs: {
      description: {
        story:
          "O avatar é **fluido** e se adapta ao tamanho do **contêiner pai**. Exemplos com `48px`, `64px`, `96px` e `128px`.",
      },
    },
  },
};

export const CustomStyles: Story = {
  render: (args) => (
    <div className="w-24 h-24">
      <AvatarImage
        {...args}
        className="ring-2 ring-primary-500 shadow-md shadow-black/10"
      />
    </div>
  ),
  args: {
    imageUrl: avatarImagePlaceholder,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Você pode estilizar com classes utilitárias (ex.: `ring`, `shadow`). As classes são **mescladas** via `className`.",
      },
    },
  },
};
