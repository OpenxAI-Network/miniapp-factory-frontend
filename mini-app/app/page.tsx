import { Share } from "@/components/share";
import { Button } from "@/components/ui/button";
import { description, title } from "@/lib/metadata";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/public/icon.png";

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

export default function Home() {
  return (
    <main className="flex flex-col gap-8 place-items-center px-4">
      <div className="flex flex-col gap-1 place-items-center text-center">
        <span className="text-2xl">Mini App Factory</span>
        <span className="text-muted-foreground">
          AI-powered application to allow creation of Farcaster mini apps with
          natural language.
        </span>
      </div>
      <Image
        className="size-[200px]"
        src={Icon}
        alt="icon"
        width={200}
        height={200}
      />
      <div className="flex flex-col gap-3">
        <Button asChild>
          <Link href="/factory">Enter the factory</Link>
        </Button>
        <Share
          text={`Create your own Farcaster mini app in seconds! ${process.env.NEXT_PUBLIC_URL}`}
        />
      </div>
    </main>
  );
}
