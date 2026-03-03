'use client';

// LineChart.tsx
import clsx from "clsx";
import React from "react";
import {
  CartesianGrid as RCartesianGrid,
  Legend as RLegend,
  Line as RLine,
  LineChart as RLineChart,
  ReferenceLine as RReferenceLine,
  ResponsiveContainer as RResponsiveContainer,
  Tooltip as RTooltip,
  XAxis as RXAxis,
  YAxis as RYAxis,
} from "recharts";

/* =========================
   Tipos base e utilidades
========================= */

export type LinePoint = {
  label: string;
  value: number;
  [key: string]: unknown;
};

type Size = "xs" | "sm" | "md" | "lg";

const heightMap: Record<Size, number> = {
  xs: 140,
  sm: 200,
  md: 260,
  lg: 320,
};

export type LineChartData = LinePoint[];

export type ValueFormatter = (v: number) => string;
export type LabelFormatter = (l: string) => string;

/* =========================
   Tooltip padrão (dark-mode)
========================= */
type PayloadValue = {
  value: string | number | null;
  [key: string]: unknown;
};

interface DefaultTooltipProps {
  active?: boolean;
  payload?: PayloadValue[];
  label?: string | number;
}

export const DefaultTooltip: React.FC<DefaultTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || payload.length === 0) return null;
  const pv = payload[0];

  return (
    <div
      className={clsx(
        "rounded-lg border border-foreground/15 shadow-lg",
        "bg-background/95 backdrop-blur px-3 py-2",
        "text-foreground text-xs sm:text-sm"
      )}
    >
      <div className="font-medium">
        {pv && pv.value !== null ? String(pv.value) : "--"}
      </div>
      <div className="text-foreground/70">{String(label)}</div>
    </div>
  );
};

/* =========================
   Root
========================= */

export interface LineChartRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Dados: [{ label, value }] */
  data: LineChartData;

  /** Chaves */
  xKey?: string; // default: "label"
  yKey?: string; // default: "value"

  /** Dimensão */
  size?: Size;
  width?: number | string;
  height?: number;

  /** Responsividade */
  responsive?: boolean;

  /** Tooltip */
  showTooltip?: boolean;
  /** Tooltip customizado (compatível com Recharts) */
  customTooltip?: unknown;

  /** Legenda (nome da série) */
  legend?: string;

  /** Formatadores */
  valueFormatter?: ValueFormatter;
  labelFormatter?: LabelFormatter;

  /** Cor da linha/pontos */
  color?: string;

  /** Classes */
  className?: string;
  chartClassName?: string;
}

const Root: React.FC<LineChartRootProps> = ({
  data,
  xKey = "label",
  yKey = "value",
  size = "md",
  width = "100%",
  height,
  responsive = true,
  showTooltip = true,
  legend,
  customTooltip,
  valueFormatter,
  labelFormatter,
  color,
  className,
  chartClassName,
  children,
  ...rest
}) => {
  const computedHeight = height ?? heightMap[size];

  const strokeColor = color ?? "var(--color-primary-600, #2563eb)";

  const LegendContent = React.useCallback(
    (props: { payload?: Array<{ color: string; value: string }> }) => {
      const payload = props.payload ?? [];
      if (payload.length === 0) return null;
      return (
        <ul className="flex items-center gap-4 text-foreground text-xs sm:text-sm ml-10">
          {payload.map((it, i) => (
            <li key={i} className="inline-flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-4 rounded-sm"
                style={{ background: it.color }}
                aria-hidden
              />
              <span className="text-foreground">{it.value}</span>
            </li>
          ))}
        </ul>
      );
    },
    []
  );

  const Chart = (
    <RLineChart
      data={data}
      className={chartClassName}
      margin={{ top: 16, right: 32, bottom: 16 }}
    >
      <RCartesianGrid
        vertical={false}
        strokeDasharray="3 3"
        stroke="currentColor"
        opacity={0.15}
      />

      <RXAxis
        dataKey={xKey}
        axisLine={false}
        tickLine={false}
        tick={{ fontSize: 12, fill: "currentColor" }}
        tickFormatter={(v) =>
          labelFormatter ? labelFormatter(String(v)) : String(v)
        }
      />
      <RYAxis
        axisLine={false}
        tickLine={false}
        tick={{ fontSize: 12, fill: "currentColor" }}
        tickFormatter={(v) =>
          typeof v === "number" && valueFormatter
            ? valueFormatter(v)
            : String(v)
        }
      />

      {showTooltip && (
        <RTooltip
          labelFormatter={(l) =>
            labelFormatter ? labelFormatter(String(l)) : String(l)
          }
          formatter={(val, name) => {
            const value =
              typeof val === "number" && valueFormatter
                ? valueFormatter(val)
                : String(val);
            return [value, legend ?? name];
          }}
          cursor={{ strokeOpacity: 0.2 }}
          wrapperStyle={{
            border: "none",
            outline: "none",
            background: "transparent",
            boxShadow: "none",
          }}
          contentStyle={{
            background: "var(--background)",
            color: "var(--foreground)",
            border: "1px solid rgba(127,127,127,0.18)",
            borderRadius: 8,
            padding: "8px 12px",
            backdropFilter: "blur(4px)",
          }}
          labelStyle={{
            color: "var(--foreground)",
            fontWeight: 600,
            marginBottom: 4,
          }}
          itemStyle={{
            color: "var(--foreground)",
            fontSize: 12,
            padding: 0,
            margin: 0,
          }}
          content={customTooltip as never}
        />
      )}

      {legend && (
        <RLegend
          verticalAlign="top"
          height={36}
          content={LegendContent as never}
        />
      )}

      <RLine
        type="monotone"
        dataKey={yKey}
        stroke={strokeColor}
        strokeWidth={2}
        dot={{ r: 3, stroke: strokeColor, fill: "currentColor" }}
        activeDot={{ r: 5 }}
        isAnimationActive
        name={legend}
      />

      {children}
    </RLineChart>
  );

  return (
    <div
      {...rest}
      className={clsx("w-full bg-transparent text-foreground", className)}
    >
      {responsive ? (
        <RResponsiveContainer width="100%" height={computedHeight}>
          {Chart}
        </RResponsiveContainer>
      ) : (
        <div style={{ width, height: computedHeight }}>{Chart}</div>
      )}
    </div>
  );
};

/* =========================
   Subcomponentes (proxies)
========================= */

const CartesianGrid: React.FC<React.ComponentProps<typeof RCartesianGrid>> = (
  props
) => (
  <RCartesianGrid
    strokeDasharray="3 3"
    stroke="currentColor"
    opacity={0.15}
    {...props}
  />
);

const XAxis: React.FC<React.ComponentProps<typeof RXAxis>> = (props) => (
  <RXAxis
    axisLine={false}
    tickLine={false}
    tick={{ fontSize: 12, fill: "currentColor" }}
    {...props}
  />
);

const YAxis: React.FC<React.ComponentProps<typeof RYAxis>> = (props) => (
  <RYAxis
    axisLine={false}
    tickLine={false}
    tick={{ fontSize: 12, fill: "currentColor" }}
    {...props}
  />
);

const Tooltip: React.FC<React.ComponentProps<typeof RTooltip>> = (props) => (
  <RTooltip {...props} />
);

const ReferenceLine: React.FC<React.ComponentProps<typeof RReferenceLine>> = (
  props
  // @ts-expect-error allow passthrough
) => <RReferenceLine {...props} />;

/* =========================
   Namespace / export
========================= */

const LineChart = {
  Root,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
};

export default LineChart;
