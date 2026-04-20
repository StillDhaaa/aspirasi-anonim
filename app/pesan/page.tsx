import { Suspense } from "react";
import FilterCategory from "@/components/FilterCategory";
import Navbar from "@/components/Navbar";
import ListPesan from "../admin/dashboard/ListPesan";
import { CardPesanSkeleton } from "../admin/dashboard/CardPesanSkeleton";

export const dynamic = "force-dynamic";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const query = await searchParams;

  const params = new URLSearchParams();

  if (query.categories) params.set("categories", query.categories);
  if (query.sort) params.set("sort", query.sort);
  if (query.status) params.set("status", query.status);

  const queryString = params.toString();
  const listKey = queryString || "all";

  const fetchData = await fetch(
    `${process.env.BASE_URL!}/api/message${queryString ? `?${queryString}` : ""}`,
    {
      cache: "no-store",
    },
  );
  const result = await fetchData.json();

  const listAspirasi = result.data || [];
  const hasMore = result.hasMore || false;

  return (
    <div className="bg-background min-h-dvh overflow-x-hidden">
      <Navbar />
      <FilterCategory />

      <div className="mt-34 mb-10 flex w-full justify-start">
        <Suspense
          fallback={
            <div className="flex w-full justify-center p-4">
              <div className="flex max-w-7xl flex-row flex-wrap justify-center gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <CardPesanSkeleton key={index} />
                ))}
              </div>
            </div>
          }
        >
          <ListPesan
            key={listKey}
            initialAspirasi={listAspirasi}
            initialHasMore={hasMore}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
