import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  Shape,
  buildSizeStyles,
  getShapeDefinition,
  parseBorder,
  pathToMaskImage,
  toCssSize,
  BUILT_IN_SHAPES,
  DEFAULT_MODE,
  DEFAULT_SHAPE,
} from "~/components/ui";

afterEach(() => {
  cleanup();
});

describe("shape utilities", () => {
  it("converts numeric sizes to px", () => {
    expect(toCssSize(240)).toBe("240px");
    expect(toCssSize("50%")).toBe("50%");
    expect(toCssSize(undefined)).toBeUndefined();
  });

  it("builds responsive size styles with aspect ratio fallback", () => {
    expect(
      buildSizeStyles({
        width: 200,
        aspectRatio: 1,
      }),
    ).toEqual({
      width: "200px",
      aspectRatio: "1",
    });

    expect(
      buildSizeStyles({
        width: "40vw",
        fallbackAspectRatio: 1.5,
      }),
    ).toEqual({
      width: "40vw",
      aspectRatio: "1.5",
    });
  });

  it("parses border shorthand", () => {
    expect(parseBorder("3px solid #2563eb")).toMatchObject({
      widthPx: 3,
      style: "solid",
      color: "#2563eb",
    });
    expect(parseBorder(undefined)).toBeNull();
    expect(parseBorder("none")).toBeNull();
  });

  it("creates a data-uri mask for custom SVG paths", () => {
    const mask = pathToMaskImage("M0 0 H100 V100 Z", "0 0 100 100");
    expect(mask.startsWith('url("data:image/svg+xml,')).toBe(true);
    expect(mask).toContain("M0%200%20H100%20V100%20Z");
  });
});

describe("shape definitions", () => {
  it("registers every built-in shape with a technique", () => {
    expect(BUILT_IN_SHAPES.length).toBeGreaterThanOrEqual(35);
    for (const name of BUILT_IN_SHAPES) {
      const def = getShapeDefinition(name);
      expect(def.technique).toBeTruthy();
      if (name !== "custom") {
        expect(
          Boolean(def.borderRadius || def.clipPath || def.path),
        ).toBe(true);
      }
    }
  });

  it("keeps distinct geometry for nearby polygons", () => {
    const hex = getShapeDefinition("hexagon");
    const hept = getShapeDefinition("heptagon");
    const oct = getShapeDefinition("octagon");
    expect(hex.clipPath).not.toEqual(hept.clipPath);
    expect(hept.clipPath).not.toEqual(oct.clipPath);
  });
});

describe("Shape component", () => {
  it("uses default shape and mode", () => {
    render(
      <Shape data-testid="shape">
        <span>Content</span>
      </Shape>,
    );
    const root = screen.getByTestId("shape");
    expect(root).toHaveAttribute("data-shape", DEFAULT_SHAPE);
    expect(root).toHaveAttribute("data-shape-mode", DEFAULT_MODE);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders custom SVG path shapes", () => {
    render(
      <Shape
        data-testid="custom-shape"
        shape="custom"
        customPath="M10 10 H90 V90 H10 Z"
        customViewBox="0 0 100 100"
        width={120}
        aspectRatio={1}
      >
        Custom
      </Shape>,
    );
    const root = screen.getByTestId("custom-shape");
    expect(root).toHaveAttribute("data-shape", "custom");
    expect(root).toHaveAttribute("data-shape-technique", "svg-clip");
    expect(root).toHaveStyle({ width: "120px", aspectRatio: "1" });
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });

  it("does not clip interactive children in decoration mode", () => {
    render(
      <Shape
        data-testid="decor"
        shape="blob-1"
        mode="decoration"
        width={200}
        aspectRatio={1}
      >
        <button type="button">Explore</button>
      </Shape>,
    );
    const root = screen.getByTestId("decor");
    expect(root).toHaveAttribute("data-shape-mode", "decoration");
    expect(screen.getByRole("button", { name: "Explore" })).toBeEnabled();
  });

  it("forwards HTML attributes and polymorphic as", () => {
    render(
      <Shape as="section" aria-label="Hex panel" shape="hexagon" width={100}>
        Panel
      </Shape>,
    );
    expect(
      screen.getByRole("region", { name: "Hex panel" }),
    ).toBeInTheDocument();
  });

  it("applies animation class when requested", () => {
    render(
      <Shape data-testid="animated" shape="circle" animated width={80}>
        A
      </Shape>,
    );
    expect(screen.getByTestId("animated").className).toMatch(/animated/);
  });
});
