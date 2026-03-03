import { mockedPaginationList } from "@/mocks/index";
import {
  CaretDoubleLeftIcon,
  CaretDoubleRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useMemo, useState } from "react";
import ListPagination from ".";

const meta: Meta<typeof ListPagination> = {
  title: "Navigation/ListPagination",
  component: ListPagination,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de **paginação** para listas. Baseado em layout responsivo, com suporte a **dark mode**, ícones customizáveis e **acessibilidade**. " +
          "O total de páginas é calculado a partir do número de `children` e da prop `itemsPerPage`.",
      },
    },
  },
  argTypes: {
    page: {
      control: { type: "number", min: 1 },
      description: "Página atual (base 1).",
    },
    itemsPerPage: {
      control: { type: "number", min: 1, step: 1 },
      description: "Quantidade de itens por página.",
    },
    pagesToShow: {
      control: { type: "number", min: 3, step: 1 },
      description: "Quantidade de páginas exibidas nos botões centrais.",
    },
    containerClassName: {
      control: "text",
      table: { category: "Estilo" },
    },
    pageNumberClassName: {
      control: "text",
      table: { category: "Estilo" },
      description:
        "Classe extra aplicada aos botões de número (ativa/inativa).",
    },
    leftIcon: { table: { category: "Ícones" } },
    rightIcon: { table: { category: "Ícones" } },
    firstIcon: { table: { category: "Ícones" } },
    lastIcon: { table: { category: "Ícones" } },
    onPageChange: {
      action: "pageChanged",
      table: { disable: true },
    },
    children: {
      table: { disable: true },
      description:
        "A lista de elementos a ser paginada. O componente renderiza apenas os itens da página atual.",
    },
  },
};
export default meta;

type Story = StoryObj<typeof ListPagination>;

/** Story base controlada com estado local */
export const Default: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    const items = useMemo(() => mockedPaginationList(96), []);
    return (
      <ListPagination
        {...args}
        page={page}
        onPageChange={setPage}
        // lista a ser paginada
        children={items}
      />
    );
  },
  args: {
    page: 1,
    itemsPerPage: 10,
    pagesToShow: 5,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo controlado (React state). A lista possui 96 itens, exibidos em blocos de 10 por página.",
      },
    },
  },
};

export const FewPages: Story = {
  name: "FewPages",
  render: (args) => {
    const [page, setPage] = useState(1);
    const items = useMemo(() => mockedPaginationList(12), []);
    return (
      <ListPagination
        {...args}
        page={page}
        onPageChange={setPage}
        children={items}
      />
    );
  },
  args: {
    page: 1,
    itemsPerPage: 6,
    pagesToShow: 5,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Caso com poucas páginas — os botões de **primeiro/último** podem nem aparecer, dependendo do total vs `pagesToShow`.",
      },
    },
  },
};

export const DenseItems: Story = {
  name: "DenseItems",
  render: (args) => {
    const [page, setPage] = useState(1);
    const items = useMemo(() => mockedPaginationList(50), []);
    return (
      <ListPagination
        {...args}
        page={page}
        onPageChange={setPage}
        children={items}
      />
    );
  },
  args: {
    page: 1,
    itemsPerPage: 5,
    pagesToShow: 7,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Mais páginas visíveis (`pagesToShow=7`) e menos itens por página (`itemsPerPage=5`).",
      },
    },
  },
};

export const CustomIcons: Story = {
  name: "CustomIcons",
  render: (args) => {
    const [page, setPage] = useState(3);
    const items = useMemo(() => mockedPaginationList(80), []);
    return (
      <ListPagination
        {...args}
        page={page}
        onPageChange={setPage}
        children={items}
        firstIcon={<CaretDoubleLeftIcon size={18} weight="bold" />}
        lastIcon={<CaretDoubleRightIcon size={18} weight="bold" />}
        leftIcon={<CaretLeftIcon size={18} weight="bold" />}
        rightIcon={<CaretRightIcon size={18} weight="bold" />}
      />
    );
  },
  args: {
    page: 3,
    itemsPerPage: 8,
    pagesToShow: 5,
    pageNumberClassName:
      "rounded-full border border-foreground/15 hover:bg-foreground/5 focus:outline-none focus:ring-2 focus:ring-primary-400/40",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Personalização de ícones e estilo adicional nos números via `pageNumberClassName`.",
      },
    },
  },
};

export const WithCustomContainer: Story = {
  name: "WithCustomContainer",
  render: (args) => {
    const [page, setPage] = useState(1);
    const items = useMemo(() => mockedPaginationList(40), []);
    return (
      <div className="max-w-2xl">
        <ListPagination
          {...args}
          page={page}
          onPageChange={setPage}
          children={items}
          containerClassName="bg-background text-foreground"
        />
      </div>
    );
  },
  args: {
    page: 1,
    itemsPerPage: 10,
    pagesToShow: 5,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Envolvendo a paginação com um container externo para controlar a largura máxima.",
      },
    },
  },
};
