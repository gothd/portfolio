"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { ReactLenis } from "lenis/react";

export default function SmoothScrolling({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  // Se for mobile, retornamos o children "puro", sem o wrapper do Lenis.
  // Isso garante scroll nativo 100% performático.
  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
