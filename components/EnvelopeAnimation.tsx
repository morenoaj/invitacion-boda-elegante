'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface EnvelopeAnimationProps {
  guestName: string;
  onAnimationComplete: () => void;
}

// Paper texture pattern for reuse
const PAPER_TEXTURE_STYLE = {
  backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.03) 2px, rgba(0,0,0,.03) 4px)`
};

export default function EnvelopeAnimation({ guestName, onAnimationComplete }: EnvelopeAnimationProps) {
  const [sealBroken, setSealBroken] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsComplete(true);
      onAnimationComplete();
      return;
    }

    // Romper el sello después de 2 segundos
    const sealTimer = setTimeout(() => {
      setSealBroken(true);
    }, 2000);

    // Abrir el sobre después de romper el sello
    const openTimer = setTimeout(() => {
      setIsOpening(true);
    }, 2800);

    // Completar animación
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      onAnimationComplete();
    }, 5000);

    return () => {
      clearTimeout(sealTimer);
      clearTimeout(openTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete, prefersReducedMotion]);

  if (isComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-100 via-crema to-amber-50 flex items-center justify-center p-4 overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        {/* Partículas de fondo sutiles */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-dorado/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 4 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Contenedor principal */}
        <div className="relative w-full max-w-2xl">
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* SOBRE PRINCIPAL */}
            <div className="relative w-full mx-auto" style={{ maxWidth: '650px' }}>
              <div className="relative w-full" style={{ paddingBottom: '70%' }}>
                
                {/* Cuerpo del sobre */}
                <div className="absolute inset-0">
                  {/* Mitad izquierda del sobre */}
                  <motion.div
                    className="absolute inset-y-0 left-0 right-1/2 origin-right"
                    animate={{
                      rotateY: isOpening ? -90 : 0,
                    }}
                    transition={{
                      duration: 1.2,
                      ease: [0.43, 0.13, 0.23, 0.96],
                      delay: 0.3,
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-white via-crema-light to-crema border-4 border-l-4 border-dorado/40 rounded-l-xl shadow-2xl">
                      {/* Textura de papel */}
                      <div className="absolute inset-0 opacity-10 rounded-l-xl" style={PAPER_TEXTURE_STYLE}></div>
                      
                      {/* Borde decorativo interior */}
                      <div className="absolute inset-3 border border-dorado/20 rounded-l-lg"></div>
                    </div>
                  </motion.div>

                  {/* Mitad derecha del sobre */}
                  <motion.div
                    className="absolute inset-y-0 right-0 left-1/2 origin-left"
                    animate={{
                      rotateY: isOpening ? 90 : 0,
                    }}
                    transition={{
                      duration: 1.2,
                      ease: [0.43, 0.13, 0.23, 0.96],
                      delay: 0.3,
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-crema via-crema-light to-white border-4 border-r-4 border-dorado/40 rounded-r-xl shadow-2xl">
                      {/* Textura de papel */}
                      <div className="absolute inset-0 opacity-10 rounded-r-xl" style={PAPER_TEXTURE_STYLE}></div>
                      
                      {/* Borde decorativo interior */}
                      <div className="absolute inset-3 border border-dorado/20 rounded-r-lg"></div>
                      
                      {/* Estampilla decorativa */}
                      <div className="absolute top-6 right-6">
                        <div className="w-14 h-14 border-2 border-dorado/50 bg-white/80 rounded-sm flex items-center justify-center shadow-md">
                          <span className="text-2xl">💕</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Contenido central (nombre del invitado) */}
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center px-8 pointer-events-none"
                    animate={{ opacity: isOpening ? 0 : 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="font-montserrat text-xs sm:text-sm tracking-[0.3em] text-gray-600 uppercase mb-3">
                      Para
                    </p>
                    
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-dorado/60 to-transparent mb-5"></div>
                    
                    <p className="font-great-vibes text-4xl sm:text-5xl lg:text-6xl text-dorado text-center leading-relaxed drop-shadow-sm">
                      {guestName}
                    </p>
                    
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-dorado/60 to-transparent mt-5"></div>
                  </motion.div>
                </div>

                {/* SELLO DE CERA - Centro del sobre */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <AnimatePresence>
                    {!sealBroken ? (
                      <motion.div
                        className="relative"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ 
                          scale: 0, 
                          rotate: 180,
                          opacity: 0 
                        }}
                        transition={{ 
                          duration: 0.6,
                          ease: "easeOut"
                        }}
                      >
                        {/* Sello de cera principal */}
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                          {/* Sombra del sello */}
                          <div className="absolute inset-0 bg-dorado-dark/30 rounded-full blur-xl scale-110"></div>
                          
                          {/* Cuerpo del sello */}
                          <motion.div
                            className="relative w-full h-full rounded-full bg-gradient-to-br from-dorado-light via-dorado to-dorado-dark shadow-2xl border-4 border-dorado-dark/20"
                            animate={{
                              boxShadow: [
                                "0 10px 40px rgba(212, 175, 55, 0.4)",
                                "0 10px 60px rgba(212, 175, 55, 0.6)",
                                "0 10px 40px rgba(212, 175, 55, 0.4)",
                              ]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                          >
                            {/* Textura del sello */}
                            <div className="absolute inset-0 rounded-full opacity-30" style={{
                              backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 50%)`
                            }}></div>
                            
                            {/* Contenido del sello */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              {/* Anillo exterior */}
                              <svg className="absolute inset-2" viewBox="0 0 100 100">
                                <circle 
                                  cx="50" 
                                  cy="50" 
                                  r="45" 
                                  fill="none" 
                                  stroke="rgba(139, 69, 19, 0.3)" 
                                  strokeWidth="1.5"
                                />
                                <circle 
                                  cx="50" 
                                  cy="50" 
                                  r="40" 
                                  fill="none" 
                                  stroke="rgba(139, 69, 19, 0.2)" 
                                  strokeWidth="1"
                                />
                              </svg>
                              
                              {/* Corazón central */}
                              <div className="text-3xl sm:text-4xl mb-1 filter drop-shadow-sm">💕</div>
                              
                              {/* Iniciales */}
                              <p className="font-great-vibes text-xl sm:text-2xl text-amber-900 font-bold drop-shadow-sm">
                                M & A
                              </p>
                            </div>

                            {/* Brillo superior */}
                            <div className="absolute top-2 left-1/4 w-1/3 h-1/3 bg-white/40 rounded-full blur-md"></div>
                          </motion.div>
                        </div>
                      </motion.div>
                    ) : (
                      // Fragmentos del sello roto
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                        {[...Array(8)].map((_, i) => {
                          const angle = (i * 360) / 8;
                          const distance = 60 + Math.random() * 40;
                          return (
                            <motion.div
                              key={i}
                              className="absolute top-1/2 left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-dorado-light to-dorado-dark rounded-sm"
                              initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
                              animate={{
                                x: Math.cos(angle * Math.PI / 180) * distance,
                                y: Math.sin(angle * Math.PI / 180) * distance,
                                opacity: 0,
                                rotate: Math.random() * 360,
                                scale: 0,
                              }}
                              transition={{
                                duration: 0.8,
                                ease: "easeOut",
                              }}
                            />
                          );
                        })}
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Partículas doradas al romper el sello */}
                {sealBroken && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => {
                      const angle = (Math.random() - 0.5) * 360;
                      const distance = 80 + Math.random() * 120;
                      return (
                        <motion.div
                          key={i}
                          className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full"
                          style={{
                            backgroundColor: i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#E5C158' : '#FFD700',
                          }}
                          initial={{ opacity: 1, scale: 0 }}
                          animate={{
                            opacity: [1, 1, 0],
                            scale: [0, 1, 0.3],
                            x: Math.cos(angle * Math.PI / 180) * distance,
                            y: Math.sin(angle * Math.PI / 180) * distance,
                            rotate: Math.random() * 720,
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

                {/* Efecto de luz al abrir */}
                {isOpening && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-transparent via-white/50 to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.6, 0] }}
                    transition={{ duration: 1.5 }}
                  />
                )}

                {/* Sombra del sobre */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-10 bg-black/20 blur-3xl rounded-full"></div>
              </div>
            </div>

            {/* Texto inferior */}
            <motion.div
              className="text-center mt-10 sm:mt-12 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 4.5, times: [0, 0.15, 0.75, 1] }}
            >
              <p className="font-great-vibes text-2xl sm:text-3xl text-dorado-dark mb-2">
                {!sealBroken ? 'Rompiendo el sello...' : 'Abriendo tu invitación...'}
              </p>
              <p className="font-montserrat text-xs sm:text-sm tracking-wider text-gray-500 italic">
                💌 Te esperamos con mucho cariño
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
