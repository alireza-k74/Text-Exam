import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ReactNode,
} from "react";

/** Built-in shape identifiers. */
export type BuiltInShapeType =
  | "rectangle"
  | "rounded-rectangle"
  | "square"
  | "circle"
  | "ellipse"
  | "triangle"
  | "inverted-triangle"
  | "diamond"
  | "pentagon"
  | "hexagon"
  | "heptagon"
  | "octagon"
  | "decagon"
  | "star"
  | "star-6"
  | "star-8"
  | "heart"
  | "teardrop"
  | "oval"
  | "capsule"
  | "cross"
  | "plus"
  | "parallelogram"
  | "trapezoid"
  | "chevron"
  | "arrow"
  | "blob-1"
  | "blob-2"
  | "blob-3"
  | "blob-4"
  | "speech-bubble"
  | "ticket"
  | "arch"
  | "wave"
  | "custom";

export type ShapeType = BuiltInShapeType;

/** How the shape is applied relative to children. */
export type ShapeMode = "container" | "decoration";

/** Object-fit behavior for media children in container mode. */
export type ShapeFit = "cover" | "contain" | "fill";

/** Native rendering technique selected per shape. */
export type ShapeTechnique = "css-radius" | "clip-path" | "svg-clip" | "svg-mask";

export type ShapeDefinition = {
  technique: ShapeTechnique;
  /** CSS border-radius value (css-radius). */
  borderRadius?: string;
  /** CSS `clip-path` value, e.g. `polygon(...)` (clip-path). */
  clipPath?: string;
  /** SVG path data in a normalized viewBox (svg-clip / svg-mask / border stroke). */
  path?: string;
  /** Optional second path used as a hole for svg-mask. */
  maskHolePath?: string;
  /** Default SVG viewBox. */
  viewBox?: string;
  /** Suggested aspect ratio when width is set without height. */
  defaultAspectRatio?: number;
};

export type ShapeOwnProps = {
  shape?: ShapeType;
  /** `container` clips children; `decoration` paints the shape behind unrestricted children. */
  mode?: ShapeMode;
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  aspectRatio?: number | string;
  background?: string;
  color?: string;
  border?: string;
  borderRadius?: number | string;
  className?: string;
  style?: CSSProperties;
  fit?: ShapeFit;
  /** When false in container mode, children are not clipped (shape still paints). */
  clipContent?: boolean;
  /** SVG path data when `shape="custom"`. */
  customPath?: string;
  /** SVG viewBox for custom paths (default `0 0 100 100`). */
  customViewBox?: string;
  /** Enables lightweight hover/transition animation (honors reduced motion). */
  animated?: boolean;
  /** Polymorphic root element. */
  as?: ElementType;
};

type PolymorphicProps<T extends ElementType> = {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof ShapeOwnProps | "as"> &
  ShapeOwnProps;

export type ShapeProps<T extends ElementType = "div"> = PolymorphicProps<T>;

export type ParsedBorder = {
  widthPx: number;
  style: string;
  color: string;
  raw: string;
};
