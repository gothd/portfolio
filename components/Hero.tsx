"use client";

import { motion, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// --- COMPONENTE DA ARANHA (Wireframe Spider) ---
function SpiderWireframe() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const spiderColor = "#5f5fd3";
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="absolute top-0 right-[15%] z-30 pointer-events-none opacity-90">
      {/* Container para animar a descida */}
      <motion.div
        initial={{ y: -150 }} // Começa escondida
        animate={{ y: [-150, 150, 150, -150] }} // Desce, espera, sobe
        transition={{
          duration: 14,
          times: [0, 0.25, 0.75, 1], // 25% descendo, 50% parada, 25% subindo
          repeat: Infinity,
          repeatDelay: 5, // Fica um tempo lá em cima antes de voltar
          ease: "easeInOut",
        }}
        className="flex flex-col items-center"
      >
        {/* A Teia (Linha vertical que cresce conforme a aranha desce? 
            Não, vamos desenhar uma linha fixa longa e a aranha desce nela,
            mas para ser 'físico', a linha tem que acabar na aranha.
            Solução: SVG alto com linha variável.
        */}
        <svg width="40" height="400" className="overflow-visible">
          {/* A Linha da Teia (Vai do topo até a cabeça da aranha) */}
          <line
            x1="20"
            y1="-200"
            x2="20"
            y2="15"
            stroke={spiderColor}
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />

          {/* O Corpo da Aranha */}
          <motion.g
            transform="translate(20, 15)"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="cursor-pointer pointer-events-auto"
            // Hover: Adiciona um brilho neon ao redor da aranha
            whileHover={{
              filter: "drop-shadow(0px 0px 8px rgba(95, 95, 211, 0.8))",
            }}
            // Tap: Pisca levemente (reduz opacidade)
            whileTap={{ opacity: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <title>Trocar Tema</title>

            {/* Corpo */}
            <circle
              cx="0"
              cy="0"
              r="6"
              stroke={spiderColor}
              strokeWidth="1.5"
              fill={theme === "light" ? "#ffffff" : "#0a0a0a"}
              suppressHydrationWarning
            />
            <circle
              cx="0"
              cy="8"
              r="9"
              stroke={spiderColor}
              strokeWidth="1.5"
              fill={theme === "light" ? "#ffffff" : "#0a0a0a"}
              suppressHydrationWarning
            />

            {/* Olhos */}
            <circle cx="-3" cy="12" r="1" fill={spiderColor} />
            <circle cx="3" cy="12" r="1" fill={spiderColor} />

            {/* Pernas Esquerdas */}
            <path d="M -4 2 L -15 -5" stroke={spiderColor} strokeWidth="1" />
            <path d="M -6 5 L -18 5" stroke={spiderColor} strokeWidth="1" />
            <path d="M -5 8 L -16 15" stroke={spiderColor} strokeWidth="1" />

            {/* Pernas Direitas */}
            <path d="M 4 2 L 15 -5" stroke={spiderColor} strokeWidth="1" />
            <path d="M 6 5 L 18 5" stroke={spiderColor} strokeWidth="1" />
            <path d="M 5 8 L 16 15" stroke={spiderColor} strokeWidth="1" />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}

// --- COMPONENTE HERO PRINCIPAL ---
export default function Hero() {
  const themeColor = "95, 95, 211"; // #5f5fd3

  // Paths do Logo
  const pathD =
    "m 203.79588,160.49 c -14.70574,0 -26.16526,3.63732 -34.37858,10.91197 -8.29153,7.19642 -12.4373,17.24795 -12.4373,30.15458 0,12.90663 4.14578,22.99726 12.4373,30.27191 8.21331,7.19643 19.67283,10.79464 34.37858,10.79464 h 44.4692 v -1.17333 h -1.52533 c -2.03377,0 -3.75466,-0.704 -5.16265,-2.112 -1.48622,-1.48621 -2.26843,-3.24621 -2.34666,-5.27998 v -65.70648 c 0,-1.87733 0.78222,-3.44177 2.34666,-4.69332 1.48622,-1.32977 3.2071,-1.99466 5.16265,-1.99466 h 1.408 l 0.11733,-1.17333 z m 11.3813,5.86665 v 70.3998 h -9.03465 c -7.27465,0 -12.98485,-3.08977 -17.13062,-9.26931 -4.14577,-6.25776 -6.21865,-14.90129 -6.21865,-25.93059 0,-11.02931 2.07288,-19.63373 6.21865,-25.81326 4.14577,-6.25776 9.85597,-9.38664 17.13062,-9.38664 z";
  const pathG =
    "m 297.88788,305.63186 c -1.87733,0 -3.75466,-0.11733 -5.63199,-0.352 -7.8222,-1.25155 -14.5884,-4.18487 -20.2986,-8.79997 -5.71021,-4.6151 -9.97331,-10.36442 -12.7893,-17.24795 -6.80531,2.11199 -13.96263,3.16799 -21.47194,3.16799 -14.78396,0 -26.79103,-3.9111 -36.02123,-11.7333 -9.15197,-7.90042 -13.72796,-18.26484 -13.72796,-31.09325 0,-12.82841 4.69332,-23.1146 14.07996,-30.85858 9.38664,-7.8222 21.74572,-11.7333 37.07723,-11.7333 8.83908,0 17.44351,0.89955 25.81326,2.69866 3.75465,0.78222 6.80531,1.64266 9.15197,2.58133 l -1.17333,22.52794 h -1.056 c -1.87733,-7.35287 -5.59287,-12.82841 -11.14663,-16.42662 -5.47554,-3.67644 -12.12441,-5.5 -19.94661,-5.51466 -7.8222,0 -14.27552,3.44177 -19.35995,10.32531 -5.08443,6.88353 -7.62664,15.95728 -7.62664,27.22125 0,7.11821 1.09511,13.41508 3.28532,18.89062 2.19022,5.47554 5.3191,9.73864 9.38664,12.78929 4.06755,2.97244 8.56531,4.45866 13.4933,4.45866 5.00621,0 8.91731,-1.13422 11.7333,-3.40266 C 254.55289,270.78396 256,267.7333 256,263.97865 v -15.95729 c 0.0782,-1.72089 -0.43022,-3.05066 -1.52533,-3.98933 -1.01689,-0.93867 -2.5031,-1.408 -4.45865,-1.408 h -1.76 v -1.17333 h 39.42389 v 1.17333 h -1.87733 c -1.87733,0 -3.32443,0.46933 -4.34132,1.408 -1.01689,0.93867 -1.48622,2.26844 -1.408,3.98933 v 19.00795 c 0,4.53687 0.89955,9.03464 2.69866,13.49329 4.06755,9.85597 10.55997,16.19196 19.47728,19.00795 2.58133,0.78222 5.16265,1.17333 7.74398,1.17333 2.58133,0 5.12354,-0.27378 7.62664,-0.82133 l 0.2,1.17333 c -7.03998,3.05065 -13.68885,4.57598 -19.94661,4.57598 z";

  const drawGothic: Variants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
      fill: `rgba(${themeColor}, 0)`,
      stroke: `rgba(${themeColor}, 0)`,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      stroke: `rgba(${themeColor}, 1)`,
      fill: `rgba(${themeColor}, 0.2)`,
      transition: {
        pathLength: { type: "tween", duration: 3, ease: "easeInOut" },
        stroke: { duration: 0.1 },
        opacity: { duration: 0.01 },
        fill: { delay: 3, duration: 1.5, ease: "easeOut" },
      },
    },
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-white text-charcoal dark:bg-obsidian dark:text-mist relative overflow-hidden">
      {/* 1. CAMADA DE VÍDEO (Background Absoluto) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          // "poster" é a imagem que carrega antes do vídeo (importante para performance visual)
          poster="/video-poster.jpg"
          className="w-full h-full object-cover opacity-60 dark:opacity-40 transition-opacity duration-500"
        >
          <source src="/hero-bg.webm" type="video/webm" />
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. CAMADA DE OVERLAY (Gradiente Adaptativo) */}
      {/* Efeito de vinheta */}
      <div
        className="absolute inset-0 z-1 pointer-events-none 
        bg-linear-to-b 
        from-accent/90 via-accent/50 to-accent/90
        dark:from-obsidian/90 dark:via-obsidian/60 dark:to-obsidian/90
        transition-colors duration-500"
      />
      {/* --- BACKGROUND ELEMENTS --- */}
      <div
        className="absolute inset-0 z-2 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(${themeColor}, 0.35) 0%, #0a0a0a 100%)`,
        }}
      />
      {/* Efeito extra de ruído para o estilo gótico */}
      <div className="absolute inset-0 z-3 pointer-events-none opacity-[0.1] bg-[url('/noise.png')] mix-blend-overlay" />

      {/* 3. ARANHA (Z-30) */}
      <SpiderWireframe />

      {/* 4. CONTEÚDO PRINCIPAL (Z-20) */}
      <div className="z-20 text-center space-y-4 relative">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 162.13792 146.34186"
          className="w-64 h-64 md:w-80 md:h-80 mx-auto overflow-visible"
          initial="hidden"
          animate="visible"
        >
          <g transform="translate(-174.93104,-182.82907)">
            <g transform="translate(18.551037,22.93907)">
              <motion.path
                d={pathD}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={drawGothic}
              />
              <motion.path
                d={pathG}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={drawGothic}
              />
            </g>
          </g>
        </motion.svg>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5, duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif text-obsidian dark:text-accent tracking-tight mb-2">
            gothd.dev
          </h1>
          <p className="font-sans font-light text-charcoal dark:text-mist opacity-70 tracking-widest uppercase text-sm">
            Web Developer
          </p>
        </motion.div>
      </div>
    </section>
  );
}
