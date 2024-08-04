import { cn } from "@/lib/utils";

export default function Lead({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>
  );
}
