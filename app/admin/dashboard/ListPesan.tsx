"use client";

import { Aspirasi } from "@/types";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import CardPesan from "./CardPesan";

function MessageList({
  initialAspirasi,
  initialHasMore,
  isAdmin = false,
}: {
  initialAspirasi: Aspirasi[];
  initialHasMore: boolean;
  isAdmin?: boolean;
}) {
  const [messages, setMessages] = useState<Aspirasi[]>(initialAspirasi);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      loadMoreData();
    }
  }, [inView, hasMore, isLoading]);

  useEffect(() => {
    setMessages(initialAspirasi);
    setPage(1);
    setHasMore(initialHasMore);
  }, [initialAspirasi, initialHasMore]);

  const loadMoreData = async () => {
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", nextPage.toString());

      const res = await fetch(`/api/admin/message?${params.toString()}`);
      const result = await res.json();

      if (result.success) {
        setMessages((prev) => [...prev, ...result.data]);
        setHasMore(result.hasMore);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Gagal memuat aspirasi tambahan:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center pb-10">
      {/* Grid Pesan */}
      <div className="flex max-w-7xl flex-row flex-wrap justify-center gap-6">
        {messages.map((pesan) => (
          <CardPesan pesan={pesan} isAdmin={isAdmin} key={pesan.id} />
        ))}
      </div>

      {/* SENSOR SCROLL (Ditaruh di paling bawah) */}
      <div
        ref={ref}
        className="mt-8 flex h-20 w-full items-center justify-center"
      >
        {isLoading && (
          <div className="text-muted-foreground flex animate-pulse items-center gap-2">
            <p>Memuat pesan lainnya...</p>
          </div>
        )}

        {!hasMore && messages.length > 0 && (
          <p className="text-muted-foreground text-sm">
            Semua pesan telah ditampilkan
          </p>
        )}
      </div>
    </div>
  );
}

export default MessageList;
