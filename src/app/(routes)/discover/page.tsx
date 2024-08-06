import H1 from "@/components/typography/h1";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover",
};

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <H1>Cooming soon</H1>
    </div>
  );
}
