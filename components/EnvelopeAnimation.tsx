'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface EnvelopeAnimationProps {
  guestName: string;
  onAnimationComplete: () => void;
}

export default function EnvelopeAnimation({ guestName, onAnimationComplete }: EnvelopeAnimationProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsComplete(true);
      onAnimationComplete();
      return;
    }

    const openTimer = setTimeout(() => {
      setIsOpening(true);
    }, 2000);

    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      onAnimationComplete();
    }, 4500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete, prefersReducedMotion]);

  if (isComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-gradient-to-br from-crema via-white to-crema-dark flex items-center justify-center p-4"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Partículas sutiles de fondo */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-dorado/30 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative w-full max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* SOBRE RECTANGULAR SIMPLE Y ELEGANTE */}
            <div className="relative w-full aspect-[7/4] max-w-3xl mx-auto">
              
              {/* CUERPO DEL SOBRE - Rectángulo limpio */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-crema-dark rounded-xl shadow-2xl border-2 border-dorado/30">
                
                {/* Borde decorativo interior simple */}
                <div className="absolute inset-4 border border-dorado/20 rounded-lg"></div>

                {/* CONTENIDO DEL SOBRE - Nombre del invitado */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center p-8"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isOpening ? 0 : 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center space-y-4">
                    <p className="font-montserrat text-sm tracking-[0.3em] text-dorado uppercase">
                      Para
                    </p>
                    
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-dorado to-transparent mx-auto"></div>
                    
                    <h2 className="font-great-vibes text-4xl sm:text-5xl md:text-6xl text-dorado px-4 leading-relaxed">
                      {guestName}
                    </h2>
                    
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-dorado to-transparent mx-auto"></div>
                    
                    <motion.p
                      className="font-montserrat text-xs tracking-wide text-gray-500 italic mt-6"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      💌 Abriendo invitación
                    </motion.p>
                  </div>
                </motion.div>

                {/* Decoración esquina - Estampilla simple */}
                <div className="absolute top-4 right-4 w-12 h-12 sm:w-14 sm:h-14 border border-dorado/40 rounded-sm bg-white/50 flex items-center justify-center">
                  <span className="text-2xl">💕</span>
                </div>
              </div>

              {/* SOLAPA DEL SOBRE - Simple y elegante */}
              <motion.div
                className="absolute inset-x-0 top-0 h-1/2 flex items-start justify-center overflow-visible"
                style={{
                  transformOrigin: "top center",
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  rotateX: isOpening ? -180 : 0,
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                {/* Solapa frontal */}
                <div className="relative w-full h-full">
                  {/* Parte rectangular superior de la solapa */}
                  <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-br from-dorado via-dorado-light to-dorado rounded-t-xl border-2 border-dorado/60">
                    
                    {/* Triángulo de la solapa (parte que entra en el sobre) */}
                    <div className="absolute -bottom-0 left-0 right-0 h-16">
                      <svg 
                        className="w-full h-full" 
                        viewBox="0 0 100 16" 
                        preserveAspectRatio="none"
                      >
                        <polygon 
                          points="0,0 50,16 100,0" 
                          fill="url(#flapGradient)"
                        />
                        <defs>
                          <linearGradient id="flapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#F5EFE7" stopOpacity="0.9"/>
                            <stop offset="100%" stopColor="#FFF8F0" stopOpacity="0.95"/>
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Sello circular en el centro de la solapa */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20">
                      <motion.div
                        className="relative w-full h-full"
                        animate={{ rotate: isOpening ? 180 : 0 }}
                        transition={{ duration: 1.5 }}
                      >
                        {/* Círculo de fondo */}
                        <div className="absolute inset-0 bg-white rounded-full shadow-lg border-2 border-rojo-suave/30"></div>
                        
                        {/* Contenido del sello */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <svg viewBox="0 0 100 100" className="w-8 h-8 fill-rojo-suave">
                            <path d="M50,30 C50,30 35,25 30,35 C25,45 35,58 50,70 C65,58 75,45 70,35 C65,25 50,30 50,30 Z"/>
                          </svg>
                          <p className="font-great-vibes text-sm sm:text-base text-dorado mt-1">
                            M & A
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Línea decorativa superior */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                  </div>
                </div>
              </motion.div>

              {/* Efecto de luz al abrir */}
              {isOpening && (
                <motion.div
                  className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dorado/20 to-transparent"></div>
                </motion.div>
              )}
            </div>

            {/* Confeti minimalista al abrir */}
            {isOpening && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => {
                  const angle = -90 + (Math.random() - 0.5) * 60;
                  const distance = 100 + Math.random() * 100;
                  return (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 top-[30%] w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: i % 2 === 0 ? '#D4AF37' : '#D99999',
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0.5],
                        x: Math.cos((angle * Math.PI) / 180) * distance,
                        y: Math.sin((angle * Math.PI) / 180) * distance,
                      }}
                      transition={{
                        duration: 1.2,
                        delay: Math.random() * 0.2,
                        ease: "easeOut",
                      }}
                    />
                  );
                })}
              </div>
            )}

            {/* Sombra suave */}
            <div className="absolute -inset-4 bg-black/5 blur-2xl -z-10 rounded-xl"></div>
          </motion.div>

          {/* Texto inferior */}
          <motion.p
            className="text-center mt-8 font-great-vibes text-2xl sm:text-3xl text-dorado px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4, times: [0, 0.2, 0.7, 1] }}
          >
            Con amor te invitamos ✨
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
