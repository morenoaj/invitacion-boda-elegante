'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import EnvelopeAnimation from '../components/EnvelopeAnimation';

/**
 * INVITACIONES PERSONALIZADAS
 *
 * Cómo generar links personalizados:
 *
 * Formato: https://tu-sitio.vercel.app?nombres=Nombre+del+Invitado&puestos=2
 *
 * Ejemplos:
 * - https://tu-sitio.vercel.app?nombres=Juan+Pérez&puestos=1
 * - https://tu-sitio.vercel.app?nombres=María+y+Carlos+Rodríguez&puestos=2
 * - https://tu-sitio.vercel.app?nombres=Familia+González&puestos=4
 *
 * Parámetros:
 * - nombres: Nombre del invitado o invitados (requerido)
 * - puestos: Número de lugares asignados (opcional, por defecto 1)
 *
 * Para generar múltiples links:
 * 1. Crea un Excel/Google Sheets con tu lista de invitados
 * 2. Columna A: Nombres, Columna B: Puestos
 * 3. En columna C: =CONCATENAR("https://tu-sitio.vercel.app?nombres=", SUSTITUIR(A2, " ", "+"), "&puestos=", B2)
 * 4. Copia la fórmula para todos tus invitados
 * 5. Envía cada link personalizado por WhatsApp/Email
 */

// Component that uses useSearchParams - must be wrapped in Suspense
function GuestNameProvider() {
  const searchParams = useSearchParams();
  const nombresParam = searchParams.get('nombres');
  const puestosParam = searchParams.get('puestos');

  // Decode guest name, replacing + with spaces and decoding URI components
  const guestName = nombresParam
    ? decodeURIComponent(nombresParam.replace(/\+/g, ' '))
    : 'Estimado Invitado';
  
  // Parse number of seats, default to 1
  const parsedSeats = puestosParam ? parseInt(puestosParam, 10) : 1;
  const guestSeats = !isNaN(parsedSeats) && parsedSeats > 0 ? parsedSeats : 1;

  return <InvitationContent guestName={guestName} guestSeats={guestSeats} />;
}

