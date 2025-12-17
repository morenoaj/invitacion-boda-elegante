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
    // If user prefers reduced motion, skip the envelope and go straight to invitation
    if (prefersReducedMotion) {
      setIsComplete(true);
      onAnimationComplete();
      return;
    }

    // Start opening animation after 4 seconds
    const openTimer = setTimeout(() => {
      setIsOpening(true);
    }, 4000);

    // Complete animation and notify parent after opening
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      onAnimationComplete();
    }, 6500); // 4s wait + 2.5s animation

    return () => {
      clearTimeout(openTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete, prefersReducedMotion]);

  if (isComplete) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-gradient-to-br from-crema via-white to-crema-dark flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="relative w-full max-w-md px-4">
          {/* Envelope Container */}
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Decorative elements around envelope */}
            <motion.div
              className="absolute -top-8 -left-8 w-12 h-12 opacity-40"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <svg viewBox="0 0 100 100" className="fill-dorado">
                <path d="M50,10 L55,40 L85,40 L60,58 L70,90 L50,72 L30,90 L40,58 L15,40 L45,40 Z"/>
              </svg>
            </motion.div>

            <motion.div
              className="absolute -bottom-8 -right-8 w-16 h-16 opacity-30"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, -10, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <svg viewBox="0 0 100 100" className="fill-rojo-suave">
                <circle cx="50" cy="30" r="15"/>
                <ellipse cx="50" cy="60" rx="25" ry="35"/>
              </svg>
            </motion.div>

            {/* Main Envelope */}
            <div className="relative bg-gradient-to-br from-[#FFF8E7] to-[#F5F5DC] rounded-lg shadow-2xl overflow-hidden border-4 border-dorado/30">
              {/* Envelope Body */}
              <div className="relative p-8 md:p-12">
                {/* Decorative border pattern */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" preserveAspectRatio="none">
                    <rect x="10" y="10" width="calc(100% - 20px)" height="calc(100% - 20px)" 
                      fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="10,5"/>
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center space-y-6">
                  {/* Top decorative elements */}
                  <motion.div 
                    className="flex justify-center gap-4 mb-4"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="text-3xl">🌟</span>
                    <span className="text-3xl">✨</span>
                    <span className="text-3xl">💕</span>
                  </motion.div>

                  {/* "Para:" text */}
                  <div>
                    <p className="font-great-vibes text-3xl md:text-4xl text-dorado-dark mb-2">
                      Para:
                    </p>
                    <div className="h-px bg-gradient-to-r from-transparent via-dorado to-transparent my-3"></div>
                    <p className="font-montserrat text-xl md:text-2xl text-gray-800 font-semibold px-4 leading-relaxed">
                      {guestName}
                    </p>
                  </div>

                  {/* Bottom decorative elements */}
                  <motion.div 
                    className="flex justify-center gap-4 mt-4"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    <span className="text-3xl">🌟</span>
                    <span className="text-3xl">✨</span>
                    <span className="text-3xl">💕</span>
                  </motion.div>
                </div>
              </div>

              {/* Envelope Flap - animates when opening */}
              <motion.div
                className="absolute inset-x-0 top-0 h-full origin-top"
                style={{
                  background: 'linear-gradient(135deg, #E5C158 0%, #D4AF37 50%, #B8941F 100%)',
                  clipPath: 'polygon(0 0, 100% 0, 50% 40%)',
                }}
                animate={{
                  rotateX: isOpening ? -180 : 0,
                  opacity: isOpening ? 0 : 0.95,
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut"
                }}
              >
                {/* Wax seal decoration */}
                <motion.div 
                  className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: isOpening ? 0 : 1,
                    opacity: isOpening ? 0 : 1,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-rojo-suave border-4 border-rojo-suave-dark flex items-center justify-center shadow-lg">
                    <svg viewBox="0 0 100 100" className="w-10 h-10 fill-white">
                      <circle cx="50" cy="35" r="12"/>
                      <ellipse cx="50" cy="60" rx="20" ry="28"/>
                      <path d="M30,50 Q25,65 50,75 Q75,65 70,50" fill="#FFD4D4"/>
                    </svg>
                  </div>
                </motion.div>
              </motion.div>

              {/* Invitation card sliding out */}
              <motion.div
                className="absolute inset-0 bg-white rounded-lg shadow-xl m-2"
                initial={{ y: 0 }}
                animate={{
                  y: isOpening ? -400 : 0,
                  opacity: isOpening ? 0 : 0,
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5,
                  ease: "easeOut"
                }}
              />
            </div>

            {/* Shimmer effect on envelope when closed */}
            {!isOpening && (
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)',
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '200% 0%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
