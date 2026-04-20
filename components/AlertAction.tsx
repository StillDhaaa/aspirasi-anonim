"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function AlertAction({
  action,
  id,
  image,
  children,
}: {
  action: "accepted" | "rejected" | "delete";
  id: string;
  image: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const textProps = () => {
    if (action === "accepted") {
      return "menerima";
    } else if (action === "rejected") {
      return "menolak";
    } else {
      return "menghapus";
    }
  };

  const updateStatus = async () => {
    const res = fetch(
      `/api/admin/message/${id}?status=${action}&${image ? `image=${image}` : ""}`,
      {
        method: "PUT",
        cache: "no-store",
      },
    ).then(async (r) => {
      const j = await r.json();

      if (!r.ok) {
        throw new Error(j.error.message);
      }
      return j;
    });

    toast.promise(res, {
      loading: `Sedang ${textProps()} pesan...`,
      success: (m) => `${m.message}`,
      error: (err) => `Gagal ${textProps()} pesan : ${err}`,
    });

    router.refresh();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apakah kamu yakin ingin {textProps()} pesan ini?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          {action === "delete"
            ? "Pesan dan gambar ini akan dihapus selamanya!"
            : "Kamu bisa mengubah pesan ini kapan saja!"}
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={() => updateStatus()}>
            Lanjutkan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertAction;
