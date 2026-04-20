import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { jsonOK, jsonError } from "@/lib/response";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // Cek Cookie Admin
  // const token = req.cookies.get("admin_session");
  // if (!token) return jsonError("Unauthorized", 401);

  try {
    const searchParams = req.nextUrl.searchParams;
    const id = (await params).id;
    const status = searchParams.get("status") || "";

    if (status === "delete") {
      const image =
        searchParams.get("image")?.split("/aspirasi_image/")[1] || false;

      if (image) {
        const { error } = await supabaseAdmin.storage
          .from("aspirasi_image")
          .remove([`${image}`]);
        if (error) return jsonError(error.message, 500);
      }

      const { error: errorPesan } = await supabaseAdmin
        .from("messages")
        .delete()
        .eq("id", id);
      if (errorPesan) return jsonError(errorPesan.message, 500);

      return jsonOK({
        success: true,
        message: `Pesan ${image ? "beserta gambarnya" : ""} berhasil di hapus!`,
      });
    }

    if (!["accepted", "rejected", "delete"].includes(status)) {
      return jsonError(
        "Status tidak valid. Gunakan: approved, rejected, atau pending.",
      );
    }

    const { error } = await supabaseAdmin
      .from("messages")
      .update({ status })
      .eq("id", id);

    if (error) return jsonError(error.message, 500);

    return jsonOK({
      success: true,
      message: `Status pesan diubah menjadi ${status} `,
    });
  } catch (err) {
    return jsonError("Gagal update status.", 500);
  }
}
