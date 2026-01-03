'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface EnvelopeAnimationProps {
  guestName: string;
  onAnimationComplete: () => void;
}

export default function EnvelopeAnimation({ guestName, onAnimationComplete }: EnvelopeAnimationProps) {
  const [sealBroken, setSealBroken] = useState(false);
  const [envelopeOpening, setEnvelopeOpening] = useState(false);
  const [letterOut, setLetterOut] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsComplete(true);
      onAnimationComplete();
      return;
    }

    // Timeline de animación
    const sealTimer = setTimeout(() => setSealBroken(true), 2000);
    const openTimer = setTimeout(() => setEnvelopeOpening(true), 2500);
    const letterTimer = setTimeout(() => setLetterOut(true), 3500);
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      onAnimationComplete();
    }, 5500);

    return () => {
      clearTimeout(sealTimer);
      clearTimeout(openTimer);
      clearTimeout(letterTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete, prefersReducedMotion]);

  if (isComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-gradient-to-br from-slate-100 via-crema to-amber-50 flex items-center justify-center p-4 sm:p-8 overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: letterOut ? [1, 1, 0] : 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: letterOut ? 2 : 0.5,
          times: letterOut ? [0, 0.7, 1] : undefined 
        }}
      >
        {/* Partículas de fondo */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-dorado/20 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Contenedor principal del sobre 3D */}
        <motion.div
          className="relative w-full max-w-2xl"
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ 
            scale: 1, 
            opacity: letterOut ? [1, 1, 0] : 1,
            y: 0 
          }}
          transition={{ 
            scale: { duration: 0.7 },
            opacity: letterOut ? { duration: 1.8, times: [0, 0.6, 1] } : { duration: 0.7 },
            y: { duration: 0.7 }
          }}
          style={{ perspective: '1200px' }}
        >
          {/* SOBRE 3D - Vista isométrica */}
          <div className="relative w-full mx-auto" style={{ maxWidth: '700px' }}>
            <div className="relative w-full" style={{ paddingBottom: '56%' }}>
              
              {/* CARTA QUE SALE DEL SOBRE */}
              <AnimatePresence>
                {letterOut && (
                  <motion.div
                    className="absolute inset-x-0 top-0 z-40 mx-auto"
                    style={{ width: '85%', height: '110%' }}
                    initial={{ y: 0, opacity: 1, scale: 1 }}
                    animate={{ 
                      y: -50,
                      opacity: [1, 1, 0],
                      scale: [1, 1.05, 1.1]
                    }}
                    transition={{ 
                      duration: 1.8,
                      times: [0, 0.5, 1],
                      ease: "easeOut"
                    }}
                  >
                    <div className="relative w-full h-full bg-gradient-to-br from-white via-crema-light to-white rounded-lg shadow-2xl border-2 border-dorado/30">
                      {/* Textura de papel */}
                      <div className="absolute inset-0 opacity-[0.08] rounded-lg" style={{
                        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,.05) 3px, rgba(0,0,0,.05) 6px)`
                      }}></div>
                      
                      {/* Contenido de la carta */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                        <div className="text-6xl mb-4">💕</div>
                        <p className="font-great-vibes text-5xl text-dorado mb-3">
                          {guestName}
                        </p>
                        <p className="font-montserrat text-sm tracking-wide text-gray-600">
                          Nos casamos
                        </p>
                      </div>

                      {/* Bordes decorativos */}
                      <div className="absolute inset-4 border border-dorado/20 rounded-md"></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CUERPO DEL SOBRE - Parte trasera (base) */}
              <div className="absolute inset-0">
                <div className="w-full h-full bg-gradient-to-br from-crema via-crema-light to-white border-4 border-dorado/40 rounded-lg shadow-2xl overflow-hidden">
                  {/* Textura de papel */}
                  <div className="absolute inset-0 opacity-[0.06]" style={{
                    backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,.04) 4px, rgba(0,0,0,.04) 8px)`
                  }}></div>

                  {/* Bordes decorativos internos */}
                  <div className="absolute inset-4 border-2 border-dorado/20 rounded-md"></div>
                  <div className="absolute inset-8 border border-dorado/15 rounded-sm"></div>

                  {/* Texto del destinatario */}
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center px-6"
                    animate={{ opacity: envelopeOpening ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="font-montserrat text-xs sm:text-sm tracking-[0.3em] text-gray-600 uppercase mb-3">
                      Para
                    </p>
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-dorado/50 to-transparent mb-4"></div>
                    <p className="font-great-vibes text-4xl sm:text-5xl lg:text-6xl text-dorado text-center leading-relaxed">
                      {guestName}
                    </p>
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-dorado/50 to-transparent mt-4"></div>
                  </motion.div>

                  {/* Estampilla decorativa */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-dorado/40 bg-white/70 flex items-center justify-center shadow-md">
                      <span className="text-xl sm:text-2xl">💕</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SOLAPA DEL SOBRE - Tapa que cubre */}
              <div className="absolute inset-x-0 top-0 h-1/2 z-30">
                <motion.div
                  className="relative w-full h-full origin-bottom"
                  style={{ 
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    rotateX: envelopeOpening ? -180 : 0,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  {/* Parte frontal de la solapa */}
                  <div className="absolute inset-0 w-full h-full">
                    {/* Fondo de la solapa - Dorado elegante */}
                    <div className="absolute inset-0 bg-gradient-to-br from-dorado-light via-dorado to-dorado-dark border-4 border-dorado/50 border-b-0 rounded-t-lg shadow-xl">
                      {/* Textura dorada */}
                      <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), transparent 50%)`
                      }}></div>
                    </div>
                    
                    {/* Triángulo inferior de la solapa (cierre del sobre) */}
                    <svg 
                      className="absolute bottom-0 left-0 right-0 w-full"
                      style={{ height: '35%' }}
                      viewBox="0 0 100 20"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="flapTriangle" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                          <stop offset="100%" stopColor="#F5F5DC" stopOpacity="0.98" />
                        </linearGradient>
                      </defs>
                      <polygon 
                        points="0,0 50,20 100,0" 
                        fill="url(#flapTriangle)"
                      />
                      <line x1="0" y1="0" x2="50" y2="20" stroke="#D4AF37" strokeWidth="0.4" opacity="0.5"/>
                      <line x1="100" y1="0" x2="50" y2="20" stroke="#D4AF37" strokeWidth="0.4" opacity="0.5"/>
                    </svg>

                    {/* Línea decorativa superior */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-dorado-dark via-dorado-light to-dorado-dark"></div>
                  </div>
                </motion.div>
              </div>

              {/* SELLO DE CERA - Sobre la solapa */}
              <div className="absolute top-[22%] left-1/2 -translate-x-1/2 z-40">
                <AnimatePresence>
                  {!sealBroken ? (
                    <motion.div
                      className="relative"
                      initial={{ scale: 0, rotate: -60 }}
                      animate={{ 
                        scale: 1, 
                        rotate: 0,
                      }}
                      exit={{ 
                        scale: [1, 1.2, 0],
                        rotate: [0, 15, 220],
                        opacity: [1, 1, 0]
                      }}
                      transition={{ 
                        duration: 0.7,
                        ease: "easeOut"
                      }}
                    >
                      {/* Sombra del sello */}
                      <div className="absolute inset-0 bg-dorado-dark/50 rounded-full blur-2xl scale-125"></div>
                      
                      {/* Sello de cera 3D */}
                      <motion.div
                        className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full"
                        style={{
                          background: 'radial-gradient(circle at 35% 35%, #E5C158, #D4AF37 40%, #B8860B)',
                          boxShadow: `
                            0 8px 32px rgba(212, 175, 55, 0.6),
                            inset 0 2px 8px rgba(255, 255, 255, 0.4),
                            inset 0 -2px 8px rgba(0, 0, 0, 0.3)
                          `,
                          border: '4px solid rgba(139, 69, 19, 0.3)',
                        }}
                        animate={{
                          boxShadow: [
                            "0 8px 32px rgba(212, 175, 55, 0.5), inset 0 2px 8px rgba(255, 255, 255, 0.4), inset 0 -2px 8px rgba(0, 0, 0, 0.3)",
                            "0 8px 50px rgba(212, 175, 55, 0.8), inset 0 2px 10px rgba(255, 255, 255, 0.5), inset 0 -2px 10px rgba(0, 0, 0, 0.4)",
                            "0 8px 32px rgba(212, 175, 55, 0.5), inset 0 2px 8px rgba(255, 255, 255, 0.4), inset 0 -2px 8px rgba(0, 0, 0, 0.3)",
                          ]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                        }}
                      >
                        {/* Anillos decorativos del sello */}
                        <svg className="absolute inset-2" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(139, 69, 19, 0.35)" strokeWidth="2"/>
                          <circle cx="50" cy="50" r="41" fill="none" stroke="rgba(139, 69, 19, 0.25)" strokeWidth="1.5"/>
                          <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(139, 69, 19, 0.2)" strokeWidth="1"/>
                        </svg>
                        
                        {/* Contenido del sello */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <motion.div 
                            className="text-4xl sm:text-5xl mb-1"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            💕
                          </motion.div>
                          <p className="font-great-vibes text-2xl sm:text-3xl text-amber-900 font-bold drop-shadow-md">
                            M & A
                          </p>
                          <p className="font-montserrat text-[9px] tracking-[0.15em] text-amber-900/80 mt-0.5 uppercase">
                            14·Feb·26
                          </p>
                        </div>

                        {/* Brillo superior del sello */}
                        <div className="absolute top-2 left-1/4 w-1/2 h-1/3 bg-white/50 rounded-full blur-lg pointer-events-none"></div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    // Fragmentos del sello roto
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                      {[...Array(12)].map((_, i) => {
                        const angle = (i * 360) / 12;
                        const distance = 60 + Math.random() * 50;
                        const size = 6 + Math.random() * 8;
                        return (
                          <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2 rounded-sm shadow-lg"
                            style={{
                              width: `${size}px`,
                              height: `${size}px`,
                              background: 'linear-gradient(135deg, #E5C158, #D4AF37, #B8860B)',
                            }}
                            initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
                            animate={{
                              x: Math.cos(angle * Math.PI / 180) * distance,
                              y: Math.sin(angle * Math.PI / 180) * distance,
                              opacity: 0,
                              rotate: Math.random() * 720 - 360,
                              scale: [1, 1.3, 0],
                            }}
                            transition={{
                              duration: 1,
                              ease: "easeOut",
                            }}
                          />
                        );
                      })}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Partículas al romper el sello */}
              {sealBroken && (
                <div className="absolute top-[22%] left-1/2 -translate-x-1/2 pointer-events-none z-35">
                  {[...Array(30)].map((_, i) => {
                    const angle = (Math.random() - 0.5) * 360;
                    const distance = 70 + Math.random() * 140;
                    const colors = ['#FFD700', '#D4AF37', '#E5C158', '#F4E5C2', '#B8860B'];
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full shadow-md"
                        style={{
                          backgroundColor: colors[i % colors.length],
                        }}
                        initial={{ opacity: 1, scale: 0 }}
                        animate={{
                          opacity: [1, 1, 0],
                          scale: [0, 1.5, 0.3],
                          x: Math.cos(angle * Math.PI / 180) * distance,
                          y: Math.sin(angle * Math.PI / 180) * distance,
                          rotate: Math.random() * 720,
                        }}
                        transition={{
                          duration: 1.3,
                          delay: Math.random() * 0.15,
                          ease: "easeOut",
                        }}
                      />
                    );
                  })}
                </div>
              )}

              {/* Sombra del sobre */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-12 bg-black/30 blur-3xl rounded-full"></div>
            </div>
          </div>

          {/* Texto inferior */}
          <motion.div
            className="text-center mt-10 sm:mt-12 px-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: letterOut ? [1, 1, 0] : [0, 1],
              y: letterOut ? [0, 0, -10] : [10, 0]
            }}
            transition={{ 
              duration: letterOut ? 1.5 : 0.8,
              delay: letterOut ? 0 : 0.4,
              times: letterOut ? [0, 0.5, 1] : undefined
            }}
          >
            <p className="font-great-vibes text-2xl sm:text-3xl text-dorado-dark mb-2">
              {!sealBroken ? 'Rompiendo el sello...' : !envelopeOpening ? 'Abriendo el sobre...' : 'Revelando tu invitación...'}
            </p>
            <p className="font-montserrat text-xs sm:text-sm tracking-wide text-gray-500 italic">
              💌 Nos honrarías con tu presencia
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
