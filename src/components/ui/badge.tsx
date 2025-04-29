// components/ui/badge.tsx
import { cn } from "../../lib/utils";
import { forwardRef } from "react";

const Badge = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
      className
    )}
    {...props}
  />
));

Badge.displayName = "Badge";

export { Badge };