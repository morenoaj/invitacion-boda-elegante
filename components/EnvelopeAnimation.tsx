'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface EnvelopeAnimationProps {
  guestName: string;
  onAnimationComplete: () => void;
}

export default function EnvelopeAnimation({ guestName, onAnimationComplete }: EnvelopeAnimationProps) {
  const [sealBroken, setSealBroken] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsComplete(true);
      onAnimationComplete();
      return;
    }

    // Timeline simple y limpio - Más tiempo para leer el nombre
    const sealTimer = setTimeout(() => setSealBroken(true), 3500);
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      onAnimationComplete();
    }, 5500);

    return () => {
      clearTimeout(sealTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete, prefersReducedMotion]);

  if (isComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-gradient-to-br from-amber-50 via-crema to-slate-50 flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: sealBroken ? [1, 1, 0] : 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          opacity: sealBroken 
            ? { duration: 2, times: [0, 0.6, 1] }
            : { duration: 0.6 }
        }}
      >
        {/* Partículas sutiles de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-dorado/25 rounded-full"
              style={{
                left: `${25 + Math.random() * 50}%`,
                top: `${25 + Math.random() * 50}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.25, 0.5, 0.25],
              }}
              transition={{
                duration: 3 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* CARTA DE INVITACIÓN HORIZONTAL */}
        <motion.div
          className="relative w-full max-w-4xl"
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ 
            scale: 1, 
            opacity: sealBroken ? [1, 1, 0] : 1,
            y: 0 
          }}
          transition={{ 
            scale: { duration: 0.6, ease: "easeOut" },
            opacity: sealBroken 
              ? { duration: 1.8, times: [0, 0.6, 1] }
              : { duration: 0.6 },
            y: { duration: 0.6, ease: "easeOut" }
          }}
        >
          {/* Carta principal - Proporción horizontal elegante */}
          <div className="relative w-full mx-auto">
            <div 
              className="relative w-full bg-gradient-to-br from-white via-crema-light to-crema rounded-2xl shadow-2xl border-4 border-dorado/40 overflow-hidden"
              style={{ aspectRatio: '16/11' }}
            >
              {/* Textura de papel sutil */}
              <div className="absolute inset-0 opacity-[0.05]" style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,.04) 3px, rgba(0,0,0,.04) 6px)`
              }}></div>

              {/* Marco decorativo exterior */}
              <div className="absolute inset-4 sm:inset-6 border-2 border-dorado/25 rounded-xl"></div>
              
              {/* Marco decorativo interior */}
              <div className="absolute inset-8 sm:inset-12 border border-dorado/15 rounded-lg"></div>

              {/* Esquinas decorativas */}
              <div className="absolute top-3 left-3 w-6 h-6 sm:w-8 sm:h-8">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-dorado/30"></div>
                <div className="absolute top-0 left-0 w-0.5 h-full bg-dorado/30"></div>
              </div>
              <div className="absolute top-3 right-3 w-6 h-6 sm:w-8 sm:h-8">
                <div className="absolute top-0 right-0 w-full h-0.5 bg-dorado/30"></div>
                <div className="absolute top-0 right-0 w-0.5 h-full bg-dorado/30"></div>
              </div>
              <div className="absolute bottom-3 left-3 w-6 h-6 sm:w-8 sm:h-8">
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-dorado/30"></div>
                <div className="absolute bottom-0 left-0 w-0.5 h-full bg-dorado/30"></div>
              </div>
              <div className="absolute bottom-3 right-3 w-6 h-6 sm:w-8 sm:h-8">
                <div className="absolute bottom-0 right-0 w-full h-0.5 bg-dorado/30"></div>
                <div className="absolute bottom-0 right-0 w-0.5 h-full bg-dorado/30"></div>
              </div>

              {/* Contenido de la carta */}
              <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 py-6 sm:py-10 md:py-12">
                
                {/* Separador decorativo superior */}
                <div className="w-full max-w-md mb-6 sm:mb-8">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-dorado/40 to-transparent"></div>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-dorado/40"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-dorado/60"></div>
                      <div className="w-1 h-1 rounded-full bg-dorado/40"></div>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-dorado/40 to-transparent"></div>
                  </div>
                </div>

                {/* Texto principal */}
                <motion.div
                  className="text-center space-y-4 sm:space-y-6 mb-6 sm:mb-8"
                  animate={{ opacity: sealBroken ? 0 : 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="font-montserrat text-sm sm:text-base md:text-lg tracking-wide text-gray-700 leading-relaxed px-4">
                    Esta invitación es <span className="text-dorado-dark font-semibold">exclusiva</span> para
                  </p>
                  
                  {/* Nombre del invitado - Destacado */}
                  <div className="relative py-4 sm:py-6 px-6 sm:px-8">
                    {/* Brillo sutil detrás del nombre */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-dorado/10 to-transparent rounded-lg"></div>
                    
                    <p className="relative font-great-vibes text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-dorado leading-relaxed">
                      {guestName}
                    </p>
                  </div>
                </motion.div>

                {/* Separador decorativo inferior */}
                <div className="w-full max-w-md mb-6 sm:mb-8">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-dorado/40 to-transparent"></div>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-dorado/40"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-dorado/60"></div>
                      <div className="w-1 h-1 rounded-full bg-dorado/40"></div>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-dorado/40 to-transparent"></div>
                  </div>
                </div>

                {/* Indicador de animación */}
                <motion.div 
                  className="flex flex-col items-center gap-2"
                  animate={{ 
                    opacity: sealBroken ? 0 : [0.5, 1, 0.5] 
                  }}
                  transition={{ 
                    opacity: sealBroken 
                      ? { duration: 0.3 }
                      : { duration: 2, repeat: Infinity }
                  }}
                >
                  <span className="text-2xl sm:text-3xl">💌</span>
                  <p className="font-montserrat text-xs sm:text-sm tracking-wide text-gray-500 italic">
                    {!sealBroken ? 'Nos honrarías con tu presencia' : 'Preparando tu invitación...'}
                  </p>
                </motion.div>
              </div>

              {/* Sombra de la carta */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-10 bg-black/25 blur-3xl rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
