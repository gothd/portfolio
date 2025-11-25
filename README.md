# Gothd - Digital Atelier Portfolio Template

![Project Preview](./public/preview.jpg)

> Um template de portfólio construído com a stack mais moderna do ecossistema React. Focado em micro-interações, animações SVG e estética Dark/Gothic minimalista.

Este projeto explora a interseção entre código e arte, utilizando **Next.js 16** e o novo motor do **Tailwind CSS v4.0**.

## ✨ Destaques & Recursos

- **Stack de Ponta:** Next.js 16 (App Router) + Tailwind CSS v4.
- **Dark Mode Interativo:** Um toggle de tema único em formato de aranha (`SpiderWireframe`) com física de animação.
- **Animações SVG:** Desenho de linhas vetoriais (SVG Path drawing) utilizando **Framer Motion**.
- **Performance Visual:** Background de vídeo otimizado com overlay de ruído e vinheta adaptativa.
- **Tipografia:** Configuração elegante combinando Serif (Merriweather) e Sans (Inter).

## 🛠️ Tecnologias

- [Next.js 16](https://nextjs.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Next Themes](https://github.com/pacocoursey/next-themes)

## 🚀 Como Rodar Localmente

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/gothd/portfolio.git
   cd portfolio
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

4. **Acesse:** Abra `http://localhost:3000` no seu navegador.

## 🎨 Como Personalizar

Este template foi feito para ser seu. Veja como alterar os principais pontos:

### 1\. Cores e Fontes (Tailwind v4)

Diferente das versões anteriores, a configuração do Tailwind v4 fica diretamente no CSS.
Vá em `app/globals.css`:

```css
@theme {
  /* Altere sua paleta de cores aqui */
  --color-obsidian: #0a0a0a; /* Fundo Dark */
  --color-accent: #d4d4d8; /* Cor de destaque */

  /* Altere suas fontes */
  --font-serif: "Merriweather", serif;
}
```

### 2\. O Logo (SVG Animado)

O logo "GD" é desenhado via código no arquivo `components/Hero.tsx`.
Para usar o seu logo:

1.  Converta seu logo (Illustrator/Figma) para SVG.
2.  Copie os dados do `path` (o atributo `d="..."`).
3.  No componente `Hero`, substitua as constantes `pathD` e `pathG` pelos caminhos do seu logo.

### 3\. Vídeo de Background

Substitua os arquivos na pasta `/public`:

- `hero-bg.webm` (Vídeo principal, recomendo \< 3MB).
- `hero-bg.mp4` (Fallback para Safari/iOS).
- `video-poster.jpg` (Imagem estática que carrega antes do vídeo).
- `noise.png` (Textura de ruído para o efeito gótico).

### 4\. A Aranha (Toggle de Tema)

A lógica da aranha está no componente `SpiderWireframe` dentro de `Hero.tsx`. Se quiser mudar a cor da aranha ou a velocidade da animação, ajuste as variáveis `spiderColor` e as propriedades de `transition` do Framer Motion.

## 📂 Estrutura do Projeto

```
├── app/
│   ├── layout.tsx      # Configuração global e ThemeProvider
│   ├── page.tsx        # Página principal
│   └── globals.css     # Configuração do Tailwind v4 e variáveis
├── components/
│   ├── Hero.tsx        # Componente principal (Logo, Vídeo, Aranha)
│   └── ThemeProvider.tsx
├── public/             # Assets estáticos (vídeos, imagens)
└── ...
```

## 📄 Licença

Este projeto está licenciado sob a licença MIT

---

Feito com 🖤 por Ruan Oliveira Sena

```

```
