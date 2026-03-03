// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import type { Option } from ".";
import RadioGroupInput from ".";

const meta: Meta<typeof RadioGroupInput> = {
  title: "Inputs/RadioGroupInput",
  component: RadioGroupInput,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Grupo de botões de opção (**radio**) para seleção única. " +
          "Suporta estados desabilitado, erro, dark mode e integra-se com o tema da aplicação.",
      },
    },
  },
  args: {
    label: "Selecione uma fruta",
    helperText: "Selecione apenas uma opção",
    options: [
      { label: "Banana", value: "banana" },
      { label: "Maçã", value: "apple" },
      { label: "Laranja", value: "orange" },
    ],
    disabled: false,
  },
  argTypes: {
    options: { control: { type: "object" } },
    label: { control: "text" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
    disabled: { control: "boolean" },
    containerClassName: { table: { disable: true } },
    onSelectOption: { action: "selected" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<Option>(args.options[0]);
    return (
      <div className="block">
        <RadioGroupInput
          {...args}
          onSelectOption={(val) => setSelected(val)}
          options={args.options}
        />
        <span>Valor selecionado: {selected.label}</span>
      </div>
    );
  },
  args: {
    label: "Selecione uma fruta",
    helperText: "Estado controlado via React useState",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    helperText: "Este grupo de rádio está desabilitado.",
  },
};

export const Error: Story = {
  args: {
    errorMessage: "É necessário escolher uma opção.",
  },
};
