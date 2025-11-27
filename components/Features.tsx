"use client";

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
const getCardVariant = (index: number): Variants => {
  const isSideLeft = index === 0;
  const isSideRight = index === 3;
  const isCenter = !isSideLeft && !isSideRight;

  return {
    hidden: {
      opacity: 0,
      // Laterais vêm de mais longe, centrais ficam parados no eixo X
      x: isSideLeft ? -150 : isSideRight ? 150 : 0,
      // Centrais começam menores e descem um pouco (Y) para efeito de "subida"
      y: isCenter ? 40 : 0,
      scale: isCenter ? 0.85 : 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        // LATERAIS (0 e 3) entram primeiro (delay 0.1)
        // CENTRAIS (1 e 2) entram depois (delay 0.3) criando a coreografia
        delay: isCenter ? 0.3 : 0.1,

        // Opacidade suave
        opacity: { duration: 1.2, ease: "easeOut" },

        // Movimento elástico elegante
        default: { type: "spring", damping: 25, stiffness: 120 },
      },
    },
  };
};

export default function Features() {
  const t = useTranslations("Features");

  return (
    <section
      className="min-h-screen py-24 px-6 bg-obsidian relative flex items-center"
      id="features"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Título da Seção */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-serif text-white mb-4"
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
            className="text-mist font-light max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresConfig.map((config, index) => {
            const Icon = config.icon;

            return (
              <motion.div
                key={config.id}
                // Configuração de Scroll Trigger Replayable
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2, margin: "-50px" }}
                variants={getCardVariant(index)}
                // Interação Hover
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  borderColor: "var(--color-accent-gold)",
                  backgroundColor: "rgba(30, 30, 36, 0.95)",
                }}
                className="flex flex-col p-8 rounded-xl relative overflow-hidden group
                           bg-card-bg 
                           border border-accent-gold/10 
                           shadow-lg hover:shadow-2xl transition-colors duration-300"
              >
                {/* Brilho decorativo no topo */}
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-accent-red/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Ícone e Título */}
                <div className="mb-6">
                  <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-lg bg-black/30 border border-white/5 group-hover:border-accent-gold/30 transition-colors duration-300">
                    <Icon
                      size={24}
                      className="text-accent-gold transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(197,160,80,0.5)]"
                    />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-accent-gold transition-colors">
                    {t(`cards.${config.id}.title`)}
                  </h3>
                </div>

                {/* Conteúdo */}
                <p className="text-mist text-sm leading-relaxed mb-6 grow opacity-80 group-hover:opacity-100 transition-opacity">
                  {t(`cards.${config.id}.description`)}
                </p>

                {/* Rodapé */}
                <div className="mt-auto pt-6 border-t border-white/5 group-hover:border-accent-gold/20 transition-colors">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono text-accent-gold/80 uppercase tracking-wider">
                      {config.tech}
                    </span>
                    <span className="text-xs text-gray-500 italic group-hover:text-mist">
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
