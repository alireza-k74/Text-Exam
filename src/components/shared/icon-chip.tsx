import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { ClockIcon } from "~/components/icons";
import { cn } from "~/lib";

const iconChipVariants = cva(
  "inline-flex h-6 w-fit max-w-full shrink-0 items-center gap-1.5 overflow-hidden rounded-full border border-transparent px-2.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-[#0F172A] text-[#F8FAFC]",
        outline: "border-[#ECEEF2] bg-white text-[#0F172A]",
        primary: "bg-[#016596] text-[#F8FAFC]",
        success: "bg-[#22C55E] text-[#F8FAFC]",
        warning: "bg-[#F59E0B] text-[#F8FAFC]",
        danger: "bg-[#EF4444] text-[#F8FAFC]",
        brand: "bg-[#0071A9] text-[#F8FAFC]",
      },
      iconPosition: {
        start: "flex-row",
        end: "flex-row-reverse",
      },
    },
    defaultVariants: {
      variant: "default",
      iconPosition: "start",
    },
  },
);

export type IconChipProps = ComponentPropsWithoutRef<"span"> &
  VariantProps<typeof iconChipVariants> & {
    title: string;
    /** Defaults to the clock icon. Pass `null` to hide the icon. */
    icon?: ReactNode | null;
  };

/**
 * Reusable pill: icon + title, rounded-full.
 * In RTL/LTR, `iconPosition="start"` puts the icon at inline-start.
 */
export function IconChip({
  title,
  icon,
  variant,
  iconPosition,
  className,
  ...props
}: IconChipProps) {
  const resolvedIcon =
    icon === null ? null : (icon ?? <ClockIcon className="size-3" />);

  return (
    <span
      className={cn(iconChipVariants({ variant, iconPosition }), className)}
      {...props}
    >
      {resolvedIcon}
      <span className="min-w-0 truncate">{title}</span>
    </span>
  );
}

export { iconChipVariants };
