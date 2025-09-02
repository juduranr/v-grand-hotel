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
  GALLERY_1: `${IMAGES_BASE_URL}discover/purpose (1).webp`,
  GALLERY_2: `${IMAGES_BASE_URL}discover/purpose (2).webp`,
  GALLERY_3: `${IMAGES_BASE_URL}discover/purpose (3).webp`,
  GALLERY_4: `${IMAGES_BASE_URL}discover/purpose (4).webp`,
  GALLERY_5: `${IMAGES_BASE_URL}discover/purpose (5).webp`,
  GALLERY_6: `${IMAGES_BASE_URL}discover/purpose (6).webp`,
  GALLERY_7: `${IMAGES_BASE_URL}discover/purpose (7).webp`,
  GALLERY_8: `${IMAGES_BASE_URL}discover/purpose (8).webp`,
  GALLERY_9: `${IMAGES_BASE_URL}discover/purpose (9).webp`,
  GALLERY_10: `${IMAGES_BASE_URL}discover/purpose (10).webp`,
  GALLERY_11: `${IMAGES_BASE_URL}discover/purpose (11).webp`,
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

// URLs específicas para las imágenes de stories
export const STORIES_IMAGES = {
  STORY_1: `${IMAGES_BASE_URL}story/story (1).webp`,
  STORY_2: `${IMAGES_BASE_URL}story/story (2).webp`,
  STORY_3: `${IMAGES_BASE_URL}story/story (3).webp`,
  STORY_4: `${IMAGES_BASE_URL}story/story (4).webp`,
  STORY_5: `${IMAGES_BASE_URL}story/story (5).webp`,
  STORY_6: `${IMAGES_BASE_URL}story/story (6).webp`,
};

// URLs específicas para los videos de stories
export const STORIES_VIDEOS = {
  STORY_1: `${IMAGES_BASE_URL}story/story (1).webm`,
  STORY_2: `${IMAGES_BASE_URL}story/story (2).webm`,
  STORY_3: `${IMAGES_BASE_URL}story/story (3).webm`,
  STORY_4: `${IMAGES_BASE_URL}story/story (4).webm`,
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