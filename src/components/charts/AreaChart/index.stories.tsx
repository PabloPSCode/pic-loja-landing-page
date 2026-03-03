import type { Meta, StoryObj } from "@storybook/react-vite";
import AreaChart, {
  type AreaChartData,
  type ValueFormatter,
  type LabelFormatter,
} from ".";

const meta: Meta<typeof AreaChart.Root> = {
  title: "Charts/AreaChart",
  component: AreaChart.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Gráfico de **área** responsivo com suporte a **dark mode** e padrão de composição.\n\n" +
          "**Uso básico:** envolva seu gráfico em `AreaChart.Root` e componha com `AreaChart.CartesianGrid`, `AreaChart.XAxis`, `AreaChart.YAxis`, `AreaChart.Area`, `AreaChart.Tooltip` e `AreaChart.ReferenceLine` conforme necessário.\n\n" +
          "**Props principais (Root):**\n" +
          "- `data`: array de objetos `{ label: string, value: number }`.\n" +
          "- `size`: `xs | sm | md | lg` controla a altura (padrão `md`).\n" +
          "- `color`: cor da linha/área (ex.: `#3b82f6`).\n" +
          "- `showTooltip`: exibe o tooltip padrão (padrão `true`).\n" +
          "- `customTooltip`: componente custom para substituir o tooltip.\n" +
          "- `valueFormatter`, `labelFormatter`: formatadores dos eixos/tooltip.\n" +
          "- `legend`: texto da série para exibir `Legend` no topo.\n\n" +
          "Os subcomponentes são proxies do **Recharts**, herdando suas props.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof AreaChart.Root>;

const baseData: AreaChartData = [
  { label: "Seg", value: 14 },
  { label: "Ter", value: 18 },
  { label: "Qua", value: 10 },
  { label: "Qui", value: 22 },
  { label: "Sex", value: 16 },
];

/** 1) Exemplo padrão (grid + eixos + tooltip) */
export const Default: Story = {
  render: (args) => (
    <div style={{ width: 680 }}>
      <AreaChart.Root size="sm" {...args}>
        <AreaChart.CartesianGrid />
        <AreaChart.XAxis />
        <AreaChart.YAxis />
      </AreaChart.Root>
    </div>
  ),
  args: {
    data: baseData,
    size: "sm",
    showTooltip: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Configuração mínima pronta para uso. O gráfico se adapta ao tema claro/escuro automaticamente.",
      },
    },
  },
};

/** 2) Com legenda + formatadores (moeda e rótulos) */
export const WithLegendAndFormatters: Story = {
  render: (args) => {
    const valueFormatter: ValueFormatter = (v) =>
      v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    const labelFormatter: LabelFormatter = (l) => l;

    return (
      <div style={{ width: 720 }}>
        <AreaChart.Root
          {...args}
          data={baseData}
          size="md"
          color="#0ea5e9"
          legend="Quantidade de vendas"
          valueFormatter={valueFormatter}
          labelFormatter={labelFormatter}
        >
          <AreaChart.CartesianGrid />
          <AreaChart.XAxis dataKey="label" />
          <AreaChart.YAxis />
        </AreaChart.Root>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Mostra a **legenda** com o mesmo tom do traço e aplica **formatadores** nos eixos e tooltip.",
      },
    },
  },
};

/** 3) Tooltip custom + linha de referência (média) */
export const CustomTooltipAndReference: Story = {
  render: (args) => {
    const avg =
      baseData.reduce((acc, cur) => acc + cur.value, 0) / baseData.length;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CustomTooltip = ({ active, payload, label }: Record<string, any>) => {
      if (!active || !payload?.length) return null;
      const val = payload[0].value as number;

      return (
        <div
          style={{
            background: "var(--background)",
            color: "var(--foreground)",
            border: "1px solid rgba(127,127,127,0.18)",
            borderRadius: 8,
            padding: "8px 12px",
            backdropFilter: "blur(4px)",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: 4 }}>
            {val.toLocaleString("pt-BR")}
          </div>
          <div style={{ opacity: 0.8 }}>{String(label)}</div>
        </div>
      );
    };

    return (
      <div style={{ width: 720 }}>
        <AreaChart.Root
          {...args}
          data={baseData}
          size="md"
          color="#a855f7"
          customTooltip={<CustomTooltip />}
        >
          <AreaChart.CartesianGrid />
          <AreaChart.XAxis dataKey="label" />
          <AreaChart.YAxis />
          <AreaChart.ReferenceLine
            y={avg}
            stroke="currentColor"
            strokeDasharray="4 4"
            opacity={0.4}
            label={{
              value: `Média: ${avg.toFixed(1)}`,
              position: "right",
              fill: "currentColor",
              fontSize: 12,
            }}
          />
        </AreaChart.Root>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Substitui o tooltip padrão por um **custom** (seguindo as variáveis de tema) e adiciona uma **linha de referência** com a média da série.",
      },
    },
  },
};
