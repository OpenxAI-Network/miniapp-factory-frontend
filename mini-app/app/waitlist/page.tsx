import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Waitlist } from "@/components/waitlist";

export default function WaitlistPage() {
  return (
    <div className="font-sans min-h-screen flex flex-col place-content-between gap-2">
      <Header />
      <main className="flex flex-col gap-3 place-items-center px-4">
        <div className="flex flex-col gap-3 place-items-center text-center">
          <span className="text-2xl">Join the Waitlist!</span>
          <span className="text-lg text-muted-foreground max-w-[500px]">
            Subscribe to a first-come first-serve interest list of the new mini
            app factory version launch. Early subscribers will benefit from
            exclusive discounts in the new version.
          </span>
        </div>
        <Waitlist />
      </main>
    </div>
  );
}
