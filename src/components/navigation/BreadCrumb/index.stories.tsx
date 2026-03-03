import type { Meta, StoryObj } from "@storybook/react-vite";
import Breadcrumb, { type BreadcrumbProps } from ".";
import {ArrowRightIcon} from '@phosphor-icons/react'

const meta: Meta<typeof Breadcrumb> = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Trilha de navegação baseada no **endereço atual** (pathname). " +
          "Compatível com **dark mode**, responsivo e com **links reais** para cada nível.",
      },
    },
  },
  args: {
    rootLabel: "Home",
    separator: "/",
  } as BreadcrumbProps,
  argTypes: {
    currentPath: { control: "text", description: "Caminho simulado para o Storybook." },
    rootLabel: { control: "text" },
    separator: { control: "text" },
    className: { table: { disable: true } },
    transformLabel: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ComRótulosCustomizados: Story = {
  args: {
    currentPath: "/find-job/job-details",
    labelMap: {
      "find-job": "Find job",
      "job-details": "Job Details",
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo usando `labelMap` para substituir rótulos gerados a partir da URL.",
      },
    },
  },
};

export const CustomSeparator: Story = {
render: (args) => (
    <div className="flex flex-col gap-4">
      <Breadcrumb {...args} separator=">" />
      <Breadcrumb {...args} separator=">>" />
      <Breadcrumb {...args} separator={<ArrowRightIcon color="#057b21" weight="bold"  size={16}/>} />
    </div>
  ),
    args: {
    currentPath: "/catalogo/placas-de-video/nvidia/rtx-5090",
    separator: "›",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Mostra como alterar o **separador** entre itens. Pode ser uma string ou um nó React.",
      },
    },
  },
};

export const Root: Story = {
  args: {
    currentPath: "/",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Quando o caminho é apenas `/`, o componente exibe somente o rótulo raiz (sem links adicionais).",
      },
    },
  },
};
