import type { UserPlan } from "@/dtos/user.dto";

export type LandingNavItem = {
  href: string;
  label: string;
};

export type LandingHighlight = {
  label: string;
  value: string;
};

export type LandingStep = {
  description: string;
  number: string;
  title: string;
};

export type LandingFeature = {
  description: string;
  icon: "camera" | "magicWand" | "pencil" | "image" | "idCard" | "mobile";
  title: string;
};

export type LandingTestimonial = {
  avatarUrl: string;
  name: string;
  quote: string;
  role: string;
};

export type LandingPlan = {
  buttonTitle: string;
  currentPrice: string;
  discountPercentage?: number;
  isBestOption?: boolean;
  oldPrice?: string;
  plan: Exclude<UserPlan, null>;
  resources: string[];
  subtitle: string;
  title: string;
};

export const landingImages = {
  heroImage1: {
    alt: "Mulher em loja usando celular para organizar produtos",
    src: "/imgs/img_transform.png",
  },
  heroImage2: {
    alt: "Mulher em loja usando celular para organizar produtos",
    src: "/imgs/img_transform2.png",
  },
  heroImage3: {
    alt: "Mulher em loja usando celular para organizar produtos",
    src: "/imgs/img_transform3.png",
  },
  logo: {
    alt: "Símbolo da PicLoja",
    src: "/imgs/picloja_logo.png",
  },
  logoText: {
    alt: "Logotipo textual da PicLoja",
    src: "/imgs/picloja_logo_text.png",
  },
  seal: {
    alt: "Profissional em ambiente de trabalho representando suporte e organização",
    src: "/imgs/picloja-support-real.jpg",
  },
  showcase: {
    alt: "Profissional usando celular e notebook para preparar um produto digital",
    src: "/imgs/dashboard.png",
  },
  workflow: {
    alt: "Profissional trabalhando no notebook durante a criação dos produtos",
    src: "/imgs/picloja-workflow-real.jpg",
  },
} as const;

export const landingPageContent = {
  about: {
    button: "Testar gratuitamente",
    buttonAcess: "Acessar meu painel",
    description:
      "PicLoja é uma ferramenta web que transforma uma foto em um produto pronto para divulgar de forma simples, rápida e profissional.",
    extra:
      "Envie a imagem, deixe a IA organizar a apresentação e receba um material visual pronto para usar em vendas, anúncios e conversas com clientes.",
    title: "O que é a PicLoja?",
  },
  faq: {
    description: "Veja abaixo as perguntas mais comuns.",
    title: "Ficou com alguma dúvida?",
  },
  features: {
    description: "Veja abaixo alguns dos recursos que você terá acesso.",
    title: "Recursos",
  },
  plans: {
    description:
      "Escolha o plano ideal para transformar mais fotos em produtos e acelerar sua rotina de publicação.",
    title: "Pacotes",
  },
  footer: {
    copyright:
      "2026, desenvolvido para a apresentação da PicLoja com foco em conversão.",
    description: "Transforme uma foto em produto e venda pelo WhatsApp.",
    legalTitle: "Termos e Políticas",
    navigationTitle: "Navegue",
    sealDescription:
      "Composição local para a área institucional, sem depender de imagens externas.",
    sealTitle: "Confiabilidade",
  },
  header: {
    cta: "Falar com especialista",
    supportText: "Uma foto entra. Um produto pronto sai.",
  },
  hero: {
    badge: "Webtool para gerar produto com IA",
    cta: "Testar gratuitamente",
    description:
      "Envie uma foto e receba um produto pronto para divulgar, com aparência profissional e muito menos esforço manual.",
    helperText:
      "A PicLoja foi pensada para quem precisa acelerar a criação visual sem depender de uma produção completa.",
    title: "Uma foto entra, um produto sai",
  },
  meta: {
    description:
      "Landing page de referência da PicLoja para apresentar uma webtool que transforma uma foto em um produto pronto para divulgar.",
    title: "PicLoja | Transforme uma foto em produto",
  },
  testimonials: {
    description:
      "Quem usa a PicLoja consegue sair da imagem bruta para um produto apresentável em muito menos tempo.",
    title: "Casos de sucesso",
  },
  workflow: {
    description:
      "Um processo objetivo para sair da foto bruta e chegar a um produto pronto para compartilhar.",
    title: "Como funciona?",
  },
} as const;

export const landingNavItems: LandingNavItem[] = [
  { href: "#o-que-e", label: "O que é a PicLoja?" },
  { href: "#recursos", label: "Recursos" },
  { href: "#planos", label: "Pacotes" },
  { href: "#depoimentos", label: "Casos de sucesso" },
  { href: "#duvidas", label: "Dúvidas" },
];

export const landingHighlights: LandingHighlight[] = [
  {
    label: "Gere produtos em segundos",
    value: "Transformação em segundos",
  },
  {
    label: "Fluxo simples e objetivo",
    value: "1 foto vira 1 produto",
  },
  {
    label: "Saída pronta para uso",
    value: "WhatsApp e redes sociais",
  },
];

export const landingSteps: LandingStep[] = [
  {
    description:
      "Envie a foto que deseja transformar e escolha o tipo de resultado que quer gerar.",
    number: "1",
    title: "Selecione sua foto",
  },
  {
    description:
      "A PicLoja organiza o visual, recorta, melhora a apresentação e monta a estrutura do produto automaticamente.",
    number: "2",
    title: "Gere o produto com IA",
  },
  {
    description:
      "Ajuste o texto final e use o material gerado para divulgar no WhatsApp, Instagram, status ou onde preferir.",
    number: "3",
    title: "Use e compartilhe o resultado",
  },
];

