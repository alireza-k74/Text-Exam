"use client";

import { useState } from "react";

import { Button } from "~/components/ui";
import { cn } from "~/lib";

type CodeBlockProps = {
  code: string;
  title?: string;
  className?: string;
};

export function CodeBlock({ code, title, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-muted/40",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
        <p className="text-xs font-medium text-muted-foreground">
          {title ?? "مثال کد"}
        </p>
        <Button type="button" size="xs" variant="outline" onClick={handleCopy}>
          {copied ? "کپی شد" : "کپی"}
        </Button>
      </div>
      <pre
        className="overflow-x-auto p-3 text-start text-xs leading-relaxed text-foreground"
        dir="ltr"
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
