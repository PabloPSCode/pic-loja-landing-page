import { formatDate } from "@/utils/format";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import DateInput from ".";

const meta = {
  title: "Inputs/DateInput",
  component: DateInput,
  tags: ["autodocs"],
  args: {
    label: "Data de nascimento",
  },
  argTypes: {
    errorMessage: { control: "text" },
    helperText: { control: "text" },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Campo de seleção de data com suporte ao modo escuro e estados de erro/disabled.",
      },
    },
  },
} satisfies Meta<typeof DateInput>;

export default meta;

type Story = StoryObj<typeof meta>;

//@ts-expect-error different type for controlled
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(new Date());
    return (
      <div className="w-[320px]">
        <DateInput
          {...args}
          date={new Date()}
          setDate={setValue}
          label="Data de nascimento"
          helperText="Digite sua data de nascimento"
        />
        <div className="mt-2 text-sm text-foreground/70">
          Valor: <span className="font-medium">{value ? formatDate(value.toISOString() ): "—"}</span>
        </div>
      </div>
    );
  },
};
