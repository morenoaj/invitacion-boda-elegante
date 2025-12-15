'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1 }
  };

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-crema overflow-x-hidden">
      {/* Hero Section - Foto Principal */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16">
        {/* Decoraciones de fondo */}
        <motion.div
          className="absolute top-20 right-8 w-16 h-16 opacity-30"
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: 15, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <svg viewBox="0 0 100 100" className="fill-dorado">
            <path d="M50,10 L55,40 L85,40 L60,58 L70,90 L50,72 L30,90 L40,58 L15,40 L45,40 Z"/>
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-8 w-20 h-20 opacity-20"
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: -20, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <svg viewBox="0 0 100 100" className="fill-rojo-suave">
            <circle cx="50" cy="30" r="15"/>
            <ellipse cx="50" cy="60" rx="25" ry="35"/>
          </svg>
        </motion.div>

        {/* Contenedor Principal */}
        <div className="relative z-10 flex flex-col items-center max-w-md">
          
          {/* Marco Decorativo Superior */}
          <motion.div 
            className="mb-8"
            {...scaleIn}
          >
            <svg width="250" height="60" viewBox="0 0 250 60" className="mb-4">
              <path 
                d="M10,30 Q40,10 125,30 Q210,50 240,30" 
                fill="none" 
                stroke="#D4AF37" 
                strokeWidth="2"
              />
              <path 
                d="M5,35 Q45,18 125,35 Q205,52 245,35" 
                fill="none" 
                stroke="#D99999" 
                strokeWidth="1.5"
              />
            </svg>
          </motion.div>

          {/* ESPACIO PARA FOTO - BIEN VISIBLE */}
          <motion.div 
            className="relative mb-8"
            {...fadeIn}
          >
            {/* Marco Decorativo para la Foto */}
            <div className="absolute -inset-4 border-4 border-dorado rounded-lg opacity-50 blur-sm"></div>
            <div className="absolute -inset-2 border-2 border-rojo-suave rounded-lg"></div>
            
            {/* Contenedor de la Foto */}
            <div className="relative w-72 h-96 bg-gradient-to-br from-crema-dark to-white rounded-lg overflow-hidden shadow-2xl border-4 border-dorado">
              {/* Placeholder para la foto */}
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
                <svg className="w-24 h-24 mb-4 text-dorado opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-dorado-dark font-montserrat text-sm">
                  Coloca aquí tu foto vertical<br/>
                  <span className="text-xs opacity-70">Tamaño recomendado: 265x457px</span>
                </p>
              </div>
              
              {/* Comentario: Para agregar tu foto, reemplaza el contenido de arriba con:
                  <img 
                    src="/images/foto-novios.jpg" 
                    alt="Foto de los novios"
                    className="w-full h-full object-cover"
                  />
              */}
            </div>

            {/* Decoraciones alrededor de la foto */}
            <motion.div
              className="absolute -top-4 -right-4 w-12 h-12 opacity-60"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 100 100" className="fill-rojo-suave-light">
                <circle cx="50" cy="20" r="8"/>
                <ellipse cx="50" cy="50" rx="15" ry="25"/>
                <path d="M35,45 Q30,60 50,70 Q70,60 65,45" fill="#D99999"/>
              </svg>
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -left-4 opacity-40"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <svg width="60" height="40" viewBox="0 0 60 40">
                <ellipse cx="15" cy="20" rx="8" ry="15" fill="#B8941F"/>
                <ellipse cx="30" cy="25" rx="10" ry="12" fill="#D4AF37"/>
                <ellipse cx="45" cy="20" rx="7" ry="14" fill="#E5C158"/>
              </svg>
            </motion.div>
          </motion.div>

          {/* Nombres de los Novios */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <motion.div 
                className="h-px w-16 bg-gradient-to-r from-transparent to-dorado"
                initial={{ width: 0 }}
                animate={{ width: "4rem" }}
                transition={{ duration: 1, delay: 0.8 }}
              ></motion.div>
              
              <div className="flex items-center gap-3">
                <h1 className="font-great-vibes text-6xl text-dorado">Adriana</h1>
                <span className="font-great-vibes text-3xl text-rojo-suave">&</span>
                <h1 className="font-great-vibes text-6xl text-dorado">Saúl</h1>
              </div>
              
              <motion.div 
                className="h-px w-16 bg-gradient-to-l from-transparent to-dorado"
                initial={{ width: 0 }}
                animate={{ width: "4rem" }}
                transition={{ duration: 1, delay: 0.8 }}
              ></motion.div>
            </div>
          </motion.div>

          {/* Fecha del Evento */}
          <motion.div
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border-2 border-rojo-suave/30"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="text-center space-y-2">
              <p className="font-montserrat text-sm tracking-widest text-dorado-dark">SÁBADO</p>
              <div className="h-px bg-gradient-to-r from-transparent via-dorado to-transparent"></div>
              <p className="font-montserrat text-xl tracking-[0.3em] text-dorado font-semibold">6 ENERO</p>
              <div className="h-px bg-gradient-to-r from-transparent via-dorado to-transparent"></div>
              <p className="font-montserrat text-sm tracking-widest text-dorado-dark">2 0 2 4</p>
            </div>
          </motion.div>

          {/* Marco Decorativo Inferior */}
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <svg width="230" height="70" viewBox="0 0 230 70">
              <path 
                d="M10,40 Q60,20 115,40 Q170,60 220,40" 
                fill="none" 
                stroke="#D99999" 
                strokeWidth="2"
              />
              <path 
                d="M15,35 Q65,15 115,35 Q165,55 215,35" 
                fill="none" 
                stroke="#D4AF37" 
                strokeWidth="1.5"
              />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Sección de Ceremonia */}
      <section className="py-20 px-4 bg-gradient-to-b from-crema to-crema-dark">
        <motion.div
          className="max-w-md mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Marco Superior */}
          <div className="mb-8">
            <svg width="250" height="60" viewBox="0 0 250 60" className="mx-auto">
              <path 
                d="M10,30 Q40,10 125,30 Q210,50 240,30" 
                fill="none" 
                stroke="#D4AF37" 
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Título */}
          <h2 className="font-great-vibes text-5xl text-dorado mb-8">Ceremonia</h2>

          {/* Icono Iglesia */}
          <motion.div 
            className="w-16 h-16 mx-auto mb-6"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <svg viewBox="0 0 100 100" className="fill-dorado">
              <path d="M50,10 L50,25 M45,20 L55,20 M50,25 L40,35 L40,80 L60,80 L60,35 Z M35,40 L65,40 M45,50 L55,50 L55,65 L45,65 Z M20,50 L30,50 L30,80 L20,80 Z M70,50 L80,50 L80,80 L70,80 Z M15,80 L85,80"/>
            </svg>
          </motion.div>

          <div className="space-y-4">
            <h3 className="font-montserrat text-lg tracking-wider text-dorado-dark">
              PARROQUIA CORAZÓN DE MARÍA
            </h3>
            
            <div className="h-px bg-gradient-to-r from-transparent via-rojo-suave to-transparent"></div>
            
            <p className="font-montserrat text-sm tracking-wide text-gray-700">
              79 Av Sur # 200, San Salvador
            </p>
            
            <p className="font-montserrat text-xl font-bold tracking-widest text-dorado mt-6">
              4 : 0 0  &nbsp; P . M .
            </p>

            <motion.a
              href="https://maps.app.goo.gl/TjFLAWayQ4TDF7sU7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-8 py-3 bg-gradient-to-r from-dorado to-dorado-light text-white font-montserrat text-sm tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CÓMO LLEGAR
            </motion.a>
          </div>

          {/* Marco Inferior */}
          <div className="mt-12">
            <svg width="250" height="60" viewBox="0 0 250 60" className="mx-auto">
              <path 
                d="M10,30 Q40,50 125,30 Q210,10 240,30" 
                fill="none" 
                stroke="#D99999" 
                strokeWidth="2"
              />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Sección de Recepción */}
      <section className="py-20 px-4 bg-gradient-to-b from-crema-dark to-crema">
        <motion.div
          className="max-w-md mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Marco Superior */}
          <div className="mb-8">
            <svg width="250" height="60" viewBox="0 0 250 60" className="mx-auto">
              <path 
                d="M10,30 Q40,10 125,30 Q210,50 240,30" 
                fill="none" 
                stroke="#D4AF37" 
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Título */}
          <h2 className="font-great-vibes text-5xl text-dorado mb-8">Recepción</h2>

          {/* Icono Recepción */}
          <motion.div 
            className="w-16 h-16 mx-auto mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <svg viewBox="0 0 100 100" className="fill-dorado">
              <path d="M50,20 L65,35 L65,70 L35,70 L35,35 Z M30,40 L20,45 L20,70 L30,70 Z M70,40 L80,45 L80,70 L70,70 Z M40,50 L60,50 L60,65 L40,65 Z M25,70 L75,70 L75,75 L25,75 Z"/>
              <circle cx="50" cy="30" r="4"/>
            </svg>
          </motion.div>

          <div className="space-y-4">
            <h3 className="font-montserrat text-lg tracking-wider text-dorado-dark">
              HACIENDA DE LOS MIRANDA
            </h3>
            
            <div className="h-px bg-gradient-to-r from-transparent via-rojo-suave to-transparent"></div>
            
            <p className="font-montserrat text-sm tracking-wide text-gray-700">
              Final Calle las Rosas y, C. Antigua Ferrocarril
            </p>
            
            <p className="font-montserrat text-xl font-bold tracking-widest text-dorado mt-6">
              6 : 0 0  &nbsp; P . M .
            </p>

            <motion.a
              href="https://maps.app.goo.gl/fZefZ9VSBrvuArdu5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-8 py-3 bg-gradient-to-r from-dorado to-dorado-light text-white font-montserrat text-sm tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CÓMO LLEGAR
            </motion.a>
          </div>

          {/* Marco Inferior */}
          <div className="mt-12">
            <svg width="250" height="60" viewBox="0 0 250 60" className="mx-auto">
              <path 
                d="M10,30 Q40,50 125,30 Q210,10 240,30" 
                fill="none" 
                stroke="#D99999" 
                strokeWidth="2"
              />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Sección de Confirmación */}
      <section className="py-20 px-4 bg-gradient-to-b from-crema to-white">
        <motion.div
          className="max-w-md mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Marco Superior */}
          <div className="mb-8">
            <svg width="250" height="60" viewBox="0 0 250 60" className="mx-auto">
              <path 
                d="M10,30 Q40,10 125,30 Q210,50 240,30" 
                fill="none" 
                stroke="#D4AF37" 
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Título */}
          <h2 className="font-great-vibes text-5xl text-dorado mb-8">Confirmación</h2>

          {/* Icono WhatsApp */}
          <motion.div 
            className="w-16 h-16 mx-auto mb-6"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <svg viewBox="0 0 100 100" className="fill-dorado">
              <circle cx="50" cy="50" r="35" stroke="#D99999" strokeWidth="2" fill="none"/>
              <path d="M50,20 C33,20 19,34 19,51 C19,56 20,61 22,65 L19,81 L35,78 C39,80 44,81 50,81 C67,81 81,67 81,50 C81,33 67,20 50,20 Z M50,25 C64,25 76,37 76,51 C76,65 64,76 50,76 C45,76 41,75 37,73 L36,72 L28,74 L30,66 L29,65 C27,61 25,56 25,51 C25,37 37,25 50,25 Z M42,40 C41,40 40,40 39,41 C38,42 36,44 36,47 C36,50 38,53 39,54 C40,55 45,62 52,65 C53,66 54,66 55,67 C56,67 57,67 58,67 C59,67 61,66 62,65 C63,64 64,62 64,61 C64,60 64,59 63,59 L60,58 C59,57 57,56 56,57 C55,58 54,59 53,59 C53,59 53,59 52,59 C52,59 51,58 51,58 C48,57 45,54 43,51 C43,51 42,50 42,49 C42,48 43,47 43,46 C43,46 44,45 44,45 C44,44 44,43 43,42 C43,41 42,40 42,40 Z"/>
            </svg>
          </motion.div>

          <div className="space-y-6">
            <p className="font-montserrat text-base tracking-wide text-gray-700 leading-relaxed px-4">
              APRECIAREMOS NOS DEJES SABER TU ASISTENCIA<br/>
              A MÁS TARDAR EL DÍA<br/>
              <span className="text-dorado font-semibold text-lg">31 DE DICIEMBRE</span>
            </p>

            <motion.a
              href="https://wa.me/50312345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-10 py-4 bg-gradient-to-r from-rojo-suave to-rojo-suave-light text-white font-montserrat text-sm tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CONFIRMAR POR WHATSAPP
            </motion.a>
          </div>

          {/* Marco Inferior */}
          <div className="mt-12">
            <svg width="250" height="60" viewBox="0 0 250 60" className="mx-auto">
              <path 
                d="M10,30 Q40,50 125,30 Q210,10 240,30" 
                fill="none" 
                stroke="#D99999" 
                strokeWidth="2"
              />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Footer con mensaje final */}
      <footer className="py-12 bg-gradient-to-b from-white to-crema">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-great-vibes text-3xl text-dorado mb-2">
            Con amor
          </p>
          <p className="font-montserrat text-sm text-gray-600 italic">
            Esperamos celebrar este día especial contigo
          </p>
        </motion.div>
      </footer>
    </main>
  );
}
