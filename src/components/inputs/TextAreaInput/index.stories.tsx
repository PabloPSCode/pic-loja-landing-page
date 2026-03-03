import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import TextAreaInput from "."; // ajuste o caminho se necessário

const meta = {
  title: "Inputs/TextAreaInput",
  component: TextAreaInput,
  tags: ["autodocs"],
  argTypes: {
    errorMessage: { control: "text" },
    helperText: { control: "text" },
    disabled: { control: "boolean" },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Campo de texto de área para formulários.",
      },
    },
  },
} satisfies Meta<typeof TextAreaInput>;

export default meta;

type Story = StoryObj<typeof meta>;

//@ts-expect-error different types
export const Default: Story = {
  render: (args) => {
    const [bio, setBio] = useState("");
    return (
      <div className="w-[320px]">
        <TextAreaInput
          {...args}
          label="Biografia"
          placeholder="Digite sua biografia"
          helperText="Como consta no seu documento."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxTextLength={200}
          currentTextLength={bio.length}
        />
        <div className="mt-2 text-sm text-foreground/70">
          Valor: <span className="font-medium">{bio || "—"}</span>
        </div>
      </div>
    );
  },
};

export const ErrorState: Story = {
    args: {
    label: "Biografia",
    placeholder: "Descreva sua biografia",
    helperText: "Informe um texto de até 200 caracteres.",
    maxTextLength: 200,
    currentTextLength: 10,
    value:"Texto muito curto",
    errorMessage: "Texto muito curto",
  },
};

export const Disabled: Story = {
    args: {
    label: "Biografia",
    placeholder: "Descreva sua biografia",
    helperText: "Informe um texto de até 200 caracteres.",
    maxTextLength: 200,
    currentTextLength: 0,
    showTextLength: false,
    disabled: true,
  },
};
