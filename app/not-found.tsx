import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      <h1 className="text-center text-3xl font-bold">
        HALAMAN TIDAK DITEMUKAN!
      </h1>
      <Link
        href="/"
        className="bg-primary mt-6 rounded-2xl px-4 py-3 text-center font-mono text-2xl"
      >
        KEMBALI KE BERANDA
      </Link>
      <p className="mt-3">error : 404</p>
    </div>
  );
}
