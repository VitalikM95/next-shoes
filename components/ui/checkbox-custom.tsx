'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

const CheckboxStandard = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & { label: string }
>(({ className, label, ...props }, ref) => (
  <label className="flex items-center gap-2 cursor-pointer">
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'h-5 w-5 shrink-0 rounded-none border border-primary ring-offset-background',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        'hover:bg-primary/10',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <Check className="h-5 w-5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    <span className="text-base text-primary">{label}</span>
  </label>
))

CheckboxStandard.displayName = CheckboxPrimitive.Root.displayName

const CheckboxSquare = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    labelTop: string
    labelBottom: string
  }
>(({ className, labelTop, labelBottom, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'flex flex-col items-center justify-center h-12 w-12 border font-bold border-black text-black rounded-none bg-transparent transition-colors',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30',
      'data-[state=checked]:bg-black data-[state=checked]:text-white data-[state=checked]:border-black',
      'data-[disabled]:border-muted-foreground data-[disabled]:text-muted-foreground',
      'hover:bg-black/10',
      className
    )}
    {...props}
  >
    <span className="text-xs leading-tight">{labelTop}</span>
    <span className="text-sm font-medium">{labelBottom}</span>
  </CheckboxPrimitive.Root>
))
CheckboxSquare.displayName = CheckboxPrimitive.Root.displayName

interface CheckboxRoundProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label: string
  color: string
}

const CheckboxRound = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxRoundProps
>(({ className, label, color, ...props }, ref) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          'h-6 w-6 rounded-full flex items-center justify-center border-2 transition-all duration-200',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'hover:ring-2 hover:ring-gray-200 hover:ring-offset-2',
          'data-[state=checked]:ring-2 data-[state=checked]:ring-gray-500 data-[state=checked]:ring-offset-2',
          'data-[state=checked]:border-transparent',
          className
        )}
        style={{ backgroundColor: color }}
        {...props}
      ></CheckboxPrimitive.Root>
      <span className="text-base text-primary">{label}</span>
    </label>
  )
})

CheckboxRound.displayName = CheckboxPrimitive.Root.displayName

export { CheckboxSquare, CheckboxStandard, CheckboxRound }
