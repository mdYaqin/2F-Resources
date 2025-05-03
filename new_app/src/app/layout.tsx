// src/app/layout.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css/animate.min.css";
import "./globals.css";

import { Open_Sans, Teko } from "next/font/google";
import ClientLayout from "./ClientLayout";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-open-sans",
  display: "swap",
});

const teko = Teko({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-teko",
  display: "swap",
});

export const metadata = {
  title: "2F Resources - Architecture HTML Template",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${openSans.variable} ${teko.variable}`}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
