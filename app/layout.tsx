import Providers from "@/components/Theme/Providers";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Modal from "@/components/TaskBoard/Modal";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Task Manager - Home",
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
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@Trace",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Modal />
        </Providers>
      </body>
    </html>
  );
}
