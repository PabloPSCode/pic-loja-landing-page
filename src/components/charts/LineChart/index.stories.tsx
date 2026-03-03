// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import LineChart from ".";

/**
 * LineChart (composto) para séries simples `{ label, value }`.
 * - **Responsivo** (via `ResponsiveContainer`) e **dark mode** (usa tokens `--background`/`--foreground`)
 * - Formatação com `valueFormatter` (eixo Y/tooltip) e `labelFormatter` (eixo X/tooltip)
 * - `legend` exibe um rótulo para a série e herda a cor da linha
 * - Slots proxy: `LineChart.CartesianGrid`, `LineChart.XAxis`, `LineChart.YAxis`, `LineChart.Tooltip`, `LineChart.ReferenceLine`
 */

type Props = React.ComponentProps<typeof LineChart.Root>;

const meta: Meta<Props> = {
  title: "Charts/LineChart",
  component: LineChart.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Gráfico **Linear** para dados `{ label, value }`.\n\n" +
          "**Props principais**\n" +
          "- **data**: `Array<{ label: string; value: number }>` – dados da série.\n" +
          "- **size?**: `'xs' | 'sm' | 'md' | 'lg'` – altura predefinida (default: `md`).\n" +
          "- **color?**: `string` – cor da linha (hex/RGB/CSS var).\n" +
          "- **legend?**: `string` – rótulo exibido como legenda.\n" +
          "- **valueFormatter?**: `(v:number)=>string` – formata valores do eixo Y e tooltip.\n" +
          "- **labelFormatter?**: `(l:string)=>string` – formata rótulos do eixo X e tooltip.\n" +
          "- **customTooltip?**: componente para substituir o tooltip padrão do Recharts.\n\n" +
          "Use os subcomponentes `CartesianGrid`, `XAxis`, `YAxis`, `Tooltip`, `ReferenceLine` dentro de `LineChart.Root` para ajustar o gráfico.",
      },
    },
  },
  argTypes: {
    data: { control: false },
    customTooltip: { control: false },
    children: { control: false },
    className: { control: false },
    chartClassName: { control: false },
    responsive: { control: "boolean" },
    size: {
      control: "inline-radio",
      options: ["xs", "sm", "md", "lg"],
    },
    color: {
      control: "color",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const weekData: Props["data"] = [
  { label: "Seg", value: 140 },
  { label: "Ter", value: 181 },
  { label: "Qua", value: 109 },
  { label: "Qui", value: 223 },
  { label: "Sex", value: 162 },
];

/** 1) Exemplo padrão */
export const Default: Story = {
  args: {
    data: weekData,
    size: "sm",
    color: "#2563eb",
    legend: "Vendas",
    valueFormatter: (v: number) => v.toLocaleString("pt-BR"),
    responsive: true,
  },
  render: (args) => (
    <div style={{ width: 640 }}>
      <LineChart.Root {...args}>
        <LineChart.CartesianGrid />
        <LineChart.XAxis dataKey="label" />
        <LineChart.YAxis />
      </LineChart.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Uso básico com **grade**, eixos X/Y e `legend`. Os formatadores aplicam-se aos eixos e ao tooltip.",
      },
    },
  },
};

/** 2) Com formatadores e linha de referência */
export const WithFormattersAndReference: Story = {
  args: {
    data: weekData,
    size: "md",
    color: "#0ea5e9",
    legend: "Receita (R$)",
    valueFormatter: (v: number) =>
      v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
    labelFormatter: (l: string) => l,
  },
  render: (args) => (
    <div style={{ width: 720 }}>
      <LineChart.Root {...args}>
        <LineChart.CartesianGrid />
       <LineChart.XAxis dataKey="label" />
        <LineChart.YAxis />
        {/* Linha de referência no valor médio */}
        <LineChart.ReferenceLine
          y={
            Math.round(
              args.data.reduce((acc, d) => acc + d.value, 0) / args.data.length
            ) || 0
          }
          stroke="currentColor"
          strokeDasharray="4 4"
          opacity={0.35}
        />
      </LineChart.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstra **formatadores monetários** e uma `ReferenceLine` na média dos valores.",
      },
    },
  },
};

/** 3) Tooltip custom e variações de tamanho */
export const CustomTooltipAndSizes: Story = {
  render: () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const CustomTooltip = ({ active, label, payload }: any) => {
      if (!active || !payload || payload.length === 0) return null;
      const v = payload[0]?.value as number;
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
          <div style={{ fontWeight: 700 }}>
            {v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </div>
          <div style={{ opacity: 0.75 }}>{String(label)}</div>
        </div>
      );
    };

    const sizes: Props["size"][] = ["xs", "sm", "md"];
    return (
      <div style={{ width: 760, display: "grid", gap: 16 }}>
        {sizes.map((sz) => (
          <LineChart.Root
            key={sz}
            data={weekData}
            size={sz}
            color={sz === "xs" ? "#16a34a" : sz === "sm" ? "#ea580c" : "#7c3aed"}
            legend={`Série (${sz})`}
            valueFormatter={(v) => v.toLocaleString("pt-BR")}
            customTooltip={<CustomTooltip />}
          >
            <LineChart.CartesianGrid />
            <LineChart.XAxis dataKey="label" />
            <LineChart.YAxis />
          </LineChart.Root>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo com **tooltip customizado** (controlado via `customTooltip`) e três **tamanhos** diferentes.",
      },
    },
  },
};
