import { Button } from "@/components/ui/button";
import { description, title } from "@/lib/metadata";
import { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  return {
    other: {
      "fc:miniapp": JSON.stringify({
        version: "next",
        imageUrl: `${appUrl}/icon.png`,
        ogTitle: title,
        ogDescription: description,
        ogImageUrl: `${appUrl}/icon.png`,
        button: {
          title: "Launch Mini App",
          action: {
            type: "launch_miniapp",
            name: title,
            url: appUrl,
            splashImageUrl: `${appUrl}/icon.png`,
            iconUrl: `${appUrl}/icon.png`,
            splashBackgroundColor: "#000000",
            description: description,
            primaryCategory: "utility",
            tags: [],
          },
        },
      }),
    },
  };
}

export default function HomePage() {
  return (
    <div className="font-sans min-h-screen flex flex-col place-content-between gap-5 bg-[url(/background.png)] bg-center bg-no-repeat bg-contain max-md:bg-cover">
      <main className="flex flex-col gap-8 place-items-center grow place-content-end px-4">
        <div className="flex gap-4 max-md:flex-col">
          <Button
            className="bg-blue-700 text-white text-lg rounded-3xl px-12 py-7"
            asChild
          >
            <Link href="/factory">Enter the Factory</Link>
          </Button>
          <Button className="text-lg rounded-3xl px-12 py-7" asChild>
            <Link href="/marketplace">Marketplace</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
