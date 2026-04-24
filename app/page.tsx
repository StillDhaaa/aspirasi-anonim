import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="bg-background min-h-dvh">
      <Navbar />
      <div className="mt-30 flex flex-col justify-center gap-1 px-2 text-center">
        <h1 className="text-primary font-mono text-4xl font-semibold tracking-widest">
          SIGMA
        </h1>
        <h2 className="text-card-foreground mb-2 text-2xl">
          (Security-Integrity-Guard-Manage-Anonim)
        </h2>
        <p className="text-muted-foreground text-xl">
          Sebuah pesan aspirasi anonim berbasis{" "}
          <span className="italic">web</span>
        </p>
        <div className="mt-3 flex flex-col items-center justify-center gap-2">
          <Button className="font-mono text-2xl">
            <Link href={"/pesan"}>Lihat Pesan</Link>
          </Button>
          <Button variant={"secondary"} className="font-mono text-2xl">
            <Link href={"/kirim"}>Kirim Pesan</Link>
          </Button>
          {/* <Button variant={"outline"} className="mt-2 font-mono text-2xl">
            Tentang Kami
          </Button> */}
        </div>
      </div>
    </div>
  );
}
