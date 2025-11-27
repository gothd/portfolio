"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { motion, Variants } from "framer-motion";
import { Database, LucideIcon, Palette, PenTool, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

// Estrutura estática apenas para ícones e referência de chaves
interface FeatureConfig {
  id: "performance" | "systems" | "cms" | "design";
  icon: LucideIcon;
  tech: string;
}

const featuresConfig: FeatureConfig[] = [
  { id: "performance", icon: Zap, tech: "Next.js + Tailwind" },
  { id: "systems", icon: Database, tech: "React + Node + Postgres" },
  { id: "cms", icon: PenTool, tech: "Strapi + Next.js" },
  { id: "design", icon: Palette, tech: "Figma + Motion" },
];

// --- 2. VARIANTES DE ANIMAÇÃO (ENTRADA) ---
// Função para gerar variantes baseadas no índice do card (Lado vs Centro)
// aceita 'isMobile' como argumento para decidir a coreografia
const getCardVariant = (index: number, isMobile: boolean): Variants => {
  const isSideLeft = index === 0;
  const isSideRight = index === 3;
  const isCenter = !isSideLeft && !isSideRight;

  // ANIMAÇÃO MOBILE (UX Vertical Limpo)
  if (isMobile) {
    return {
      hidden: {
        opacity: 0,
        y: 30, // Vem levemente de baixo
        x: 0, // Nada de movimento lateral no mobile!
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {
          // Stagger simples baseado no índice (0.1, 0.2, 0.3...)
          delay: index * 0.15,
          duration: 0.6,
          ease: "easeOut",
        },
      },
    };
  }

  // ANIMAÇÃO DESKTOP (A Coreografia Teatral Original)
  return {
    hidden: {
      opacity: 0,
      x: isSideLeft ? -150 : isSideRight ? 150 : 0,
      y: isCenter ? 40 : 0,
      scale: isCenter ? 0.85 : 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        delay: isCenter ? 0.3 : 0.1,
        opacity: { duration: 1.2, ease: "easeOut" },
        default: { type: "spring", damping: 25, stiffness: 120 },
      },
    },
  };
};

export default function Features() {
  const t = useTranslations("Features");
  const isMobile = useIsMobile();

  return (
    <section
      className="min-h-screen py-24 px-6 bg-mist dark:bg-obsidian relative flex items-center overflow-hidden transition-colors duration-500"
      id="features"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Título */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-serif text-obsidian dark:text-white mb-4 transition-colors"
          >
            {t("title")}{" "}
            <span className="text-accent-red italic">{t("titleAccent")}</span>{" "}
            {t("titleEnd")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-charcoal dark:text-mist font-light max-w-2xl mx-auto transition-colors"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresConfig.map((config, index) => {
            const Icon = config.icon;

            return (
              <motion.div
                key={`${config.id}-${isMobile}`}
                initial="hidden"
                whileInView="visible"
                // Margin negativa ajusta o "trigger point" para disparar um pouco antes do elemento entrar totalmente
                viewport={{
                  once: false,
                  amount: 0.2,
                  margin: isMobile ? "0px" : "-50px",
                }}
                variants={getCardVariant(index, isMobile)}
                // Definimos o estado inicial no style para o Framer ler RGBA e não oklab
                style={{
                  borderColor: "var(--card-border-idle)",
                  backgroundColor: "var(--card-bg-idle)",
                }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  borderColor: "var(--color-accent-gold)",
                  backgroundColor: "var(--card-hover-bg)",
                }}
                className="flex flex-col p-8 rounded-xl relative overflow-hidden group
                           border 
                           shadow-md dark:shadow-lg 
                           hover:shadow-xl dark:hover:shadow-2xl 
                           transition-shadow duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-accent-red/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="mb-6">
                  <div
                    className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg 
                                  bg-gray-300 dark:bg-black/30 
                                  border border-white/10 dark:border-white/5 
                                  group-hover:border-accent-gold/30 transition-colors duration-300"
                  >
                    <Icon
                      size={24}
                      className="text-obsidian dark:text-accent-gold transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(197,160,80,0.5)]"
                    />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-obsidian dark:text-white group-hover:text-accent-gold transition-colors">
                    {t(`cards.${config.id}.title`)}
                  </h3>
                </div>

                <p className="text-charcoal/80 dark:text-mist text-sm leading-relaxed mb-6 grow opacity-90 group-hover:opacity-100 transition-opacity">
                  {t(`cards.${config.id}.description`)}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-300 dark:border-white/5 group-hover:border-accent-gold/20 transition-colors">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono text-accent-red dark:text-accent-gold/80 uppercase tracking-wider font-semibold">
                      {config.tech}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500 italic group-hover:text-gray-600 dark:group-hover:text-gray-400">
                      {t(`cards.${config.id}.target`)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
