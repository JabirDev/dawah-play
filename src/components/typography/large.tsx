import { cn } from "@/lib/utils";

export default function Large({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div className={cn("text-lg font-semibold", className)}>{children}</div>
  );
}
