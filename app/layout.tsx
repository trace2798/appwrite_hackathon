import Providers from "@/components/Providers";
import "./globals.css";

import Navbar from "@/components/Navbar/Navbar";
import Modal from "@/components/TaskBoard/Modal";

export const metadata = {
  title: "Task Manager",
  description: "Made with Next.Js 13.4, appwrite and tailwindcss.",
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
          <Modal/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
