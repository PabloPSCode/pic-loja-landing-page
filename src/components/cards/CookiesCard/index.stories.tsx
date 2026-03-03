// index.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import CookiesCard, { type CookiesCardProps } from "./index";

type Story = StoryObj<typeof CookiesCard>;

const meta: Meta<typeof CookiesCard> = {
  title: "Cards/CookiesCard",
  component: CookiesCard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          `Banner de consentimento de cookies para sites no mercado brasileiro.\n\n` +
          `### Características\n` +
          `- **Responsivo** e preparado para **dark mode** (via classes Tailwind)\n` +
          `- Posição inferior da página (usa *absolute bottom-0* dentro de um container relativo)\n` +
          `- Botão de confirmação com callback (**onConfirm**)\n\n` +
          `### Props principais\n` +
          `- **title**: título do aviso\n` +
          `- **description?**: texto explicativo (LGPD)\n` +
          `- **buttonTitle?**: rótulo do botão (padrão: "Entendi")\n` +
          `- **onConfirm?**: chamado ao confirmar\n` +
          `- **containerClassName?**, **titleClassName?**, **descriptionClassName?**, **buttonClassName?**: customização de estilo`,
      },
    },
  },
  args: {
    title: "Nós usamos cookies",
    description:
      "Utilizamos cookies para melhorar sua experiência, analisar tráfego e personalizar conteúdos. Consulte nossa Política de Privacidade.",
    buttonTitle: "Entendi",
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    buttonTitle: { control: "text" },
    onConfirm: { action: "confirmado" },
    containerClassName: { control: "text" },
    titleClassName: { control: "text" },
    descriptionClassName: { control: "text" },
    buttonClassName: { control: "text" },
  },
  // Fornece um container relativo para que o posicionamento "absolute bottom-0" funcione no canvas
  decorators: [
    (Story) => (
      <div className="relative min-h-[40vh] bg-background text-foreground">
        <div className="max-w-5xl mx-auto p-6">
          <p className="mb-6">
            Esta área simula o conteúdo da página. O CookiesCard aparece fixo na
            base do container relativo.
          </p>
        </div>
        <Story />
      </div>
    ),
  ],
};
export default meta;

/* ----------------------------- Stories ----------------------------- */

export const Default: Story = {};

export const CustomClasses: Story = {
  args: {
    containerClassName:
      "border-t-2 border-dashed bg-white/80 backdrop-blur dark:bg-zinc-900/80",
    titleClassName: "text-lg",
    descriptionClassName: "text-sm",
    buttonClassName: "bg-primary-600 hover:bg-primary-700",
  },
};

export const LongText: Story = {
  args: {
    description:
      "Utilizamos cookies essenciais, analíticos e de marketing. Você pode gerenciar suas preferências a qualquer momento em 'Configurações de Cookies'. Ao continuar, você concorda com o uso conforme descrito em nossa Política.",
  },
};

export const DismissAndReset: Story = {
  render: (args) => {
    const [key, setKey] = useState(0);
    return (
      <div className="relative min-h-[40vh]">
        <div className="max-w-5xl mx-auto p-6">
          <button
            className="rounded-md bg-primary-600 px-3 py-2 text-white"
            onClick={() => setKey((k) => k + 1)}
          >
            Mostrar novamente
          </button>
        </div>
        {/* Remonta o componente para exibir novamente após ser fechado */}
        <CookiesCard
          key={key}
          {...(args as CookiesCardProps)}
          onConfirm={() => args.onConfirm?.()}
        />
      </div>
    );
  },
  args: {
    title: "Preferências de cookies",
    description:
      "Clique em 'Entendi' para aceitar o uso de cookies essenciais e analíticos.",
    buttonTitle: "Entendi",
  },
};
