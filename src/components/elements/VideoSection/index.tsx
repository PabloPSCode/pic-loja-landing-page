"use client";

import Button from "@/components/buttons/Button";
import Paragraph from "@/components/typography/Paragraph";
import Title from "@/components/typography/Title";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { useState } from "react";
import ReactPlayer from "react-player";

export interface VideoSectionProps {
  /** Largura da seção */
  size: "midle" | "full";
  /** Título principal */
  title: string;
  /** Texto descritivo */
  description: string;
  /** URL do vídeo de fundo */
  videoUrl: string;
  /** Exibir controles nativos do player */
  showPlayPauseButton?: boolean;
  /** Título do botão primário */
  primaryButtonTitle: string;
  /** Título do botão secundário */
  secondaryButtonTitle?: string;
  /** Callback do botão primário */
  onPrimaryClick?: () => void;
  /** Callback do botão secundário */
  onSecondaryClick?: () => void;
  /** Classe adicional do botão primário */
  primaryButtonClassName?: string;
  /** Classe adicional do botão secundário */
  secondaryButtonClassName?: string;
  /** Classe adicional do título */
  titleClassName?: string;
  /** Classe adicional da descrição */
  descriptionClassName?: string;
  /** Classe adicional do container */
  containerClassName?: string;
}

export default function VideoSection({
  size,
  title,
  description,
  videoUrl,
  showPlayPauseButton = false,
  primaryButtonTitle,
  secondaryButtonTitle,
  onPrimaryClick,
  onSecondaryClick,
  primaryButtonClassName,
  secondaryButtonClassName,
  titleClassName,
  descriptionClassName,
  containerClassName,
}: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section
      className={clsx(size === "full" ? "w-full" : "w-full max-w-7xl mx-auto")}
    >
      <div
        className={clsx(
          "relative  overflow-hidden min-h-[300px] sm:min-h-[420px] lg:min-h-[540px] w-full",
          containerClassName,
        )}
      >
        <div className="absolute inset-0 overflow-hidden">
          <ReactPlayer
            wrapper="div"
            src={videoUrl}
            playing={isPlaying}
            controls={showPlayPauseButton}
            loop
            muted
            playsInline
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
            className={clsx(
              "video-section-player !absolute !inset-0 !w-full !h-full !max-w-none !max-h-none",
              showPlayPauseButton ? "pointer-events-auto" : "pointer-events-none",
              containerClassName,
            )}
          />
        </div>

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/55 via-black/10 to-black/15" />

        {showPlayPauseButton && (
          <button
            type="button"
            aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
            onClick={() => setIsPlaying((prev) => !prev)}
            className="absolute top-3 right-3 flex items-center justify-center sm:top-4 sm:right-4 z-20 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-white/65 text-secondary-900 hover:bg-white/85 transition"
          >
            {isPlaying ? (
              <PauseIcon size={18} weight="fill" className="mx-auto" />
            ) : (
              <PlayIcon size={18} weight="fill" className="mx-auto" />
            )}
          </button>
        )}

        <div className="absolute left-4 right-4 bottom-24 sm:left-8 sm:right-8 sm:bottom-10 z-20 max-w-[82%] sm:max-w-[70%]">
          <Title
            content={title}
            element="h2"
            className={clsx(
              "text-white text-3xl sm:text-5xl md:text-6xl leading-[0.95]",
              titleClassName,
            )}
          />
          <Paragraph
            content={description}
            className={clsx(
              "mt-3 sm:mt-4 text-white/90 text-sm sm:text-base md:text-lg",
              descriptionClassName,
            )}
          />
        </div>

        <div className="absolute left-4 right-4 bottom-4 sm:left-auto sm:right-8 sm:bottom-8 z-20 flex flex-wrap gap-2 sm:gap-3 sm:justify-end">
          <Button
            label={primaryButtonTitle}
            variant="filled"
            onClick={onPrimaryClick}
            className={clsx(
              "rounded-full px-4 py-2 sm:px-6 sm:py-3 bg-white text-none hover:bg-white/85",
              primaryButtonClassName,
            )}
          />
          {secondaryButtonTitle && (
            <Button
              label={secondaryButtonTitle}
              variant="outlined"
              onClick={onSecondaryClick}
              className={clsx(
                "rounded-full px-4 py-2 sm:px-6 sm:py-3 border-white text-white hover:bg-white/15",
                secondaryButtonClassName,
              )}
            />
          )}
        </div>
      </div>
    </section>
  );
}