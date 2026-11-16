import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Button } from "~/components/ui";
import { cn } from "~/lib";

afterEach(() => {
  cleanup();
});

describe("cn", () => {
  it("merges class names and resolves Tailwind conflicts", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });
});

describe("Button", () => {
  it("renders accessible button text", () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  it("respects disabled state", () => {
    render(<Button disabled>Disabled save</Button>);
    expect(
      screen.getByRole("button", { name: "Disabled save" }),
    ).toBeDisabled();
  });
});
