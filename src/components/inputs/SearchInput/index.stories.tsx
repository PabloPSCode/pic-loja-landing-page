import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import SearchInput from ".";

const meta = {
  title: "Inputs/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Campo de pesquisa de texto responsivo e com suporte ao modo escuro.",
      },
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

//@ts-expect-error different type for controlled
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="w-[320px]">
        <SearchInput
          {...args}
          placeholder="Digite sua pesquisa"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          search={value}
          setSearch={setValue}
        />
        <div className="mt-2 text-sm text-foreground/70">
          Valor: <span className="font-medium">{value || "—"}</span>
        </div>
      </div>
    );
  },
};
