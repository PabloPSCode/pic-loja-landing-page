import type { IUserDocumentDTO } from "@/dtos/user.dto";
import { adminAuth } from "@/lib/firebase/admin";
import { upgradeUserPlanById } from "@/lib/firebase/admin-users";
import {
  isPaidUserPlan,
} from "@/lib/firebase/user-credits";
import { NextRequest, NextResponse } from "next/server";

interface SerializedUserDocument
  extends Omit<IUserDocumentDTO, "createdAt" | "updatedAt" | "deletedAt"> {
  createdAt: string;
  deletedAt?: string;
  updatedAt: string;
}

function getBearerToken(request: NextRequest) {
  const authorizationHeader = request.headers.get("authorization");

  if (!authorizationHeader?.startsWith("Bearer ")) {
    return null;
  }

  return authorizationHeader.slice("Bearer ".length).trim();
}

function serializeUserDocument(user: IUserDocumentDTO): SerializedUserDocument {
  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
    deletedAt: user.deletedAt?.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

export async function POST(request: NextRequest) {
  try {
    const idToken = getBearerToken(request);

    if (!idToken) {
      return NextResponse.json(
        { error: "Token de autenticacao nao foi informado." },
        { status: 401 },
      );
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const payload = (await request
      .json()
      .catch(() => null)) as { plan?: string } | null;

    if (!isPaidUserPlan(payload?.plan)) {
      return NextResponse.json(
        { error: "O plano informado e invalido." },
        { status: 400 },
      );
    }

    const user = await upgradeUserPlanById(decodedToken.uid, payload.plan);

    return NextResponse.json({
      user: serializeUserDocument(user),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Nao foi possivel atualizar o plano do usuario.",
      },
      { status: 500 },
    );
  }
}
