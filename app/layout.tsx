import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ruan Oliveira Sena | Web Developer & Design Engineer",
  description:
    "Portfólio de Ruan Oliveira Sena. Gothd é um ateliê digital focado em experiências web imersivas, performance e a interseção entre código e arte.",
  keywords: [
    "Ruan Oliveira Sena",
    "Web Developer",
    "Design Engineer",
    "Next.js",
    "Freelancer",
    "Portfolio",
    "Front-end",
  ],
  authors: [{ name: "Ruan Oliveira Sena", url: "https://gothd.dev" }],
  creator: "Ruan Oliveira Sena",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://gothd.dev",
    title: "Gothd | Digital Atelier",
    description: "Onde código encontra arte. Portfólio de Ruan Oliveira Sena.",
    siteName: "Gothd",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Gothd Portfolio Preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${merriweather.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
