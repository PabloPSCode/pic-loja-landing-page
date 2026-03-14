"use client";

import NoImageCard from "@/components/cards/NoImageCard";
import ProductManageCard from "@/components/cards/ProductManageCard";
import ShareControllerCard, {
  IProductData,
} from "@/components/cards/ShareControllerCard";
import SimpleProductCard from "@/components/cards/SimpleProductCard";
import UserCard from "@/components/cards/UserCard";
import StepIndicator from "@/components/miscellaneous/StepIndicator";
import { mockedUserData } from "@/mocks";
import { type AuthUser, useAuthStore } from "@/stores/auth-store";
import {
  CameraIcon,
  CircleNotchIcon,
  MagicWandIcon,
  ShareNetworkIcon,
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
import { PublishTabService } from "./services/publishTabService";
import { createProduct } from "@/lib/firebase/products";
import { uploadGeneratedProductImage } from "@/lib/firebase/storage";

const TOTAL_STEPS = 3;

type ActiveStep = "upload" | "generate" | "result";

interface ImageObjectAnalysisResponse {
  title: string | null;
  description: string | null;
  containsObject: boolean;
}

interface IUserData {
  name: string;
  usedCredits: number;
  totalCredits: number;
}

export default function Start() {
  const authenticatedUser = useAuthStore((state) => state.user);

  const [activeStep, setActiveStep] = useState<ActiveStep>("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isProductGenerated, setIsProductGenerated] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isProductSaved, setIsProductSaved] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const generationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const [productData, setProductData] = useState<IProductData>({
    title: "",
    description: "",
    price: 0,
    bgColor: "",
    showPrice: false,
    showLogo: true,
    imageUrl: "",
    userId: "",
  });

  const logUserIn = useAuthStore((state) => state.login);
  const userData: IUserData = {
    name: authenticatedUser?.name || "Usuário",
    usedCredits: mockedUserData.usedCredits,
    totalCredits: mockedUserData.totalCredits,
  };

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

    if (activeStep === "generate") {
      return {
        icon: <MagicWandIcon size={22} weight="fill" />,
        title: "Geração do produto",
      };
    }

    return {
      icon: <ShareNetworkIcon size={22} weight="fill" />,
      title: "Compartilhamento",
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
    setProductData({
      title: "",
      description: "",
      price: 0,
      imageUrl: nextPreviewUrl,
      userId: authenticatedUser?.id ?? "",
      bgColor: "",
      showPrice: false,
      showLogo: true,
    });
    setGenerationError(null);
    setActiveStep("upload");
    setIsGenerating(false);
    setIsProductGenerated(false);
    setIsProductSaved(false);
    event.currentTarget.value = "";
  };

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setUploadedFile(null);
    setPreviewUrl(null);
    setProductData({
      title: "",
      description: "",
      price: 0,
      imageUrl: "",
      userId: authenticatedUser?.id ?? "",
      bgColor: "",
      showPrice: false,
      showLogo: true,
    });
    setGenerationError(null);
    setActiveStep("upload");
    setIsGenerating(false);
    setIsProductGenerated(false);
    setIsProductSaved(false);
  };

  const removeBg = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("/api/remove-bg", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Nao foi possivel remover o fundo da imagem.");
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    setProductData((prev) => ({
      ...prev,
      imageUrl,
    }));
  };

  const requestProductCopyFromUploadedImage = async (
    file: File,
  ): Promise<ImageObjectAnalysisResponse> => {
    const formData = new FormData();

    formData.append("image", file);

    const response = await fetch("/api/chats", {
      method: "POST",
      body: formData,
    });

    const payload = (await response.json().catch(() => null)) as
      | (ImageObjectAnalysisResponse & { error?: string })
      | { error?: string }
      | null;

    if (!response.ok) {
      throw new Error(
        payload && "error" in payload && typeof payload.error === "string"
          ? payload.error
          : "Nao foi possivel analisar a imagem enviada.",
      );
    }

    if (
      !payload ||
      !("containsObject" in payload) ||
      typeof payload.containsObject !== "boolean"
    ) {
      throw new Error("A API retornou um formato de resposta invalido.");
    }

    return {
      title:
        "title" in payload &&
        (typeof payload.title === "string" || payload.title === null)
          ? payload.title
          : null,
      description:
        "description" in payload &&
        (typeof payload.description === "string" ||
          payload.description === null)
          ? payload.description
          : null,
      containsObject: payload.containsObject,
    };
  };

  const startProductGeneration = async () => {
    if (!uploadedFile) return;

    setGenerationError(null);
    setActiveStep("generate");
    setIsGenerating(true);
    setIsProductGenerated(false);

    if (generationTimeoutRef.current) {
      clearTimeout(generationTimeoutRef.current);
    }

    try {
      const [analysis] = await Promise.all([
        removeBg(uploadedFile).then(() =>
          requestProductCopyFromUploadedImage(uploadedFile),
        ),
        new Promise((resolve) => {
          generationTimeoutRef.current = setTimeout(() => {
            generationTimeoutRef.current = null;
            resolve(true);
          }, 3000);
        }),
      ]);

      if (
        !analysis.containsObject ||
        !analysis.title ||
        !analysis.description
      ) {
        setGenerationError(
          "Nao encontramos um unico objeto claro na imagem. Envie outra foto para gerar o produto.",
        );
        setIsGenerating(false);
        setActiveStep("upload");
        return;
      }

      setProductData((prev) => ({
        ...prev,
        title: analysis.title!,
        description: analysis.description!,
      }));
      setIsGenerating(false);
      setIsProductGenerated(true);
    } catch (error) {
      if (generationTimeoutRef.current) {
        clearTimeout(generationTimeoutRef.current);
        generationTimeoutRef.current = null;
      }

      setGenerationError(
        error instanceof Error
          ? error.message
          : "Nao foi possivel gerar o produto a partir da imagem enviada.",
      );
      setIsGenerating(false);
      setIsProductGenerated(false);
      setActiveStep("upload");
    }
  };

  const handleGenerateProduct = async () => {
    if (!uploadedFile) return;

    if (!authenticatedUser) {
      setShowAuthModal(true);
      return;
    }

    await startProductGeneration();
  };

  const mapActiveStepToIndex = (step: ActiveStep) => {
    switch (step) {
      case "upload":
        return 1;
      case "generate":
        return 2;
      case "result":
        return 3;
      default:
        return 1;
    }
  };

  const handleAuthenticate = ({ id, name, email, avatarUrl }: AuthUser) => {
    logUserIn(id, name, email, avatarUrl);
    setShowAuthModal(false);
    startProductGeneration();
  };

  const handleToggleAuthModal = () => {
    setShowAuthModal((prev) => !prev);
  };

  const handleSaveProduct = useCallback(
    async (product: IProductData) => {
      if (!authenticatedUser?.id) {
        setGenerationError("Faça login novamente antes de salvar o produto.");
        setShowAuthModal(true);
        return;
      }

      if (!product.imageUrl) {
        setGenerationError("A imagem gerada do produto não foi encontrada.");
        return;
      }

      const payload: IProductData = {
        ...product,
        userId: authenticatedUser.id,
      };

      setIsSavingProduct(true);
      setGenerationError(null);

      try {
        const persistedImageUrl = await uploadGeneratedProductImage(
          payload.imageUrl,
          payload.userId,
          payload.title,
        );
        const persistedProduct: IProductData = {
          ...payload,
          imageUrl: persistedImageUrl,
        };

        await createProduct({
          title: persistedProduct.title,
          description: persistedProduct.description,
          price: persistedProduct.price,
          imageUrl: persistedProduct.imageUrl,
          userId: persistedProduct.userId,
          bgColor: persistedProduct.bgColor,
        });

        setProductData(persistedProduct);
        setIsProductSaved(true);
        setActiveStep("result");
      } catch (error) {
        setGenerationError(
          error instanceof Error
            ? error.message
            : "Nao foi possivel salvar o produto no Firestore.",
        );
      } finally {
        setIsSavingProduct(false);
      }
    },
    [authenticatedUser?.id],
  );

  const handleDownloadGeneratedProduct = useCallback(async () => {
    try {
      await PublishTabService.downloadProductImage(productData, {
        avatarUrl: authenticatedUser?.avatarUrl,
      });
    } catch (error) {
      console.error("Erro ao salvar imagem do produto:", error);
    }
  }, [authenticatedUser?.avatarUrl, productData]);

  const handleLogout = () => {
    setActiveStep("upload");
    setUploadedFile(null);
    setPreviewUrl(null);
    setIsGenerating(false);
    setIsProductGenerated(false);
    setIsProductSaved(false);
    setProductData({
      title: "",
      description: "",
      price: 0,
      imageUrl: "",
      bgColor: "",
      showPrice: false,
      showLogo: true,
      userId: "",
    });
    useAuthStore.getState().logout();
  };

  const handleShareGeneratedProduct = useCallback(async () => {
    try {
      await PublishTabService.shareProductImage(productData, {
        avatarUrl: authenticatedUser?.avatarUrl,
      });
    } catch (error) {
      console.error("Erro ao compartilhar imagem do produto:", error);
    }
  }, [authenticatedUser?.avatarUrl, productData]);

  return (
    <main className="min-h-[60vh] w-full bg-white/50 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:gap-6">
        {authenticatedUser && (
          <UserCard
            userName={userData.name}
            usedCredits={userData.usedCredits}
            totalCredits={userData.totalCredits}
            onLogout={handleLogout}
          />
        )}
        <StepIndicator
          currentStep={mapActiveStepToIndex(activeStep)}
          stepIcon={stepConfig.icon}
          stepTitle={stepConfig.title}
          totalSteps={TOTAL_STEPS}
        />
        {generationError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {generationError}
          </div>
        )}

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
        ) : activeStep === "generate" && !isProductGenerated ? (
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
        ) : activeStep === "generate" && isProductGenerated ? (
          <section className="w-full rounded-xl border border-foreground/10 bg-bg-card p-5 shadow-sm sm:p-8">
            <h3 className="text-base font-semibold text-foreground sm:text-xl">
              Resultado do produto
            </h3>

            <ProductManageCard
              disabled={isSavingProduct}
              logoAvailable={Boolean(authenticatedUser?.avatarUrl)}
              product={productData}
              onChange={setProductData}
              onSave={handleSaveProduct}
              saveButtonLabel={isSavingProduct ? "Salvando..." : "Salvar produto"}
            />
          </section>
        ) : activeStep === "result" && isProductSaved ? (
          <section className="w-full rounded-xl border border-foreground/10 bg-bg-card p-5 shadow-sm sm:p-8">
            <h3 className="text-base font-semibold text-foreground sm:text-xl mb-4">
              Produto salvo com sucesso!
            </h3>

            <SimpleProductCard
              title={productData.title}
              description={productData.description}
              bgColor={productData.bgColor}
              imgUrl={productData.imageUrl}
              price={productData.price}
            />
            <div className="w-full mt-4">
              <ShareControllerCard
                title="Compartilhe seu produto"
                onSave={handleDownloadGeneratedProduct}
                onShare={handleShareGeneratedProduct}
              />
            </div>
          </section>
        ) : null}
      </div>
      {showAuthModal && !authenticatedUser && (
        <LoginModal
          open={showAuthModal}
          onClose={handleToggleAuthModal}
          onAuthenticate={handleAuthenticate}
        />
      )}
    </main>
  );
}
