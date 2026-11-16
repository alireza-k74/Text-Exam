import type { ShapeDefinition } from "../shape.types";
import {
  regularPolygonClip,
  regularPolygonPath,
  starPolygonClip,
  starPolygonPath,
} from "../shape.utils";

/** Clip-path / SVG polygon geometry. */
export const geometricShapes = {
  triangle: {
    technique: "clip-path",
    clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
    path: "M50 2 L98 98 L2 98 Z",
    defaultAspectRatio: 1,
  },
  "inverted-triangle": {
    technique: "clip-path",
    clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
    path: "M2 2 L98 2 L50 98 Z",
    defaultAspectRatio: 1,
  },
  diamond: {
    technique: "clip-path",
    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    path: "M50 2 L98 50 L50 98 L2 50 Z",
    defaultAspectRatio: 1,
  },
  pentagon: {
    technique: "clip-path",
    clipPath: regularPolygonClip(5),
    path: regularPolygonPath(5),
    defaultAspectRatio: 1,
  },
  hexagon: {
    technique: "clip-path",
    clipPath: regularPolygonClip(6, 50, 0),
    path: regularPolygonPath(6, 48, 0),
    defaultAspectRatio: 1,
  },
  heptagon: {
    technique: "clip-path",
    clipPath: regularPolygonClip(7),
    path: regularPolygonPath(7),
    defaultAspectRatio: 1,
  },
  octagon: {
    technique: "clip-path",
    clipPath: regularPolygonClip(8, 50, -22.5),
    path: regularPolygonPath(8, 48, -22.5),
    defaultAspectRatio: 1,
  },
  decagon: {
    technique: "clip-path",
    clipPath: regularPolygonClip(10),
    path: regularPolygonPath(10),
    defaultAspectRatio: 1,
  },
  star: {
    technique: "clip-path",
    clipPath: starPolygonClip(5, 50, 19),
    path: starPolygonPath(5, 48, 18),
    defaultAspectRatio: 1,
  },
  "star-6": {
    technique: "clip-path",
    clipPath: starPolygonClip(6, 50, 22, -90),
    path: starPolygonPath(6, 48, 21, -90),
    defaultAspectRatio: 1,
  },
  "star-8": {
    technique: "clip-path",
    clipPath: starPolygonClip(8, 50, 24, -90),
    path: starPolygonPath(8, 48, 23, -90),
    defaultAspectRatio: 1,
  },
} as const satisfies Record<string, ShapeDefinition>;
