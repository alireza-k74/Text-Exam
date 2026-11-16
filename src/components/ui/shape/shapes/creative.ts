import type { ShapeDefinition } from "../shape.types";

/** Creative / illustrative SVG shapes with normalized viewBoxes. */
export const creativeShapes = {
  "blob-1": {
    technique: "svg-clip",
    path: "M44.5 6.2 C58.2 2.4 74.1 8.6 83.6 19.8 C93.4 31.4 96.8 48.2 91.2 61.7 C85.4 75.6 70.8 84.9 55.1 89.2 C39.2 93.6 21.4 90.8 12.1 78.4 C2.6 65.7 4.8 46.2 12.9 32.1 C21.1 17.8 31.6 9.8 44.5 6.2 Z",
    viewBox: "0 0 100 100",
    defaultAspectRatio: 1,
  },
  "blob-2": {
    technique: "svg-clip",
    path: "M32.4 10.8 C46.8 2.1 66.2 3.6 78.9 14.7 C91.8 26 97.4 45.1 91.6 60.8 C85.9 76.3 69.8 86.9 53.2 90.4 C36.4 94 18.1 88.7 10.2 74.2 C2.1 59.4 7.4 39.6 17.8 26.2 C26.1 15.5 22.8 16.7 32.4 10.8 Z",
    viewBox: "0 0 100 100",
    defaultAspectRatio: 1,
  },
  "blob-3": {
    technique: "svg-clip",
    path: "M50 4 C68 6 86 16 92 34 C98 52 90 72 74 84 C58 96 34 98 18 86 C2 74 2 50 10 32 C18 14 32 2 50 4 Z",
    viewBox: "0 0 100 100",
    defaultAspectRatio: 1,
  },
  "blob-4": {
    technique: "svg-clip",
    path: "M22 28 C28 10 48 4 64 10 C82 17 96 34 94 52 C92 72 78 90 58 94 C36 98 14 86 8 66 C2 46 12 40 22 28 Z",
    viewBox: "0 0 100 100",
    defaultAspectRatio: 1,
  },
  "speech-bubble": {
    technique: "svg-clip",
    path: "M12 8 H88 Q96 8 96 16 V58 Q96 66 88 66 H42 L24 90 L28 66 H12 Q4 66 4 58 V16 Q4 8 12 8 Z",
    viewBox: "0 0 100 100",
    defaultAspectRatio: 1.1,
  },
  ticket: {
    technique: "svg-clip",
    path: "M8 18 H92 Q96 18 96 22 V40 C88 40 88 48 96 48 V78 Q96 82 92 82 H8 Q4 82 4 78 V48 C12 48 12 40 4 40 V22 Q4 18 8 18 Z",
    viewBox: "0 0 100 100",
    defaultAspectRatio: 1.6,
  },
  arch: {
    technique: "svg-clip",
    path: "M10 96 V48 A40 40 0 0 1 90 48 V96 H74 V50 A24 24 0 0 0 26 50 V96 Z",
    viewBox: "0 0 100 100",
    defaultAspectRatio: 0.9,
  },
  wave: {
    technique: "svg-clip",
    path: "M0 42 C12 28 22 28 34 42 C46 56 56 56 68 42 C80 28 90 28 100 42 V100 H0 Z",
    viewBox: "0 0 100 100",
    defaultAspectRatio: 2,
  },
  custom: {
    technique: "svg-clip",
    path: "",
    viewBox: "0 0 100 100",
    defaultAspectRatio: 1,
  },
} as const satisfies Record<string, ShapeDefinition>;
