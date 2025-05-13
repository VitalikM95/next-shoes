import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import { cn } from '@/lib/utils'

const RadioGroupCustom = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('flex flex-wrap gap-2', className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroupCustom.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItemRound = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square h-10 w-10 rounded-full text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="relative flex items-center justify-center border-red-500">
        <div className="absolute h-12 w-12 rounded-full border-2 border-black" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItemRound.displayName = RadioGroupPrimitive.Item.displayName

const RadioGroupItemSquare = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    labelTop: string
    labelBottom: string
  }
>(({ className, labelTop, labelBottom, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'flex h-12 w-12 flex-col items-center justify-center rounded-none border border-black bg-transparent font-bold text-black transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30',
        'data-[state=checked]:border-black data-[state=checked]:bg-black data-[state=checked]:text-white',
        'data-[disabled]:border-muted-foreground data-[disabled]:text-muted-foreground',
        className
      )}
      {...props}
    >
      <span className="text-xs leading-tight">{labelTop}</span>
      <span className="text-sm font-bold">{labelBottom}</span>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItemSquare.displayName = RadioGroupPrimitive.Item.displayName

const RadioGroupItemUnderline = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    label: string
  }
>(({ className, label, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'relative cursor-pointer select-none text-lg font-medium text-black transition-colors',
        'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-black after:transition-transform',
        'hover:after:scale-x-100 data-[state=checked]:after:scale-x-100'
      )}
      {...props}
    >
      {label}
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItemUnderline.displayName = RadioGroupPrimitive.Item.displayName

const RadioGroupItemSwitch = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    label: string
  }
>(({ className, label, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'relative cursor-pointer select-none rounded-none px-3 py-1 text-sm font-semibold text-black',
        'transition-all duration-300 data-[state=checked]:bg-black data-[state=checked]:text-white'
      )}
      {...props}
    >
      {label}
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItemSwitch.displayName = RadioGroupPrimitive.Item.displayName

export {
  RadioGroupCustom,
  RadioGroupItemRound,
  RadioGroupItemSquare,
  RadioGroupItemUnderline,
  RadioGroupItemSwitch,
}
