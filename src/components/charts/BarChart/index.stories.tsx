import type { Meta, StoryObj } from "@storybook/react-vite";
import BarChart, { type BarChartRootProps } from ".";

const demoData = [
  { label: "Seg", value: 14 },
  { label: "Ter", value: 18 },
  { label: "Qua", value: 10 },
  { label: "Qui", value: 22 },
  { label: "Sex", value: 16 },
];

const meta: Meta<BarChartRootProps> = {
  title: "Charts/BarChart",
  component: BarChart.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Gráfico de **barras** responsivo, com suporte a **dark mode** e API genérica.\n\n" +
          "- Dados no formato `{ label: string, value: number }`.\n" +
          "- Use `horizontal` para alternar orientação (vertical padrão vs. horizontal).\n" +
          "- `valueFormatter` e `labelFormatter` personalizam rótulos de eixos/tooltip.\n" +
          "- `legend` exibe a legenda superior com cor associada à série.\n" +
          "- `barSize`, `barRadius` e `color` ajustam o estilo das barras.",
      },
    },
  },
  argTypes: {
    data: { control: false },
    xKey: { control: "text", table: { category: "Chaves" } },
    yKey: { control: "text", table: { category: "Chaves" } },
    horizontal: {
      control: "boolean",
      description:
        "Quando true, muda a orientação para **horizontal** (layout='vertical' no Recharts).",
      table: { category: "Layout" },
    },
    size: {
      control: "radio",
      options: ["xs", "sm", "md", "lg"],
      table: { category: "Dimensão" },
    },
    showTooltip: { control: "boolean", table: { category: "Tooltip" } },
    legend: { control: "text", table: { category: "Legenda" } },
    color: { control: "color", table: { category: "Estilo" } },
    barSize: { control: "number", table: { category: "Estilo" } },
    barRadius: { control: false, table: { category: "Estilo" } },
    valueFormatter: { control: false, table: { category: "Formatadores" } },
    labelFormatter: { control: false, table: { category: "Formatadores" } },
    className: { control: false },
    chartClassName: { control: false },
  },
  args: {
    data: demoData,
    legend: "Vendas",
    size: "sm",
    showTooltip: true,
    color: "#0ea5e9",
    valueFormatter: (v: number) => v.toLocaleString("pt-BR"),
    labelFormatter: (l: string) => l,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Barras verticais (padrão) – categorias no eixo X, valores no eixo Y */
export const Vertical: Story = {
  name: "Vertical (padrão)",
  render: (args) => (
    <div className="w-[720px] max-w-full">
      <BarChart.Root {...args}>
        <BarChart.CartesianGrid />
        {/* Eixos no padrão vertical */}
        <BarChart.XAxis dataKey={args.xKey ?? "label"} />
        <BarChart.YAxis />
      </BarChart.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo **vertical** (padrão). As categorias (dias) ficam no eixo **X** e os valores no **Y**.",
      },
    },
  },
};

/** Barras horizontais – categorias no eixo Y, valores no eixo X */
export const Horizontal: Story = {
  args: {
    horizontal: true,
  },
  render: (args) => (
    <div className="w-[720px] max-w-full">
      <BarChart.Root {...args}>
        <BarChart.CartesianGrid />
        {/* Para horizontal, os eixos se invertem: valores no X e categorias no Y */}
        <BarChart.XAxis type="number" />
        <BarChart.YAxis
          dataKey={args.xKey ?? "label"}
          type="category"
          width={60}
        />
      </BarChart.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo **horizontal**. As categorias (dias) ficam no eixo **Y** e os valores no **X**.",
      },
    },
  },
};

/** Variação com formatação e estilo (mantém vertical para comparação) */
export const VerticalFormatted: Story = {
  name: "Vertical com formatação",
  args: {
    valueFormatter: (v: number) => `R$ ${v.toLocaleString("pt-BR")},00`,
    color: "#10b981",
    barSize: 18,
    legend: "Receita (R$)",
  },
  render: (args) => (
    <div className="w-[720px] max-w-full">
      <BarChart.Root {...args}>
        <BarChart.CartesianGrid />
        <BarChart.XAxis dataKey={args.xKey ?? "label"} />
        <BarChart.YAxis />
        {/* Exemplo de linha de referência em Y */}
        <BarChart.ReferenceLine
          y={15}
          stroke="currentColor"
          strokeDasharray="4 4"
        />
      </BarChart.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Vertical com **formatador de valores** (moeda), cor customizada e `barSize` maior, incluindo `ReferenceLine` para meta/limite.",
      },
    },
  },
};
