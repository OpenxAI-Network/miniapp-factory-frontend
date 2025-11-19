"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex place-content-center pb-5 text-white">
      <span>
        Powered by{" "}
        <Link href="https://openxai.org" target="_blank">
          OpenxAI
        </Link>
      </span>
    </footer>
  );
}
