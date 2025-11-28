"use client";

import { motion, Variants } from "framer-motion";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

// --- WIREFRAME BAT COMPONENT ---
// O mensageiro que surge atrás do botão
function BatDelivery({ isFlying }: { isFlying: boolean }) {
  // Path de asas batendo (Morphing simples)
  const wingsOpen =
    "M 2 15 Q 15 5 25 15 L 25 25 L 15 20 L 5 25 Z M 48 15 Q 35 5 25 15 L 25 25 L 35 20 L 45 25 Z";
  const wingsClosed =
    "M 2 10 Q 15 20 25 15 L 25 25 L 15 20 L 5 25 Z M 48 10 Q 35 20 25 15 L 25 25 L 35 20 L 45 25 Z";

  return (
    <motion.div
      initial={{ scale: 0, y: 0, opacity: 0 }}
      animate={
        isFlying
          ? {
              scale: [0, 1.5, 0.5], // Cresce e depois diminui enquanto voa longe
              y: [0, -60, -400], // Sobe para o infinito
              opacity: [0, 1, 0], // Desaparece na neblina
              rotate: [0, -5, 5, 0], // Balança um pouco
            }
          : { scale: 0 }
      }
      transition={{ duration: 2.5, ease: "easeInOut" }}
      className="absolute left-1/2 -translate-x-1/2 -top-4 pointer-events-none z-0"
    >
      <svg
        width="60"
        height="40"
        viewBox="0 0 50 30"
        className="fill-obsidian dark:fill-accent overflow-visible"
      >
        <motion.path
          d={wingsOpen}
          animate={{ d: isFlying ? [wingsOpen, wingsClosed] : wingsOpen }}
          transition={{
            duration: 0.15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        {/* Cabeça do morcego */}
        <circle cx="25" cy="15" r="3" />
        <path d="M 22 12 L 22 8 L 24 12 Z" /> {/* Orelha Esq */}
        <path d="M 28 12 L 28 8 L 26 12 Z" /> {/* Orelha Dir */}
      </svg>
    </motion.div>
  );
}

// --- RODAPÉ PRINCIPAL ---
export default function Footer() {
  const t = useTranslations("Footer");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // Simula envio (substituir por Server Action ou API real)
    await new Promise((resolve) => setTimeout(resolve, 2500));

    setStatus("success");
    // Reseta após 3s
    setTimeout(() => setStatus("idle"), 3000);
  };

  // 1. VARIANTES DO CONTAINER (O Maestro)
  // Controla quando os filhos aparecem
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Cada filho aparece 0.2s depois do anterior
        delayChildren: 0.3, // Espera um pouco antes de começar
      },
    },
  };

  // 2. VARIANTES DOS FILHOS (Os Músicos)
  // Como eles entram em cena
  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 20 },
    },
  };

  // Variantes dos Inputs (Foco)
  const inputVariants: Variants = {
    idle: { borderBottomColor: "var(--input-border-idle)", scaleX: 1 },
    focus: { borderBottomColor: "var(--input-border-focus)", scaleX: 1.02 },
  };

  return (
    <motion.footer
      className="min-h-[80vh] py-24 px-6 bg-gray-50 dark:bg-obsidian relative flex flex-col justify-between overflow-hidden transition-colors duration-500"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      // amount: 0.3 -> Dispara quando 30% do rodapé está visível
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* Background Decorativo (Fade Invertido do Hero) */}
      <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10 bg-[radial-gradient(circle_at_bottom,var(--color-accent-gold)_0%,transparent_40%)] dark:bg-[radial-gradient(circle_at_bottom,var(--color-accent-gold)_0%,transparent_60%)]" />
      {/* Fade Topo: Garante que a junção com a seção Features (gray-200) seja invisível */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-gray-200 dark:from-charcoal to-transparent pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto z-10 relative">
        {/* Cabeçalho */}
        <motion.div variants={itemVariants} className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-serif text-obsidian dark:text-white mb-4">
            {t("title")}{" "}
            <span className="text-accent-red italic">{t("titleAccent")}</span>
          </h2>
        </motion.div>

        {/* Formulário Estilo Assinatura */}
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Input Nome */}
            <motion.div variants={itemVariants} className="relative group">
              <motion.input
                type="text"
                placeholder={t("namePlaceholder")}
                className="w-full bg-transparent border-b-2 border-charcoal/20 dark:border-white/20 py-4 text-xl text-obsidian dark:text-mist outline-none placeholder:text-charcoal/40 dark:placeholder:text-mist/30 transition-colors font-serif"
                variants={inputVariants}
                initial="idle"
                whileFocus="focus"
                required
              />
            </motion.div>
            {/* Input Email */}
            <motion.div variants={itemVariants} className="relative group">
              <motion.input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="w-full bg-transparent border-b-2 border-charcoal/20 dark:border-white/20 py-4 text-xl text-obsidian dark:text-mist outline-none placeholder:text-charcoal/40 dark:placeholder:text-mist/30 transition-colors font-serif"
                variants={inputVariants}
                initial="idle"
                whileFocus="focus"
                required
              />
            </motion.div>
          </div>

          {/* Textarea Mensagem */}
          <motion.div variants={itemVariants} className="relative group">
            <motion.textarea
              placeholder={t("messagePlaceholder")}
              rows={3}
              className="w-full bg-transparent border-b-2 border-charcoal/20 dark:border-white/20 py-4 text-xl text-obsidian dark:text-mist outline-none placeholder:text-charcoal/40 dark:placeholder:text-mist/30 resize-none transition-colors font-serif"
              variants={inputVariants}
              initial="idle"
              whileFocus="focus"
              required
            />
          </motion.div>

          {/* Botão com Morcego Secreto */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center pt-8 relative"
          >
            {/* O MORCEGO (Z-0, atrás do botão) */}
            <BatDelivery isFlying={status === "sending"} />

            {/* O BOTÃO (Z-10, na frente) */}
            <motion.button
              type="submit"
              disabled={status !== "idle"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative z-10 px-10 py-4 rounded-full 
                bg-obsidian dark:bg-accent 
                text-accent dark:text-obsidian 
                font-mono font-bold tracking-widest uppercase text-sm
                shadow-xl hover:shadow-2xl transition-all duration-500
                flex items-center gap-3
                ${
                  status !== "idle"
                    ? "cursor-default opacity-80"
                    : "cursor-pointer"
                }
              `}
            >
              <span className="relative z-10">
                {status === "idle" && t("sendButton")}
                {status === "sending" && t("sending")}
                {status === "success" && t("success")}
              </span>

              {status === "idle" && <Send size={16} />}
            </motion.button>
          </motion.div>
        </form>
      </div>

      {/* Rodapé Links (Bottom) */}
      <motion.div
        variants={itemVariants}
        className="w-full max-w-7xl mx-auto mt-24 pt-8 border-t border-charcoal/10 dark:border-white/5 flex flex-col md:flex-row justify-between items-center text-sm font-mono text-charcoal/60 dark:text-mist/60 gap-4"
      >
        <p>
          © {new Date().getFullYear()} Gothd. {t("copyright")}
        </p>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/gothd"
            target="_blank"
            className="hover:text-accent-red transition-colors"
          >
            <Github size={20} />
          </a>
          <a href="#" className="hover:text-accent-red transition-colors">
            <Linkedin size={20} />
          </a>
          <a
            href={`mailto:${t("email")}`}
            className="hover:text-accent-red transition-colors"
          >
            <Mail size={20} />
          </a>
        </div>
      </motion.div>
    </motion.footer>
  );
}
