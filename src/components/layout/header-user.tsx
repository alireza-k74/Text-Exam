"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { LoginIcon, ProfileIcon } from "~/components/icons";
import { buttonVariants } from "~/components/ui";
import { cn } from "~/lib";

/**
 * Header user slot — XD “User In Header” toggle:
 * default → ورود | ثبت نام
 * click → profile avatar (+ chevron)
 * click again → back to ورود | ثبت نام
 */
export function HeaderUser() {
  const [showProfile, setShowProfile] = useState(false);

  if (!showProfile) {
    return (
      <button
        type="button"
        onClick={() => setShowProfile(true)}
        aria-label="ورود | ثبت نام"
        className={cn(
          buttonVariants({ variant: "outline", size: "default" }),
          "h-9 gap-1.5 rounded-md border-border px-2.5 text-foreground sm:px-3",
        )}
      >
        <LoginIcon />
        <span className="text-xs max-[360px]:sr-only sm:text-sm">
          ورود | ثبت نام
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShowProfile(false)}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full outline-none transition-opacity",
        "hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring/50",
      )}
      aria-label="منوی کاربری"
    >
      <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent-soft text-accent">
        <ProfileIcon className="size-4" />
      </span>
      <ChevronDown
        className="size-3.5 shrink-0 text-foreground/70"
        aria-hidden
      />
    </button>
  );
}
