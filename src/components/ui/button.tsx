import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98] active:transition-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary/50 hover:-translate-y-0.5 active:translate-y-0",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:-translate-y-0.5 active:translate-y-0",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-[1.02] active:scale-100",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        // Portfolio-specific variants - enhanced
        hero: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.5)] hover:-translate-y-1 active:translate-y-0 active:shadow-md",
        "hero-outline": "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.4)] active:translate-y-0",
        "icon-link": "text-muted-foreground hover:text-primary p-2 rounded-full hover:bg-accent hover:scale-110 active:scale-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
