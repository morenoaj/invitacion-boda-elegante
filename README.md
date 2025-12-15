# 💍 Invitación de Boda Elegante - Adriana & Saúl

Invitación de boda digital profesional con diseño elegante, animaciones fluidas y paleta de colores personalizada.

## 🎨 Características del Diseño

### Paleta de Colores
- **Fondo Suave**: Crema (#FFF8F0)
- **Letras Doradas**: Dorado elegante (#D4AF37)
- **Bordes Rojos Suaves**: Rosa coral (#D99999)

### Elementos Visuales
- ✨ **Foto Principal**: Espacio grande y bien visible para foto vertical de los novios (265x457px)
- 🎭 **Marcos Decorativos**: Marcos dorados con bordes rojos alrededor de la foto
- 🌸 **Decoraciones**: Elementos florales y detalles elegantes animados
- 📝 **Fuente Script**: Great Vibes para nombres (estilo cursiva elegante)
- 🔤 **Fuente Sans**: Montserrat para textos (moderna y legible)

### Animaciones con Framer Motion
- Aparición suave de elementos (fade in)
- Movimiento flotante de decoraciones
- Escalado y rotación de iconos al hover
- Transiciones fluidas entre secciones

## 📸 Cómo Agregar Tu Foto

### Opción 1: Agregar imagen local
1. Coloca tu foto en la carpeta `/public/images/` con el nombre `foto-novios.jpg`
2. La foto debe ser vertical (recomendado: 265x457px o proporción similar)
3. La imagen se mostrará automáticamente en el diseño

### Opción 2: Modificar el código
En el archivo `app/page.tsx`, busca la sección de "ESPACIO PARA FOTO" y reemplaza el contenido del div con:

```jsx
<img 
  src="/images/foto-novios.jpg" 
  alt="Foto de los novios"
  className="w-full h-full object-cover"
/>
```

## 🚀 Instalación y Uso

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar en modo desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 3. Compilar para producción
```bash
npm run build
npm start
```

## 📝 Personalización

### Cambiar la información del evento

Edita el archivo `app/page.tsx` y modifica:

#### Nombres de los novios (línea ~180):
```jsx
<h1 className="font-great-vibes text-6xl text-dorado">Tu Nombre</h1>
<h1 className="font-great-vibes text-6xl text-dorado">Otro Nombre</h1>
```

#### Fecha del evento (línea ~200):
```jsx
<p className="font-montserrat text-sm tracking-widest text-dorado-dark">SÁBADO</p>
<p className="font-montserrat text-xl tracking-[0.3em] text-dorado font-semibold">6 ENERO</p>
<p className="font-montserrat text-sm tracking-widest text-dorado-dark">2 0 2 4</p>
```

#### Ceremonia (línea ~240):
```jsx
<h3>NOMBRE DE LA IGLESIA</h3>
<p>Dirección completa</p>
<p>HORA</p>
```

#### Recepción (línea ~300):
```jsx
<h3>NOMBRE DEL LUGAR</h3>
<p>Dirección completa</p>
<p>HORA</p>
```

### Cambiar colores

Edita `tailwind.config.ts`:

```typescript
colors: {
  'crema': '#FFF8F0',        // Fondo principal
  'dorado': '#D4AF37',       // Texto principal
  'rojo-suave': '#D99999',   // Acentos y bordes
}
```

## 🌟 Estructura del Proyecto

```
invitacion-boda-elegante/
├── app/
│   ├── page.tsx          # Página principal con toda la invitación
│   ├── layout.tsx        # Layout con fuentes de Google
│   └── globals.css       # Estilos globales y Tailwind
├── public/
│   └── images/           # Carpeta para tus fotos
├── tailwind.config.ts    # Configuración de colores personalizados
├── package.json          # Dependencias del proyecto
└── README.md            # Este archivo
```

## 📱 Responsive Design

La invitación está optimizada para:
- 📱 Móviles (320px+)
- 💻 Tablets (768px+)
- 🖥️ Desktop (1024px+)

## 🎯 Secciones de la Invitación

1. **Hero**: Foto principal con nombres y fecha
2. **Ceremonia**: Detalles de la iglesia
3. **Recepción**: Lugar de la fiesta
4. **Confirmación**: Enlace a WhatsApp

## ⚡ Tecnologías Utilizadas

- **Next.js 14**: Framework de React
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos utility-first
- **Framer Motion**: Animaciones fluidas
- **Google Fonts**: Great Vibes y Montserrat

## 🚀 Deploy

### Vercel (Recomendado)
1. Sube tu proyecto a GitHub
2. Importa en [Vercel](https://vercel.com)
3. Deploy automático

### Netlify
```bash
npm run build
# Sube la carpeta .next
```

## 💡 Tips de Diseño

### Para la foto de los novios:
- ✅ Usa foto vertical (proporción 9:16)
- ✅ Fondo claro o neutro
- ✅ Buena iluminación
- ✅ Alta resolución (mínimo 800x1400px)
- ✅ Formato JPG o PNG

### Para mejor resultado:
- 📐 Mantén la proporción 265:457 (ancho:alto)
- 🎨 Colores que combinen con dorado y crema
- 📸 Foto profesional o de buena calidad

## 🎨 Paleta de Colores Completa

| Color | Código | Uso |
|-------|--------|-----|
| Crema | #FFF8F0 | Fondo principal |
| Crema Oscuro | #F5EFE7 | Fondos alternos |
| Dorado | #D4AF37 | Títulos y textos principales |
| Dorado Claro | #E5C158 | Acentos y hover |
| Dorado Oscuro | #B8941F | Detalles oscuros |
| Rojo Suave | #D99999 | Bordes principales |
| Rojo Suave Claro | #E8A5A5 | Acentos claros |
| Rojo Suave Oscuro | #C77777 | Sombras |

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:
1. Revisa la documentación de [Next.js](https://nextjs.org/docs)
2. Consulta la guía de [Framer Motion](https://www.framer.com/motion/)
3. Explora [Tailwind CSS](https://tailwindcss.com/docs)

## 🎉 ¡Listo!

Tu invitación de boda está lista para ser personalizada y compartida con tus invitados.

**¡Felicidades por tu boda!** 💑💍✨
