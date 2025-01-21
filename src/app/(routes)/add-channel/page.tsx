import { isAdmin } from "@/actions/user";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import FormAddChannel from "./components/form";

export const metadata: Metadata = {
  title: "Add Channel",
};

export default async function Page() {
  const isUserAdmin = await isAdmin();
  if (!isUserAdmin) redirect("/");
  return (
    <div className="min-h-screen w-full px-5 py-4 md:px-10 md:py-9">
      <FormAddChannel />
    </div>
  );
}
