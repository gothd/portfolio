"use client";

import { motion, Variants } from "framer-motion";
import { CheckCircle2, MessageCircle, Palette, Rocket, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function WhatsAppLP() {
  const t = useTranslations("LP.whatsapp");

  // O número do seu WhatsApp com DDD
  const whatsappNumber = "5574991046610";
  // A mensagem que já vem preenchida quando o cliente clica
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(t("cta.waMessage"))}`;

  // Variantes de animação para os cards
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-obsidian text-slate-900 dark:text-mist transition-colors duration-500 font-sans pb-32">
      {/* 1. HERO SECTION (A Promessa) */}
      <section className="max-w-4xl mx-auto pt-24 pb-16 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          {t("hero.title")}
          <span className="text-blue-600 dark:text-accent-gold italic">
            {t("hero.titleAccent")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl opacity-80 leading-relaxed max-w-2xl mx-auto mb-10"
        >
          {t("hero.description")}
        </motion.p>

        <motion.a
          href={whatsappUrl}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
        >
          <MessageCircle size={24} />
          {t("cta.button")}
        </motion.a>
      </section>

      {/* 2. BENEFÍCIOS (Por que você e não um criador de sites amador?) */}
      <section className="max-w-5xl mx-auto py-16 px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Card 1: Velocidade */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-charcoal p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-white/5"
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
              <Rocket size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("features.speed.title")}</h3>
            <p className="opacity-75 leading-relaxed">{t("features.speed.desc")}</p>
          </motion.div>

          {/* Card 2: Payload CMS */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-charcoal p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-white/5"
          >
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-6">
              <Settings size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("features.management.title")}</h3>
            <p className="opacity-75 leading-relaxed">{t("features.management.desc")}</p>
          </motion.div>

          {/* Card 3: Design */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-charcoal p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-white/5"
          >
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-6">
              <Palette size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("features.custom.title")}</h3>
            <p className="opacity-75 leading-relaxed">{t("features.custom.desc")}</p>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. PROVA SOCIAL (Projetos reais que geram autoridade) */}
      <section className="bg-slate-200/50 dark:bg-charcoal/20 py-20 px-6 mt-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t("socialProof.title")}</h2>

          <div className="flex flex-col md:flex-row gap-8 items-center bg-white dark:bg-charcoal p-6 rounded-3xl shadow-md border border-slate-200 dark:border-white/5">
            <div className="w-full md:w-1/2 aspect-video bg-slate-200 dark:bg-obsidian rounded-2xl overflow-hidden relative">
              {/* Coloque um print bem bonito da MR Advocacia aqui */}
              <Image
                src="/projects/mradvocacia.webp"
                alt="MR Advocacia"
                fill
                className="object-cover"
              />
              {/* <div className="absolute inset-0 flex items-center justify-center opacity-50">
                Print MR Advocacia
              </div> */}
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <h3 className="text-2xl font-bold">{t("socialProof.mradvocacia.name")}</h3>
              <p className="opacity-75 leading-relaxed">
                {t("socialProof.mradvocacia.description")}
              </p>
              <ul className="space-y-2 pt-2">
                {(t.raw("socialProof.mradvocacia.highlights") as string[]).map((item, index) => (
                  <li key={index} className="flex items-center gap-2 opacity-80">
                    <CheckCircle2 size={18} className="text-green-500" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FIXO FLUTUANTE (Para Mobile) */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 left-0 right-0 px-6 flex justify-center z-50 md:hidden"
      >
        <a
          href={whatsappUrl}
          className="w-full max-w-sm flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 rounded-full shadow-2xl font-bold text-lg"
        >
          <MessageCircle size={24} />
          Falar no WhatsApp
        </a>
      </motion.div>
    </main>
  );
}
