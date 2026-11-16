import type { ShapeDefinition } from "../shape.types";

/** Organic / symbolic shapes — mix of radius, clip-path, and SVG. */
export const organicShapes = {
  heart: {
    technique: "svg-clip",
    path: "M50 88 C22 68 8 48 8 30 C8 16 18 8 30 8 C38 8 45 12 50 20 C55 12 62 8 70 8 C82 8 92 16 92 30 C92 48 78 68 50 88 Z",
    viewBox: "0 0 100 100",
    defaultAspectRatio: 1,
  },
  teardrop: {
    technique: "svg-clip",
    path: "M50 4 C50 4 88 42 88 62 C88 80 72 94 50 94 C28 94 12 80 12 62 C12 42 50 4 50 4 Z",
    viewBox: "0 0 100 100",
    defaultAspectRatio: 0.85,
  },
  oval: {
    technique: "css-radius",
    borderRadius: "50%",
    defaultAspectRatio: 3 / 4,
  },
  capsule: {
    technique: "css-radius",
    borderRadius: "9999px",
    defaultAspectRatio: 2.4,
  },
  cross: {
    technique: "clip-path",
    clipPath:
      "polygon(35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%, 65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%, 0% 35%, 35% 35%)",
    path: "M35 2 H65 V35 H98 V65 H65 V98 H35 V65 H2 V35 H35 Z",
    defaultAspectRatio: 1,
  },
  plus: {
    technique: "clip-path",
    clipPath:
      "polygon(38% 8%, 62% 8%, 62% 38%, 92% 38%, 92% 62%, 62% 62%, 62% 92%, 38% 92%, 38% 62%, 8% 62%, 8% 38%, 38% 38%)",
    path: "M38 8 H62 V38 H92 V62 H62 V92 H38 V62 H8 V38 H38 Z",
    defaultAspectRatio: 1,
  },
  parallelogram: {
    technique: "clip-path",
    clipPath: "polygon(18% 0%, 100% 0%, 82% 100%, 0% 100%)",
    path: "M18 2 H98 L82 98 H2 Z",
    defaultAspectRatio: 1.6,
  },
  trapezoid: {
    technique: "clip-path",
    clipPath: "polygon(18% 0%, 82% 0%, 100% 100%, 0% 100%)",
    path: "M18 2 H82 L98 98 H2 Z",
    defaultAspectRatio: 1.5,
  },
  chevron: {
    technique: "clip-path",
    clipPath: "polygon(0% 0%, 70% 0%, 100% 50%, 70% 100%, 0% 100%, 30% 50%)",
    path: "M2 2 H70 L98 50 L70 98 H2 L32 50 Z",
    defaultAspectRatio: 1.2,
  },
  arrow: {
    technique: "clip-path",
    clipPath:
      "polygon(0% 28%, 62% 28%, 62% 0%, 100% 50%, 62% 100%, 62% 72%, 0% 72%)",
    path: "M2 28 H62 V2 L98 50 L62 98 V72 H2 Z",
    defaultAspectRatio: 1.4,
  },
} as const satisfies Record<string, ShapeDefinition>;
