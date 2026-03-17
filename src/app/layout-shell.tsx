"use client";

import Footer from "@/components/elements/Footer";
import LandingHeader from "@/components/elements/LandingHeader";
import Paragraph from "@/components/typography/Paragraph";
import { getAuthenticatedUserProfile } from "@/lib/firebase/users";
import {
  footerContactItems,
  footerLegalItems,
  footerNavigationItems,
  landingImages,
  landingNavItems,
  landingPageContent,
} from "@/mocks/piclojaLanding";
import { useAuthStore } from "@/stores/auth-store";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LayoutShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authenticatedUser = useAuthStore((state) => state.user);
  const syncAuthenticatedUser = useAuthStore((state) => state.syncUser);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    let isCancelled = false;

    const refreshAuthenticatedUser = async () => {
      if (!authenticatedUser?.id) {
        return;
      }

      try {
        const userProfile = await getAuthenticatedUserProfile(authenticatedUser.id);

        if (isCancelled) {
          return;
        }

        syncAuthenticatedUser({
          id: userProfile.id,
          name: userProfile.name,
          email: userProfile.email,
          activePlan: userProfile.activePlan,
          availableCredits: userProfile.availableCredits,
          consumedCredits: userProfile.consumedCredits,
          ...(userProfile.avatarUrl ? { avatarUrl: userProfile.avatarUrl } : {}),
        });
      } catch (error) {
        if (!isCancelled) {
          console.error("Nao foi possivel atualizar o usuario autenticado:", error);
        }
      }
    };

    void refreshAuthenticatedUser();

    return () => {
      isCancelled = true;
    };
  }, [authenticatedUser?.id, syncAuthenticatedUser]);

  return (
    <>
      <LandingHeader.Root
        className="relative border-none bg-primary-500"
        size="lg"
        sticky={false}
      >
        <LandingHeader.Left className="gap-4">
          <LandingHeader.Logo
            alt={landingImages.logoText.alt}
            className="!h-8 sm:!h-9 lg:!h-10"
            src={landingImages.logoText.src}
          />
        </LandingHeader.Left>

        <LandingHeader.Center>
          <LandingHeader.Nav className="justify-center gap-5 lg:gap-8">
            {landingNavItems.map((item) => (
              <LandingHeader.Nav.Item
                href={item.href}
                key={item.href}
                onClick={closeMobileMenu}
              >
                {item.label}
              </LandingHeader.Nav.Item>
            ))}
          </LandingHeader.Nav>
        </LandingHeader.Center>

        <LandingHeader.Right className="gap-3">
          <LandingHeader.MobileMenuToggle
            className="text-foreground"
            onToggle={
              ((open: boolean) => {
                setIsMobileMenuOpen(open);
              }) as never
            }
            open={isMobileMenuOpen}
            type="button"
          />
        </LandingHeader.Right>

        <LandingHeader.MobileMenuPanel
          cta={
            <LandingHeader.CTA
              className="w-full !justify-center !rounded-lg !bg-foreground !py-3 !text-white"
              label={landingPageContent.header.cta}
              type="button"
            />
          }
          open={isMobileMenuOpen}
        >
          {landingNavItems.map((item) => (
            <LandingHeader.Nav.Item
              href={item.href}
              key={`mobile-${item.href}`}
              onClick={closeMobileMenu}
            >
              {item.label}
            </LandingHeader.Nav.Item>
          ))}
        </LandingHeader.MobileMenuPanel>
      </LandingHeader.Root>

      {children}

      <Footer.Root bordered={false} className="bg-background" id="contato">
        <Footer.Top className="gap-8 !py-14" columns={4}>
          <Footer.Column className="items-start">
            <div className="flex flex-col items-start gap-5">
              <div className="flex items-center gap-3">
                <Image
                  alt={landingImages.logoText.alt}
                  className="h-auto w-auto"
                  height={44}
                  src={landingImages.logoText.src}
                  width={190}
                />
              </div>
              <Paragraph
                className="max-w-xs text-sm leading-7 text-foreground/70 sm:text-base font-normal"
                content={landingPageContent.footer.description as never}
              />
              <div className="space-y-2">
                {footerContactItems.map((item) =>
                  item.href ? (
                    <a
                      className="block text-sm text-foreground/75 transition hover:text-foreground hover:underline"
                      href={item.href}
                      key={item.label}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="block text-sm text-foreground/75" key={item.label}>
                      {item.label}
                    </span>
                  ),
                )}
              </div>
            </div>
          </Footer.Column>

          <Footer.Column
            className="items-start"
            items={footerNavigationItems}
            title={landingPageContent.footer.navigationTitle}
          />

          <Footer.Column
            className="items-start"
            items={footerLegalItems}
            title={landingPageContent.footer.legalTitle}
          />
        </Footer.Top>

        <Footer.Bottom bordered className="bg-white/45">
          <div className="flex w-full flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
            <span>
              Desenvolvido por{" "}
              <a
                href="https://www.plssistemas.com.br"
                rel="noopener noreferrer"
                target="_blank"
              >
                PLS Sistemas
              </a>
            </span>
          </div>
        </Footer.Bottom>
      </Footer.Root>
    </>
  );
}
