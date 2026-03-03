'use client';

import Image from "next/image";
import { avatarImagePlaceholder } from "@/mocks/index";
import clsx from "clsx";

interface AvatarImageProps {
  className?: string;
  imageUrl?: string;
}

export default function AvatarImage({ className, imageUrl }: AvatarImageProps) {
  return (
    <Image
      src={imageUrl || avatarImagePlaceholder}
      alt="Avatar"
      width={96}
      height={96}
      className={clsx(
        "w-full h-full object-cover rounded-full aspect-square",
        className
      )}
    />
  );
}


