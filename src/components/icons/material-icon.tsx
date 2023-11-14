"use client";

import { FC, PropsWithChildren, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface MaterialIconProps
  extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  filled?: boolean;
  variants?: "outlined" | "rounded" | "sharp";
  size?: "md" | "sm" | "lg" | "xl";
  fontSize?: "md" | "sm" | "lg" | "xl" | "base";
  weight?:
    | "thin"
    | "extra_light"
    | "light"
    | "normal"
    | "medium"
    | "semi_bold"
    | "bold";
  color?: string;
  iconStyle?: string;
}

const getSize = (size: string) => {
  const sizeMap: { [key: string]: number } = {
    sm: 20,
    md: 24,
    lg: 40,
    xl: 48,
  };
  return sizeMap[size] || 20;
};

const getWeight = (weight: string): number => {
  const weightMap: { [key: string]: number } = {
    thin: 100,
    extra_light: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semi_bold: 600,
    bold: 700,
  };
  return weightMap[weight] || 400;
};

const MaterialIcon: FC<MaterialIconProps> = ({
  filled = false,
  fontSize = "base",
  variants = "outlined",
  color,
  weight,
  size,
  children,
  className,
}) => {
  const wght = getWeight(weight || "normal");
  const styles = `'FILL' ${
    filled ? 1 : 0
  }, 'wght' ${wght}, 'GRAD' 0, 'opsz' ${getSize(size || "default")}`;
  return (
    <span
      style={{ fontVariationSettings: styles }}
      className={cn(
        `material-symbols-${variants} ${color} text-${fontSize} `,
        className,
      )}
    >
      {children}
    </span>
  );
};

export default MaterialIcon;
