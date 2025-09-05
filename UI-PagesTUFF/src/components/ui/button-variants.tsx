import React from "react"
import { Button } from "@/components/ui/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const therapeuticButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-therapeutic focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        hero: "bg-gradient-hero text-primary-foreground shadow-therapeutic hover:shadow-glow hover:scale-105 transition-therapeutic",
        calm: "bg-secondary text-secondary-foreground shadow-soft hover:bg-secondary/80 hover:shadow-therapeutic transition-therapeutic",
        mic: "bg-accent text-accent-foreground rounded-full shadow-glow hover:bg-accent/80 hover:scale-110 pulse-glow transition-therapeutic",
        chaos: "bg-destructive text-destructive-foreground shadow-therapeutic hover:bg-destructive/80 hover:rotate-1 transition-therapeutic animate-pulse",
        ghost: "hover:bg-accent hover:text-accent-foreground transition-therapeutic"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-lg px-8",
        xl: "h-14 rounded-xl px-12 text-base",
        mic: "h-20 w-20 rounded-full"
      }
    },
    defaultVariants: {
      variant: "hero",
      size: "default"
    }
  }
)

export interface TherapeuticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof therapeuticButtonVariants> {}

const TherapeuticButton = React.forwardRef<HTMLButtonElement, TherapeuticButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(therapeuticButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
TherapeuticButton.displayName = "TherapeuticButton"

export { TherapeuticButton, therapeuticButtonVariants }