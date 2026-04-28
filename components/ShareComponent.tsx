"use client";

import { FaShare } from "react-icons/fa";
import { toast } from "sonner";

function ShareComponent({
  id,
  judul,
  text,
}: {
  id: string;
  judul: string;
  text: string;
}) {
  const shareUrl = `${window.location.origin}/pesan?id=${id}`;

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Berhasil menyalin ke clipboard");
    } catch (error) {
      toast.error("Gagal menyalin ke clipboard");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        navigator.share({
          title: `${judul}`,
          text: `${text}`,
          url: `${shareUrl}`,
        });
        toast.success("Sukses Membagikan!");
      } catch (error) {
        toast.error("Gagal Membagikan atau Dibatalkan!");
      }
    } else {
      handleCopy(shareUrl);
    }
  };

  return (
    <button onClick={() => handleShare()}>
      <FaShare className="text-primary absolute top-4 right-4 h-8 w-8 transition duration-300 ease-in-out hover:scale-110 active:scale-90" />
    </button>
  );
}

export default ShareComponent;
