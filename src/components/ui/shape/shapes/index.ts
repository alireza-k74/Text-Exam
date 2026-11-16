import type { BuiltInShapeType, ShapeDefinition } from "../shape.types";

import { basicShapes } from "./basic";
import { creativeShapes } from "./creative";
import { geometricShapes } from "./geometric";
import { organicShapes } from "./organic";

export const SHAPE_DEFINITIONS = {
  ...basicShapes,
  ...geometricShapes,
  ...organicShapes,
  ...creativeShapes,
} as const satisfies Record<BuiltInShapeType, ShapeDefinition>;

export type RegisteredShape = keyof typeof SHAPE_DEFINITIONS;

export const BUILT_IN_SHAPES = Object.keys(
  SHAPE_DEFINITIONS,
) as BuiltInShapeType[];

export const SHAPE_GROUPS = {
  basic: Object.keys(basicShapes) as Array<keyof typeof basicShapes>,
  geometric: Object.keys(geometricShapes) as Array<
    keyof typeof geometricShapes
  >,
  organic: Object.keys(organicShapes) as Array<keyof typeof organicShapes>,
  creative: Object.keys(creativeShapes) as Array<keyof typeof creativeShapes>,
} as const;

export function getShapeDefinition(
  shape: BuiltInShapeType,
): ShapeDefinition {
  return SHAPE_DEFINITIONS[shape];
}

export { basicShapes, geometricShapes, organicShapes, creativeShapes };
