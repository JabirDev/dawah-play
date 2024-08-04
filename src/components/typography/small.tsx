import { cn } from "@/lib/utils";

export default function Small({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div className={cn("text-sm font-medium leading-none", className)}>
      {children}
    </div>
  );
}
