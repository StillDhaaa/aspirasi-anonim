"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RiRefreshFill } from "react-icons/ri";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function FilterCategory({ isAdmin = false }: { isAdmin?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local State agar UI berubah seketika tanpa menunggu server
  const [category, setCategory] = useState(
    searchParams.get("categories") || "0",
  );
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [status, setStatus] = useState(searchParams.get("status") || "semua");

  // Fungsi routing
  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "0" || value === "semua") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    // Lakukan routing normal (tanpa transition) agar Suspense bisa terpanggil
    router.replace(`${pathname}?${params.toString()}`, { scroll: true });
  };

  const refreshPage = () => {
    router.refresh();
  };

  return (
    <div className="bg-background/35 fixed top-0 z-10 h-32 w-full backdrop-blur-3xl">
      <div className="absolute bottom-1.5 mx-auto flex w-full items-center justify-center gap-4 overflow-x-auto px-5">
        {/* SELECT KATEGORI */}
        <Select
          value={category}
          onValueChange={(val) => {
            setCategory(val);
            updateUrl("categories", val);
          }}
        >
          <SelectTrigger className="max-w-lg min-w-[10rem] bg-white">
            <SelectValue placeholder="Semua Kategori" />
          </SelectTrigger>
          <SelectContent className="z-330">
            <SelectGroup>
              <SelectItem value="0">Semua</SelectItem>
              <SelectItem value="1">Random</SelectItem>
              <SelectItem value="2">Saran</SelectItem>
              <SelectItem value="3">Keluhan</SelectItem>
              <SelectItem value="4">Apresiasi</SelectItem>
              <SelectItem value="5">Confess & Curhat</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* SELECT URUTAN WAKTU */}
        <Select
          value={sort}
          onValueChange={(val) => {
            setSort(val);
            updateUrl("sort", val);
          }}
        >
          <SelectTrigger className="max-w-lg min-w-[7rem] bg-white">
            <SelectValue placeholder="Terbaru" />
          </SelectTrigger>
          <SelectContent className="z-330">
            <SelectGroup>
              <SelectItem value="newest">Terbaru</SelectItem>
              <SelectItem value="oldest">Paling lama</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* SELECT STATUS */}
        {isAdmin && (
          <>
            <Select
              value={status}
              onValueChange={(val) => {
                setStatus(val);
                updateUrl("status", val);
              }}
            >
              <SelectTrigger className="max-w-lg min-w-[7rem] bg-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="z-330">
                <SelectGroup>
                  <SelectItem value="semua">Semua</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <RiRefreshFill
              onClick={() => {
                refreshPage();
              }}
              className="text-primary h-9 w-9"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default FilterCategory;
