"use client";

import type { ReactNode } from "react";

import { DirectionProvider, TooltipProvider } from "~/components/ui";
import { DEFAULT_DIR, type DocumentDir } from "~/lib";

type AppProvidersProps = {
  children: ReactNode;
  direction?: DocumentDir;
};

export function AppProviders({
  children,
  direction = DEFAULT_DIR,
}: AppProvidersProps) {
  return (
    <DirectionProvider direction={direction}>
      <TooltipProvider delay={200}>{children}</TooltipProvider>
    </DirectionProvider>
  );
}
