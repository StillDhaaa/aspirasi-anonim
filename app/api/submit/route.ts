import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { jsonOK, jsonError } from "@/lib/response";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import sharp from "sharp";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const redis = Redis.fromEnv();
  const rateLimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.fixedWindow(1, "24 h"),
  });

  try {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const { success } = await rateLimit.limit(ip);

    if (!success) {
      return jsonError(
        "Kamu sudah mengirim aspirasi hari ini. Silakan coba lagi besok!",
        429,
      );
    }

    const body = await req.formData();
    const from = body.get("from") as string;
    const to = body.get("to") as string;
    const content = body.get("content") as string;
    const category_id = body.get("category_id") as string;
    const image = body.get("image") as File | null;

    if (!content || !from || !to || !category_id) {
      return jsonError("Data tidak lengkap");
    }

    let imageUrl = null;

    if (image && image.size > 0) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const compressedBuffer = await sharp(buffer)
        .resize({ width: 600, withoutEnlargement: true })
        .jpeg({ quality: 75, mozjpeg: true })
        .toBuffer();

      const fileExt = "jpg";
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `aspirasi/${fileName}`;

      const { data: uploadData, error: uploadError } =
        await supabaseAdmin.storage
          .from("aspirasi_image")
          .upload(filePath, compressedBuffer, {
            contentType: "image/jpeg",
            upsert: false,
          });

      if (uploadError) {
        console.error("Storage Error:", uploadError);
        return jsonError("Gagal mengunggah gambar", 500);
      }

      const { data: publicUrlData } = supabaseAdmin.storage
        .from("aspirasi_image")
        .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;
    }

    const today = new Date().toISOString().slice(0, 10);

    const { data, error } = await supabaseAdmin
      .from("messages")
      .insert({
        from,
        to,
        content: content,
        category_id: category_id,
        image_url: imageUrl,
        status: "pending",
        created_date: today,
      })
      .select()
      .single();

    if (error) {
      console.error("Database Error:", error);
      return jsonError(error.message, 500);
    }

    return jsonOK(
      {
        success: true,
        message: "Aspirasi berhasil dikirim!",
        data,
      },
      201,
    );
  } catch (err: any) {
    console.error("Server Error:", err);
    return jsonError(err.message || "Internal Server Error", 500);
  }
}
