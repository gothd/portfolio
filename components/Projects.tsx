"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import Image from "next/image";
import ProjectModal from "./ProjectModal";

const projects = ["project1" /* , "project2", "project3", "project4" */];

export default function Projects() {
  const t = useTranslations("Projects");
  const targetRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Altura dinâmica: 120vh se houver 1 projeto (apenas entrada),
  // ou 100vh + 50vh por projeto para uma rolagem suave do carrossel.
  const scrollHeight = projects.length === 1 ? "120vh" : `${projects.length * 50 + 100}vh`;

  // Scroll Container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Suavização para evitar movimentos bruscos, mas leve para o mobile
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
  });

  // --- Parallax ---

  // Cards: Previne o efeito rebote e a "mola" extra quando há apenas 1 projeto.
  const xRange = projects.length === 1 ? [0, 1] : [0, 0.15, 1];
  const xValues =
    projects.length === 1
      ? ["calc(25% + 0vw)", "calc(1% + 0vw)"]
      : ["calc(25% + 0vw)", "calc(1% + 0vw)", "calc(-100% + 80vw)"];

  const xCards = useTransform(smoothProgress, xRange, xValues);

  // Background move-se lentamente na direção oposta ou na mesma,
  // criando profundidade
  const xBackground = useTransform(smoothProgress, [0, 1], ["0%", "-25%"]);

  const bgOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);

  return (
    <section
      className="relative bg-gray-100 dark:bg-charcoal transition-colors duration-500"
      id="projects"
    >
      {/* Cabeçalho Normal (Rola com a página antes do sticky) */}
      <div className="pt-32 pb-8 pl-6 md:pl-12 relative z-10">
        <h2 className="text-4xl md:text-6xl font-serif text-obsidian dark:text-white mb-2 mix-blend-difference">
          {t("title")}
        </h2>
        <p className="text-charcoal/60 dark:text-mist/60 font-mono text-sm tracking-widest uppercase">
          {t("subtitle")}
        </p>
      </div>

      {/* Container de Scroll Horizontal (Foca apenas nos cards e barra) */}
      <div ref={targetRef} className="relative" style={{ height: scrollHeight }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          {/* --- BACKGROUND PARALLAX (Fumaça/Textura) --- */}
          <motion.div
            style={{
              x: xBackground,
              opacity: bgOpacity,
            }}
            className="absolute inset-0 w-[150vw] h-full z-0 pointer-events-none"
          >
            {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-gray-800/30 via-charcoal to-charcoal" /> */}
            {/* Uma imagem de textura grande */}
            <Image
              src="/smoke-texture.jpg"
              alt="Smoke Background"
              fill
              className="object-cover opacity-20 mix-blend-screen"
            />
          </motion.div>

          {/* --- CARDS SCROLL --- */}
          <motion.div
            style={{ x: xCards }}
            className="flex items-stretch w-max gap-8 pl-6 md:pl-12 pr-12 z-20 will-change-transform"
          >
            {projects.map((key, index) => (
              <ProjectCard
                key={key}
                id={key}
                index={index}
                onClick={() => setSelectedProject(key)}
              />
            ))}
          </motion.div>

          {/* Barra de Progresso */}
          <motion.div
            style={{ scaleX: scrollYProgress }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-accent-red origin-left z-30"
          />
        </div>
      </div>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        id={selectedProject || ""}
      />
    </section>
  );
}

function ProjectCard({ id, index, onClick }: { id: string; index: number; onClick: () => void }) {
  const t = useTranslations("Projects");

  return (
    <div
      className="relative flex flex-col w-[85vw] md:w-[40vw] shrink-0 rounded-xl overflow-hidden 
                 bg-white dark:bg-card-bg 
                 border border-gray-200 dark:border-white/5
                 shadow-2xl transition-all duration-500 group"
    >
      {/* Imagem Placeholder com Efeito Gótico */}
      <div className="h-56 md:h-72 w-full relative overflow-hidden shrink-0">
        {t.has(`list.${id}.image`) ? (
          <Image
            src={t(`list.${id}.image`)}
            alt={t(`list.${id}.name`)}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-linear-to-br transition-transform duration-700 group-hover:scale-110 ${
              index % 2 === 0
                ? "from-charcoal to-obsidian dark:from-black dark:to-charcoal"
                : "from-accent-red/20 to-obsidian dark:from-accent-red/10 dark:to-black"
            }`}
          />
        )}
      </div>

      {/* Camada de Névoa Interna (Opcional: aumenta o mistério nos cantos) */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />

      {/* Conteúdo */}
      <div className="p-6 flex flex-col grow justify-between relative z-10 gap-4">
        <div>
          <span className="text-xs font-mono text-accent-red dark:text-accent-gold uppercase tracking-wider font-bold line-clamp-2">
            {t(`list.${id}.category`)}
          </span>
          <h3 className="text-2xl md:text-3xl font-serif text-obsidian dark:text-white mt-2 transition-colors line-clamp-1">
            {t(`list.${id}.name`)}
          </h3>
          <p className="text-charcoal/70 dark:text-mist/70 mt-2 text-sm leading-relaxed line-clamp-3">
            {t(`list.${id}.description`)}
          </p>
        </div>

        <button
          onClick={onClick}
          className="mt-3.5 w-full py-3.5 flex items-center gap-2 text-sm font-bold text-obsidian dark:text-white hover:text-accent-red dark:hover:text-accent-gold transition-colors cursor-pointer"
        >
          {t("listCardButtonLabel")} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
