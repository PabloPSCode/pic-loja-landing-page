import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, useEffect } from "react";
import ProgressBar from ".";

const meta: Meta<typeof ProgressBar> = {
  title: "Miscellaneous/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          `Barra de **Progresso** estilizada, acessível e responsiva.\n\n` +
          `- Suporta **cores personalizadas** via prop \`color\` (qualquer valor CSS válido: "#22c55e", "red", "rgb(...)").\n` +
          `- Aceita ajuste de **espessura** em pixels (\`thickness\`).\n` +
          `- Mostra **rótulo** e **porcentagem** opcionais.\n` +
          `- Inclui **animação suave** ao atualizar o valor.\n\n` +
          `### Props principais\n` +
          `- **value** *(number, obrigatório)* – valor atual do progresso.\n` +
          `- **max?** *(number, default: 100)* – valor máximo.\n` +
          `- **label?** *(string)* – texto acima da barra.\n` +
          `- **showPercentage?** *(boolean)* – exibe a porcentagem calculada.\n` +
          `- **color?** *(string)* – cor da barra.\n` +
          `- **thickness?** *(number)* – altura da barra em pixels (padrão: 8).\n`,
      },
    },
  },
  argTypes: {
    value: {
      control: { type: "number" },
      description: "Valor atual do progresso.",
    },
    max: {
      control: { type: "number" },
      description: "Valor máximo (padrão: 100).",
    },
    label: {
      control: "text",
      description: "Rótulo exibido acima da barra.",
    },
    color: {
      control: "color",
      description: "Cor da barra de progresso.",
    },
    thickness: {
      control: { type: "number" },
      description: "Espessura da barra (em pixels).",
    },
    showPercentage: {
      control: "boolean",
      description: "Exibe a porcentagem ao lado do rótulo.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** ========== Exemplo padrão ========== */
export const Default: Story = {
  args: {
    label: "Carregando dados",
    value: 40,
    max: 100,
    showPercentage: true,
  },
};

/** ========== Espessura customizada ========== */
export const CustomThickness: Story = {
  args: {
    label: "Upload de arquivo",
    value: 70,
    max: 100,
    thickness: 16,
    color: "#3b82f6", // Azul
    showPercentage: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Barra com `thickness=16` pixels para destacar o progresso.",
      },
    },
  },
};

/** ========== Cor customizada ========== */
export const CustomColor: Story = {
  args: {
    label: "Conversão em andamento",
    value: 55,
    max: 100,
    color: "#16a34a", // Verde
    showPercentage: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstração da barra usando cor verde (`#16a34a`).",
      },
    },
  },
};

/** ========== Animação dinâmica ========== */
export const Animated: Story = {
  render: (args) => {
    const [val, setVal] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setVal((prev) => (prev >= 100 ? 0 : prev + 10));
      }, 800);
      return () => clearInterval(interval);
    }, []);

    return (
      <ProgressBar
        {...args}
        value={val}
        max={100}
        label="Processando lote"
        color="#eab308" // Amarelo
        showPercentage
        thickness={12}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo animado que aumenta o valor de 10 em 10 a cada 800ms e reinicia ao chegar em 100.",
      },
    },
  },
};
