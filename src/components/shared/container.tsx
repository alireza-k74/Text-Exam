import type { ReactNode } from "react";

import { cn } from "~/lib";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "article";
};

export function Container({
  children,
  className,
  as: Comp = "div",
}: ContainerProps) {
  return (
    <Comp className={cn("container-page min-w-0", className)}>{children}</Comp>
  );
}
