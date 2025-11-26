import { routing } from "@/lib/navigation";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // @ts-expect-error -- garantimos que o locale é string válida
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../lib/messages/${locale}.json`)).default,
  };
});
