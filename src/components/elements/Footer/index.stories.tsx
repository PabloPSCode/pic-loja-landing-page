import {
    FacebookLogoIcon,
    InstagramLogoIcon,
    LinkedinLogoIcon,
    XLogoIcon,
    YoutubeLogoIcon,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Footer from ".";

const meta: Meta<typeof Footer.Root> = {
  title: "Elements/Footer",
  component: Footer.Root,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Rodapé composto em **três faixas** (Top Grid → Social → Bottom). " +
          "Altamente **responsivo**, com suporte a **dark mode** e `className` em todos os elementos.",
      },
    },
  },
  args: {
    bordered: true,
  },
  argTypes: {
    bordered: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const socialItems = [
  { iconName: "instagram", href: "#" },
  { iconName: "x", href: "#" },
  { iconName: "facebook", href: "#" },
  { iconName: "youtube", href: "#" },
];

export const Default: Story = {
  render: (args) => (
    <div className="min-h-[70vh] bg-background text-foreground">
      <Footer.Root {...args}>
        {/* Top Grid - 4 colunas */}
        <Footer.Top columns={4}>
          <Footer.Column
            title="Atendimento"
            items={[
              { label: "Seg–Sex: 08h – 20h" },
              { label: "Sáb: 09h – 15h (horário de Brasília)" },
              { label: "Fale conosco", href: "#" },
            ]}
          />
          <Footer.Column
            title="Empresa"
            items={[
              { label: "Quem somos", href: "#" },
              { label: "Trabalhe conosco", href: "#" },
              { label: "Blog", href: "#" },
            ]}
          />
          <Footer.Column
            title="Ajuda"
            items={[
              { label: "Central de Ajuda", href: "#" },
              { label: "Acompanhar pedido", href: "#" },
              { label: "Trocas e devoluções", href: "#" },
            ]}
          />
          <Footer.Column
            title="Legal"
            items={[
              { label: "Política de Privacidade", href: "#" },
              { label: "Termos de Uso", href: "#" },
              { label: "Política de Cookies", href: "#" },
            ]}
          />
        </Footer.Top>

        {/* Social (com SocialRibbon) */}
        <Footer.SocialRow
          items={socialItems as never}
          iconsClassName="text-foreground/80 hover:text-foreground"
        />

        {/* Bottom */}
        <Footer.Bottom>
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} Minha Empresa — CNPJ:
              00.000.000/0001-00
            </p>
            <p className="text-foreground/70">
              Endereço: Rua Exemplo, 123 – Centro – São Paulo/SP
            </p>
          </div>
        </Footer.Bottom>
      </Footer.Root>
    </div>
  ),
};

export const TwoColumnsAndCustomSocial: Story = {
  render: (args) => (
    <div className="min-h-[70vh] bg-background text-foreground">
      <Footer.Root {...args}>
        {/* Top Grid - 2 colunas */}
        <Footer.Top columns={2}>
          <Footer.Column title="Sitemap">
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  Recursos
                </a>
              </li>
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  Planos
                </a>
              </li>
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  Blog
                </a>
              </li>
            </ul>
          </Footer.Column>
          <Footer.Column title="Contato">
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  WhatsApp
                </a>
              </li>
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  Telegram
                </a>
              </li>
              <li>
                <a
                  className="hover:underline underline-offset-4"
                  href="mailto:suporte@empresa.com"
                >
                  suporte@empresa.com
                </a>
              </li>
            </ul>
          </Footer.Column>
        </Footer.Top>

        {/* Social – children customizado no lugar do SocialRibbon */}
        <Footer.SocialRow>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Siga-nos:</span>
            <div className="flex items-center gap-3">
              <InstagramLogoIcon className="h-5 w-5" />
              <XLogoIcon className="h-5 w-5" />
              <FacebookLogoIcon className="h-5 w-5" />
              <YoutubeLogoIcon className="h-5 w-5" />
              <LinkedinLogoIcon className="h-5 w-5" />
            </div>
          </div>
        </Footer.SocialRow>

        {/* Bottom – livre */}
        <Footer.Bottom>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>© {new Date().getFullYear()} Produto XYZ</span>
            <span className="text-foreground/70">
              Todos os direitos reservados.
            </span>
          </div>
        </Footer.Bottom>
      </Footer.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo com **2 colunas** e **faixa social customizada** (children em vez do SocialRibbon).",
      },
    },
  },
};

