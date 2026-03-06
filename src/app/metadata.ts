import { landingPageContent } from "@/mocks/piclojaLanding";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: landingPageContent.meta.title,
    template: "%s | PicLoja",
  },
  description: landingPageContent.meta.description,
};
