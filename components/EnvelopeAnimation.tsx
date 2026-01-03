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

    // Romper el sello después de 2 segundos
    const sealTimer = setTimeout(() => {
      setSealBroken(true);
    }, 2000);

    // Completar animación
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      onAnimationComplete();
    }, 4000);

    return () => {
      clearTimeout(sealTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete, prefersReducedMotion]);

  if (isComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-gradient-to-br from-crema via-amber-50 to-white flex items-center justify-center p-4"
        initial={{ opacity: 1 }}
        animate={{ opacity: sealBroken ? [1, 1, 0] : 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: sealBroken ? 2 : 0.5, 
          times: sealBroken ? [0, 0.6, 1] : undefined 
        }}
      >
        {/* Partículas sutiles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-dorado/20 rounded-full"
              style={{
                left: `${25 + Math.random() * 50}%`,
                top: `${25 + Math.random() * 50}%`,
              }}
              animate={{
                y: [0, -12, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Contenedor del sobre - Mobile optimized */}
        <motion.div
          className="relative w-full max-w-sm"
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ 
            scale: 1, 
            opacity: sealBroken ? [1, 1, 0] : 1, 
            y: 0 
          }}
          transition={{ 
            scale: { duration: 0.6, ease: "easeOut" },
            opacity: sealBroken ? { duration: 1.8, times: [0, 0.6, 1] } : { duration: 0.6 },
            y: { duration: 0.6, ease: "easeOut" }
          }}
        >
          {/* SOBRE - Diseño vertical mobile-first */}
          <div className="relative w-full mx-auto">
            
            {/* SOLAPA TRIANGULAR DEL SOBRE (arriba) */}
            <div className="relative w-full">
              <svg 
                viewBox="0 0 100 20" 
                className="w-full drop-shadow-xl"
                style={{ height: 'auto' }}
              >
                {/* Triángulo de la solapa */}
                <defs>
                  <linearGradient id="flapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#E5C158" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#B8860B" />
                  </linearGradient>
                </defs>
                <polygon 
                  points="0,20 50,0 100,20" 
                  fill="url(#flapGradient)"
                  stroke="#B8860B"
                  strokeWidth="0.5"
                />
                {/* Líneas decorativas */}
                <line x1="0" y1="20" x2="50" y2="0" stroke="#8B6914" strokeWidth="0.3" opacity="0.4"/>
                <line x1="100" y1="20" x2="50" y2="0" stroke="#8B6914" strokeWidth="0.3" opacity="0.4"/>
              </svg>
            </div>

            {/* CUERPO DEL SOBRE */}
            <div 
              className="relative w-full bg-gradient-to-br from-white via-crema-light to-crema rounded-b-3xl shadow-2xl border-4 border-t-0 border-dorado/40 overflow-hidden"
              style={{ minHeight: '65vh', maxHeight: '700px' }}
            >
              {/* Textura de papel */}
              <div className="absolute inset-0 opacity-[0.06]" style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,.04) 4px, rgba(0,0,0,.04) 8px)`
              }}></div>

              {/* Bordes decorativos interiores */}
              <div className="absolute inset-4 sm:inset-6 border-2 border-dorado/20 rounded-b-2xl"></div>
              <div className="absolute inset-8 sm:inset-10 border border-dorado/10 rounded-b-xl"></div>

              {/* Contenido del sobre */}
              <div className="relative h-full flex flex-col items-center justify-start pt-16 sm:pt-20 px-6 sm:px-8 pb-10">
                
                {/* Espacio para el sello (se superpone) */}
                <div className="h-20 sm:h-24"></div>

                {/* Separador decorativo superior */}
                <div className="w-32 sm:w-40 mb-6 sm:mb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-dorado to-transparent"></div>
                  <div className="flex justify-center gap-1 mt-2">
                    <div className="w-1 h-1 bg-dorado/40 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-dorado/60 rounded-full"></div>
                    <div className="w-1 h-1 bg-dorado/40 rounded-full"></div>
                  </div>
                </div>

                {/* Texto de invitación - Mobile optimized */}
                <motion.div
                  className="text-center space-y-5 sm:space-y-6"
                  animate={{ opacity: sealBroken ? 0 : 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="font-montserrat text-base sm:text-lg tracking-wide text-gray-700 leading-relaxed px-2">
                    Esta invitación es<br/>
                    <span className="text-dorado-dark font-semibold">exclusiva</span> para
                  </p>
                  
                  {/* Nombre del invitado - GRANDE para móvil */}
                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl py-5 sm:py-6 px-4 sm:px-6 shadow-lg border-2 border-dorado/30">
                    <p className="font-great-vibes text-4xl sm:text-5xl md:text-6xl text-dorado leading-relaxed">
                      {guestName}
                    </p>
                  </div>
                </motion.div>

                {/* Separador decorativo inferior */}
                <div className="w-32 sm:w-40 mt-6 sm:mt-8">
                  <div className="flex justify-center gap-1 mb-2">
                    <div className="w-1 h-1 bg-dorado/40 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-dorado/60 rounded-full"></div>
                    <div className="w-1 h-1 bg-dorado/40 rounded-full"></div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-dorado to-transparent"></div>
                </div>

                {/* Indicador de animación */}
                <motion.div 
                  className="mt-8 sm:mt-10 flex flex-col items-center gap-2"
                  animate={{ 
                    opacity: sealBroken ? 0 : [0.4, 1, 0.4] 
                  }}
                  transition={{ 
                    opacity: sealBroken 
                      ? { duration: 0.3 }
                      : { duration: 2, repeat: Infinity }
                  }}
                >
                  <span className="text-3xl sm:text-4xl">💌</span>
                  <p className="font-montserrat text-xs sm:text-sm tracking-wide text-gray-500 italic">
                    {!sealBroken ? 'El sello se abrirá pronto...' : 'Revelando tu invitación...'}
                  </p>
                </motion.div>

                {/* Decoración en esquinas del sobre */}
                <div className="absolute top-3 left-3 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-t-2 border-dorado/25 rounded-tl-xl"></div>
                <div className="absolute top-3 right-3 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-t-2 border-dorado/25 rounded-tr-xl"></div>
                <div className="absolute bottom-3 left-3 w-6 h-6 sm:w-8 sm:h-8 border-l-2 border-b-2 border-dorado/25 rounded-bl-xl"></div>
                <div className="absolute bottom-3 right-3 w-6 h-6 sm:w-8 sm:h-8 border-r-2 border-b-2 border-dorado/25 rounded-br-xl"></div>
              </div>
            </div>

            {/* SELLO DE CERA - Superpuesto en la unión solapa/cuerpo */}
            <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-30">
              <AnimatePresence>
                {!sealBroken ? (
                  <motion.div
                    className="relative"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ 
                      scale: [1, 1.15, 0],
                      rotate: [0, 10, 200],
                      opacity: [1, 1, 0]
                    }}
                    transition={{ 
                      duration: 0.8,
                      ease: "easeOut"
                    }}
                  >
                    {/* Sombra del sello */}
                    <div className="absolute inset-0 bg-dorado-dark/50 rounded-full blur-2xl scale-125"></div>
                    
                    {/* Sello principal - Mobile optimized */}
                    <motion.div
                      className="relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-full bg-gradient-to-br from-dorado-light via-dorado to-dorado-dark shadow-2xl"
                      style={{
                        border: '5px solid rgba(139, 69, 19, 0.25)',
                        boxShadow: '0 20px 60px rgba(212, 175, 55, 0.6), inset 0 2px 20px rgba(255,255,255,0.3)'
                      }}
                      animate={{
                        boxShadow: [
                          "0 20px 60px rgba(212, 175, 55, 0.5), inset 0 2px 20px rgba(255,255,255,0.3)",
                          "0 20px 80px rgba(212, 175, 55, 0.7), inset 0 2px 25px rgba(255,255,255,0.4)",
                          "0 20px 60px rgba(212, 175, 55, 0.5), inset 0 2px 20px rgba(255,255,255,0.3)",
                        ]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                      }}
                    >
                      {/* Textura de cera realista */}
                      <div className="absolute inset-0 rounded-full opacity-50" style={{
                        backgroundImage: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.7), transparent 55%),
                                          radial-gradient(circle at 65% 65%, rgba(0,0,0,0.12), transparent 45%)`
                      }}></div>
                      
                      {/* Anillos decorativos */}
                      <svg className="absolute inset-2 sm:inset-3" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(139, 69, 19, 0.3)" strokeWidth="1.8"/>
                        <circle cx="50" cy="50" r="41" fill="none" stroke="rgba(139, 69, 19, 0.25)" strokeWidth="1.2"/>
                        <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(139, 69, 19, 0.2)" strokeWidth="0.9"/>
                      </svg>
                      
                      {/* Contenido del sello */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {/* Corazón grande */}
                        <motion.div 
                          className="text-5xl sm:text-6xl mb-1 sm:mb-2"
                          animate={{ scale: [1, 1.08, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          💕
                        </motion.div>
                        
                        {/* Iniciales */}
                        <p className="font-great-vibes text-3xl sm:text-4xl text-amber-900 font-bold drop-shadow-md leading-none">
                          M & A
                        </p>
                        
                        {/* Fecha */}
                        <p className="font-montserrat text-[10px] tracking-[0.15em] text-amber-900/80 mt-1.5 uppercase">
                          14·Feb·26
                        </p>
                      </div>

                      {/* Brillo superior */}
                      <div className="absolute top-4 left-1/4 w-1/2 h-1/2 bg-white/60 rounded-full blur-2xl pointer-events-none"></div>
                      
                      {/* Borde de cera derretida */}
                      <div className="absolute inset-0 rounded-full pointer-events-none" style={{
                        background: `radial-gradient(circle at 50% 50%, transparent 68%, rgba(139, 69, 19, 0.2) 82%, transparent 100%)`
                      }}></div>
                    </motion.div>
                  </motion.div>
                ) : (
                  // Fragmentos del sello que explotan
                  <div className="relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px]">
                    {[...Array(14)].map((_, i) => {
                      const angle = (i * 360) / 14;
                      const distance = 70 + Math.random() * 60;
                      const size = 7 + Math.random() * 9;
                      return (
                        <motion.div
                          key={i}
                          className="absolute top-1/2 left-1/2 rounded-sm shadow-xl"
                          style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            background: `linear-gradient(135deg, #E5C158, #D4AF37, #B8860B)`,
                          }}
                          initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
                          animate={{
                            x: Math.cos(angle * Math.PI / 180) * distance,
                            y: Math.sin(angle * Math.PI / 180) * distance,
                            opacity: 0,
                            rotate: Math.random() * 800 - 400,
                            scale: [1, 1.3, 0],
                          }}
                          transition={{
                            duration: 1.1,
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
              <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 pointer-events-none z-20">
                {[...Array(35)].map((_, i) => {
                  const angle = (Math.random() - 0.5) * 360;
                  const distance = 80 + Math.random() * 150;
                  const colors = ['#FFD700', '#D4AF37', '#E5C158', '#F4E5C2', '#B8860B', '#DAA520'];
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full shadow-lg"
                      style={{
                        backgroundColor: colors[i % colors.length],
                      }}
                      initial={{ opacity: 1, scale: 0 }}
                      animate={{
                        opacity: [1, 1, 0],
                        scale: [0, 1.6, 0.4],
                        x: Math.cos(angle * Math.PI / 180) * distance,
                        y: Math.sin(angle * Math.PI / 180) * distance,
                        rotate: Math.random() * 720,
                      }}
                      transition={{
                        duration: 1.4,
                        delay: Math.random() * 0.15,
                        ease: "easeOut",
                      }}
                    />
                  );
                })}
              </div>
            )}

            {/* Sombra del sobre */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-10 bg-black/30 blur-3xl rounded-full"></div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
