import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./lib/navigation";

const intlMiddleware = createMiddleware(routing);

// Mapa de subdomínios para suas respectivas landing pages (LPs)
const marketingSubdomains: Record<string, string> = {
  "whatsapp.gothd.dev": "whatsapp",
  "wpp.gothd.dev": "whatsapp",
  // Exemplo de como adicionar novas campanhas depois:
  // "blackfriday.gothd.dev": "black-friday",
};

export default function middleware(request: NextRequest) {
  const hostname = request.headers.get("host");
  const { pathname } = request.nextUrl;

  // Detecta se o acesso vem pelos subdomínios de campanha através do mapa
  const lpKey = hostname ? marketingSubdomains[hostname] : undefined;

  if (lpKey) {
    if (pathname === "/" || pathname === "/pt-BR" || pathname === "/en") {
      // Faz o redirecionamento interno para a rota da campanha correspondente
      request.nextUrl.pathname = pathname === "/" ? `/lp/${lpKey}` : `${pathname}/lp/${lpKey}`;
    }
  }
  // EXECUÇÃO DO NEXT-INTL
  // O next-intl recebe a requisição modificada e aplica as traduções corretamente
  return intlMiddleware(request);
}

export const config = {
  // Ignora arquivos internos (_next, imagens, etc)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
