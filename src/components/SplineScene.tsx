"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import Spline to prevent SSR hydration issues with WebGL/Canvas
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <SplineSkeleton />,
});

function SplineSkeleton() {
  return (
    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-transparent">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-[#420002]/10 animate-ping" />
        <div className="absolute inset-0 rounded-full border-2 border-t-[#c82127] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        <div className="absolute inset-3 rounded-full bg-[#c82127]/10" />
      </div>
      <p className="mt-4 font-serif text-xs tracking-[0.25em] uppercase text-[#420002]/60">
        Loading 3D Experience...
      </p>
    </div>
  );
}

interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: () => void;
}

export function SplineScene({ scene, className = "", onLoad }: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative w-full h-full overflow-hidden transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${isLoaded ? "opacity-100" : "opacity-90"} ${className}`}>
      <Spline
        scene={scene}
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
      />
    </div>
  );
}
