import bcrypt from "bcryptjs";
import { jsonError, jsonOK } from "@/lib/response";
import { supabaseAdmin } from "@/lib/supabase";
import { signToken } from "@/lib/jwt";
import { NextResponse } from "next/server";
import { success } from "zod";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const { data: user, error } = await supabaseAdmin
      .from("admins")
      .select("*")
      .eq("username", username)
      .single();
    if (error || !user) {
      return jsonError("Username atau password salah", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return jsonError("Username atau password salah", 401);
    }

    const token = await signToken({ userId: user.id });

    const response = NextResponse.json({
      user,
      success: true,
    });
    response.cookies.set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    return response;
  } catch (error) {
    return jsonError("Server Error", 500);
  }
}