export const landingFeatures: LandingFeature[] = [
  {
    description:
      "Capture ou envie uma única imagem e transforme esse arquivo no ponto de partida do produto final.",
    icon: "camera",
    title: "Entrada por foto",
  },
  {
    description:
      "A IA monta a apresentação do produto em segundos, reduzindo o trabalho manual na criação.",
    icon: "magicWand",
    title: "Geração de produtos por IA",
  },
  {
    description:
      "Ajuste títulos, descrições e informações finais antes de usar o material gerado.",
    icon: "pencil",
    title: "Informações editáveis",
  },
  {
    description:
      "Organize a imagem com um enquadramento mais limpo e uma leitura visual mais clara para o produto.",
    icon: "image",
    title: "Remoção de background",
  },
  {
    description:
      "Aplique sua identidade no resultado gerado para manter consistência entre produto e comunicação.",
    icon: "idCard",
    title: "Sua identidade",
  },
  {
    description:
      "Use a ferramenta no celular ou no desktop para gerar produtos de onde estiver.",
    icon: "mobile",
    title: "Uso em qualquer dispositivo",
  },
];

export const landingTestimonials: LandingTestimonial[] = [
  {
    avatarUrl: "/imgs/picloja-avatar-mariana-real.jpg",
    name: "Mariana Costa",
    quote:
      "Eu enviei a foto e, em poucos instantes, já tinha um produto muito mais apresentável para divulgar.",
    role: "Boutique Essência",
  },
  {
    avatarUrl: "/imgs/picloja-avatar-joao-real.jpg",
    name: "João Ribeiro",
    quote:
      "O que antes levava tempo de edição agora virou um processo simples. A foto entra e o produto sai pronto.",
    role: "Casa Monlevade",
  },
  {
    avatarUrl: "/imgs/picloja-avatar-luiza-real.jpg",
    name: "Luiza Fernandes",
    quote:
      "A maior diferença foi a agilidade. Em poucos cliques eu já tinha um resultado bonito para mostrar aos clientes.",
    role: "Ateliê Horizonte",
  },
];

export const landingPlans: LandingPlan[] = [
  {
    buttonTitle: "Escolher Essencial",
    currentPrice: "R$ 9,90/mês",
    plan: "essential",
    resources: [
      "100 créditos por mês",
      "Exportação pronta para compartilhar",
      "Suporte dedicado",
    ],
    subtitle: "Para quem gera produtos ocasionalmente.",
    title: "Essencial",
  },
  {
    buttonTitle: "Escolher Avançado",
    currentPrice: "R$ 19,90/mês",
    discountPercentage: 35,
    isBestOption: false,
    oldPrice: "R$ 29,90/mês",
    plan: "advanced",
    resources: [
      "300 créditos por mês",
      "Tratamento visual avançado",
      "Exportação pronta para compartilhar",
      "Suporte dedicado",
    ],
    subtitle: "Para quem gera produtos com frequência e precisa ganhar escala.",
    title: "Avançado",
  },
  {
    buttonTitle: "Escolher Profissional",
    currentPrice: "R$ 29,90/mês",
    discountPercentage: 50,
    isBestOption: true,
    oldPrice: "R$ 59,90/mês",
    plan: "professional",
    resources: [
      "1.000 créditos por mês",
      "Tratamento visual avançado",
      "Exportação pronta para compartilhar",
      "Suporte dedicado",
    ],
    subtitle:
      "Para operações que precisam transformar muitas fotos em produtos todos os dias.",
    title: "Profissional",
  },
];

export const landingFaq = [
  {
    answer:
      "Não. Você só precisa ter a foto que deseja transformar. A PicLoja cuida da geração do produto visual.",
    question: "Preciso ter um catálogo pronto para usar a PicLoja?",
  },
  {
    answer:
      "Sim. Você pode ajustar nome, descrição, preço e outros dados antes de usar o resultado gerado.",
    question: "Posso editar as informações antes de publicar?",
  },
  {
    answer:
      "Sim. A estrutura foi pensada para funcionar bem tanto no celular quanto no desktop.",
    question: "A PicLoja funciona bem em dispositivos móveis?",
  },
  {
    answer:
      "Na maioria dos cenários, em poucos segundos ou minutos você já consegue sair da foto e chegar a um produto pronto para divulgar.",
    question: "Quanto tempo leva para gerar um produto?",
  },
  {
    answer:
      "Sim. Depois de publicar, basta compartilhar o link com seus clientes no WhatsApp, Instagram ou no canal que fizer mais sentido.",
    question: "Posso compartilhar no WhatsApp e nas redes sociais?",
  },
];

export const footerNavigationItems = [
  { href: "#o-que-e", label: "O que é a PicLoja?" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#recursos", label: "Recursos" },
  { href: "#planos", label: "Pacotes" },
  { href: "#duvidas", label: "Dúvidas" },
];

export const footerContactItems = [
  { label: "João Monlevade - MG" },
  { href: "tel:+5531912341234", label: "31 91234-1234" },
  { href: "mailto:contato@picloja.com.br", label: "contato@picloja.com.br" },
];

export const footerLegalItems = [
  { href: "#", label: "Política de Privacidade" },
  { href: "#", label: "Termos de Uso" },
];
