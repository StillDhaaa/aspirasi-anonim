import Navbar from "@/components/Navbar";
import FormLogin from "./FormLogin";

function page() {
  return (
    <div className="bg-background flex h-dvh w-full flex-col justify-center py-10">
      <Navbar />
      <h3 className="text-primary mb-10 text-center font-mono text-3xl font-bold text-shadow-2xs">
        Halaman Login
      </h3>
      <FormLogin />
    </div>
  );
}

export default page;
