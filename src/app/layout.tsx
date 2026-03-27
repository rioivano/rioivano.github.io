import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rio Ivano — Software Engineer",
  description:
    "Portfolio of Rio Ivano, a Software Engineer and AI Implementation Specialist based in South Tangerang, Indonesia.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Rio Ivano — Software Engineer",
    description:
      "Portfolio of Rio Ivano, a Software Engineer and AI Implementation Specialist based in South Tangerang, Indonesia.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="antialiased bg-[#080808] text-white">
        {children}
      </body>
    </html>
  );
}
