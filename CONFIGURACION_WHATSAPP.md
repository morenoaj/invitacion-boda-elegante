# Configuración de WhatsApp para Múltiples Deploys 📱

## Descripción
Esta invitación ahora soporta configuración de números de WhatsApp a través de variables de entorno de Vercel, permitiéndote crear múltiples deploys (por ejemplo, uno para el novio y otro para la novia) cada uno con su propio número de contacto.

## Cómo Configurar en Vercel

### Paso 1: Accede a la Configuración de tu Proyecto
1. Ve a [vercel.com](https://vercel.com)
2. Selecciona tu proyecto de invitación
3. Click en **Settings** (Configuración)

### Paso 2: Agrega la Variable de Entorno
1. En el menú lateral, selecciona **Environment Variables**
2. Agrega una nueva variable:
   - **Key (Nombre):** `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - **Value (Valor):** Tu número de WhatsApp (sin espacios, guiones ni caracteres especiales)
   - **Environment:** Selecciona los ambientes donde quieres usar esta variable (Production, Preview, Development)

### Paso 3: Formato del Número
El número debe estar en formato internacional sin espacios ni caracteres especiales:
- ✅ Correcto: `50767830242`
- ✅ Correcto: `50712345678`
- ❌ Incorrecto: `+507 6783-0242`
- ❌ Incorrecto: `507-678-30242`

### Paso 4: Redeploy el Proyecto
1. Ve a la pestaña **Deployments**
2. Click en los tres puntos del último deployment
3. Selecciona **Redeploy**
4. Confirma el redeploy

## Crear Múltiples Versiones

### Para el Novio:
1. Crea un proyecto en Vercel (ej: `invitacion-novio`)
2. Configura `NEXT_PUBLIC_WHATSAPP_NUMBER` con el número del novio
3. Deploy desde el mismo repositorio

### Para la Novia:
1. Crea otro proyecto en Vercel (ej: `invitacion-novia`)
2. Configura `NEXT_PUBLIC_WHATSAPP_NUMBER` con el número de la novia
3. Deploy desde el mismo repositorio

De esta manera tendrás dos URLs diferentes:
- `invitacion-novio.vercel.app` → Confirmaciones al WhatsApp del novio
- `invitacion-novia.vercel.app` → Confirmaciones al WhatsApp de la novia

## Valor por Defecto
Si no configuras la variable de entorno, el sistema usará el número por defecto: `50767830242`

## Verificación
Después del deploy, verifica que el botón "CONFIRMAR POR WHATSAPP" abra una conversación con el número correcto.

## Soporte
Si tienes problemas con la configuración, verifica:
1. ✅ El nombre de la variable es exactamente `NEXT_PUBLIC_WHATSAPP_NUMBER` (con el prefijo NEXT_PUBLIC_)
2. ✅ El número no tiene espacios ni caracteres especiales
3. ✅ Has redeployado el proyecto después de agregar la variable
4. ✅ La variable está configurada para el ambiente correcto (Production)
