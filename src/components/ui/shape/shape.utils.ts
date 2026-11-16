import type { CSSProperties } from "react";

import type { ParsedBorder, ShapeDefinition } from "./shape.types";

const DEFAULT_VIEW_BOX = "0 0 100 100";

/** Convert a size prop to a CSS length. */
export function toCssSize(value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
}

/** Convert aspect-ratio prop to a CSS `aspect-ratio` value. */
export function toCssAspectRatio(
  value: number | string | undefined,
): string | undefined {
  if (value === undefined) return undefined;
  return String(value);
}

const BORDER_STYLE_KEYWORDS = new Set([
  "solid",
  "dashed",
  "dotted",
  "double",
  "none",
  "hidden",
  "groove",
  "ridge",
  "inset",
  "outset",
]);

/**
 * Parse a simple CSS border shorthand: `"2px solid #2563eb"`.
 * Falls back to a 2px solid currentColor when the string is non-empty but opaque.
 */
export function parseBorder(border: string | undefined): ParsedBorder | null {
  if (!border || border === "none" || border === "0") return null;

  const widthMatch = border.match(/(\d+(?:\.\d+)?)(px|rem|em)?/);
  const styleMatch = border.match(
    /\b(solid|dashed|dotted|double|none|hidden|groove|ridge|inset|outset)\b/i,
  );
  const colorMatch = border.match(
    /#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)|hsla?\([^)]+\)|oklch\([^)]+\)|var\([^)]+\)|\b(?!solid|dashed|dotted|double|none|hidden|groove|ridge|inset|outset)[a-zA-Z]+\b/i,
  );

  let widthPx = 2;
  if (widthMatch) {
    const n = Number(widthMatch[1]);
    const unit = widthMatch[2] ?? "px";
    if (unit === "px") widthPx = n;
    else if (unit === "rem" || unit === "em") widthPx = n * 16;
    else widthPx = n;
  }

  const style = styleMatch?.[1]?.toLowerCase() ?? "solid";
  const colorCandidate = colorMatch?.[0];
  const color =
    colorCandidate && !BORDER_STYLE_KEYWORDS.has(colorCandidate.toLowerCase())
      ? colorCandidate
      : "currentColor";

  return { widthPx, style, color, raw: border };
}

/** Regular polygon as CSS `polygon(...)` percentages, centered in the box. */
export function regularPolygonClip(
  sides: number,
  radiusPercent = 50,
  rotationDeg = -90,
): string {
  const points: string[] = [];
  for (let i = 0; i < sides; i += 1) {
    const angle =
      (Math.PI * 2 * i) / sides + (rotationDeg * Math.PI) / 180;
    const x = 50 + radiusPercent * Math.cos(angle);
    const y = 50 + radiusPercent * Math.sin(angle);
    points.push(`${round(x)}% ${round(y)}%`);
  }
  return `polygon(${points.join(", ")})`;
}

/** Star as CSS `polygon(...)` percentages. */
export function starPolygonClip(
  points: number,
  outerRadius = 50,
  innerRadius = 20,
  rotationDeg = -90,
): string {
  const coords: string[] = [];
  const total = points * 2;
  for (let i = 0; i < total; i += 1) {
    const angle =
      (Math.PI * 2 * i) / total + (rotationDeg * Math.PI) / 180;
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const x = 50 + r * Math.cos(angle);
    const y = 50 + r * Math.sin(angle);
    coords.push(`${round(x)}% ${round(y)}%`);
  }
  return `polygon(${coords.join(", ")})`;
}

/** Regular polygon SVG path in a 0–100 viewBox. */
export function regularPolygonPath(
  sides: number,
  radius = 48,
  rotationDeg = -90,
  cx = 50,
  cy = 50,
): string {
  const parts: string[] = [];
  for (let i = 0; i < sides; i += 1) {
    const angle =
      (Math.PI * 2 * i) / sides + (rotationDeg * Math.PI) / 180;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    parts.push(`${i === 0 ? "M" : "L"}${round(x)} ${round(y)}`);
  }
  return `${parts.join(" ")} Z`;
}

/** Star SVG path in a 0–100 viewBox. */
export function starPolygonPath(
  points: number,
  outerRadius = 48,
  innerRadius = 20,
  rotationDeg = -90,
  cx = 50,
  cy = 50,
): string {
  const parts: string[] = [];
  const total = points * 2;
  for (let i = 0; i < total; i += 1) {
    const angle =
      (Math.PI * 2 * i) / total + (rotationDeg * Math.PI) / 180;
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    parts.push(`${i === 0 ? "M" : "L"}${round(x)} ${round(y)}`);
  }
  return `${parts.join(" ")} Z`;
}

/** Convert a CSS polygon clip to an approximate SVG path (percent → 0–100). */
export function clipPathPolygonToSvgPath(clipPath: string): string | null {
  const match = clipPath.match(/polygon\((.+)\)/i);
  if (!match?.[1]) return null;

  const rawPoints = match[1].split(",").map((p) => p.trim());
  const pairs: Array<[number, number]> = [];

  for (const raw of rawPoints) {
    const parts = raw.split(/\s+/);
    if (parts.length < 2) continue;
    const x = parsePercentOrNumber(parts[0]!);
    const y = parsePercentOrNumber(parts[1]!);
    if (x === null || y === null) return null;
    pairs.push([x, y]);
  }

  if (pairs.length < 3) return null;

  return `${pairs
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${round(x)} ${round(y)}`)
    .join(" ")} Z`;
}

export function resolveViewBox(definition: ShapeDefinition, custom?: string) {
  return custom ?? definition.viewBox ?? DEFAULT_VIEW_BOX;
}

/** Build an SVG data-URI mask from path data (SSR-safe, no DOM ids). */
export function pathToMaskImage(
  path: string,
  viewBox = DEFAULT_VIEW_BOX,
  holePath?: string,
): string {
  const hole = holePath
    ? `<path d="${escapeXml(holePath)}" fill="black"/>`
    : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${escapeXml(viewBox)}" preserveAspectRatio="none"><path d="${escapeXml(path)}" fill="white"/>${hole}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export function buildSizeStyles(options: {
  width?: number | string;
  height?: number | string;
  aspectRatio?: number | string;
  fallbackAspectRatio?: number;
}): CSSProperties {
  const width = toCssSize(options.width);
  const height = toCssSize(options.height);
  const aspectRatio =
    toCssAspectRatio(options.aspectRatio) ??
    (options.height === undefined && options.fallbackAspectRatio !== undefined
      ? String(options.fallbackAspectRatio)
      : undefined);

  return {
    ...(width !== undefined ? { width } : null),
    ...(height !== undefined ? { height } : null),
    ...(aspectRatio !== undefined ? { aspectRatio } : null),
  };
}

function parsePercentOrNumber(value: string): number | null {
  if (value.endsWith("%")) {
    const n = Number(value.slice(0, -1));
    return Number.isFinite(n) ? n : null;
  }
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function round(n: number, digits = 3): number {
  const f = 10 ** digits;
  return Math.round(n * f) / f;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export { DEFAULT_VIEW_BOX };
