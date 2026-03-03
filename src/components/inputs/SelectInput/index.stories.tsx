import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import SelectInput, { type Option, type SelectInputProps } from ".";

const baseOptions: Option[] = [
  { value: "sp", label: "São Paulo" },
  { value: "rj", label: "Rio de Janeiro" },
  { value: "bh", label: "Belo Horizonte" },
  { value: "poa", label: "Porto Alegre" },
  { value: "ssa", label: "Salvador" },
  { value: "ctb", label: "Curitiba" },
];

const meta: Meta<typeof SelectInput> = {
  title: "Inputs/SelectInput",
  component: SelectInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Campo de seleção baseado na biblioteca **react-select**, com suporte a **dark mode**, **responsividade**, " +
          "**mensagens de ajuda/erro** e **acessibilidade**. Ideal para listas com busca.",
      },
    },
  },
  args: {
    label: "Cidade",
    options: baseOptions,
    isSearchable: true,
    isDisabled: false,
    widthVariant: "full",
    placeholder: "Selecione...",
    helperText: "Você pode digitar para filtrar a lista.",
    onSelectOption: () => {},
  } as SelectInputProps,
  argTypes: {
    widthVariant: {
      control: { type: "inline-radio" },
      options: ["mid", "full"],
    },
    isSearchable: { control: "boolean" },
    isDisabled: { control: "boolean" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
    placeholder: { control: "text" },
    options: { control: "object" },
    notFoundOptionsMessage: { control: "text" },
    containerClassName: { table: { disable: true } },
    labelClassName: { table: { disable: true } },
    onSelectOption: { action: "onSelectOption" },
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<Option | null>(null);

    return (
      <div className="max-w-lg space-y-2">
        <p className="text-sm text-foreground/70">
          Selecionado:{" "}
          <b>{selected ? `${selected.label}` : "—"}</b>
        </p>

        <SelectInput
          {...args}
          // Controlled: passe o value do react-select via rest
          value={selected}
          onSelectOption={setSelected}
          notFoundOptionsMessage="Nenhuma opção encontrada para a sua busca."
        />
      </div>
    );
  },
  args: {
    helperText: "Selecione uma cidade.",
  },
};

export const WithError: Story = {
  args: {
    errorMessage: "Seleção obrigatória.",
    helperText: undefined,
    placeholder: "Selecione uma opção...",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Quando `errorMessage` é definido, o campo recebe realce de erro e a mensagem é exibida abaixo.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    helperText: "Exemplo de campo Disabled.",
  },
};
