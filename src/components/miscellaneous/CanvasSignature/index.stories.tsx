import type { Meta, StoryObj } from "@storybook/react-vite";
import CanvasSignature from ".";

const meta = {
  title: "Miscellaneous/CanvasSignature",
  component: CanvasSignature,
  tags: ["autodocs"],
  args: {
    label: "Assinatura",
    helperText: "Desenhe sua assinatura abaixo.",
    errorMessage: "",
    width: 300,
    height: 100,
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente para capturar assinaturas desenhadas à mão livre em um canvas HTML5, com botões para salvar ou limpar a assinatura.",
      },
    },
  },
} satisfies Meta<typeof CanvasSignature>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  args: {
    label: "Assinatura",
    helperText: "Desenhe sua assinatura abaixo.",
    width: 300,
    height: 100,
  },
  render: (args) => (
    <div className="w-[320px]">
      <CanvasSignature
        {...args}
        onSave={() => window.alert("Assinatura salva com sucesso!")}
      />
    </div>
  ),
};

export const WithError: StoryObj<typeof meta> = {
  args: {
    label: "Assinatura",
    errorMessage: "Erro ao carregar a assinatura",
    width: 300,
    height: 100,
  },
};
