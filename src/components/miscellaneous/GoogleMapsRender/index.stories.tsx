// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import GoogleMapsRender, { type GoogleMapsRenderProps } from ".";

const meta: Meta<typeof GoogleMapsRender> = {
  title: "Miscellaneous/GoogleMapsRender",
  component: GoogleMapsRender,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Renderiza um mapa do **Google Maps** via `<iframe>` em um contêiner responsivo com dark mode.\n\n" +
          "- Aceita **links comuns** do Maps (o componente normaliza) ou **URLs de incorporação**.\n" +
          "- Opcionalmente, use **Maps Embed API** (`apiKey`) para `view` com controle de zoom mais preciso.\n" +
          "- Suporta *aspect ratio*, borda arredondada e rótulo acessível.",
      },
    },
  },
  args: {
    label: "Localização",
    aspect: "16:9",
    borderRadius: 12,
    minHeight: 220,
  } as GoogleMapsRenderProps,
  argTypes: {
    // fontes de dados
    address: {
      control: "text",
      description:
        "Endereço (ou `lat,lng`) usado para montar um embed simples quando `embedUrl` não é informado.",
    },
    embedUrl: {
      control: "text",
      description:
        "URL do Google Maps (comum ou `/maps/embed`). O componente tenta normalizar automaticamente.",
    },
    apiKey: {
      control: "text",
      description:
        "Chave da **Maps Embed API** (opcional). Quando presente e `embedUrl` traz `@lat,lng,zoom`, usa o endpoint `/v1/view`.",
      table: { category: "Avançado" },
    },
    zoom: {
      control: { type: "number", min: 1, max: 21, step: 1 },
      description: "Força o nível de zoom quando possível.",
    },

    // apresentação
    label: { control: "text" },
    title: { control: "text" },
    aspect: {
      control: "inline-radio",
      options: ["16:9", "4:3", "1:1", "21:9"],
    },
    borderRadius: {
      control: { type: "number", min: 0, max: 32, step: 1 },
    },
    minHeight: {
      control: { type: "number", min: 120, max: 600, step: 10 },
    },
    containerClassName: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Mostra usando um endereço (sem necessidade de API Key). */
export const Default: Story = {
  args: {
    address:
      "Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100",
    title: "Google Map — Av. Paulista",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Usando `address`. O componente monta automaticamente uma URL de *embed* compatível.",
      },
    },
  },
};

/** Normaliza um link “comum” do Maps contendo @lat,lng,zoom. */
export const FromRawMapsUrl: Story = {
  args: {
    embedUrl:
      "https://www.google.com/maps/@-23.56168,-46.65598,15.5z?entry=ttu",
    title: "Google Map — Raw URL normalizado",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Passe um link comum do Maps (com `@lat,lng,zoom`). O componente extrai as coordenadas e gera um *embed* válido.",
      },
    },
  },
};

/** Exemplo com aspect ratio e borda customizados. */
export const CustomLayout: Story = {
  args: {
    address: "Praia de Copacabana, Rio de Janeiro - RJ",
    aspect: "21:9",
    borderRadius: 16,
    minHeight: 260,
    title: "Google Map — Wide",
    label: "Onde estamos (exemplo)",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Ajuste `aspect`, `borderRadius` e `minHeight` para compor o layout desejado.",
      },
    },
  },
};

/** Força o zoom (melhor quando o URL contém @lat,lng,zoom). */
export const ForcedZoom: Story = {
  args: {
    embedUrl:
      "https://www.google.com/maps/@-22.9068,-43.1729,12z?entry=ttu",
    zoom: 17,
    title: "Google Map — Zoom forçado",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Quando possível, o `zoom` informado é aplicado. Com `apiKey`, o controle tende a ser mais preciso.",
      },
    },
  },
};

/** Estado de erro/aviso quando não há dados suficientes. */
export const MissingData: Story = {
  args: {
    address: undefined,
    embedUrl: undefined,
    label: "Mapa",
    title: "Google Map — Missing",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Se nem `address` nem `embedUrl` forem informados, o componente exibe uma mensagem de orientação.",
      },
    },
  },
};
