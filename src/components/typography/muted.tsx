import { cn } from "@/lib/utils";

export default function Muted({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}
