import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A lista de todos os idiomas suportados
  locales: ["pt-BR", "en"],

  // O idioma padrão
  defaultLocale: "pt-BR",

  // Prefixo na URL (pt-BR na raiz '/', en em '/en')
  localePrefix: "as-needed",
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
