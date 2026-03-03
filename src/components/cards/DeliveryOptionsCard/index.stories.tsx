// components/checkout/DeliveryOptionsCardWithAddress/index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import DeliveryOptionsCard, { type Address, type Option } from "./index";

const SAMPLE_ADDRESS: Address = {
  id: "addr1",
  label: "Casa",
  address: "Rua das Flores",
  residenceNumber: "123",
  complement: "Apto 402",
  neighborhood: "Centro",
  city: "João Monlevade",
  state: "MG",
  zipCode: "35930-000",
  country: "Brasil",
};

const SAMPLE_OPTIONS: Option[] = [
  {
    id: "std",
    label: "Econômica",
    deliveryEstimate: "5–8 dias úteis",
    price: 12.9,
  },
  {
    id: "exp",
    label: "Expressa",
    deliveryEstimate: "2–3 dias úteis",
    price: 29.9,
  },
  {
    id: "sam",
    label: "Mesmo dia (capitais)",
    deliveryEstimate: "Hoje até 22h",
    price: 49.9,
  },
  {
    id: "pick",
    label: "Retirada na loja",
    deliveryEstimate: "Imediata após confirmação",
    price: 0,
  },
];

const meta: Meta<typeof DeliveryOptionsCard> = {
  title: "Cards/DeliveryOptionsCard",
  component: DeliveryOptionsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Cartão para **selecionar o tipo de entrega** mostrando o **endereço** escolhido. Suporta controle interno (não controlado) e externo via `selectedOption` + `onSelectOption` (controlado).",
      },
    },
  },
  argTypes: {
    options: { control: "object", description: "Lista de opções de entrega." },
    address: {
      control: "object",
      description: "Endereço de entrega exibido no topo.",
    },
    selectedOption: {
      control: "object",
      description:
        "Objeto completo da opção selecionada. Combine com `onSelectOption` para modo controlado.",
    },
    onSelectOption: {
      action: "onSelectOption",
      description: "Dispara ao selecionar uma opção.",
    },
    onBack: {
      action: "onBack",
      description: "Dispara ao clicar em 'Alterar' endereço.",
    },
    className: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[60vh] w-full bg-background p-6 text-foreground">
        <div className="mx-auto max-w-3xl">
          <Story />
        </div>
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DeliveryOptionsCard>;

export const Default: Story = {
  args: {
    options: SAMPLE_OPTIONS,
    address: SAMPLE_ADDRESS,
  },
};

export const WithPreselectedOption: Story = {
  args: {
    options: SAMPLE_OPTIONS,
    address: SAMPLE_ADDRESS,
    selectedOption: SAMPLE_OPTIONS[1],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo com **Expressa** pré-selecionada via prop `selectedOption`.",
      },
    },
  },
};

export const ControlledExample: Story = {
  render: (args) => {
    const Controlled = () => {
      const [selectedId, setSelectedId] = useState<string>("std");
      const options = args.options ?? SAMPLE_OPTIONS;
      const selectedOption =
        options.find((opt) => opt.id === selectedId) ?? options[0];
      return (
        <DeliveryOptionsCard
          {...args}
          options={options}
          selectedOption={selectedOption ?? undefined}
          onSelectOption={(id) => setSelectedId(id)}
          onBack={() => alert("Trocar endereço")}
        />
      );
    };
    return <Controlled />;
  },
  args: {
    options: SAMPLE_OPTIONS,
    address: SAMPLE_ADDRESS,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstração **controlada** usando estado local do Story para trocar a seleção.",
      },
    },
  },
};

export const PickupOnly: Story = {
  args: {
    options: [
      {
        id: "pick",
        label: "Retirada na loja",
        deliveryEstimate: "Imediata após confirmação",
        price: 0,
      },
    ],
    address: SAMPLE_ADDRESS,
  },
  parameters: {
    docs: {
      description: {
        story: "Caso com **uma única opção** gratuita (retirada).",
      },
    },
  },
};

export const OnlyView: Story = {
  args: {
    options: SAMPLE_OPTIONS,
    address: SAMPLE_ADDRESS,
    selectedOption: SAMPLE_OPTIONS[2],
    onlyView: true,
  },
  decorators: [
    (Story) => (
      <div className="mx-auto max-w-3xl">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Pré-visualização em **dark mode**.",
      },
    },
  },
};
