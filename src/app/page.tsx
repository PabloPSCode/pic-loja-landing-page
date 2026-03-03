"use client";
import LandingHeader from "@/components/elements/LandingHeader";
import VideoSection from "@/components/elements/VideoSection";
import Image from "next/image";

export default function Home() {
  const handleVisitDocs = () => {
    window.open("https://docs.reactultimate.pablosilvadev.com.br", "_blank");
  };

  return (
    <div className="font-sans overflow-x-hidden">
      <main className="flex flex-col">
        <LandingHeader.Root>
          <LandingHeader.Left>
            <Image src="/react.png" alt="Logo" width={50} height={50} />
            <span>NextJS - Tailwind Landing Page Template</span>
          </LandingHeader.Left>
        </LandingHeader.Root>
        <VideoSection
          description="Template para criação de landing pages utilizando componentes React"
          videoUrl="/videos/landing-pages.mov"
          title="NextJS + Tailwind Landing Page Template"
          size="full"
          primaryButtonTitle="Explorar documentação"
          onPrimaryClick={handleVisitDocs}
          containerClassName="h-[calc(100vh-4.5rem)]"
        />
      </main>
    </div>
  );
}
