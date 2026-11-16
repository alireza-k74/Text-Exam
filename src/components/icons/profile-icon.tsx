import type { SVGProps } from "react";

import { cn } from "~/lib";

export type ProfileIconProps = SVGProps<SVGSVGElement>;

/** 16×16 user / profile glyph — uses `currentColor` for fill. */
export function ProfileIcon({ className, ...props }: ProfileIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn("size-4 shrink-0", className)}
      {...props}
    >
      <path
        d="M7.99984 8.50001C5.8865 8.50001 4.1665 6.78001 4.1665 4.66668C4.1665 2.55334 5.8865 0.833344 7.99984 0.833344C10.1132 0.833344 11.8332 2.55334 11.8332 4.66668C11.8332 6.78001 10.1132 8.50001 7.99984 8.50001ZM7.99984 1.83334C6.43984 1.83334 5.1665 3.10668 5.1665 4.66668C5.1665 6.22668 6.43984 7.50001 7.99984 7.50001C9.55984 7.50001 10.8332 6.22668 10.8332 4.66668C10.8332 3.10668 9.55984 1.83334 7.99984 1.83334Z"
        fill="currentColor"
      />
      <path
        d="M13.7268 15.1667C13.4534 15.1667 13.2268 14.94 13.2268 14.6667C13.2268 12.3667 10.8801 10.5 8.0001 10.5C5.1201 10.5 2.77344 12.3667 2.77344 14.6667C2.77344 14.94 2.54677 15.1667 2.27344 15.1667C2.0001 15.1667 1.77344 14.94 1.77344 14.6667C1.77344 11.82 4.56677 9.5 8.0001 9.5C11.4334 9.5 14.2268 11.82 14.2268 14.6667C14.2268 14.94 14.0001 15.1667 13.7268 15.1667Z"
        fill="currentColor"
      />
    </svg>
  );
}
