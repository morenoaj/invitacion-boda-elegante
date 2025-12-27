'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

interface EnvelopeAnimationProps {
  guestName: string;
  onAnimationComplete: () => void;
}

export default function EnvelopeAnimation({ guestName, onAnimationComplete }: EnvelopeAnimationProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Pre-generate particle positions for consistent animations
  const backgroundParticles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
  }, []);

  // Pre-generate confetti particles for consistent animation
  const confettiParticles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const angle = (Math.random() - 0.5) * 140 - 90;
      const distance = 120 + Math.random() * 180;
      return {
        id: i,
        color: 
          i % 4 === 0 ? '#D4AF37' : 
          i % 4 === 1 ? '#D99999' : 
          i % 4 === 2 ? '#E5C158' :
          '#FFF8F0',
        x: Math.cos(angle * Math.PI / 180) * distance,
        y: Math.sin(angle * Math.PI / 180) * distance,
        rotate: Math.random() * 720,
        delay: Math.random() * 0.3,
      };
    });
  }, []);

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
        className="fixed inset-0 z-[100] bg-gradient-to-br from-crema via-white to-crema-dark flex items-center justify-center overflow-hidden p-4"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Partículas doradas flotantes */}
        <div className="absolute inset-0">
          {backgroundParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1.5 h-1.5 bg-dorado/40 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>

        {/* Decoración flotante superior */}
        <motion.div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-16 sm:h-16 opacity-30"
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

        {/* Contenedor del sobre REALISTA */}
        <div className="relative w-full max-w-2xl mx-auto">
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* SOBRE RECTANGULAR HORIZONTAL */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-w-3xl mx-auto">
              
              {/* CUERPO DEL SOBRE - Base rectangular */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-crema to-crema-dark rounded-lg shadow-2xl border-4 border-dorado/40 overflow-hidden">
                
                {/* Bordes decorativos interiores */}
                <div className="absolute inset-3 sm:inset-4 border-2 border-dorado/30 rounded pointer-events-none"></div>
                <div className="absolute inset-5 sm:inset-6 border border-rojo-suave/20 rounded-sm pointer-events-none"></div>

                {/* Estampilla decorativa (esquina superior derecha) */}
                <div className="absolute top-4 right-4 w-12 h-12 sm:w-16 sm:h-16 border-2 border-dorado/40 rounded-sm bg-white/50 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-10 sm:h-10 fill-rojo-suave opacity-60">
                    <path d="M50,20 C50,20 35,30 35,42 C35,50 42,56 50,56 C58,56 65,50 65,42 C65,30 50,20 50,20 Z"/>
                    <path d="M30,65 L70,65 L70,75 Q70,80 65,80 L35,80 Q30,80 30,75 Z"/>
                  </svg>
                </div>

                {/* CONTENIDO: Nombre del invitado */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isOpening ? 0 : 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-center space-y-3 sm:space-y-4">
                    <p className="font-montserrat text-xs sm:text-sm tracking-[0.3em] text-dorado-dark uppercase">
                      Para
                    </p>
                    
                    <div className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent via-dorado to-transparent mx-auto"></div>
                    
                    <p className="font-great-vibes text-3xl sm:text-5xl md:text-6xl text-dorado px-4 leading-relaxed drop-shadow-sm">
                      {guestName}
                    </p>
                    
                    <div className="h-px w-20 sm:w-32 bg-gradient-to-r from-transparent via-dorado to-transparent mx-auto"></div>
                    
                    <motion.p
                      className="font-montserrat text-xs sm:text-sm tracking-wider text-gray-500 italic mt-4"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✉️ Abriendo invitación...
                    </motion.p>
                  </div>
                </motion.div>

                {/* Líneas decorativas del sobre (parte trasera) */}
                <div className="absolute bottom-8 left-8 right-8 space-y-2 opacity-20 pointer-events-none">
                  <div className="h-px bg-dorado"></div>
                  <div className="h-px bg-dorado w-3/4"></div>
                  <div className="h-px bg-dorado w-1/2"></div>
                </div>
              </div>

              {/* SOLAPA TRIANGULAR SUPERIOR - La parte que se abre */}
              <motion.div
                className="absolute inset-x-0 top-0 h-[52%] origin-top overflow-hidden"
                style={{
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  rotateX: isOpening ? 180 : 0,
                }}
                transition={{
                  duration: 1.8,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
              >
                {/* Parte frontal de la solapa (lo que se ve cuando está cerrado) */}
                <div className="absolute inset-0">
                  {/* Fondo de la solapa */}
                  <div className="absolute inset-0 bg-gradient-to-br from-dorado via-dorado-light to-dorado-dark"></div>
                  
                  {/* TRIÁNGULO característico del sobre */}
                  <svg 
                    className="absolute bottom-0 left-0 right-0 w-full h-full" 
                    viewBox="0 0 100 52"
                    preserveAspectRatio="none"
                  >
                    {/* Triángulo principal de la solapa */}
                    <polygon 
                      points="0,0 100,0 50,52" 
                      className="fill-white/90"
                    />
                    {/* Borde del triángulo */}
                    <polyline 
                      points="0,0 50,52 100,0" 
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="0.5"
                      opacity="0.5"
                    />
                  </svg>

                  {/* Sello decorativo en el centro de la solapa */}
                  <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-14 h-14 sm:w-20 sm:h-20 z-10">
                    <motion.div
                      animate={{ rotate: isOpening ? 180 : 0 }}
                      transition={{ duration: 1.8 }}
                    >
                      <svg viewBox="0 0 100 100" className="drop-shadow-xl">
                        {/* Círculo de fondo */}
                        <circle cx="50" cy="50" r="45" fill="white" opacity="0.95"/>
                        {/* Borde dorado */}
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#D4AF37" strokeWidth="3"/>
                        {/* Corazón */}
                        <path 
                          d="M50,35 C50,35 38,28 32,35 C26,42 32,52 50,65 C68,52 74,42 68,35 C62,28 50,35 50,35 Z" 
                          fill="#D99999"
                          opacity="0.8"
                        />
                        {/* Iniciales - Note: inline styles required for SVG text sizing */}
                        <text 
                          x="50" 
                          y="85" 
                          textAnchor="middle" 
                          className="font-great-vibes fill-dorado"
                          style={{ fontSize: "22px", fontWeight: "600" }}
                        >
                          M & A
                        </text>
                      </svg>
                    </motion.div>
                  </div>

                  {/* Decoración de esquinas de la solapa */}
                  <div className="absolute top-2 left-2 w-6 h-6 sm:w-8 sm:h-8 opacity-30">
                    <svg viewBox="0 0 20 20" className="fill-white">
                      <circle cx="10" cy="10" r="2"/>
                      <circle cx="2" cy="2" r="1"/>
                      <circle cx="18" cy="2" r="1"/>
                    </svg>
                  </div>
                  <div className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 opacity-30">
                    <svg viewBox="0 0 20 20" className="fill-white">
                      <circle cx="10" cy="10" r="2"/>
                      <circle cx="2" cy="2" r="1"/>
                      <circle cx="18" cy="2" r="1"/>
                    </svg>
                  </div>

                  {/* Borde superior dorado */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-dorado-dark via-dorado to-dorado-dark"></div>
                </div>
              </motion.div>

              {/* Efecto de brillo al abrir */}
              {isOpening && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-transparent via-white/60 to-transparent pointer-events-none rounded-lg"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "-100%", opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5 }}
                />
              )}
            </div>

            {/* Confeti explosivo al abrir */}
            {isOpening && (
              <div className="absolute inset-0 pointer-events-none overflow-visible">
                {confettiParticles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    className="absolute left-1/2 top-[20%] w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: particle.color,
                    }}
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{
                      opacity: [1, 1, 0],
                      scale: [0, 1.2, 0.6],
                      x: particle.x,
                      y: particle.y,
                      rotate: particle.rotate,
                    }}
                    transition={{
                      duration: 1.8,
                      delay: particle.delay,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Sombra del sobre */}
            <div className="absolute -inset-2 bg-gradient-to-b from-transparent to-black/10 blur-xl -z-10 rounded-lg"></div>
          </motion.div>

          {/* Texto inferior */}
          <motion.p
            className="text-center mt-6 sm:mt-8 font-great-vibes text-xl sm:text-2xl md:text-3xl text-dorado drop-shadow-sm px-4"
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
