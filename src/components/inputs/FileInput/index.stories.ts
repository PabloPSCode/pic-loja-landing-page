import type { Meta, StoryObj } from "@storybook/react-vite";
import FileInput from ".";

const meta = {
  title: "Inputs/FileInput",
  component: FileInput,
  tags: ["autodocs"],
  argTypes: {
    onUpload: { action: "uploaded" },
  },
} satisfies Meta<typeof FileInput>;

export default meta;

export const Default: StoryObj<typeof FileInput> = {
  args: {
    label: "Upload de arquivo",
    instructionText: "Selecione um arquivo do tipo .pdf de até 5MB",
    onUpload: () => {
      window.alert("Arquivo enviado com sucesso!");
    },
    accept: "application/pdf",
  },
};
