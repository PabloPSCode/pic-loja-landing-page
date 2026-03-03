import type { Meta, StoryObj } from "@storybook/react-vite";
import Badge, { type BadgeProps } from ".";

const meta: Meta<typeof Badge> = {
  title: "Miscellaneous/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de **Badge (etiqueta)** usado para destacar informações curtas. " +
          "Suporta variações de **tamanho**, **cores** e **estilo (filled, outlined, alert, destructive)**.",
      },
    },
  },
  args: {
    text: "Exemplo",
    size: "medium",
    variant: "filled",
  } as BadgeProps,
  argTypes: {
    text: { control: "text" },
    size: {
      control: "radio",
      options: ["small", "medium", "large"],
    },
    variant: {
      control: "radio",
      options: ["filled", "outlined", "alert", "destructive"],
    },
    className: { control: false },
    color: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Exemplo padrão do Badge */
export const Default: Story = {};

/** Diferentes tamanhos */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Badge {...args} size="small" text="Pequeno" />
      <Badge {...args} size="medium" text="Médio" />
      <Badge {...args} size="large" text="Grande" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Mostra as variações de **tamanho** disponíveis no componente.",
      },
    },
  },
};

/** Diferentes variantes */
export const Variants: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Badge {...args} variant="filled" text="Filled" />
      <Badge {...args} variant="outlined" text="Outlined" />
      <Badge {...args} variant="alert" text="Alerta" />
      <Badge {...args} variant="destructive" text="Destrutivo" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exibe as variações de estilo: **filled, outlined, alert e destructive**.",
      },
    },
  },
};

/** Com cor customizada (sobrescrevendo a classe padrão) */
export const CustomColor: Story = {
  render: (args) => (
    <Badge
      {...args}
      text="Badge com estilo customizado"
      className="bg-purple-600 text-white"
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstra como sobrescrever as cores do `Badge` usando `className` customizada.",
      },
    },
  },
};
