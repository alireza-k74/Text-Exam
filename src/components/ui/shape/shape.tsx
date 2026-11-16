"use client";

import {
  useId,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
  type Ref,
} from "react";

import { cn } from "~/lib/utils";

import {
  DEFAULT_CLIP_CONTENT,
  DEFAULT_COLOR,
  DEFAULT_FIT,
  DEFAULT_MODE,
  DEFAULT_SHAPE,
  DEFAULT_VIEW_BOX,
} from "./shape.constants";
import type {
  ShapeDefinition,
  ShapeOwnProps,
  ShapeProps,
  ShapeTechnique,
} from "./shape.types";
import {
  buildSizeStyles,
  clipPathPolygonToSvgPath,
  parseBorder,
  pathToMaskImage,
  resolveViewBox,
  toCssSize,
} from "./shape.utils";
import { getShapeDefinition } from "./shapes";

import "./shape.css";

type ShapeComponentProps = ShapeOwnProps &
  Omit<ComponentPropsWithoutRef<"div">, keyof ShapeOwnProps> & {
    ref?: Ref<HTMLElement>;
  };

function resolveDefinition(
  shape: NonNullable<ShapeOwnProps["shape"]>,
  customPath?: string,
  customViewBox?: string,
): ShapeDefinition {
  const base = getShapeDefinition(shape);

  if (shape === "custom") {
    return {
      ...base,
      technique: "svg-clip",
      path: customPath ?? "",
      viewBox: customViewBox ?? base.viewBox ?? DEFAULT_VIEW_BOX,
    };
  }

  if (customPath) {
    return {
      ...base,
      technique: "svg-clip",
      path: customPath,
      viewBox: customViewBox ?? base.viewBox ?? DEFAULT_VIEW_BOX,
    };
  }

  return base;
}

function techniqueUsesMask(technique: ShapeTechnique) {
  return technique === "svg-clip" || technique === "svg-mask";
}

function ShapeInner({
  shape = DEFAULT_SHAPE,
  mode = DEFAULT_MODE,
  children,
  width,
  height,
  aspectRatio,
  background,
  color,
  border,
  borderRadius,
  className,
  style,
  fit = DEFAULT_FIT,
  clipContent = DEFAULT_CLIP_CONTENT,
  customPath,
  customViewBox,
  animated = false,
  as,
  ref,
  ...rest
}: ShapeComponentProps) {
  const reactId = useId();
  const clipPathId = `shape-clip-${reactId.replaceAll(":", "")}`;
  const Comp = (as ?? "div") as ElementType;

  const definition = resolveDefinition(shape, customPath, customViewBox);
  const viewBox = resolveViewBox(definition, customViewBox);
  const parsedBorder = parseBorder(border);
  const isDecoration = mode === "decoration";
  const shouldClip = !isDecoration && clipContent !== false;

  const resolvedRadius =
    borderRadius !== undefined
      ? toCssSize(borderRadius)
      : definition.borderRadius;

  const path =
    definition.path ||
    (definition.clipPath
      ? clipPathPolygonToSvgPath(definition.clipPath)
      : null);

  const maskImage =
    path && techniqueUsesMask(definition.technique)
      ? pathToMaskImage(path, viewBox, definition.maskHolePath)
      : undefined;

  const sizeStyles = buildSizeStyles({
    width,
    height,
    aspectRatio,
    fallbackAspectRatio:
      shape === "square" || shape === "circle"
        ? 1
        : definition.defaultAspectRatio,
  });

  const cssVars = {
    ["--shape-bg" as string]: background ?? "var(--primary)",
    ["--shape-color" as string]: color ?? DEFAULT_COLOR,
    ["--shape-radius" as string]: resolvedRadius ?? "0px",
    ["--shape-clip" as string]: definition.clipPath ?? "none",
    ["--shape-mask" as string]: maskImage ?? "none",
    ["--shape-border-color" as string]: parsedBorder?.color ?? "transparent",
    ["--shape-border-width" as string]: parsedBorder
      ? `${parsedBorder.widthPx}px`
      : "0px",
    ["--shape-border-style" as string]: parsedBorder?.style ?? "solid",
  } satisfies CSSProperties;

  const isRadius = definition.technique === "css-radius";
  const isClipPath = definition.technique === "clip-path";
  const isMasked = techniqueUsesMask(definition.technique);
  const useSvgStrokeBorder = Boolean(parsedBorder && path && !isRadius);

  const fitClass =
    fit === "contain"
      ? "ui-shape--fit-contain"
      : fit === "fill"
        ? "ui-shape--fit-fill"
        : "ui-shape--fit-cover";

  const rootClassName = cn(
    "ui-shape",
    isRadius && !isDecoration && "ui-shape--radius",
    !isDecoration && fitClass,
    animated && "ui-shape--animated",
    className,
  );

  const contentClassName = cn(
    isDecoration ? "ui-shape__content--decoration" : "ui-shape__content",
    shouldClip && isRadius && "ui-shape__content--clip-radius",
    shouldClip && isClipPath && "ui-shape__content--clip-path",
    shouldClip && isMasked && "ui-shape__content--clip-mask",
  );

  const mergedStyle: CSSProperties = {
    ...cssVars,
    ...sizeStyles,
    ...style,
  };

  return (
    <Comp
      ref={ref}
      data-slot="shape"
      data-shape={shape}
      data-shape-mode={mode}
      data-shape-technique={definition.technique}
      className={rootClassName}
      style={mergedStyle}
      {...rest}
    >
      {(isDecoration || !isRadius || useSvgStrokeBorder) && (
        <div className="ui-shape__paint" aria-hidden="true">
          {useSvgStrokeBorder && path ? (
            <svg
              className="ui-shape__svg"
              viewBox={viewBox}
              preserveAspectRatio="none"
              focusable="false"
            >
              <defs>
                <clipPath id={clipPathId} clipPathUnits="userSpaceOnUse">
                  <path d={path} />
                </clipPath>
              </defs>
              <path
                d={path}
                fill={background ?? "var(--primary)"}
                stroke={parsedBorder?.color}
                strokeWidth={parsedBorder?.widthPx ?? 0}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          ) : isRadius ? (
            <div className="ui-shape__paint--radius" />
          ) : isClipPath ? (
            <div className="ui-shape__paint--clip" />
          ) : (
            <div className="ui-shape__paint--mask" />
          )}
        </div>
      )}

      {children != null && children !== false ? (
        <div className={contentClassName}>{children}</div>
      ) : null}
    </Comp>
  );
}

/**
 * Reusable shape container / decoration primitive.
 *
 * @example
 * ```tsx
 * <Shape shape="hexagon" width={240} aspectRatio={1} background="#2563eb">
 *   <span>محتوا</span>
 * </Shape>
 * ```
 */
function Shape<T extends ElementType = "div">(props: ShapeProps<T>) {
  return <ShapeInner {...(props as ShapeComponentProps)} />;
}

export { Shape };
export type { ShapeProps, ShapeOwnProps };
