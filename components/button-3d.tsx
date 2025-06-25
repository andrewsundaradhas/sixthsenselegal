"use client"

import { forwardRef } from "react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const Button3D = forwardRef<HTMLButtonElement, ButtonProps>(({ className, children, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_10px_20px_rgba(220,38,38,0.3)] active:translate-y-[-2px] active:shadow-[0_5px_10px_rgba(220,38,38,0.2)]",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  )
})
Button3D.displayName = "Button3D"

export { Button3D }
