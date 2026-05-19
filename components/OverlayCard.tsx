"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import CardPesan from "@/app/admin/dashboard/CardPesan";
import { toast } from "sonner";

export default function OverlayCard({}: {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const id = searchParams.get("id");

  if (!id) {
    return <></>;
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (!isOpen) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("id");

      document.body.style.overflow = "";
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/message?id=${id}`);
      const result = await res.json();
      if (!res.ok) {
        console.log(result.error.message);
        setLoading(false);
        return setData(null);
      }
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  const ResultData = () => {
    if (error)
      return (
        <>
          <p>Pesan tidak ditemukan!</p>
        </>
      );
    if (data) return <CardPesan pesan={data} pageComponent={false} />;
    if (!data) {
      toast.error("Pesan tidak ditemukan!");
      return <></>;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-1000 flex overflow-y-auto bg-white/30 py-8 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ y: 30, scale: 0.8, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="z-1001 m-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {loading ? <></> : <ResultData />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
