// components/checkout/ManageAddressesCard/index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import ManageAddressesCard, { type Address } from "./index";

const SAMPLE_ADDRESSES: Address[] = [
  {
    id: "addr-1",
    label: "Casa",
    address: "Rua das Flores",
    residenceNumber: "123",
    complement: "Ap. 402, Bloco B",
    neighborhood: "Centro",
    city: "João Monlevade",
    state: "MG",
    zipCode: "35930-000",
    country: "Brasil",
  },
  {
    id: "addr-2",
    label: "Trabalho",
    address: "Av. Paulista",
    residenceNumber: "1000",
    neighborhood: "Bela Vista",
    city: "São Paulo",
    state: "SP",
    zipCode: "01310-100",
    country: "Brasil",
  },
  {
    id: "addr-3",
    label: "Casa dos pais",
    address: "Rua dos Ipês",
    residenceNumber: "45",
    complement: "Casa",
    neighborhood: "Jardins",
    city: "Belo Horizonte",
    state: "MG",
    zipCode: "30123-456",
    country: "Brasil",
  },
];

const meta: Meta<typeof ManageAddressesCard> = {
  title: "Cards/ManageAddressesCard",
  component: ManageAddressesCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Cartão para **selecionar, criar, editar e remover** endereços de entrega. Responsivo e com suporte a dark mode.",
      },
    },
  },
  argTypes: {
    addresses: { control: "object", description: "Lista de endereços." },
    selectedAddressId: {
      control: "text",
      description: "Endereço previamente selecionado (controlado).",
    },
    onSelectAddress: {
      action: "onSelectAddress",
      description: "Seleciona um endereço.",
    },
    onCreateAddress: {
      action: "onCreateAddress",
      description: "Cria um novo endereço.",
    },
    onUpdateAddress: {
      action: "onUpdateAddress",
      description: "Atualiza um endereço existente.",
    },
    onRemoveAddress: {
      action: "onRemoveAddress",
      description: "Remove um endereço.",
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

type Story = StoryObj<typeof ManageAddressesCard>;

export const Default: Story = {
  args: {
    addresses: SAMPLE_ADDRESSES,
  },
};

export const WithPreselectedAddress: Story = {
  args: {
    addresses: SAMPLE_ADDRESSES,
    selectedAddressId: "addr-2",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo com um endereço **preselecionado** via prop `selectedAddressId`.",
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    addresses: [],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Estado vazio sem endereços cadastrados. O botão **Cadastrar novo endereço** abre o modal de criação.",
      },
    },
  },
};

export const ControlledExample: Story = {
  render: (args) => {
    const Controlled = () => {
      const [addresses, setAddresses] = useState<Address[]>(
        args.addresses ?? SAMPLE_ADDRESSES
      );
      const [selected, setSelected] = useState<string | undefined>(
        addresses[0]?.id
      );

      return (
        <ManageAddressesCard
          addresses={addresses}
          selectedAddressId={selected}
          onSelectAddress={(id) => {
            setSelected(id);
          }}
          onCreateAddress={(values) => {
            const newAddr: Address = {
              id: `addr-${Date.now()}`,
              label: values.label,
              address: values.address,
              residenceNumber: values.residenceNumber,
              complement: values.complement,
              neighborhood: values.neighborhood,
              city: values.city,
              state: values.state,
              zipCode: values.zipCode,
              country: values.country ?? "Brasil",
            };
            setAddresses((prev) => [...prev, newAddr]);
            setSelected(newAddr.id);
          }}
          onUpdateAddress={(updated) => {
            setAddresses((prev) =>
              prev.map((a) => (a.id === updated.id ? updated : a))
            );
          }}
          onRemoveAddress={(id) => {
            setAddresses((prev) => prev.filter((a) => a.id !== id));
            setSelected((curr) => (curr === id ? undefined : curr));
          }}
        />
      );
    };
    return <Controlled />;
  },
  args: {
    addresses: SAMPLE_ADDRESSES,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo **controlado** no Storybook, com estado local para seleção, criação, edição e remoção.",
      },
    },
  },
};

export const DarkModePreview: Story = {
  args: {
    addresses: SAMPLE_ADDRESSES,
  },
  decorators: [
    (Story) => (
      <div className="dark bg-black text-white min-h-[60vh] p-6">
        <div className="mx-auto max-w-3xl">
          <Story />
        </div>
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
