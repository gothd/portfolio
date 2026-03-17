"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

export default function ProjectModal({ isOpen, onClose, id }: ProjectModalProps) {
  const t = useTranslations("Projects");
  const [sessionKey, setSessionKey] = useState(0);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  // Derivação de estado (Derived State) recomendada pelo React:
  // Usamos um contador no lugar de Date.now() para evitar o erro de função impura no render.
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setSessionKey((prev) => prev + 1);
    }
  }

  // Trava o scroll da página quando o modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!id) return null;

  const technologies: string[] = t.raw(`list.${id}.technologies`) || [];
  const highlights: string[] = t.raw(`list.${id}.highlights`) || [];

  const url: string = t.has(`list.${id}.url`) ? t(`list.${id}.url`) : "";
  const gif: string = t.has(`list.${id}.gif`) ? t(`list.${id}.gif`) : "";
  const image: string = t.has(`list.${id}.image`) ? t(`list.${id}.image`) : "/smoke-texture.jpg";
  const mediaSrc = gif || image;
  const isGif = mediaSrc.endsWith(".gif");

  // Força o navegador a recarregar o GIF do frame inicial anexando um timestamp único
  const finalSrc = isGif && sessionKey > 0 ? `${mediaSrc}?t=${sessionKey}` : mediaSrc;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8">
          {/* Overlay / Fundo Escurecido Gótico */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-obsidian/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Container do Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-card-bg border border-gray-200 dark:border-white/5 rounded-2xl shadow-2xl flex flex-col z-10"
            data-lenis-prevent
          >
            {/* Botão de Fechar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/10 dark:bg-white/10 text-obsidian dark:text-white hover:bg-accent-red hover:text-white dark:hover:bg-accent-red transition-colors backdrop-blur-md cursor-pointer"
              aria-label={t("closeModal")}
            >
              <X size={24} />
            </button>

            {/* Header (Capa do Modal com Fumaça) */}
            <div className="relative h-64 md:h-80 w-full shrink-0 overflow-hidden bg-obsidian flex items-end">
              <Image
                src={finalSrc}
                alt="Project background"
                fill
                unoptimized={isGif}
                className="object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-linear-to-t from-white dark:from-card-bg via-transparent to-transparent opacity-100 pointer-events-none" />

              <div className="relative z-10 p-6 md:p-10 w-full">
                <span className="text-xs font-mono text-accent-red dark:text-accent-gold uppercase tracking-wider font-bold">
                  {t(`list.${id}.category`)}
                </span>
                <h2 className="text-3xl md:text-5xl font-serif text-obsidian dark:text-white mt-2 drop-shadow-md">
                  {t(`list.${id}.name`)}
                </h2>

                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-accent-red hover:bg-red-700 dark:bg-accent-gold dark:hover:bg-yellow-600 text-white dark:text-obsidian rounded-full font-mono font-bold uppercase tracking-wider text-xs transition-colors cursor-pointer pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {t("viewWebsite")} <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Corpo do Modal */}
            <div className="p-6 md:p-10 flex flex-col gap-8 bg-white dark:bg-card-bg grow">
              <p className="text-charcoal/80 dark:text-mist/80 text-base md:text-lg leading-relaxed">
                {t(`list.${id}.description`)}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Seção de Tecnologias */}
                {technologies.length > 0 && (
                  <div>
                    <h3 className="text-sm font-mono text-accent-red dark:text-accent-gold uppercase tracking-wider font-bold mb-4">
                      {t("modalTechTitle")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-mono text-obsidian dark:text-mist bg-gray-200 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Seção de Diferenciais (Bullet Points Góticos) */}
                {highlights.length > 0 && (
                  <div>
                    <h3 className="text-sm font-mono text-accent-red dark:text-accent-gold uppercase tracking-wider font-bold mb-4">
                      {t("modalHighlightsTitle")}
                    </h3>
                    <ul className="space-y-3">
                      {highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-accent-red dark:text-accent-gold text-lg leading-none mt-0.5">
                            ◈
                          </span>
                          <span className="text-charcoal/80 dark:text-mist/80 text-sm leading-relaxed">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
