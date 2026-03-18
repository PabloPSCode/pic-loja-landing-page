"use client";

import FadeContainer from "@/components/animations-and-loading/FadeContainer";
import RevealContainer from "@/components/animations-and-loading/RevealContainer";
import ZoomContainer from "@/components/animations-and-loading/ZoomContainer";
import Button from "@/components/buttons/Button";
import DealCard from "@/components/cards/DealCard";
import InfoCard from "@/components/cards/InfoCard";
import TestimonialCard from "@/components/cards/TestimonialCard";
import { HeroSection } from "@/components/elements/HeroSection";
import { Section } from "@/components/elements/Section";
import { Accordeon } from "@/components/miscellaneous/Accordeon";
import Paragraph from "@/components/typography/Paragraph";
import Subtitle from "@/components/typography/Subtitle";
import Title from "@/components/typography/Title";
import {
  landingFaq,
  landingFeatures,
  landingHighlights,
  landingImages,
  landingPageContent,
  landingPlans,
  landingSteps,
  landingTestimonials,
} from "@/mocks/piclojaLanding";
import { useAuthStore } from "@/stores/auth-store";
import {
  CameraIcon,
  DeviceMobileIcon,
  IdentificationCardIcon,
  ImageSquareIcon,
  MagicWandIcon,
  PencilSimpleLineIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const featureIcons = {
    camera: CameraIcon,
    idCard: IdentificationCardIcon,
    image: ImageSquareIcon,
    magicWand: MagicWandIcon,
    mobile: DeviceMobileIcon,
    pencil: PencilSimpleLineIcon,
  } as const;

  const handleSeePlanDetails = () => undefined;

  const navigate = useRouter();

  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-background text-foreground" id="topo">
      <main className="overflow-x-hidden">
        <HeroSection
          sectionClassName="relative overflow-hidden bg-gradient-to-r from-primary-500 to-secondary-500 px-0 py-0"
          size="full"
        >
          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-16 pt-10 sm:px-8 lg:grid-cols-[1fr_0.92fr] lg:px-10 lg:pb-24">
            <RevealContainer className="flex flex-col items-start" once>
              <Title
                className="mt-6 max-w-3xl text-4xl leading-[1.04] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-7xl font-bold"
                content={landingPageContent.hero.title}
                element="h1"
              />

              <Paragraph
                className="mt-6 max-w-xl text-base leading-8 text-foreground/80 sm:text-lg md:text-xl font-normal"
                content={landingPageContent.hero.description}
              />
              <div className="bg-image-[url('/imgs/picloja-hero-real.jpg')] w-full h-full" />

              <div className="mt-8">
                <Button
                  className="!rounded-md !bg-foreground !px-6 !py-4 !text-white hover:!bg-tertiary-800"
                  label={
                    user?.email
                      ? landingPageContent.about.buttonAcess
                      : landingPageContent.about.button
                  }
                  type="button"
                  onClick={() => navigate.push("/start")}
                />
              </div>

              <div className="mt-10 grid w-full gap-4 sm:grid-cols-3">
                {landingHighlights.map((highlight) => (
                  <div
                    className="rounded-2xl border border-foreground/8 bg-white/70 p-5 shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
                    key={highlight.label}
                  >
                    <Subtitle
                      className="text-sm leading-6 text-foreground sm:text-base font-semibold"
                      content={highlight.value}
                      element="h2"
                    />
                    <Paragraph
                      className="mt-2 text-sm leading-6 text-foreground/65 font-normal"
                      content={highlight.label}
                    />
                  </div>
                ))}
              </div>
            </RevealContainer>

            <ZoomContainer className="w-full" once>
              <div className="relative mx-auto w-full max-w-[40rem]">
                <div className="absolute -left-6 top-14 h-48 w-48 rounded-full bg-secondary-400/55 blur-3xl" />
                <div className="absolute right-4 top-6 h-56 w-56 rounded-full bg-white/25 blur-3xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/35 bg-white/15 p-4 shadow-[0_30px_60px_rgba(0,0,0,0.16)] backdrop-blur-sm">
                  <Image
                    alt={landingImages.hero.alt}
                    className="h-auto w-full rounded-[1.5rem]"
                    height={520}
                    priority
                    src={landingImages.hero.src}
                    width={720}
                  />
                </div>
              </div>
            </ZoomContainer>
          </div>
        </HeroSection>

        <div id="o-que-e">
          <Section
            sectionClassName="px-6 py-16 sm:px-8 lg:px-10 lg:py-24"
            size="middle"
          >
            <FadeContainer
              className="flex w-full flex-col items-center text-center"
              once
            >
              <Title
                className="text-3xl tracking-[-0.02em] sm:text-4xl lg:text-5xl font-bold"
                content={landingPageContent.about.title}
                element="h2"
              />
            </FadeContainer>

            <div className="mt-14 grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <ZoomContainer className="w-full" once>
                <div className="relative mx-auto max-w-[40rem] rounded-[2rem] border border-foreground/6 bg-white p-4 shadow-[0_22px_50px_rgba(0,0,0,0.08)]">
                  <div className="absolute inset-x-10 bottom-2 h-8 rounded-full bg-tertiary-300/35 blur-2xl" />
                  <Image
                    alt={landingImages.showcase.alt}
                    className="relative h-auto w-full rounded-[1.5rem]"
                    height={500}
                    src={landingImages.showcase.src}
                    width={720}
                  />
                </div>
              </ZoomContainer>

              <RevealContainer className="w-full" once>
                <div className="rounded-[2rem] bg-transparent p-2">
                  <Paragraph
                    className="text-base leading-8 text-foreground/78 sm:text-xl font-normal"
                    content={landingPageContent.about.description}
                  />
                  <Paragraph
                    className="mt-6 text-base leading-8 text-foreground/72 sm:text-xl font-normal"
                    content={landingPageContent.about.extra}
                  />
                  <Button
                    className="mt-8 !rounded-md !bg-primary-600 font-bold !px-6 !py-4 !text-foreground hover:!bg-primary-700"
                    label={
                      user?.email
                        ? landingPageContent.about.buttonAcess
                        : landingPageContent.about.button
                    }
                    type="button"
                    onClick={() => navigate.push("/start")}
                  />
                </div>
              </RevealContainer>
            </div>
          </Section>
        </div>

        <div id="como-funciona">
          <Section
            sectionClassName="px-6 py-16 sm:px-8 lg:px-10 lg:py-24"
            size="middle"
          >
            <FadeContainer
              className="flex w-full flex-col items-center text-center"
              once
            >
              <Title
                className="text-3xl tracking-[-0.02em] sm:text-4xl lg:text-5xl font-bold"
                content={landingPageContent.workflow.title}
                element="h2"
              />
              <Paragraph
                className="mt-4 max-w-3xl text-base leading-8 text-foreground/65 sm:text-lg font-normal"
                content={landingPageContent.workflow.description}
              />
            </FadeContainer>

            <div className="mt-14 grid w-full items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
              <RevealContainer className="w-full" once>
                <div className="space-y-8">
                  {landingSteps.map((step) => (
                    <div
                      className="rounded-[1.75rem] bg-transparent p-1"
                      key={step.number}
                    >
                      <div className="flex items-start gap-5">
                        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-3xl font-bold text-foreground shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
                          {step.number}
                        </span>
                        <div className="flex flex-col">
                          <Subtitle
                            className="text-xl leading-8 sm:text-2xl font-semibold"
                            content={step.title}
                            element="h3"
                          />
                          <Paragraph
                            className="mt-3 text-base leading-8 text-foreground/68 sm:text-lg font-normal"
                            content={step.description}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </RevealContainer>

              <ZoomContainer className="w-full" once>
                <div className="relative mx-auto max-w-[38rem] rounded-[2rem] border border-foreground/6 bg-white p-4 shadow-[0_22px_50px_rgba(0,0,0,0.08)]">
                  <div className="absolute inset-x-10 bottom-2 h-8 rounded-full bg-tertiary-300/35 blur-2xl" />
                  <Image
                    alt={landingImages.workflow.alt}
                    className="relative h-auto w-full rounded-[1.5rem]"
                    height={440}
                    src={landingImages.workflow.src}
                    width={720}
                  />
                </div>
              </ZoomContainer>
            </div>
          </Section>
        </div>

        <div id="recursos">
          <Section
            sectionClassName="w-full bg-white/55 px-0 py-16 sm:py-20 lg:py-24"
            size="full"
          >
            <div className="w-full max-w-7xl px-6 sm:px-8 lg:px-10">
              <FadeContainer className="flex w-full flex-col items-start" once>
                <Title
                  className="text-3xl tracking-[-0.02em] sm:text-4xl lg:text-5xl font-bold"
                  content={landingPageContent.features.title}
                  element="h2"
                />
                <Paragraph
                  className="mt-4 max-w-3xl text-base leading-8 text-foreground/65 sm:text-lg font-normal"
                  content={landingPageContent.features.description}
                />
              </FadeContainer>

              <FadeContainer className="mt-12" once>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {landingFeatures.map((feature) => (
                    <div className="h-full [&>div]:h-full" key={feature.title}>
                      <InfoCard
                        icon={(() => {
                          const FeatureIcon = featureIcons[feature.icon];

                          return (
                            <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-primary-200 bg-white text-primary-700 shadow-[0_8px_18px_rgba(0,0,0,0.06)]">
                              <FeatureIcon
                                className="h-7 w-7"
                                weight="regular"
                              />
                            </span>
                          );
                        })()}
                        text={feature.description}
                        title={feature.title}
                      />
                    </div>
                  ))}
                </div>
              </FadeContainer>
            </div>
          </Section>
        </div>

        <div id="planos">
          <Section
            sectionClassName="px-6 py-16 sm:px-8 lg:px-10 lg:py-24"
            size="middle"
          >
            <FadeContainer
              className="flex w-full flex-col items-center text-center"
              once
            >
              <Title
                className="text-3xl tracking-[-0.02em] sm:text-4xl lg:text-5xl font-bold"
                content={landingPageContent.plans.title}
                element="h2"
              />
              <Paragraph
                className="mt-4 max-w-3xl text-base leading-8 text-foreground/65 sm:text-lg font-normal"
                content={landingPageContent.plans.description}
              />
            </FadeContainer>

            <FadeContainer className="mt-12 w-full" once>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {landingPlans.map((plan) => (
                  <div className="h-full" key={plan.title}>
                    <DealCard
                      buttonClassName={
                        plan.isBestOption
                          ? "!bg-foreground !text-white hover:!bg-tertiary-800"
                          : "!border-foreground/20 !text-foreground hover:!bg-black/5"
                      }
                      buttonTitle={plan.buttonTitle}
                      className={
                        plan.isBestOption
                          ? "h-full border-primary-300 shadow-[0_18px_40px_rgba(124,255,58,0.16)]"
                          : "h-full border-foreground/8 shadow-[0_14px_30px_rgba(0,0,0,0.06)]"
                      }
                      currentPrice={plan.currentPrice}
                      currentPriceClassName="!text-foreground"
                      discountPercentage={plan.discountPercentage}
                      isBestOption={plan.isBestOption}
                      oldPrice={plan.oldPrice}
                      onSeeDetails={handleSeePlanDetails}
                      resources={plan.resources}
                      subtitle={plan.subtitle}
                      title={plan.title}
                    />
                  </div>
                ))}
              </div>
            </FadeContainer>
          </Section>
        </div>

        <div id="depoimentos">
          <Section
            sectionClassName="px-6 py-16 sm:px-8 lg:px-10 lg:py-24"
            size="middle"
          >
            <FadeContainer
              className="flex w-full flex-col items-center text-center"
              once
            >
              <Title
                className="text-3xl tracking-[-0.02em] sm:text-4xl lg:text-5xl font-bold"
                content={landingPageContent.testimonials.title}
                element="h2"
              />
              <Paragraph
                className="mt-4 max-w-3xl text-base leading-8 text-foreground/65 sm:text-lg font-normal"
                content={landingPageContent.testimonials.description}
              />
            </FadeContainer>

            <FadeContainer className="mt-12 w-full" once>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {landingTestimonials.map((testimonial) => (
                  <div className="h-full" key={testimonial.name}>
                    <TestimonialCard
                      avatarUrl={testimonial.avatarUrl}
                      testimonial={testimonial.quote}
                      userName={testimonial.name}
                      userRole={testimonial.role}
                    />
                  </div>
                ))}
              </div>
            </FadeContainer>
          </Section>
        </div>

        <div id="duvidas">
          <Section
            sectionClassName="w-full bg-white/55 px-0 py-16 sm:py-20 lg:py-24"
            size="full"
          >
            <div className="w-full max-w-7xl px-6 sm:px-8 lg:px-10">
              <FadeContainer
                className="flex w-full flex-col items-center text-center"
                once
              >
                <Title
                  className="text-3xl tracking-[-0.02em] sm:text-4xl lg:text-5xl font-bold"
                  content={landingPageContent.faq.title}
                  element="h2"
                />
                <Paragraph
                  className="mt-4 max-w-3xl text-base leading-8 text-foreground/65 sm:text-lg font-normal"
                  content={landingPageContent.faq.description}
                />
              </FadeContainer>

              <RevealContainer className="mt-12 w-full" once>
                <Accordeon
                  className="border-none bg-transparent p-0 shadow-none"
                  itemClassName="mb-4 rounded-xl border border-foreground/5 bg-white px-4 py-1 shadow-[0_10px_24px_rgba(0,0,0,0.06)] last:mb-0"
                  maxWidthClassName="max-w-none"
                  questions={landingFaq}
                  showDividers={false}
                />
              </RevealContainer>
            </div>
          </Section>
          <a
            className="fixed bottom-10 right-10 h-12 sm:h-16 bg-success-500 rounded-full flex items-center justify-center gap-3 shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition cursor-pointer p-4"
            href="https://wa.send"
          >
            <span className="text-white text-sm sm:text-base">
              Falar com especialista
            </span>
            <WhatsappLogoIcon
              className="w-8 h-8 sm:w-12 sm:h-12 text-white"
              weight="thin"
            />
          </a>
        </div>
      </main>
    </div>
  );
}
