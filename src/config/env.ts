// Configuración de variables de entorno para las imágenes
// En Astro, las variables de entorno solo están disponibles en el servidor

// URL base para todas las imágenes
export const IMAGES_BASE_URL = 'https://yvivloqhhmvh4iw4.public.blob.vercel-storage.com/';

// URLs específicas para las imágenes de purpose
export const PURPOSE_IMAGES = {
  GALLERY_1: `${IMAGES_BASE_URL}purpose/purpose-gallery-1.webp`,
  GALLERY_2: `${IMAGES_BASE_URL}purpose/purpose-gallery-2.webp`,
  GALLERY_3: `${IMAGES_BASE_URL}purpose/purpose-gallery-3.webp`
};

// URLs específicas para las imágenes de discover
export const DISCOVER_IMAGES = {
  GALLERY_1: `${IMAGES_BASE_URL}discover/infinity-gallery-1.webp`,
  GALLERY_2: `${IMAGES_BASE_URL}discover/infinity-gallery-2.webp`,
  GALLERY_3: `${IMAGES_BASE_URL}discover/infinity-gallery-3.webp`,
  HERO: `${IMAGES_BASE_URL}discover/discover.webp`,
};

// URLs específicas para las imágenes de experiences
export const EXPERIENCES_IMAGES = {
  ACCORDEON_1: `${IMAGES_BASE_URL}experiencies/accordeon-1.webp`,
  ACCORDEON_2: `${IMAGES_BASE_URL}experiencies/accordeon-2.webp`,
  ACCORDEON_3: `${IMAGES_BASE_URL}experiencies/accordeon-3.webp`
};

// URLs específicas para las imágenes de events
export const EVENTS_IMAGES = {
  EVENT_1: `${IMAGES_BASE_URL}events/events-1.webp`,
  EVENT_2: `${IMAGES_BASE_URL}events/events-2.webp`,
  EVENT_3: `${IMAGES_BASE_URL}events/events-3.webp`
};

// URLs específicas para las imágenes de restaurantes
export const RESTAURANTS_IMAGES = {
  // V-Coffee
  V_COFFEE_1: `${IMAGES_BASE_URL}restaurants/v-coffee-1.webp`,
  V_COFFEE_2: `${IMAGES_BASE_URL}restaurants/v-coffee-2.webp`,
  V_COFFEE_3: `${IMAGES_BASE_URL}restaurants/v-coffee-3.webp`,
  
  // Tres Generaciones
  TRES_GENERACIONES_1: `${IMAGES_BASE_URL}restaurants/tres-generaciones-1.webp`,
  TRES_GENERACIONES_2: `${IMAGES_BASE_URL}restaurants/tres-generaciones-2.webp`,
  TRES_GENERACIONES_3: `${IMAGES_BASE_URL}restaurants/tres-generaciones-3.webp`,
  
  // Rooftop
  ROOFTOP_1: `${IMAGES_BASE_URL}restaurants/rooftop-1.webp`,
  ROOFTOP_2: `${IMAGES_BASE_URL}restaurants/rooftop-2.webp`,
  ROOFTOP_3: `${IMAGES_BASE_URL}restaurants/rooftop-3.webp`
};