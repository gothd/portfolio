"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import LanguageSelector from "./LanguageSelector";
import Logo from "./Logo"; // O componente estático que criamos antes

export default function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  // Lógica para detectar direção do scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    // Se rolou para baixo mais de 150px e o scroll atual é maior que o anterior -> ESCONDE
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      // Se rolou para cima -> MOSTRA
      setHidden(false);
    }
  });

  return (
    <motion.header
      // Variantes de animação
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      // Estilo fixo + Blur (Glassmorphism Gótico)
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 
                 bg-white/50 dark:bg-obsidian/50 backdrop-blur-md 
                 border-b border-gray-200/50 dark:border-white/5"
    >
      {/* Lado Esquerdo: Logo Pequeno */}
      <div className="flex items-center">
        {/* Passamos solid={true} para o logo ficar bem visível no tamanho pequeno */}
        <Logo className="w-8 h-8" solid />
      </div>

      {/* Lado Direito: Seletor de Idioma */}
      <div>
        <LanguageSelector />
      </div>
    </motion.header>
  );
}
