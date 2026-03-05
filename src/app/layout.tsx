import type { Metadata } from "next";
import { Sora, Montserrat } from "next/font/google";
import { landingPageContent } from "@/mocks/piclojaLanding";
import "../styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: landingPageContent.meta.title,
  description: landingPageContent.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.variable} ${sora.variable} bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
