# 📸 CÓMO AGREGAR TU FOTO

## Guía Rápida (2 pasos)

### 1️⃣ Coloca tu foto aquí:
```
public/images/foto-novios.jpg
```

### 2️⃣ Modifica el código:

Abre: `app/page.tsx`

Busca la línea ~145 (sección "ESPACIO PARA FOTO")

**REEMPLAZA** este código:
```jsx
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
```

**POR** este código:
```jsx
<img 
  src="/images/foto-novios.jpg" 
  alt="Foto de los novios"
  className="w-full h-full object-cover"
/>
```

## ✨ ¡Listo!

Guarda el archivo y recarga la página (http://localhost:3000).

Tu foto aparecerá enmarcada con el diseño dorado y rojo suave.

---

## 📐 Especificaciones de la Foto

- **Orientación**: Vertical (retrato)
- **Tamaño recomendado**: 265x457 píxeles (o proporción similar)
- **Resolución mínima**: 800x1400 píxeles
- **Formato**: JPG o PNG
- **Peso máximo**: 2 MB (para carga rápida)

## 💡 Tips para mejor resultado:

✅ Foto con buena iluminación
✅ Fondo claro o neutro
✅ Ropa que combine con dorado y crema
✅ Sonrisas naturales
✅ Calidad profesional o semi-profesional

---

¿Preguntas? Consulta el README.md completo
