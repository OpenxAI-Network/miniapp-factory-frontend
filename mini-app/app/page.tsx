import { Share } from "@/components/share";
import { Button } from "@/components/ui/button";
import { description, title } from "@/lib/metadata";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/public/icon.png";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

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
        <div className="flex gap-1 place-items-center">
          <span className="text-2xl">Mini App Factory</span>
          <span className="px-1.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">
            BETA
          </span>
        </div>
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
        {/* <Button asChild>
          <Link href="/factory">Enter the factory</Link>
        </Button> */}
        <Alert className="max-w-[500px]">
          <Info />
          <AlertTitle>Factory Closed</AlertTitle>
          <AlertDescription>
            A huge thank you to everyone participating in the beta! Based on the
            feedback we&apos;ve received, we are implementing large
            architectural and user experience improvements to the factory.
            Please look forward to the new version!
          </AlertDescription>
        </Alert>
        <Share
          text={`Create your own Farcaster mini app in seconds! ${process.env.NEXT_PUBLIC_URL}`}
        />
      </div>
    </main>
  );
}
