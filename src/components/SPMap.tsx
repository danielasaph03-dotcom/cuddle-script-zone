import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const SPMap = ({ 
  activeRegion, 
  onRegionClick 
}: { 
  activeRegion: string | null; 
  onRegionClick: (region: string) => void 
}) => {
  return (
    <div className="relative w-full aspect-[4/3] bg-secondary/10 rounded-2xl overflow-hidden border border-primary/10 flex items-center justify-center p-4">
      {/* Simplified SP Map Shape using SVG */}
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full fill-primary/10 stroke-primary/20 stroke-[2]"
      >
        <path
          d="M150,200 L250,150 L400,180 L550,120 L700,150 L750,300 L650,450 L500,550 L300,500 L100,450 L50,350 Z"
          className="transition-colors duration-500"
        />
        
        {/* Region Highlights */}
        <motion.path
          d="M150,200 L250,150 L350,250 L250,350 Z"
          fill={activeRegion === 'Presidente Prudente' ? 'var(--color-primary)' : 'transparent'}
          className="cursor-pointer opacity-20 hover:opacity-30 transition-all"
          onClick={() => onRegionClick('Presidente Prudente')}
        />
        <motion.path
          d="M500,300 L600,250 L700,350 L600,450 Z"
          fill={activeRegion === 'Curitiba' ? 'var(--color-primary)' : 'transparent'}
          className="cursor-pointer opacity-20 hover:opacity-30 transition-all"
          onClick={() => onRegionClick('Curitiba')}
        />

        {/* Animated Markers */}
        {/* Presidente Prudente Marker */}
        <g onClick={() => onRegionClick('Presidente Prudente')} className="cursor-pointer">
          <circle cx="250" cy="250" r="8" className="fill-accent shadow-lg" />
          <motion.circle
            cx="250"
            cy="250"
            r="8"
            className="stroke-accent fill-transparent stroke-2"
            animate={{ r: [8, 20], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <text x="250" y="230" textAnchor="middle" className="text-[12px] font-bold fill-primary pointer-events-none uppercase tracking-tighter">P. Prudente</text>
        </g>

        {/* Curitiba Marker */}
        <g onClick={() => onRegionClick('Curitiba')} className="cursor-pointer">
          <circle cx="600" cy="350" r="8" className="fill-accent shadow-lg" />
          <motion.circle
            cx="600"
            cy="350"
            r="8"
            className="stroke-accent fill-transparent stroke-2"
            animate={{ r: [8, 20], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <text x="600" y="330" textAnchor="middle" className="text-[12px] font-bold fill-primary pointer-events-none uppercase tracking-tighter">Curitiba</text>
        </g>
      </svg>
      
      {/* Tooltip Card */}
      <AnimatePresence>
        {activeRegion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute top-[10%] left-1/2 -translate-x-1/2 z-20 bg-card p-6 rounded-xl border border-accent shadow-2xl w-[90%] max-w-[320px]"
          >
            <h4 className="font-bold text-primary mb-2 uppercase text-xs tracking-widest">{activeRegion} e Região</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {activeRegion === 'Curitiba'
                ? "Curitiba, Ponta Grossa, Londrina e Cambé (PR)."
                : "Presidente Prudente, Álvares Machado, Regente Feijó, Martinópolis, Rancharia, Presidente Bernardes e Presidente Venceslau."}
            </p>
            <button 
              onClick={(e) => { e.stopPropagation(); onRegionClick(''); }}
              className="mt-4 text-[10px] font-bold text-primary uppercase hover:text-accent transition-colors"
            >
              Fechar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
