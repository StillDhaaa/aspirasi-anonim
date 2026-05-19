import { jam, tanggalBulan } from "@/lib/utils";
import { Aspirasi } from "@/types";
import { CiCircleMore } from "react-icons/ci";
import Image from "next/image";
import MoreButton from "@/components/MoreButton";
import ShareComponent from "@/components/ShareComponent";

const category = [
  "",
  "Random",
  "Saran",
  "Keluhan",
  "Apresiasi",
  "Confess & Curhat",
];

function CardPesan({
  pesan,
  pageComponent = true,
  isAdmin = false,
}: {
  pesan: Aspirasi;
  pageComponent?: boolean;
  isAdmin?: boolean;
}) {
  const date = new Date(pesan.created_at);
  const tanggal = tanggalBulan(date);
  const waktu = jam(date);

  return (
    <div
      className={`bg-card text-card-foreground border-border relative flex h-fit max-md:w-[300px] ${pageComponent ? "w-[300px]" : "w-[400px]"} flex-col justify-center rounded-xl border-2 px-5 py-3 shadow-2xl`}
    >
      <h3 className="mb-0.5 w-[80%] text-xl wrap-break-word">{pesan.from}</h3>

      {pageComponent ? (
        <MoreButton isAdmin={isAdmin} pesan={pesan} />
      ) : (
        <ShareComponent
          id={pesan.id}
          judul={`Pesan SIGMA dari ${pesan.from}`}
          text={`Lihat Pesan SIGMA yang Dikirim dari ${pesan.from} ini!\n `}
        />
      )}
      <h4 className="text-muted-foreground -mt-1 max-w-4/5 wrap-break-word">
        kepada: {pesan.to}
      </h4>

      <h4 className="text-muted-foreground mt-1 font-bold">
        {category[pesan.category_id]}
      </h4>

      <p className="-mt-0.5 wrap-break-word whitespace-pre-wrap">
        {pesan.content}
      </p>

      {pesan.image_url && (
        <Image
          src={pesan.image_url}
          alt={pesan.from}
          width={400}
          height={400}
          loading="eager"
          className="mt-2 rounded-sm object-cover"
        />
      )}
      <div className="relative">
        {isAdmin && <p className="absolute left-0">status: {pesan.status}</p>}
        <p className="text-muted-foreground mt-0.5 text-right text-sm">
          {tanggal} | {waktu}
        </p>
      </div>
    </div>
  );
}

export default CardPesan;
