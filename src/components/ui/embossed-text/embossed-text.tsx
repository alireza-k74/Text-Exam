import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ReactNode,
} from "react";

import { cn } from "~/lib";

import "./embossed-text.css";

export type EmbossedTextIntensity = "subtle" | "medium" | "strong";

type EmbossedTextOwnProps = {
  /** Text or nodes to render with the embossed effect. */
  children?: ReactNode;
  /** Additional class names (typography, color, layout). */
  className?: string;
  /**
   * Shadow strength. Defaults to `subtle` — soft dual shadows
   * suited to dark branded surfaces.
   */
  intensity?: EmbossedTextIntensity;
  /** Override the light (highlight) shadow color. */
  lightShadow?: string;
  /** Override the dark (depth) shadow color. */
  darkShadow?: string;
  /** When true, removes the embossed `text-shadow`. */
  disabled?: boolean;
};

type PolymorphicProps<T extends ElementType> = {
  /** Semantic HTML element. Defaults to `span`. */
  as?: T;
} & EmbossedTextOwnProps &
  Omit<ComponentPropsWithoutRef<T>, keyof EmbossedTextOwnProps | "as">;

export type EmbossedTextProps<T extends ElementType = "span"> =
  PolymorphicProps<T>;

/**
 * Subtle embossed / neumorphic text via dual opposing `text-shadow`s.
 * Server-Component safe (no client hooks). Color and type size inherit
 * from parent / `className` — no background is imposed.
 */
export function EmbossedText<T extends ElementType = "span">({
  as,
  children,
  className,
  intensity = "subtle",
  lightShadow,
  darkShadow,
  disabled = false,
  style,
  ...props
}: EmbossedTextProps<T>) {
  const Comp = (as ?? "span") as ElementType;

  const cssVars = {
    ...(lightShadow ? { "--emboss-light": lightShadow } : null),
    ...(darkShadow ? { "--emboss-dark": darkShadow } : null),
  } as CSSProperties;

  return (
    <Comp
      className={cn("ui-embossed-text", className)}
      data-intensity={intensity}
      data-disabled={disabled ? "true" : undefined}
      style={{ ...(style as CSSProperties | undefined), ...cssVars }}
      {...props}
    >
      {children}
    </Comp>
  );
}
