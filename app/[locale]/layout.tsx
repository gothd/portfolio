import Header from "@/components/Header";
import SmoothScrolling from "@/components/SmoothScrolling";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Inter, Merriweather } from "next/font/google";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Omit<Props, "children">) {
  const { locale } = await params;

  // Carrega APENAS as traduções do namespace 'Metadata'
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL("https://gothd.dev"),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(","),
    authors: [{ name: "Ruan Oliveira Sena", url: "https://gothd.dev" }],
    creator: "Ruan Oliveira Sena",
    openGraph: {
      title: t("title"),
      description: t("openGraph.description"),
      url: "https://gothd.dev",
      siteName: "Gothd",
      locale: locale,
      type: "website",
      images: [
        {
          url: "/preview.jpg",
          width: 1200,
          height: 630,
          alt: t("openGraph.images.0.alt"),
        },
      ],
    },
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${merriweather.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <SmoothScrolling>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
            >
              <Header />
              {children}
            </ThemeProvider>
          </SmoothScrolling>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
