import type { ShapeFit, ShapeMode, ShapeType } from "./shape.types";

export const DEFAULT_SHAPE: ShapeType = "rectangle";
export const DEFAULT_MODE: ShapeMode = "container";
export const DEFAULT_FIT: ShapeFit = "cover";
export const DEFAULT_CLIP_CONTENT = true;
export const DEFAULT_VIEW_BOX = "0 0 100 100";
export const DEFAULT_BACKGROUND = "var(--primary)";
export const DEFAULT_COLOR = "var(--primary-foreground)";

/** Stroke width in SVG user units for a 100×100 viewBox, derived from CSS px. */
export const SVG_STROKE_SCALE = 1;
