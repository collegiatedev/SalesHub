import "dotenv/config";
import "~/styles/essay.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "./session";
import { EssayNavbar } from "./_components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Essays",
  description: "Essay Service",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EssayNavbar />
        <div className="p-5 max-w-2xl mx-auto">
          {/* provider here since we provide loading state that should be formatted by div */}
          <SessionProvider>{children}</SessionProvider>
        </div>
      </body>
    </html>
  );
}