// Main invitation content component
function InvitationContent({ guestName, guestSeats }: { guestName: string; guestSeats: number }) {
  // Para configurar en Vercel:
  // 1. Ve a tu proyecto en Vercel
  // 2. Settings → Environment Variables
  // 3. Agrega: NEXT_PUBLIC_WHATSAPP_NUMBER = tu_numero_aqui
  // 4. Redeploy el proyecto
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '50767830242';
  
  const [mounted, setMounted] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [showInvitation, setShowInvitation] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAutoplayMessage, setShowAutoplayMessage] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle envelope animation completion
  const handleEnvelopeComplete = () => {
    setShowEnvelope(false);
    setShowInvitation(true);
    
    // Start music when envelope opens
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setShowAutoplayMessage(false);
        })
        .catch(() => {
          // Autoplay failed, show message
          setShowAutoplayMessage(true);
          setIsPlaying(false);
        });
    }
  };

  // Music player functions
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Play failed, keep isPlaying as false
          setIsPlaying(false);
        });
      }
    }
  };

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
    <>
      {/* Envelope Animation - Shows first */}
      {showEnvelope && (
        <EnvelopeAnimation 
          guestName={guestName}
          onAnimationComplete={handleEnvelopeComplete}
        />
      )}

      {/* Main Invitation - Shows after envelope opens */}
      <AnimatePresence>
        {showInvitation && (
          <motion.main 
            className="min-h-screen bg-crema overflow-x-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
      {/* Hero Section - Foto Principal */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10">
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
            className="mb-6"
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

          {/* Personalized Greeting */}
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="font-montserrat text-sm tracking-widest text-gray-600 mb-3">
              CON CARIÑO INVITAMOS A
            </p>
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl py-4 px-6 shadow-lg border-2 border-dorado/20">
              <p className="font-great-vibes text-5xl md:text-6xl text-dorado drop-shadow-lg">
                {guestName}
              </p>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-dorado to-transparent my-6 mx-auto max-w-xs"></div>
            <p className="font-montserrat text-sm text-gray-700 tracking-wide">
              A ser parte de nuestro día especial
            </p>
          </motion.div>

          {/* ESPACIO PARA FOTO - BIEN VISIBLE */}
          <motion.div 
            className="relative mb-6"
            {...fadeIn}
          >
            {/* Marco Decorativo para la Foto */}
            <div className="absolute -inset-4 border-4 border-dorado rounded-lg opacity-50 blur-sm"></div>
            <div className="absolute -inset-2 border-2 border-rojo-suave rounded-lg"></div>
            
            {/* Contenedor de la Foto */}
            <div className="relative w-80 h-[28rem] sm:w-96 sm:h-[32rem] md:w-[28rem] md:h-[36rem] bg-gradient-to-br from-crema-dark to-white rounded-lg overflow-hidden shadow-2xl border-4 border-dorado">
              {/* Placeholder para la foto */}
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
               <img 
                    src="/images/foto-0.png" 
                    alt="Foto de los novios"
                    className="w-full h-full object-cover"
                  />
               
              </div>
              
              {/* Comentario: Para agregar tu foto, reemplaza el contenido de arriba con:
                  <img 
                    src="/images/" 
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
            className="text-center mb-6"
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
                <h1 className="font-great-vibes text-6xl text-dorado">Mariela</h1>
                <span className="font-great-vibes text-3xl text-rojo-suave">&</span>
                <h1 className="font-great-vibes text-6xl text-dorado">Alex</h1>
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
              <p className="font-montserrat text-xl tracking-[0.3em] text-dorado font-semibold">14 FEBRERO</p>
              <div className="h-px bg-gradient-to-r from-transparent via-dorado to-transparent"></div>
              <p className="font-montserrat text-sm tracking-widest text-dorado-dark">2 0 2 6</p>
            </div>
          </motion.div>

          {/* Marco Decorativo Inferior */}
          <motion.div 
            className="mt-6"
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

      {/* Sección de Salmo Bíblico */}
      <section className="py-10 md:py-12 px-4 bg-gradient-to-b from-white to-crema">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Marco Superior */}
          <div className="mb-6">
            <svg width="250" height="60" viewBox="0 0 250 60" className="mx-auto">
              <path 
                d="M10,30 Q40,10 125,30 Q210,50 240,30" 
                fill="none" 
                stroke="#D4AF37" 
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Icono Cruz */}
          <motion.div 
            className="w-12 h-12 mx-auto mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <svg viewBox="0 0 100 100" className="fill-dorado">
              <rect x="45" y="20" width="10" height="60" rx="2"/>
              <rect x="30" y="40" width="40" height="10" rx="2"/>
            </svg>
          </motion.div>

          {/* Versículo Bíblico */}
          <div className="bg-gradient-to-br from-white/80 to-crema/60 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl border-2 border-dorado/20">
            <motion.p
              className="font-great-vibes text-3xl md:text-4xl text-dorado-dark leading-relaxed mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              "El Señor ha hecho esto,<br/>
              y es maravilloso a nuestros ojos."
            </motion.p>
            
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-rojo-suave to-transparent my-4"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            ></motion.div>
            
            <motion.p
              className="font-montserrat text-sm tracking-widest text-dorado"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              SALMO 118:23
            </motion.p>
          </div>

          {/* Marco Inferior */}
          <div className="mt-6">
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

      {/* Sección de Ceremonia */}
      <section className="py-12 md:py-14 px-4 bg-gradient-to-b from-crema to-crema-dark">
        <motion.div
          className="max-w-md mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Marco Superior */}
          <div className="mb-6">
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
          <h2 className="font-great-vibes text-5xl text-dorado mb-6">Ceremonia Religiosa</h2>

          {/* Icono Iglesia */}
          <motion.div 
            className="w-16 h-16 mx-auto mb-4"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <svg viewBox="0 0 100 100" className="fill-dorado">
              <path d="M50,10 L50,25 M45,20 L55,20 M50,25 L40,35 L40,80 L60,80 L60,35 Z M35,40 L65,40 M45,50 L55,50 L55,65 L45,65 Z M20,50 L30,50 L30,80 L20,80 Z M70,50 L80,50 L80,80 L70,80 Z M15,80 L85,80"/>
            </svg>
          </motion.div>

          <div className="space-y-4">
            <h3 className="font-montserrat text-lg tracking-wider text-dorado-dark">
              CAPILLA SAN JUAN BOSCO
            </h3>
            
            <div className="h-px bg-gradient-to-r from-transparent via-rojo-suave to-transparent"></div>
            
            <p className="font-montserrat text-sm tracking-wide text-gray-700">
              Arraiján, Vía Loma Coba, Sector La Paz.
            </p>
            
            <p className="font-montserrat text-xl font-bold tracking-widest text-dorado mt-4">
              6 : 0 0  &nbsp; P . M .
            </p>

            <motion.a
              href="https://maps.app.goo.gl/wRSbX5ec3Zg6xg1r8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-8 py-3 bg-gradient-to-r from-dorado to-dorado-light text-white font-montserrat text-sm tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CÓMO LLEGAR
            </motion.a>
          </div>

          {/* Marco Inferior */}
          <div className="mt-8">
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
      <section className="py-12 md:py-14 px-4 bg-gradient-to-b from-crema-dark to-crema">
        <motion.div
          className="max-w-md mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Marco Superior */}
          <div className="mb-6">
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
          <h2 className="font-great-vibes text-5xl text-dorado mb-6">Recepción</h2>

          {/* Icono Recepción */}
          <motion.div 
            className="w-16 h-16 mx-auto mb-4"
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
              SALA EVA VICTORIA
            </h3>
            
            <div className="h-px bg-gradient-to-r from-transparent via-rojo-suave to-transparent"></div>
            
            <p className="font-montserrat text-sm tracking-wide text-gray-700">
              Plaza Nuevo Amanecer, Segundo Piso, Nuevo Arraiján, (Frente al Super 99 de Valle Hermoso)
            </p>
            
            <p className="font-montserrat text-xl font-bold tracking-widest text-dorado mt-4">
              7 : 3 0  &nbsp; P . M .
            </p>

            <motion.a
              href="https://maps.app.goo.gl/nt93jnNLpaHeqm1b6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-8 py-3 bg-gradient-to-r from-dorado to-dorado-light text-white font-montserrat text-sm tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              CÓMO LLEGAR
            </motion.a>
          </div>

          {/* Marco Inferior */}
          <div className="mt-8">
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

      {/* Sección de Código de Vestimenta */}
      <section className="py-12 md:py-14 px-4 bg-gradient-to-b from-crema to-crema-dark">
        <motion.div
          className="max-w-md mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Marco Superior */}
          <div className="mb-6">
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
          <h2 className="font-great-vibes text-5xl text-dorado mb-6">Código de Vestimenta</h2>

          {/* Iconos de Vestimenta */}
          <div className="flex justify-center gap-6 mb-6">
            <motion.div
              className="text-6xl"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              👗
            </motion.div>
            <motion.div
              className="text-6xl"
              whileHover={{ scale: 1.2, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              🤵
            </motion.div>
          </div>

          <div className="space-y-6 px-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-rojo-suave/30">
              <h3 className="font-montserrat text-lg tracking-wider text-dorado-dark mb-4">
                ETIQUETA FORMAL
              </h3>
              <div className="h-px bg-gradient-to-r from-transparent via-dorado to-transparent mb-4"></div>
              <p className="font-montserrat text-sm tracking-wide text-gray-700 leading-relaxed">
                Para las damas: Vestidos largos o midi elegantes<br/>
                Para los caballeros: Traje formal
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-rojo-suave/30">
              <h3 className="font-montserrat text-base tracking-wide text-dorado-dark mb-3">
                💕 Por favor evita 💕
              </h3>
              <div className="h-px bg-gradient-to-r from-transparent via-rojo-suave to-transparent mb-4"></div>
              <p className="font-montserrat text-sm tracking-wide text-gray-700 leading-relaxed">
                Para mantener la armonía del evento,<br/>
                le pedimos a las damas evitar vestir de:
              </p>
              <p className="font-montserrat text-base font-semibold text-dorado mt-3">
              Ni rojo ni blanco              
              </p>
            </div>
          </div>

          {/* Marco Inferior */}
          <div className="mt-8">
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

      {/* Sección de Itinerario del Día */}
      <section className="py-12 md:py-14 px-4 bg-gradient-to-b from-crema-dark to-crema">
        <motion.div
          className="max-w-md mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Marco Superior */}
          <div className="mb-6">
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
          <h2 className="font-great-vibes text-5xl text-dorado mb-3">Itinerario del Día</h2>
          <p className="font-montserrat text-sm italic text-gray-600 mb-8">
            Así será nuestro día especial
          </p>

          {/* Timeline */}
          <div className="space-y-6 px-4">
            {[
              { time: "6:00 PM", icon: "💒", event: "Ceremonia religiosa" },
              { time: "7:30 PM", icon: "🥂", event: "Cóctel de bienvenida" },
              { time: "9:30 PM", icon: "🍽️", event: "Recepción y cena" },
              { time: "10:00 PM", icon: "💃", event: "Baile y fiesta" },
              { time: "2:00 AM", icon: "🎆", event: "Cierre" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-lg border-2 border-dorado/20 flex items-center gap-4"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-4xl">{item.icon}</div>
                <div className="flex-1 text-left">
                  <p className="font-montserrat text-lg font-bold text-dorado tracking-wider">
                    {item.time}
                  </p>
                  <p className="font-montserrat text-sm text-gray-700">
                    {item.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Nota Importante */}
          <motion.div
            className="mt-8 bg-gradient-to-r from-rojo-suave/20 to-dorado/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-rojo-suave/30"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="font-montserrat text-sm font-semibold text-dorado-dark mb-2">
              ⏰ Importante
            </p>
            <p className="font-montserrat text-sm text-gray-700 leading-relaxed">
              Por favor llega con 15 minutos de anticipación<br/>
              para que no te pierdas ningún momento especial 💕
            </p>
          </motion.div>

          {/* Marco Inferior */}
          <div className="mt-8">
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

      {/* Segundo Salmo Bíblico - Colosenses 3:14 */}
      <section className="py-8 md:py-10 px-4 bg-gradient-to-b from-crema to-white">
        <motion.div
          className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Versículo en tarjeta compacta */}
          <div className="bg-gradient-to-br from-rojo-suave/10 to-dorado/10 backdrop-blur-sm rounded-2xl p-5 md:p-6 shadow-lg border border-dorado/30">
            <motion.div 
              className="w-8 h-8 mx-auto mb-2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <svg viewBox="0 0 100 100" className="fill-rojo-suave" aria-hidden="true">
                <rect x="45" y="25" width="10" height="50" rx="2"/>
                <rect x="35" y="45" width="30" height="10" rx="2"/>
              </svg>
            </motion.div>

            <motion.p
              className="font-great-vibes text-2xl md:text-3xl text-dorado-dark leading-relaxed mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              "Y sobre todo, revístanse de amor,<br/>
              que es el vínculo perfecto."
            </motion.p>
            
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-dorado/50 to-transparent my-2"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            ></motion.div>
            
            <motion.p
              className="font-montserrat text-xs tracking-widest text-rojo-suave-dark"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              COLOSENSES 3:14
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Sección de Galería de Imágenes */}
      <section className="py-12 md:py-14 px-4 bg-gradient-to-b from-crema to-crema-dark">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Marco Superior */}
          <div className="mb-6">
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
          <h2 className="font-great-vibes text-5xl text-dorado mb-8 text-center">
            Nuestros Momentos
          </h2>

          {/* Grid de Galería */}
          {/* Para agregar tus fotos: Coloca las imágenes en /public/images/gallery/ con los nombres foto-1.jpg, foto-2.jpg, etc. */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4">
            {/* Foto 1 */}
            <motion.div
              className="relative aspect-square overflow-hidden rounded-lg shadow-lg border-4 border-dorado/30 group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Placeholder con gradiente elegante */}
              <div className="w-full h-full bg-gradient-to-br from-crema-dark via-white to-rojo-suave/20 flex items-center justify-center">
                <img 
                  src="/images/gallery/foto-1.jpg"
                  alt="Foto 1"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay con efecto hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-dorado/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <p className="text-white font-montserrat text-xs tracking-wider drop-shadow-lg">
                  💕
                </p>
              </div>
            </motion.div>

            {/* Foto 2 */}
            <motion.div
              className="relative aspect-square overflow-hidden rounded-lg shadow-lg border-4 border-dorado/30 group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Placeholder con gradiente elegante */}
              <div className="w-full h-full bg-gradient-to-br from-crema-dark via-white to-rojo-suave/20 flex items-center justify-center">
                <img 
                  src="/images/gallery/foto-2.jpg"
                  alt="Foto 2"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay con efecto hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-dorado/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <p className="text-white font-montserrat text-xs tracking-wider drop-shadow-lg">
                  💕
                </p>
              </div>
            </motion.div>

            {/* Foto 3 */}
            <motion.div
              className="relative aspect-square overflow-hidden rounded-lg shadow-lg border-4 border-dorado/30 group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Placeholder con gradiente elegante */}
              <div className="w-full h-full bg-gradient-to-br from-crema-dark via-white to-rojo-suave/20 flex items-center justify-center">
                <img 
                  src="/images/gallery/foto-3.jpg"
                  alt="Foto 3"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay con efecto hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-dorado/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <p className="text-white font-montserrat text-xs tracking-wider drop-shadow-lg">
                  💕
                </p>
              </div>
            </motion.div>

            {/* Foto 4 */}
            <motion.div
              className="relative aspect-square overflow-hidden rounded-lg shadow-lg border-4 border-dorado/30 group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Placeholder con gradiente elegante */}
              <div className="w-full h-80 bg-gradient-to-br from-crema-dark via-white to-rojo-suave/20 flex items-center justify-center">
                <img 
                  src="/images/gallery/foto-4.jpg"
                  alt="Foto 4"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay con efecto hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-dorado/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <p className="text-white font-montserrat text-xs tracking-wider drop-shadow-lg">
                  💕
                </p>
              </div>
            </motion.div>

            {/* Foto 5 */}
            <motion.div
              className="relative aspect-square overflow-hidden rounded-lg shadow-lg border-4 border-dorado/30 group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Placeholder con gradiente elegante */}
              <div className="w-full h-full bg-gradient-to-br from-crema-dark via-white to-rojo-suave/20 flex items-center justify-center">
                <img 
                  src="/images/gallery/foto-5.jpg"
                  alt="Foto 5"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay con efecto hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-dorado/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <p className="text-white font-montserrat text-xs tracking-wider drop-shadow-lg">
                  💕
                </p>
              </div>
            </motion.div>

            {/* Foto 6 */}
            <motion.div
              className="relative aspect-square overflow-hidden rounded-lg shadow-lg border-4 border-dorado/30 group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Placeholder con gradiente elegante */}
              <div className="w-full h-full bg-gradient-to-br from-crema-dark via-white to-rojo-suave/20 flex items-center justify-center">
                <img 
                  src="/images/gallery/foto-6.jpg"
                  alt="Foto 6"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlay con efecto hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-dorado/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <p className="text-white font-montserrat text-xs tracking-wider drop-shadow-lg">
                  💕
                </p>
              </div>
            </motion.div>
          </div>

          {/* Marco Inferior */}
          <div className="mt-8">
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
      <section className="py-12 md:py-14 px-4 bg-gradient-to-b from-crema-dark to-white">
        <motion.div
          className="max-w-md mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Marco Superior */}
          <div className="mb-6">
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
          <h2 className="font-great-vibes text-5xl text-dorado mb-6">Confirmación</h2>

          {/* Icono WhatsApp */}
          <motion.div 
            className="w-16 h-16 mx-auto mb-6"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <svg viewBox="0 0 100 100" className="fill-dorado">
              <circle cx="50" cy="50" r="35" stroke="#D99999" strokeWidth="2" fill="none"/>
              <path d="M50,20 C33,20 19,34 19,51 C19,56 20,61 22,65 L19,81 L35,78 C39,80 44,81 50,81 C67,81 81,67 81,50 C81,33 67,20 50,20 Z M50,25 C64,25 76,37 76,51 C76,65 80,76 50,76 C45,76 41,75 37,73 L36,72 L28,74 L30,66 L29,65 C27,61 25,56 25,51 C25,37 37,25 50,25 Z M42,40 C41,40 40,40 39,41 C38,42 36,44 36,47 C36,50 38,53 39,54 C40,55 45,62 52,65 C53,66 54,66 55,67 C56,67 57,67 58,67 C59,67 61,66 62,65 C63,80 80,62 80,61 C64,60 80,59 63,59 L60,58 C59,57 57,56 56,57 C55,58 54,59 53,59 C53,59 53,59 52,59 C52,59 51,58 51,58 C48,57 45,54 43,51 C43,51 42,50 42,49 C42,48 43,47 43,46 C43,46 44,45 44,45 C44,44 44,43 43,42 C43,41 42,40 42,40 Z"/>
            </svg>
          </motion.div>

          <div className="space-y-6">
            {/* Información de puestos */}
            <motion.div
              className="bg-gradient-to-br from-dorado/10 to-rojo-suave/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-dorado/30"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-montserrat text-sm tracking-wide text-gray-700 mb-3">
                Esta invitación es válida para
              </p>
              <div className="flex items-center justify-center gap-3 mb-3">
                <motion.div
                  className="text-4xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  👥
                </motion.div>
                <p className="font-great-vibes text-5xl text-dorado">
                  {guestSeats}
                </p>
                <p className="font-montserrat text-2xl text-dorado-dark font-semibold">
                  {guestSeats === 1 ? 'puesto' : 'puestos'}
                </p>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-dorado to-transparent my-3"></div>
              <p className="font-montserrat text-xs text-gray-600 italic">
                {guestSeats === 1 ? 'Esperamos tu presencia' : 'Esperamos la presencia de todos'}
              </p>
            </motion.div>

            {/* Mensaje de confirmación */}
            <p className="font-montserrat text-base tracking-wide text-gray-700 leading-relaxed px-4">
              APRECIARÍAMOS QUE NOS DEJES SABER TU ASISTENCIA<br/>
              A MÁS TARDAR EL DÍA<br/>
              <span className="text-dorado font-semibold text-lg">31 DE DICIEMBRE</span>
            </p>

            {/* Dos botones de confirmación */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 mt-6">
              {/* Botón Confirmar Asistencia */}
              <motion.a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("¡Hola! Con mucha alegría confirmo que asistiré a celebrar su amor el 14 de febrero. ¡Nos vemos allá! 🎉💕")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-rojo-suave to-rojo-suave-light text-white font-montserrat text-sm tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl">✓</span>
                <span>SÍ, ASISTIRÉ</span>
              </motion.a>

              {/* Botón No Poder Asistir */}
              <motion.a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, lamentablemente no podré asistir a su boda. Les deseo lo mejor en este día tan especial 💕")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-montserrat text-sm tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl">✗</span>
                <span>NO PODRÉ ASISTIR</span>
              </motion.a>
            </div>
          </div>

          {/* Marco Inferior */}
          <div className="mt-8">
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

      {/* Sección de Mesa de Regalos */}
      <section className="py-12 md:py-14 px-4 bg-gradient-to-b from-white to-crema">
        <motion.div
          className="max-w-md mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Marco Superior */}
          <div className="mb-6">
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
          <h2 className="font-great-vibes text-5xl text-dorado mb-3">Mesa de Regalos</h2>
          <p className="font-montserrat text-sm italic text-gray-600 mb-8">
            Tu presencia es nuestro mejor regalo, pero si deseas obsequiarnos algo
          </p>

          {/* Opciones de Regalo */}
          <div className="space-y-6 px-4">
            {/* Opción Yappy */}
            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-dorado/30"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
<div className="flex items-center justify-center gap-4 mb-4">
  {/* Icono Yappy/Dinero Digital */}
  <motion.div
    className="text-5xl"
    whileHover={{ scale: 1.2, rotate: 5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <img 
      src="/images/yappy-logo.png" 
      alt="Yappy" 
      className="w-16 h-16 object-contain"
    />
  </motion.div>
  <h3 className="font-montserrat text-xl tracking-wider text-dorado-dark font-semibold">
    Lluvia de Yappy
  </h3>
</div>
              
              <div className="h-px bg-gradient-to-r from-transparent via-dorado to-transparent mb-4"></div>
              
              <p className="font-montserrat text-sm text-gray-700 mb-4">
                Transferencia digital (Código QR en el evento)
              </p>

            </motion.div>

            {/* Opción Sobre */}
            <motion.div
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-rojo-suave/30"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                {/* Icono Sobre */}
                <motion.div
                  className="text-5xl"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  💌
                </motion.div>
                <h3 className="font-montserrat text-xl tracking-wider text-dorado-dark font-semibold">
                  Sobre
                </h3>
              </div>
              
              <div className="h-px bg-gradient-to-r from-transparent via-rojo-suave to-transparent mb-4"></div>
              
              <p className="font-montserrat text-sm text-gray-700">
                Entrega tradicional el día del evento
              </p>
            </motion.div>
          </div>

          {/* Mensaje de agradecimiento */}
          <motion.div
            className="mt-8 bg-gradient-to-r from-rojo-suave/20 to-dorado/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-dorado/30"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="font-great-vibes text-2xl text-dorado-dark mb-2">
              ¡Gracias por tu cariño!
            </p>
            <p className="font-montserrat text-sm text-gray-700 leading-relaxed">
              Lo que más valoramos es tu presencia en este día tan especial 💕
            </p>
          </motion.div>

          {/* Marco Inferior */}
          <div className="mt-8">
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
      <footer className="py-8 bg-gradient-to-b from-white to-crema">
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

      {/* Mensaje elegante cuando el autoplay está bloqueado */}
      <AnimatePresence>
        {showAutoplayMessage && (
          <motion.div
            className="fixed bottom-28 right-6 z-40 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-dorado/30 p-4 max-w-xs"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">🎵</div>
              <div className="flex-1">
                <p className="font-montserrat text-sm text-dorado-dark font-semibold mb-1">
                  Música de fondo disponible
                </p>
                <p className="font-montserrat text-xs text-gray-600 leading-relaxed">
                  Haz clic en el botón dorado para disfrutar de nuestra música especial
                </p>
              </div>
              <button
                onClick={() => setShowAutoplayMessage(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Cerrar mensaje"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reproductor de Audio de Fondo */}
      {/* IMPORTANTE: Coloca el archivo de audio en /public/audio/tu-amor-y-el-mio.mp3 */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/audio/AUDIO.mp3" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>

      {/* Botón Flotante de Música */}
      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-dorado to-dorado-light rounded-full shadow-2xl flex items-center justify-center border-4 border-white hover:scale-110 transition-transform duration-300"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? (
          // Icono de Pausa
          <svg 
            className="w-8 h-8 text-white" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        ) : (
          // Icono de Play/Música
          <svg 
            className="w-8 h-8 text-white" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
        
        {/* Animación de ondas cuando está reproduciendo */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-rojo-suave"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeOut" 
            }}
          />
        )}
      </motion.button>

      {/* Mensaje elegante cuando el autoplay está bloqueado */}
      <AnimatePresence>
        {showAutoplayMessage && (
          <motion.div
            className="fixed bottom-28 right-6 z-40 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-dorado/30 p-4 max-w-xs"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">🎵</div>
              <div className="flex-1">
                <p className="font-montserrat text-sm text-dorado-dark font-semibold mb-1">
                  Música de fondo disponible
                </p>
                <p className="font-montserrat text-xs text-gray-600 leading-relaxed">
                  Haz clic en el botón dorado para disfrutar de nuestra música especial
                </p>
              </div>
              <button
                onClick={() => setShowAutoplayMessage(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Cerrar mensaje"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}

// Main component with Suspense boundary
export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-crema flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">
            <p className="font-great-vibes text-4xl text-dorado mb-4">Cargando invitación...</p>
          </div>
        </div>
      </div>
    }>
      <GuestNameProvider />
    </Suspense>
  );
}
