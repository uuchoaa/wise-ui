import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-xs font-medium transition-colors duration-75 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-accent text-accent-foreground hover:bg-accent/90",
        destructive:
          "border border-destructive bg-background text-destructive hover:bg-destructive/10 focus-visible:ring-destructive/20",
        outline:
          "border border-border bg-background text-foreground hover:bg-secondary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-secondary",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-3 py-2 has-[>svg]:px-2.5",
        sm: "h-7 rounded-sm gap-1 px-2.5 has-[>svg]:px-2",
        lg: "h-9 rounded-sm px-4 has-[>svg]:px-3",
        icon: "size-8",
        "icon-sm": "size-7",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
