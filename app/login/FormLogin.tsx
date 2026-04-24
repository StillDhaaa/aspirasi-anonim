"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useForm, SubmitHandler, Controller, Form } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const schema = z.object({
  username: z.string().min(1, { message: "Username harus diisi!" }),
  password: z.string().min(1, { message: "Password harus diisi!" }),
});
type formFields = z.infer<typeof schema>;

function FormLogin() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<formFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    const res = fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        setError("root", { message: data.error.message || "Gagal login" });
        throw new Error(data.error.message || "Gagal login");
      }
      return data;
    });
    toast.promise(res, {
      loading: "Loading...",
      success: (data) => `Selamat datang ${data.user.username}!`,
      error: (data) => `Error : ${data.message}`,
    });
    await res;
    router.push("/admin/dashboard");
  };

  return (
    <div className="mx-2 flex justify-center">
      <form
        className="bg-card text-card-foreground flex w-xl flex-col gap-1 rounded-2xl border-[1.5px] px-5 py-5 text-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          placeholder={`Username`}
          className=""
          {...register("username")}
        ></Input>
        {errors.username && (
          <p className="text-left text-sm text-red-500">
            {errors.username.message}
          </p>
        )}

        <Label htmlFor="to" className="mt-3">
          Password
        </Label>
        <Input
          id="password"
          placeholder={`Password`}
          className=""
          {...register("password")}
        ></Input>
        {errors.password && (
          <p className="text-left text-sm text-red-500">
            {errors.password.message}
          </p>
        )}

        <Button type="submit" disabled={isSubmitting} className="mt-3">
          {isSubmitting ? "Sedang Login..." : "Login"}
        </Button>
        {errors.root && (
          <p className="text-left text-sm text-red-500">
            {errors.root.message}
          </p>
        )}
      </form>
    </div>
  );
}

export default FormLogin;
