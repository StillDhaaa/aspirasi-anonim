"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
  from: z.string().min(1, {
    message: `Nama pengirim harus diisi, atau gunakan "-" untuk anonim`,
  }),
  to: z.string().min(1, {
    message: `Nama penerima harus diisi, atau gunakan "-" untuk anonim`,
  }),
  content: z
    .string()
    .min(10, { message: "Pesan harus lebih dari 10 karakter" })
    .max(400, { message: "Pesan tidak boleh lebih dari 400 karakter" }),
  category_id: z
    .string()
    .min(1, { message: "Silahkan pilih untuk jenis kategori" }),
  image: z.any().optional(),
});

type formFields = z.infer<typeof schema>;

function FormPesan() {
  const router = useRouter();
  const [textLength, setTextLength] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<formFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      from: "",
      to: "",
      content: "",
      category_id: "",
    },
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const imageFIle = watch("image");
  useEffect(() => {
    if (imageFIle && imageFIle.length > 0) {
      const file = imageFIle[0];
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      console.log(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [imageFIle]);

  const removeImage = () => {
    setValue("image", undefined);
  };

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("from", data.from);
      formData.append("to", data.to);
      formData.append("content", data.content);
      formData.append("category_id", data.category_id);

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      const promise = fetch("/api/submit", {
        method: "POST",
        body: formData,
        cache: "no-store",
      }).then(async (res) => {
        const j = await res.json();
        if (!res.ok) {
          setError("root", { message: j.error.message });
          throw new Error();
        }
        return j;
      });

      toast.promise(promise, {
        loading: "Mengirim pesan...",
        success: "Berhasil mengirim pesan!",
        error: "Gagal mengirim pesan!",
      });
      await promise;
      reset();

      const redirect = () =>
        new Promise((resolve) => setTimeout(resolve, 1000));

      toast.promise(redirect, {
        loading: "Mengarahkan ke halaman utama...",
        success: "Silahkan ditunggu pesan untuk disetujui oleh admin!",
      });
      router.push("/");
    } catch (e) {}
  };

  return (
    <div className="mx-2 flex justify-center">
      <form
        className="bg-card text-card-foreground flex w-xl flex-col gap-1 rounded-2xl border-[1.5px] px-5 py-5 text-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label htmlFor="from">Dari</Label>
        <Input
          id="from"
          placeholder={`Nama pengirim atau "-" untuk anonim`}
          className=""
          {...register("from")}
        ></Input>
        {errors.from && (
          <p className="text-left text-sm text-red-500">
            {errors.from.message}
          </p>
        )}

        <Label htmlFor="to" className="mt-3">
          Untuk
        </Label>
        <Input
          id="to"
          placeholder={`Nama penerima atau "-" untuk anonim`}
          className=""
          {...register("to")}
        ></Input>
        {errors.to && (
          <p className="text-left text-sm text-red-500">{errors.to.message}</p>
        )}

        <Label htmlFor="pesan" className="mt-3">
          Pesan
        </Label>
        <div className="relative">
          <Textarea
            className="pb-4 max-sm:max-w-xs"
            placeholder="Pesan yang ingin disampaikan"
            {...register("content")}
            onChange={(e) => setTextLength(e.target.value)}
          />
          <p
            className={`${textLength.length > 400 ? "text-red-500" : "text-muted-foreground"} bg-background absolute -bottom-2 left-2 rounded-sm px-2 py-1 text-[10px]`}
          >
            {textLength.length} / 400
          </p>
        </div>

        {errors.content && (
          <p className="text-left text-xs text-red-500">
            {errors.content.message}
          </p>
        )}

        <Label htmlFor="kategori" className="mt-3">
          Kategori
        </Label>
        <Controller
          name="category_id"
          control={control}
          render={({ field }) => (
            <Select
              defaultValue=""
              onValueChange={field.onChange}
              value={field.value}
            >
              <SelectTrigger id="kategori" className="min-w-xs">
                <SelectValue placeholder="Kategori pesan" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">Random</SelectItem>
                  <SelectItem value="2">Saran</SelectItem>
                  <SelectItem value="3">Keluhan</SelectItem>
                  <SelectItem value="4">Apresiasi</SelectItem>
                  <SelectItem value="5">Confess & Curhat</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.category_id && (
          <p className="text-left text-sm text-red-500">
            {errors.category_id.message}
          </p>
        )}

        <Label className="mt-3" htmlFor="image">
          Gambar yang mendukung
        </Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          className="cursor-pointer"
          {...register("image")}
        />
        {previewUrl && (
          <div className="relative mt-2 flex w-full justify-center">
            <Image
              src={previewUrl}
              alt="Preview Gambar"
              width={500}
              height={500}
              className="rounded-md border object-cover"
              unoptimized // Wajib untuk URL blob lokal
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <Button type="submit" disabled={isSubmitting} className="mt-3">
          {isSubmitting ? "Mengirim pesan.." : "Kirim"}
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

export default FormPesan;
