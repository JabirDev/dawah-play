"use client";

import { useRouter } from "next/navigation";

import { MaterialIcon } from "../icons";
import { Button } from "./button";

interface HeadingProps {
  title: string;
  description: string;
  showBackButton?: boolean;
  backUrl?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  showBackButton = false,
  backUrl = "",
}) => {
  const router = useRouter();
  return (
    <div className="flex items-start space-x-4">
      {showBackButton && (
        <Button
          onClick={() => (backUrl ? router.push(backUrl) : router.back())}
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full"
        >
          <MaterialIcon filled size="lg" className="text-2xl">
            arrow_back
          </MaterialIcon>
        </Button>
      )}
      <div className="flex-col">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
