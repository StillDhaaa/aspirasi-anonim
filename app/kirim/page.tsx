"use client";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("./FormPesan"), { ssr: false });

function page() {
  return (
    <div className="bg-background flex min-h-dvh flex-col pt-20 text-center">
      <Navbar />
      <h2 className="text-primary mb-1 font-mono text-2xl font-bold">
        Kirim Pesan
      </h2>
      <NoSSR />
    </div>
  );
}

export default page;
