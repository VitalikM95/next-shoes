import { Skeleton } from '@/components/ui/skeleton'

export function ListProductSkeleton() {
  return (
    <div className="flex flex-col space-y-3 mt-10">
      <Skeleton className="h-[300px] w-[300px]" />
      <div className="space-y-4 pt-4">
        <Skeleton className="h-10 w-[300px]" />
        <div className="flex gap-3.5">
          <Skeleton className="h-16 w-16" />
          <Skeleton className="h-16 w-16" />
          <Skeleton className="h-16 w-16" />
          <Skeleton className="h-16 w-16" />
        </div>
      </div>
    </div>
  )
}

export function CartProductSkeleton() {
  return (
    <div className="flex w-full gap-4 py-4 border-b">
      <Skeleton className="h-[100px] min-w-[100px]" />
      <div className="flex flex-col  w-full space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <div className="h-6 !mt-6 flex justify-between w-full">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/4" />
        </div>
      </div>
    </div>
  )
}
export function CheckoutProductSkeleton() {
  return (
    <div className="flex w-full gap-4 py-4 border-b">
      <Skeleton className="h-[100px] min-w-[100px]" />
      <div className="flex flex-col  w-full space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  )
}
