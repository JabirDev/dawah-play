import { BrandIcons } from "@/components/icons/brand-icons";
import { siteConfig } from "@/config/site";
import { staticMetadata } from "@/lib/seo/metadata";

export const metadata = staticMetadata({
  title: "Page not found",
});

export default function Loading() {
  return (
    <div className="max-w-screen absolute left-0 top-0 z-50 flex h-full max-h-screen w-full flex-col justify-between bg-background p-12">
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-2">
        <BrandIcons.logo className="h-24 w-24" />
        <h2 className="font-bold text-neutral-800 dark:text-neutral-200">
          {siteConfig.name}
        </h2>
      </div>
      <div className="credit flex items-center justify-center">
        <p>Jabirdev</p>
      </div>
    </div>
  );
}
