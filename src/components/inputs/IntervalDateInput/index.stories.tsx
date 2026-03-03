import { formatDate } from "@/utils/format";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import IntervalDateInput from ".";

const meta = {
  title: "Inputs/IntervalDateInput",
  component: IntervalDateInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Campo de seleção de data composto por um campo para data inicial e um campo para data final.",
      },
    },
  },
} satisfies Meta<typeof IntervalDateInput>;

export default meta;

type Story = StoryObj<typeof meta>;

//@ts-expect-error different type for controlled
export const Default: Story = {
  render: (args) => {
    const [initialDate, setInitialDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    return (
      <div className="w-full">
        <IntervalDateInput
          {...args}
          startDate={initialDate}
          setStartDate={setInitialDate}
          endDate={endDate}
          setEndDate={setEndDate}
          labelStartDate="Informe a data inicial"
          helperTextStartDate="Digite a data de ínicio do intervalo"
          labelEndDate="Informe a data final"
          helperTextEndDate="Digite a data de fim do intervalo"
        />
        <div className="flex justify-center-safe mt-2 gap-4 text-xs text-foreground/70">
          <span className="font-medium">
            Data inicial: {initialDate ? formatDate(initialDate.toISOString()) : "—"}
          </span>
          <span className="font-medium">
            Data final: {endDate ? formatDate(endDate.toISOString()) : "—"}
          </span>
        </div>
      </div>
    );
  },
};
