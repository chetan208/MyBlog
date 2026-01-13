import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div
      className="
        w-full max-w-sm 
        rounded-2xl p-4 space-y-3
        bg-white dark:bg-slate-900
        border border-slate-200 dark:border-slate-800
      "
    >
      {/* Image */}
      <Skeleton
        className="
          w-full 
          h-40 sm:h-44 md:h-48
          rounded-xl
          bg-slate-200 dark:bg-slate-800
        "
      />

      {/* Content */}
      <div className="space-y-2">
        {/* Title */}
        <Skeleton className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800" />

        {/* Description */}
        <Skeleton className="h-4 w-full bg-slate-200 dark:bg-slate-800" />
        <Skeleton className="h-4 w-11/12 bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-4 w-16 bg-slate-200 dark:bg-slate-800" />
        <Skeleton className="h-4 w-20 bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  )
}

export default SkeletonCard
