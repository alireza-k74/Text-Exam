import type { ShapeDefinition } from "../shape.types";

/** CSS border-radius based primitives. */
export const basicShapes = {
  rectangle: {
    technique: "css-radius",
    borderRadius: "0",
    defaultAspectRatio: 16 / 9,
  },
  "rounded-rectangle": {
    technique: "css-radius",
    borderRadius: "1rem",
    defaultAspectRatio: 16 / 9,
  },
  square: {
    technique: "css-radius",
    borderRadius: "0",
    defaultAspectRatio: 1,
  },
  circle: {
    technique: "css-radius",
    borderRadius: "9999px",
    defaultAspectRatio: 1,
  },
  ellipse: {
    technique: "css-radius",
    borderRadius: "50%",
    defaultAspectRatio: 4 / 3,
  },
} as const satisfies Record<string, ShapeDefinition>;
