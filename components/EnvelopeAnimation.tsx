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
    }, 2500);

    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      onAnimationComplete();
    }, 5500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete, prefersReducedMotion]);

  if (isComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-gradient-to-br from-crema via-white to-crema-dark flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Partículas doradas flotantes */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-dorado/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative w-full max-w-lg px-4 sm:px-6">
          {/* Decoraciones flotantes */}
          <motion.div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-16 h-16 opacity-30"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <svg viewBox="0 0 100 100" className="fill-dorado drop-shadow-md">
              <path d="M50,10 L55,40 L85,40 L60,58 L70,90 L50,72 L30,90 L40,58 L15,40 L45,40 Z"/>
            </svg>
          </motion.div>

          {/* Contenedor del sobre */}
          <motion.div
            className="relative w-full max-w-md mx-auto"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Cuerpo del sobre */}
            <div className="relative w-full aspect-[3/2] bg-gradient-to-br from-white via-crema to-crema-dark rounded-lg shadow-2xl border-4 border-dorado/40 overflow-hidden">
              
              {/* Decoración interior del sobre */}
              <div className="absolute inset-4 border-2 border-dorado/30 rounded pointer-events-none"></div>
              <div className="absolute inset-6 border border-rojo-suave/20 rounded-sm pointer-events-none"></div>

              {/* Contenido del sobre - Nombre del invitado */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8"
                initial={{ opacity: 1 }}
                animate={{ opacity: isOpening ? 0 : 1 }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-montserrat text-xs sm:text-sm tracking-[0.3em] text-dorado-dark mb-3 uppercase">
                  Para
                </p>
                <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-dorado to-transparent mb-4"></div>
                
                <p className="font-great-vibes text-3xl sm:text-4xl md:text-5xl text-dorado text-center px-4 leading-relaxed drop-shadow-sm">
                  {guestName}
                </p>
                
                <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-dorado to-transparent mt-4 mb-6"></div>
                
                <motion.p
                  className="font-montserrat text-xs tracking-wider text-gray-500 italic"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Abriendo tu invitación...
                </motion.p>
              </motion.div>

              {/* Tapa del sobre con animación 3D */}
              <motion.div
                className="absolute inset-x-0 top-0 h-[55%] origin-top"
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                animate={{
                  rotateX: isOpening ? 180 : 0,
                }}
                transition={{
                  duration: 1.5,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
              >
                {/* Parte frontal de la tapa */}
                <div className="absolute inset-0 bg-gradient-to-br from-dorado via-dorado-light to-dorado rounded-t-lg border-4 border-dorado/60 shadow-xl">
                  
                  {/* Triángulo inferior de la tapa */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
                    <svg 
                      className="absolute bottom-0 w-full h-full" 
                      viewBox="0 0 100 20"
                      preserveAspectRatio="none"
                    >
                      <polygon 
                        points="0,0 50,20 100,0" 
                        className="fill-white/90"
                      />
                    </svg>
                  </div>

                  {/* Sello decorativo en el centro */}
                  <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20">
                    <motion.div
                      animate={{ rotate: isOpening ? 180 : 0 }}
                      transition={{ duration: 1.5 }}
                    >
                      <svg viewBox="0 0 100 100" className="drop-shadow-lg">
                        <circle cx="50" cy="50" r="40" fill="white" opacity="0.95"/>
                        <circle cx="50" cy="50" r="35" fill="none" stroke="#D4AF37" strokeWidth="2"/>
                        <path 
                          d="M50,25 C50,25 35,35 35,45 C35,52 40,57 50,57 C60,57 65,52 65,45 C65,35 50,25 50,25 Z" 
                          fill="#D99999"
                        />
                        <text 
                          x="50" 
                          y="80" 
                          textAnchor="middle" 
                          className="font-great-vibes fill-dorado"
                          style={{ fontSize: "20px" }}
                        >
                          M & A
                        </text>
                      </svg>
                    </motion.div>
                  </div>

                  {/* Patrón decorativo */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between opacity-40">
                    <svg width="20" height="20" viewBox="0 0 20 20" className="fill-white">
                      <circle cx="10" cy="10" r="2"/>
                    </svg>
                    <svg width="20" height="20" viewBox="0 0 20 20" className="fill-white">
                      <circle cx="10" cy="10" r="2"/>
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Efecto de brillo al abrir */}
              {isOpening && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-transparent via-white/50 to-transparent pointer-events-none"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "-100%", opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2 }}
                />
              )}
            </div>

            {/* Confeti al abrir */}
            {isOpening && (
              <div className="absolute inset-0 pointer-events-none overflow-visible">
                {[...Array(25)].map((_, i) => {
                  const angle = (Math.random() - 0.5) * 120;
                  const distance = 150 + Math.random() * 150;
                  return (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 top-1/3 w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#D99999' : '#E5C158',
                      }}
                      initial={{ opacity: 1, scale: 0 }}
                      animate={{
                        opacity: [1, 1, 0],
                        scale: [0, 1, 0.5],
                        x: Math.cos(angle * Math.PI / 180) * distance,
                        y: Math.sin(angle * Math.PI / 180) * distance - 50,
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
          </motion.div>

          {/* Texto inferior */}
          <motion.p
            className="text-center mt-8 font-great-vibes text-2xl sm:text-3xl text-dorado drop-shadow-sm px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -10] }}
            transition={{ duration: 5, times: [0, 0.1, 0.8, 1] }}
          >
            Nos honrarías con tu presencia
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
