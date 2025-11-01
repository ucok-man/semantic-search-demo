import { Icons } from "@/components/icons";
import SearchBox from "@/components/searchbox";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Semantic Search Demo",
  description:
    "Explore how semantic search works — find results based on meaning, not just keywords, using vector embeddings and AI similarity search.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative isolate min-h-screen overflow-hidden border-b border-gray-200 bg-white">
          <svg
            className="absolute inset-0 -z-10 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                width={200}
                height={200}
                x="50%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
            />
          </svg>
          <div className="mx-auto max-w-7xl gap-16 px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-24">
            <div className="flex size-full flex-col items-center gap-4">
              <Icons.Sparkles className="size-16" />
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Magic Search
              </h1>
              <p className="max-w-xl text-center text-lg text-slate-700">
                A beautifully designed, hybrid search enggine that enhances
                search accuracy by querying semantically related results.
              </p>

              <div className="mx-auto mt-16 flex w-full max-w-2xl flex-col">
                <SearchBox />
                <div className="py-8">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
