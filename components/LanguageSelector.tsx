"use client";

import { usePathname, useRouter } from "@/lib/navigation";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: "pt-BR" | "en") => {
    // Substitui a rota atual mudando apenas o locale
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-3 text-sm font-sans tracking-widest">
      <button
        onClick={() => switchLocale("pt-BR")}
        className={`relative px-1 transition-colors duration-300 cursor-pointer ${
          locale === "pt-BR"
            ? "text-obsidian dark:text-white font-semibold"
            : "text-mist hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        }`}
      >
        PT
        {/* Indicador sutil (bolinha) se estiver ativo */}
        {locale === "pt-BR" && (
          <motion.div
            layoutId="lang-dot"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-obsidian dark:bg-white"
          />
        )}
      </button>

      <span className="text-gray-300 dark:text-gray-700">/</span>

      <button
        onClick={() => switchLocale("en")}
        className={`relative px-1 transition-colors duration-300 cursor-pointer ${
          locale === "en"
            ? "text-obsidian dark:text-white font-semibold"
            : "text-mist hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
        }`}
      >
        EN
        {locale === "en" && (
          <motion.div
            layoutId="lang-dot"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-obsidian dark:bg-white"
          />
        )}
      </button>
    </div>
  );
}
