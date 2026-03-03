import type { Meta, StoryObj } from "@storybook/react-vite";
import DonutChart from ".";

// A sized wrapper so ResponsiveContainer has width & height
/* eslint-disable @typescript-eslint/no-explicit-any */
const withSizedContainer = (Story: any) => (
  <div
    style={{
      width: "min(760px, 92vw)",
      height: 340, // enough for legend + chart; stories can override via args.size/height
    }}
  >
    <Story />
  </div>
);

const meta: Meta<typeof DonutChart> = {
  title: "Charts/DonutChart",
  component: DonutChart,
  decorators: [withSizedContainer],
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          `Gráfico de **rosca (donut)** responsivo com suporte a **dark mode**.\n` +
          `Recebe dados genéricos \`[{ label, value, color? }]\` e permite customizar ` +
          `tooltip, legenda, raio interno/externo e conteúdo central (total).\n\n` +
          `### Props principais\n` +
          `- **data**: \`{ label: string; value: number; color?: string }[]\`\n` +
          `- **size?**: "xs" | "sm" | "md" | "lg" (altura padrão por tamanho)\n` +
          `- **labelKey? / valueKey?**: chaves para rótulo/valor (padrão: "label"/"value")\n` +
          `- **innerRadius? / outerRadius?**: raio interno/externo (px ou "%")\n` +
          `- **showTooltip?**: exibe tooltip (padrão: true) — ` +
          `use **customTooltip** para conteúdo totalmente customizado\n` +
          `- **showLegend? / legendTitle?**: controla e rotula a legenda\n` +
          `- **valueFormatter? / labelFormatter?**: formatadores para valores e rótulos\n` +
          `- **showCenterTotal? / centerTotalFormatter? / centerLabel?**: controla o texto central`,
      },
    },
  },
  argTypes: {
    data: { control: false },
    customTooltip: { control: false },
    className: { control: false },
    chartClassName: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof DonutChart>;

const baseData = [
  { label: "Marketing", value: 4200, color: "#0ea5e9" },
  { label: "Vendas", value: 6800, color: "#10b981" },
  { label: "Suporte", value: 1800, color: "#f59e0b" },
  { label: "Operações", value: 2400, color: "#8b5cf6" },
];

export const Default: Story = {
  args: {
    data: baseData,
    size: "md",
    legendTitle: "Receita por área",
    showLegend: true,
    showTooltip: true,
    showCenterTotal: true,
    centerLabel: "Total",
    valueFormatter: (v: number) =>
      v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo padrão com **tooltip**, **legenda** e **total** no centro.",
      },
    },
  },
};

export const CompactNoLegend: Story = {
  name: "Compacto (sem legenda)",
  args: {
    data: baseData.slice(0, 3),
    size: "sm",
    showLegend: false,
    showTooltip: true,
    innerRadius: "65%",
    outerRadius: "88%",
    centerLabel: "Pedidos",
    centerTotalFormatter: (v: number) => v.toLocaleString("pt-BR"),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Versão compacta sem legenda, ideal para cards (mantém texto central).",
      },
    },
  },
};

export const CustomTooltipAndFormatters: Story = {
  name: "Tooltip custom + formatadores",
  args: {
    data: baseData,
    size: "lg",
    legendTitle: "Participação",
    labelFormatter: (l: string) => `• ${l}`,
    valueFormatter: (v: number) => `${v.toLocaleString("pt-BR")} itens`,
    customTooltip: ({
      active,
      payload,
    }: {
      active?: boolean;
      payload?: Array<{ value: number; payload: { label: string } }>;
    }) => {
      if (!active || !payload || payload.length === 0) return null;
      const pv = payload[0];
      return (
        <div
          style={{
            background: "var(--background)",
            color: "var(--foreground)",
            border: "1px solid rgba(127,127,127,0.18)",
            borderRadius: 8,
            padding: "8px 12px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
            backdropFilter: "blur(4px)",
            fontSize: 12,
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 2 }}>
            {pv?.payload?.label}
          </div>
          <div>{pv?.value?.toLocaleString("pt-BR")} unidades</div>
        </div>
      );
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstra **tooltip customizado** com tema e **formatadores** de rótulo/valor.",
      },
    },
  },
};
