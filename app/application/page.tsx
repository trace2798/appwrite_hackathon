import Board from "@/components/TaskBoard/Board";
import { siteConfig } from "@/config/site";
import { FC } from "react";

export const metadata = {
  title: "Task Manager - Application",
  description: "Made with Next.Js 13.4, appwrite and tailwindcss.",
  keywords: [
    "Next.js",
    "Appwrite",
    "Tailwind CSS",
    "hashnode",
    "appwrite hackathon",
    "appwrite hashnode hackathon",
    "hashnode hackathon"
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    opImage: [`${siteConfig.url}/og2.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og2.jpg`],
    creator: "@Trace",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};


interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <main className="flex bg-neutral-200 dark:bg-slate-900 relative min-h-screen max-w-screen overflow-hidden flex-col items-center justify-center py-8 px-5 lg:p-24 ">
        <Board />
      </main>
    </>
  );
};

export default page;
