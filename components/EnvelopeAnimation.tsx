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
        className="fixed inset-0 z-[100] bg-gradient-to-br from-crema via-crema-light to-white flex items-center justify-center p-4 sm:p-8"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Partículas doradas sutiles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-dorado/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Contenedor principal del sobre */}
        <div className="relative w-full max-w-2xl">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* SOBRE - Estructura principal */}
            <div className="relative w-full mx-auto" style={{ maxWidth: '700px' }}>
              
              {/* Proporción del sobre: 3:2 (como sobre real) */}
              <div className="relative w-full" style={{ paddingBottom: '66.67%' }}>
                
                {/* BASE DEL SOBRE (parte inferior/cuerpo) */}
                <div className="absolute inset-0">
                  <div className="w-full h-full bg-gradient-to-br from-white via-crema-light to-crema border-4 border-dorado/50 rounded-lg shadow-2xl">
                    
                    {/* Borde decorativo interior */}
                    <div className="absolute inset-4 border border-dorado/30 rounded-md"></div>
                    
                    {/* Contenido del sobre */}
                    <motion.div
                      className="absolute inset-0 flex flex-col items-center justify-center p-8"
                      animate={{ opacity: isOpening ? 0 : 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="font-montserrat text-xs sm:text-sm tracking-[0.25em] text-dorado-dark uppercase mb-4">
                        Para
                      </p>
                      
                      <div className="w-24 h-px bg-gradient-to-r from-transparent via-dorado to-transparent mb-6"></div>
                      
                      <p className="font-great-vibes text-4xl sm:text-5xl lg:text-6xl text-dorado text-center px-6 leading-relaxed">
                        {guestName}
                      </p>
                      
                      <div className="w-24 h-px bg-gradient-to-r from-transparent via-dorado to-transparent mt-6 mb-4"></div>
                      
                      <motion.div
                        className="flex items-center gap-2 mt-2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="text-2xl">💌</span>
                        <p className="font-montserrat text-xs tracking-wide text-gray-500 italic">
                          Abriendo...
                        </p>
                      </motion.div>
                    </motion.div>

                    {/* Estampilla decorativa (esquina superior derecha) */}
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-dorado/40 bg-white/70 rounded flex items-center justify-center">
                        <span className="text-xl sm:text-2xl">💕</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SOLAPA DEL SOBRE (parte que se abre) */}
                <div className="absolute inset-x-0 top-0 h-1/2">
                  <motion.div
                    className="relative w-full h-full origin-top"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{
                      rotateX: isOpening ? -180 : 0,
                    }}
                    transition={{
                      duration: 1.5,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    {/* Parte frontal de la solapa */}
                    <div className="absolute inset-0 w-full h-full">
                      {/* Fondo dorado de la solapa */}
                      <div className="absolute inset-0 bg-gradient-to-br from-dorado-light via-dorado to-dorado-dark border-4 border-dorado/60 border-b-0 rounded-t-lg shadow-xl"></div>
                      
                      {/* Triángulo inferior de la solapa (forma de sobre típica) */}
                      <svg 
                        className="absolute bottom-0 left-0 right-0 w-full"
                        style={{ height: '40%' }}
                        viewBox="0 0 100 20"
                        preserveAspectRatio="none"
                      >
                        <polygon 
                          points="0,0 50,20 100,0" 
                          fill="white"
                          opacity="0.95"
                        />
                        <line 
                          x1="0" y1="0" 
                          x2="50" y2="20" 
                          stroke="#D4AF37" 
                          strokeWidth="0.3"
                          opacity="0.6"
                        />
                        <line 
                          x1="100" y1="0" 
                          x2="50" y2="20" 
                          stroke="#D4AF37" 
                          strokeWidth="0.3"
                          opacity="0.6"
                        />
                      </svg>

                      {/* Sello central "M & A" */}
                      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <motion.div
                          className="w-16 h-16 sm:w-20 sm:h-20"
                          animate={{ rotate: isOpening ? 180 : 0 }}
                          transition={{ duration: 1.5 }}
                        >
                          <div className="w-full h-full bg-white rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl sm:text-3xl mb-1">💕</div>
                              <p className="font-great-vibes text-lg sm:text-xl text-dorado">
                                M & A
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Línea decorativa superior */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-dorado-dark via-dorado-light to-dorado-dark"></div>
                    </div>
                  </motion.div>
                </div>

                {/* Efecto de luz al abrir */}
                {isOpening && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-transparent pointer-events-none rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.8, 0] }}
                    transition={{ duration: 1.5 }}
                  />
                )}
              </div>

              {/* Confeti al abrir */}
              {isOpening && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(25)].map((_, i) => {
                    const angle = -90 + (Math.random() - 0.5) * 100;
                    const distance = 100 + Math.random() * 150;
                    const colors = ['#D4AF37', '#E5C158', '#D99999', '#FFF8F0'];
                    
                    return (
                      <motion.div
                        key={i}
                        className="absolute left-1/2 top-[25%] w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: colors[i % colors.length],
                        }}
                        initial={{ opacity: 1, scale: 0 }}
                        animate={{
                          opacity: [1, 1, 0],
                          scale: [0, 1, 0.5],
                          x: Math.cos(angle * Math.PI / 180) * distance,
                          y: Math.sin(angle * Math.PI / 180) * distance,
                          rotate: Math.random() * 720,
                        }}
                        transition={{
                          duration: 1.5,
                          delay: Math.random() * 0.2,
                          ease: "easeOut",
                        }}
                      />
                    );
                  })}
                </div>
              )}

              {/* Sombra realista */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-black/20 blur-2xl rounded-full"></div>
            </div>

            {/* Texto inferior */}
            <motion.p
              className="text-center mt-12 font-great-vibes text-2xl sm:text-3xl text-dorado px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 4, times: [0, 0.2, 0.7, 1] }}
            >
              Te esperamos con mucho cariño
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
