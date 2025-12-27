'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

interface EnvelopeAnimationProps {
  guestName: string;
  onAnimationComplete: () => void;
}

// Pre-generate particle positions for performance
const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 3 + Math.random() * 2,
    delay: Math.random() * 2,
  }));
};

const BACKGROUND_PARTICLES = generateParticles(20);

export default function EnvelopeAnimation({ guestName, onAnimationComplete }: EnvelopeAnimationProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Memoize confetti particles for performance
  const confettiParticles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      color: i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#D99999' : '#FFF8F0',
      x: (Math.random() - 0.5) * 400,
      rotate: Math.random() * 360,
      delay: Math.random() * 0.3,
    }));
  }, []);

  useEffect(() => {
    // If user prefers reduced motion, skip the envelope and go straight to invitation
    if (prefersReducedMotion) {
      setIsComplete(true);
      onAnimationComplete();
      return;
    }

    // Start opening animation after 3 seconds
    const openTimer = setTimeout(() => {
      setIsOpening(true);
    }, 3000);

    // Complete animation and notify parent after opening
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      onAnimationComplete();
    }, 6000); // 3s wait + 3s animation

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
        transition={{ duration: 1.5 }}
      >
        {/* Partículas flotantes de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          {BACKGROUND_PARTICLES.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-dorado/30 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        <div className="relative w-full max-w-md px-6">
          {/* Elementos decorativos alrededor del sobre */}
          <motion.div
            className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-24 h-24 opacity-40"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <svg viewBox="0 0 100 100" className="fill-dorado drop-shadow-lg">
              <path d="M50,10 L55,40 L85,40 L60,58 L70,90 L50,72 L30,90 L40,58 L15,40 L45,40 Z"/>
            </svg>
          </motion.div>

          {/* Corazón flotante */}
          <motion.div
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-20 h-20 opacity-40"
            animate={{ 
              scale: [1, 1.3, 1],
              y: [0, -15, 0],
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg viewBox="0 0 100 100" className="fill-rojo-suave drop-shadow-lg">
              <path d="M50,85 C50,85 20,65 20,45 C20,30 30,25 37.5,25 C42.5,25 47.5,27.5 50,32.5 C52.5,27.5 57.5,25 62.5,25 C70,25 80,30 80,45 C80,65 50,85 50,85 Z"/>
            </svg>
          </motion.div>

          {/* Contenedor del sobre */}
          <motion.div
            className="relative"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Sobre - Parte trasera */}
            <motion.div
              className="relative w-full h-80 bg-gradient-to-br from-white via-crema to-crema-dark rounded-lg shadow-2xl border-4 border-dorado/30"
              style={{ perspective: "1000px" }}
            >
              {/* Decoración del sobre - Borde dorado */}
              <div className="absolute inset-4 border-2 border-dorado/40 rounded-md"></div>
              <div className="absolute inset-6 border border-rojo-suave/30 rounded-sm"></div>

              {/* Nombre del invitado en el sobre */}
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpening ? 0 : 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-montserrat text-xs tracking-widest text-dorado-dark mb-3">
                  PARA
                </p>
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-dorado to-transparent mb-4"></div>
                <p className="font-great-vibes text-4xl text-dorado text-center leading-relaxed drop-shadow-md">
                  {guestName}
                </p>
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-dorado to-transparent mt-4"></div>
                <motion.p
                  className="font-montserrat text-xs tracking-wider text-gray-600 mt-6 italic"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Abriendo invitación...
                </motion.p>
              </motion.div>

              {/* Tapa del sobre - Animación de apertura */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-br from-dorado via-dorado-light to-dorado-dark rounded-t-lg shadow-xl border-4 border-dorado/50"
                style={{ 
                  transformOrigin: "top center",
                  zIndex: 10,
                }}
                animate={{
                  rotateX: isOpening ? -180 : 0,
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                {/* Triángulo decorativo de la tapa */}
                <svg 
                  className="absolute bottom-0 left-0 right-0 w-full h-12" 
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <polygon 
                    points="0,0 50,20 100,0" 
                    className="fill-crema-dark opacity-90"
                  />
                </svg>

                {/* Sello decorativo */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16"
                  animate={{ rotate: isOpening ? 180 : 0 }}
                  transition={{ duration: 2 }}
                >
                  <svg viewBox="0 0 100 100" className="drop-shadow-lg">
                    <circle cx="50" cy="50" r="35" fill="white" opacity="0.9"/>
                    <circle cx="50" cy="50" r="30" fill="none" stroke="#D4AF37" strokeWidth="2"/>
                    <text 
                      x="50" 
                      y="55" 
                      textAnchor="middle" 
                      className="font-great-vibes fill-dorado"
                      fontSize="24"
                    >
                      M & A
                    </text>
                  </svg>
                </motion.div>
              </motion.div>

              {/* Brillo al abrir */}
              {isOpening && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-transparent via-dorado/30 to-transparent rounded-lg"
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: [0, 1, 0], y: "-100%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              )}
            </motion.div>

            {/* Confeti al abrir */}
            {isOpening && (
              <div className="absolute inset-0 pointer-events-none">
                {confettiParticles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: "50%",
                      top: "30%",
                      backgroundColor: particle.color,
                    }}
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{
                      opacity: [1, 1, 0],
                      scale: [0, 1, 0.5],
                      x: particle.x,
                      y: [0, -100, -200],
                      rotate: particle.rotate,
                    }}
                    transition={{
                      duration: 2,
                      delay: particle.delay,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Texto inferior */}
          <motion.p
            className="text-center mt-8 font-great-vibes text-2xl text-dorado drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 5, times: [0, 0.2, 0.8, 1] }}
          >
            Te invitamos a celebrar con nosotros
          </motion.p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
