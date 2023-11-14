import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xs";
  className?: string;
  rounded?: "rounded-md" | "rounded-full" | "rounded-sm";
}

const getSize = (s: string) => {
  const sizeMap: { [key: string]: string } = {
    xs: "w-4 h-4",
    sm: "w-8 h-8",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };
  return sizeMap[s];
};

const Logo: React.FC<LogoProps> = ({
  size = "sm",
  className,
  rounded = "rounded-full",
}) => {
  return (
    <Avatar
      className={cn("aspect-auto", `${className} ${getSize(size)} ${rounded}`)}
    >
      <AvatarImage src="/logo.svg" className="object-scale-down" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  );
};

export default Logo;
