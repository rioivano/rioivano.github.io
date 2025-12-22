import type { Metadata } from "next";
import "./globals.css";

// 1. Definisikan Metadata (Judul & SEO)
export const metadata: Metadata = {
  title: "rioivano - profile website",
  description: "Portfolio of Rio Ivano, a Software Engineer and AI Implementation Specialist based in Jakarta.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "rioivano - profile website",
    description: "Software Engineer specializing in Next.js, Laravel, and Flutter.",
    url: "https://rioivano.github.io",
    siteName: "Rio Ivano Portfolio",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

// 2. Wajib ada Default Export Komponen Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="antialiased bg-gray-900 text-white">
        {/* Children adalah isi dari page.tsx Anda */}
        {children}
      </body>
    </html>
  );
}