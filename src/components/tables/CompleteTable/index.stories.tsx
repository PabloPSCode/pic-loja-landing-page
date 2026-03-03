/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from "@storybook/react-vite";
import CompleteTable, { type PaginationData } from ".";

const meta: Meta<typeof CompleteTable> = {
  title: "Tables/CompleteTable",
  component: CompleteTable,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          `Tabela complexa com suporte a **busca**, **paginação**, **colunas contáveis** (somas no cabeçalho), **ordenações e memorização de colunas**, ` +
          `**mapa de cabeçalhos** (rótulos customizados), **formatação monetária** e callbacks para ações do usuário.\n\n` +
          `### Props principais\n` +
          `- **data**: array de objetos para alimentar a tabela\n` +
          `- **countableColumnsName?**: colunas cujos valores serão somados e exibidos no rodapé\n` +
          `- **currency?**: código da moeda (ex: "BRL", "USD", "EUR") para formatar colunas monetárias\n` +
          `- **showSearch?**: exibe campo de busca (controlado externamente via onFiltersChange)\n` +
          `- **paginationData?**: dados de paginação (controlado externamente via onValuePageChange/onValueTotalChange)
          \n` +
          `- **tableHeadersMap?**: mapeia nomes de colunas para rótulos customizados\n` +
          `- **onFiltersChange?**: chamado quando o usuário aplica filtros/busca\n` +
          `- **onValuePageChange? / onValueTotalChange?**: chamados quando o usuário muda página/tamanho da página\n` +
          `- **onSeeItemDetails?**: chamado quando o usuário clica em uma linha (ver detalhes)\n` +
          `- **onColumnsChange?**: chamado quando o usuário reordena as colunas (drag & drop)`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CompleteTable>;

/* ---------------------- Mock Data ---------------------- */
const mockData = [
  { id: 1, name: "João Silva", age: 28, salary: 3500.75, city: "São Paulo" },
  {
    id: 2,
    name: "Maria Oliveira",
    age: 32,
    salary: 4800.1,
    city: "Rio de Janeiro",
  },
  {
    id: 3,
    name: "Carlos Souza",
    age: 41,
    salary: 7200,
    city: "Belo Horizonte",
  },
  { id: 4, name: "Ana Costa", age: 25, salary: 2500.5, city: "Curitiba" },
  { id: 5, name: "Pedro Santos", age: 36, salary: 6000, city: "Porto Alegre" },
];

const countableColumns = [
  { name: "salary", isMonetary: true, labelReplacer: "Total Salários" },
  { name: "age", isMonetary: false, labelReplacer: "Total Idades" },
];

const pagination: PaginationData = {
  currentPage: 1,
  totalPages: 5,
  totalItems: 50,
  pageSize: 10,
};

/* ---------------------- Stories ---------------------- */

// Default table
export const Default: Story = {
  args: {
    data: mockData,
    countableColumnsName: countableColumns,
  },
};

// With tableHeadersMap
export const WithTableHeadersMap: Story = {
  args: {
    data: mockData,
    countableColumnsName: countableColumns,
    tableHeadersMap: {
      id: "ID",
      name: "Nome",
      age: "Idade",
      salary: "Salário",
      city: "Cidade",
    },
  },
};

// With search enabled
export const WithSearch: Story = {
  args: {
    data: mockData,
    countableColumnsName: countableColumns,
    showSearch: true,
    onFiltersChange: (filters: any) => console.log("Filters:", filters),
  },
};

// With currency in USD
export const WithUSDCurrency: Story = {
  args: {
    data: mockData,
    countableColumnsName: countableColumns,
    currency: "USD",
  },
};

// With pagination controls
export const WithPagination: Story = {
  args: {
    data: mockData,
    countableColumnsName: countableColumns,
    paginationData: pagination,
    onValuePageChange: (page: any) => console.log("Page change:", page),
    onValueTotalChange: (pageSize: any) =>
      console.log("Page size change:", pageSize),
  },
};

// With onSeeItemDetails
export const WithOnSeeItemDetails: Story = {
  args: {
    data: mockData,
    countableColumnsName: countableColumns,
    onSeeItemDetails: (row) =>
      alert(`Detalhes do item: ${JSON.stringify(row)}`),
  },
};

// Combined all features
export const FullFeatured: Story = {
  args: {
    data: mockData,
    countableColumnsName: countableColumns,
    currency: "EUR",
    showSearch: true,
    paginationData: pagination,
    tableHeadersMap: {
      id: "ID",
      name: "Nome Completo",
      age: "Idade (anos)",
      salary: "Salário (€)",
      city: "Cidade",
    },
    onFiltersChange: (filters: any) => console.log("Filters applied:", filters),
    onValuePageChange: (page: any) => console.log("Page changed:", page),
    onValueTotalChange: (size: any) => console.log("Page size changed:", size),
    onSeeItemDetails: (row: any) => console.log("Item clicked:", row),
    onColumnsChange: (cols: any) => console.log("Columns reordered:", cols),
  },
};
