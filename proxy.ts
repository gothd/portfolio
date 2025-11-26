import createMiddleware from "next-intl/middleware";
import { routing } from "./lib/navigation";

export default createMiddleware(routing);

export const config = {
  // Ignora arquivos internos (_next, imagens, etc)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
