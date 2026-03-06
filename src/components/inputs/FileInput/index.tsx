'use client';

import clsx from "clsx";
import { forwardRef, type ChangeEvent, type InputHTMLAttributes } from "react";

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Rótulo do campo de upload */
  label: string;
  /** Texto de instrução para o campo de upload */
  instructionText?: string;
  /** Texto do botão de upload */
  buttonTitle?: string;
  /** Função a ser chamada ao fazer upload do arquivo */
  onUpload?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** Classes adicionais para o contêiner */
  containerClassName?: string;
  /** Classes adicionais para o rótulo */
  labelClassName?: string;
  /** Classes adicionais para o texto de instrução */
  instructionClassName?: string;
  /** Classes adicionais para o botão visual do input */
  buttonClassName?: string;
}

/** Componente de input de arquivo com texto de instrução.*/
const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      label,
      instructionText,
      buttonTitle,
      onUpload,
      containerClassName,
      labelClassName,
      instructionClassName,
      buttonClassName,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={clsx("flex w-full flex-col", containerClassName)}>
        <span
          className={clsx(
            "mb-1 text-xs text-foreground sm:text-sm lg:text-sm",
            labelClassName
          )}
        >
          {label}
        </span>
        {instructionText && (
          <span
            className={clsx(
              "mb-1 text-xs text-foreground/70 sm:text-sm lg:text-sm",
              instructionClassName
            )}
          >
            {instructionText}
          </span>
        )}
        <input
          className="z-10 mb-[-3rem] h-[3rem] w-full cursor-pointer opacity-0"
          ref={ref}
          onChange={onUpload}
          type="file"
          {...rest}
        />
        <button
          type="button"
          className={clsx(
            "flex h-[3rem] w-full items-center justify-center rounded-lg border text-xs font-medium transition-colors sm:text-sm",
            "border-foreground/15 bg-tertiary-100 text-foreground hover:bg-tertiary-200",
            "dark:border-foreground/20 dark:bg-tertiary-800 dark:hover:bg-tertiary-700",
            buttonClassName
          )}
        >
          {buttonTitle ? buttonTitle : "Selecione um arquivo"}
        </button>
      </div>
    );
  }
);

FileInput.displayName = "FileInput";
export default FileInput;
