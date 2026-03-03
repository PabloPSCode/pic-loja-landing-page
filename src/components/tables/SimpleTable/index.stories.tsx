// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useMemo, useState } from "react";
import SimpleTable, {
  type PaginationData,
  type SimpleTableProps,
} from "./index";

// ---------- Mock data ----------
const makeRows = (n = 12) =>
  Array.from({ length: n }).map((_, i) => {
    const id = i + 1;
    const qty = (id % 5) + 1;
    const price = 19.9 + (id % 7) * 3.15; // number on purpose
    const total = qty * price;
    return {
      id,
      customer: ["Alice", "Bruno", "Carla", "Diego", "Eva", "Fernando"][id % 6],
      product: ["Notebook", "Mouse", "Teclado", "Monitor", "Cabo USB"][id % 5],
      qty,
      price, // money
      total, // money
      created_at: `2024-0${(id % 9) + 1}-1${id % 9}`, // ISO-like string
      status: ["Pendente", "Pago", "Cancelado"][id % 3],
    };
  });

const baseRows = makeRows();

// Helpers
const tableHeadersMap: Record<string, string> = {
  id: "Código",
  customer: "Cliente",
  product: "Produto",
  qty: "Qtd",
  price: "Preço",
  total: "Total",
  created_at: "Criado em",
  status: "Status",
};

const columnLabels = [
  { key: "customer", label: "Comprador" },
  { key: "created_at", label: "Data" },
];

// ---------- Meta ----------
const meta: Meta<typeof SimpleTable> = {
  title: "Tables/SimpleTable",
  component: SimpleTable,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          `Versão mais simples do componente CompleteTable. Possui os recursos de **busca**, **paginação**, **ordenação de colunas**, ` +
          `**mapa de cabeçalhos** (rótulos customizados), **formatação monetária** e callbacks para ações do usuário.\n\n` +
          `### Props principais\n` +
          `- **data**: array de objetos para alimentar a tabela\n` +
          `- **currency?**: código da moeda (ex: "BRL", "USD", "EUR") para formatar colunas monetárias\n` +
          `- **showSearch?**: exibe campo de busca (controlado externamente via onFiltersChange)\n` +
          `- **paginationData?**: dados de paginação (controlado externamente via onValuePageChange/onValueTotalChange)
          \n` +
          `- **tableHeadersMap?**: mapeia nomes de colunas para rótulos customizados\n` +
          `- **onFiltersChange?**: chamado quando o usuário aplica filtros/busca\n` +
          `- **onValuePageChange? / onValueTotalChange?**: chamados quando o usuário muda página/tamanho da página\n` +
          `- **onSeeItemDetails?**: chamado quando o usuário clica em uma linha (ver detalhes)\n`,
      },
    },
  },
  args: {
    data: baseRows,
    showSearch: true,
    showPagination: false,
    stripped: true,
  },
};
export default meta;
type Story = StoryObj<typeof SimpleTable>;

// ---------- Stories ---------

export const WithHeadersMap: Story = {
  name: "With tableHeadersMap",
  args: {
    tableHeadersMap,
  },
};

export const WithColumnLabels: Story = {
  name: "With columnLabels (overrides specific headers)",
  args: {
    tableHeadersMap,
    columnLabels,
  },
};

export const MonetaryAutoDetect: Story = {
  name: "Monetary (auto-detect by column name)",
  args: {
    tableHeadersMap,
    currency: "BRL",
    // no moneyColumns -> the component will auto-detect ["price","total"]
  },
};

export const MonetaryUSDExplicit: Story = {
  name: "Monetary (USD, explicit moneyColumns)",
  args: {
    tableHeadersMap,
    currency: "USD",
    moneyColumns: ["price", "total"],
  },
};

export const RowClickHandler: Story = {
  name: "onSeeItemDetails (row click)",
  args: {
    tableHeadersMap,
    onSeeItemDetails: (row) => {
      console.log("See item details:", row);
      alert(`Row clicked: #${row.id} - ${row.product}`);
    },
  },
};

export const CustomClassNames: Story = {
  name: "Custom classNames",
  args: {
    tableHeadersMap,
    tableClassName: "bg-background/40",
    headerClassName: "bg-background/80 backdrop-blur",
    searchClassName: "rounded-md border border-foreground/15 p-1",
    paginationClassName: "bg-background/40",
  },
};

// Controlled pagination example (client-side)
const PaginatedWrapper: React.FC<
  Omit<
    SimpleTableProps,
    "paginationData" | "onValuePageChange" | "onValueTotalChange"
  >
> = (props) => {
  const ALL = useMemo(() => makeRows(137), []);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = ALL.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const start = (currentPage - 1) * pageSize;
  const pageRows = ALL.slice(start, start + pageSize);

  const paginationData: PaginationData = {
    currentPage,
    totalPages,
    totalItems,
    pageSize,
  };

  return (
    <SimpleTable
      {...props}
      data={pageRows}
      paginationData={paginationData}
      showPagination
      onValuePageChange={(p) =>
        setCurrentPage(Math.min(Math.max(1, p), totalPages))
      }
      onValueTotalChange={(s) => {
        setPageSize(s);
        setCurrentPage(1);
      }}
      onFiltersChange={(f) => {
        console.log("filters:", f);
      }}
    />
  );
};

export const WithPagination: Story = {
  name: "With pagination (controlled)",
  render: (args) => (
    <PaginatedWrapper {...args} tableHeadersMap={tableHeadersMap} />
  ),
};

export const ManyRows: Story = {
  name: "Large dataset (no pagination)",
  args: {
    data: makeRows(250),
    tableHeadersMap,
    showPagination: false,
  },
};
