import Navbar from "@/components/Navbar";
import { CardPesanSkeleton } from "./CardPesanSkeleton";

export default function Loading() {
  // Kita tampilkan 6 skeleton berjajar untuk memberikan kesan visual yang penuh
  const skeletonArray = Array.from({ length: 6 });

  return (
    <div className="bg-background relative min-h-screen pt-32">
      <Navbar />

      {/* Area Filter yang juga ikut loading */}
      <div className="bg-background/35 absolute top-0 z-1000 h-30 w-full animate-pulse backdrop-blur-3xl" />

      {/* Grid Skeleton */}
      <div className="flex w-full justify-center p-4">
        <div className="flex max-w-7xl flex-row flex-wrap justify-center gap-6">
          {skeletonArray.map((_, index) => (
            <CardPesanSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
