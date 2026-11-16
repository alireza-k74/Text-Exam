import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.mock("next/font/local", () => ({
  default: () => ({
    className: "font-mock",
    style: { fontFamily: "mock" },
    variable: "--font-mock",
  }),
}));
