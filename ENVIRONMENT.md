# Configuración de Imágenes

Este proyecto utiliza URLs externas para todas las imágenes desde Vercel Blob Storage.

## URL Base

`https://yvivloqhhmvh4iw4.public.blob.vercel-storage.com/`

## URLs de Imágenes por Sección

### Propósito (`/purpose/`)
- `purpose-gallery-1.webp`
- `purpose-gallery-2.webp`
- `purpose-gallery-3.webp`

### Discover (`/discover/`)
- `discover-gallery-1.webp`
- `discover-gallery-2.webp`
- `discover-gallery-3.webp`
- `discover.webp` (imagen de fondo)

### Experiences (`/experiences/`)
- `accordion-1.webp`
- `accordion-2.webp`
- `accordion-3.webp`

### Events (`/events/`)
- `events-1.webp`
- `events-2.webp`
- `events-3.webp`

### Histories (temporalmente usa imágenes de Purpose)
- Usa las mismas imágenes que Purpose: `purpose-gallery-1.webp`, `purpose-gallery-2.webp`, `purpose-gallery-3.webp`

### Menu (usa imágenes de Discover y Purpose)
- **Rooms**: `discover-gallery-1.webp`
- **Gastronomía**: `purpose-gallery-1.webp`
- **Behind us**: `discover-gallery-2.webp`
- **Services/Experiences**: `purpose-gallery-2.webp`
- **Special Events**: `discover-gallery-3.webp`

### Hero (`/hero/`)
- **Video ligero**: `Video-Header_WebM.webm` (se carga primero)
- **Video alta calidad**: `Video-Header_HQ.mp4` (se carga después)

## Configuración

Las URLs están configuradas directamente en `src/config/env.ts` para simplificar el manejo en Astro.

## Manejo de Errores

Todas las imágenes incluyen manejo de errores que muestra un fondo oscuro con el texto "Imagen no disponible" cuando una imagen no se puede cargar.

## Notas

- En Astro, las variables de entorno solo están disponibles en el servidor durante el build time
- Para cambiar las URLs, modifica directamente el archivo `src/config/env.ts`
- Las imágenes se cargan desde Vercel Blob Storage
- Todos los componentes han sido actualizados para usar las nuevas URLs
