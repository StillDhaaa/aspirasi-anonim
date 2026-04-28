import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { jsonOK, jsonError } from "@/lib/response";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const categories = searchParams.get("categories");
    const sort = searchParams.get("sort");
    const id = searchParams.get("id");

    if (id) {
      const { data, error } = await supabaseAdmin
        .from("messages")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return jsonError(`error ${error.message}`, 404);
      }
      return jsonOK(data, 200);
    } else {
      const page = parseInt(searchParams.get("page") || "1");
      const limit = 50;
      const from = (page - 1) * limit;
      const to = page * limit - 1;

      let query = supabaseAdmin
        .from("messages")
        .select("*", { count: "exact" })
        .eq("status", "accepted");

      if (categories) query = query.eq("category_id", parseInt(categories));

      if (sort === "oldest") {
        query = query.order("created_at", { ascending: true });
      } else {
        query = query.order("created_at", { ascending: false });
      }

      query = query.range(from, to);

      const { data, count, error } = await query;

      if (error) {
        console.error("Database Error:", error);
        return jsonError("Gagal mengambil data aspirasi", 500);
      }

      const hasMore = count ? from + (data?.length || 0) < count : false;

      return jsonOK(
        {
          success: true,
          data: data,
          hasMore: hasMore,
        },
        200,
      );
    }
  } catch (err: any) {
    console.error("Server Error:", err);
    return jsonError(err.message || "Internal Server Error", 500);
  }
}
