import { Skeleton } from "@/components/ui/skeleton";

export function CardPesanSkeleton() {
  return (
    <div className="bg-card border-border relative flex h-fit w-[300px] flex-col justify-center rounded-xl border-2 px-5 py-3">
      <Skeleton className="mb-1 h-7 w-3/4" />

      <Skeleton className="mb-3 h-4 w-1/2" />

      <div className="mt-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>

      <Skeleton className="mt-4 h-[200px] w-full rounded-xl" />
    </div>
  );
}
