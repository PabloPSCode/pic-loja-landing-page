// PixPaymentCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { PixPaymentCardProps } from ".";
import PixPaymentCard from ".";

const meta = {
  title: "Cards/PixPaymentCard",
  component: PixPaymentCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    expiresAt: { control: "text" },
    onCopyCode: { action: "onCopyCode" },
  },
} satisfies Meta<typeof PixPaymentCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const nowPlus1hISO = new Date(Date.now() + 60 * 60 * 1000).toISOString();

export const Default: Story = {
  args: {
    message:
      "Escaneie o QR Code com o aplicativo do seu banco ou copie o link para pagar via Pix.",
    paymentLink:
      "00020126480014BR.GOV.BCB.PIX0114+5531999999990252Pagamento de Exemplo520400005303986540510.005802BR5920Empresa Exemplo6009Sao Paulo62070503***6304ABCD",
    qrCodeImage:
      "https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=exemplo-pix",
    expiresAt: nowPlus1hISO,
  } as PixPaymentCardProps,
};

export const Expired: Story = {
  args: {
    message:
      "Este QR Code expirou. Gere um novo código para concluir o pagamento.",
    paymentLink: "pix-expirado-exemplo",
    qrCodeImage:
      "https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=expirado",
    // passado -> já expirado
    expiresAt: new Date(Date.now() - 60 * 1000).toISOString(),
  } as PixPaymentCardProps,
};
