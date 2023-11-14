import { FC, PropsWithChildren, ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface MainProps extends PropsWithChildren<ComponentProps<"main">> {
  children: React.ReactNode;
}

const Main: FC<PropsWithChildren<ComponentProps<"main">>> = ({
  children,
  className,
}) => {
  return (
    <main className={cn("flex min-h-screen w-full flex-1", className)}>
      {children}
    </main>
  );
};

export default Main;
