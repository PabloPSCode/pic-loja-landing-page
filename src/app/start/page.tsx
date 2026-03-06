"use client";

import NoImageCard from "@/components/cards/NoImageCard";
import ProductManageCard from "@/components/cards/ProductManageCard";
import SimpleProductCard from "@/components/cards/SimpleProductCard";
import UserCard from "@/components/cards/UserCard";
import StepIndicator from "@/components/miscellaneous/StepIndicator";
import { mockedProductData, mockUserData } from "@/mocks";
import {
  CameraIcon,
  CircleNotchIcon,
  MagicWandIcon,
} from "@phosphor-icons/react";
import clsx from "clsx";
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import LoginModal from "./components/LoginModal";
import ShareControllerCard from "@/components/cards/ShareControllerCard";

const TOTAL_STEPS = 3;

type ActiveStep = "upload" | "generate" | "result";

interface IUserData {
  name: string;
  usedCredits: number;
  totalCredits: number;
}

interface IProductData {
  title: string;
  imgUrl: string;
  description: string;
  price: string;
  showPrice?: boolean;
  bgColor: string;
}

export default function Start() {
  const [activeStep, setActiveStep] = useState<ActiveStep>("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userData] = useState<IUserData>(mockUserData);
  const [isProductSaved, setIsProductSaved] = useState(false);
  const generationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const [productData, setProductData] = useState<IProductData>({
    ...mockedProductData,
    showPrice: Boolean(mockedProductData.price),
  });

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      if (generationTimeoutRef.current) {
        clearTimeout(generationTimeoutRef.current);
      }
    };
  }, [previewUrl]);

  const stepConfig = useMemo(() => {
    if (activeStep === "upload") {
      return {
        icon: <CameraIcon size={22} weight="fill" />,
        title: "Seleção de imagens",
      };
    }

    return {
      icon: <MagicWandIcon size={22} weight="fill" />,
      title: "Geração de produto",
    };
  }, [activeStep]);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0];

    if (!nextFile) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const nextPreviewUrl = URL.createObjectURL(nextFile);

    setUploadedFile(nextFile);
    setPreviewUrl(nextPreviewUrl);
    setActiveStep("upload");
    setIsGenerating(false);
    event.currentTarget.value = "";
  };

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setUploadedFile(null);
    setPreviewUrl(null);
    setActiveStep("upload");
    setIsGenerating(false);
  };

  const startProductGeneration = () => {
    if (!uploadedFile) return;

    setActiveStep("generate");
    setIsGenerating(true);

    if (generationTimeoutRef.current) {
      clearTimeout(generationTimeoutRef.current);
    }

    generationTimeoutRef.current = setTimeout(() => {
      setIsGenerating(false);
      setActiveStep("result");
      generationTimeoutRef.current = null;
    }, 3000);
  };

  const handleGenerateProduct = () => {
    if (!uploadedFile) return;

    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    startProductGeneration();
  };

  const mapActiveStepToIndex = (step: ActiveStep) => {
    switch (step) {
      case "upload":
        return 1;
      case "generate":
        return 2;
      case "result":
        return 3;
    }
  };

  const handleAuthenticate = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    startProductGeneration();
  };

  const handleToggleAuthModal = () => {
    setShowAuthModal((prev) => !prev);
  };

  const handleSaveProduct = useCallback(
    (updatedProduct: IProductData) => {
      setProductData(updatedProduct);
      setIsProductSaved(true);
      console.log("Saved product:", updatedProduct);
    },
    [isProductSaved, productData],
  );

  const generateProductImage = () => {
    //GENERATE IMAGE USING CANVAS BASED ON productData
    console.log("Gerar imagem do produto:", productData);
  };

  const handleShare = () => {
    console.log("Compartilhar produto:", productData);
  };

  return (
    <main className="min-h-[60vh] w-full bg-white/50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:gap-6">
        {isAuthenticated && (
          <UserCard
            userName={userData.name}
            usedCredits={userData.usedCredits}
            totalCredits={userData.totalCredits}
          />
        )}
        <StepIndicator
          currentStep={mapActiveStepToIndex(activeStep)}
          stepIcon={stepConfig.icon}
          stepTitle={stepConfig.title}
          totalSteps={TOTAL_STEPS}
        />

        {activeStep === "upload" ? (
          <NoImageCard
            fileInputButtonTitle="Selecionar imagem"
            noImageLabel="Nenhuma imagem selecionada"
            onUpload={handleUpload}
            uploadedImage={
              uploadedFile && previewUrl
                ? {
                    fileName: uploadedFile.name,
                    imageAlt: uploadedFile.name,
                    imageSrc: previewUrl,
                    onRemove: handleRemoveImage,
                    selectedText: "1 imagem selecionada",
                    title: "Imagem selecionada:",
                    actionSlot: (
                      <button
                        className={clsx(
                          "inline-flex items-center gap-2 rounded-md px-4 py-2",
                          "bg-primary-500 text-sm font-semibold text-foreground",
                          "transition-colors hover:bg-primary-400",
                        )}
                        onClick={handleGenerateProduct}
                        type="button"
                      >
                        Gerar produto
                        <MagicWandIcon size={16} weight="fill" />
                      </button>
                    ),
                  }
                : null
            }
          />
        ) : activeStep === "generate" ? (
          <section className="w-full rounded-xl border border-foreground/10 bg-bg-card p-5 shadow-sm sm:p-8">
            <h3 className="text-base font-semibold text-foreground sm:text-xl">
              Geração do produto
            </h3>

            <div className="flex min-h-[230px] w-full flex-col items-center justify-center gap-3 text-center">
              <CircleNotchIcon
                className={clsx(
                  "text-primary-500",
                  isGenerating ? "animate-spin" : undefined,
                )}
                size={46}
                weight="bold"
              />
              <p className="text-xl font-semibold text-foreground sm:text-3xl">
                Estamos gerando seu produto
              </p>
              <p className="text-base text-foreground/75 sm:text-2xl">
                gerando 1 de 1 produto(s)
              </p>
            </div>
          </section>
        ) : activeStep === "result" && !isProductSaved ? (
          <section className="w-full rounded-xl border border-foreground/10 bg-bg-card p-5 shadow-sm sm:p-8">
            <h3 className="text-base font-semibold text-foreground sm:text-xl">
              Resultado do produto
            </h3>

            <ProductManageCard
              product={productData}
              onChange={setProductData}
              onSave={handleSaveProduct}
            />
          </section>
        ) : activeStep === "result" && isProductSaved ? (
          <section className="w-full rounded-xl border border-foreground/10 bg-bg-card p-5 shadow-sm sm:p-8">
            <h3 className="text-base font-semibold text-foreground sm:text-xl mb-4">
              Produto salvo com sucesso!
            </h3>

            <SimpleProductCard
              title={productData.title}
              description={productData.description as never}
              imgUrl={productData.imgUrl}
              price={productData.price}
            />
            <ShareControllerCard
              title="Compartilhe seu produto"
              onSave={generateProductImage}
              onShare={generateProductImage}
            />
          </section>
        ) : null}
      </div>
      {showAuthModal && (
        <LoginModal
          open={showAuthModal}
          onClose={handleToggleAuthModal}
          onAuthenticated={handleAuthenticate}
        />
      )}
    </main>
  );
}
