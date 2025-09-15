import React, { useEffect, useMemo, useState, useRef } from 'react';
import './RoomSummary.css';
import { DoubleBed, Tub, Sunbath, KnifeFork } from '@icon-park/react';
import roomsData from '../data/rooms.json';

interface Room {
  title: string;
  capacity: number;
  area: number;
  description?: string;
  beds: number;
  bathrooms: number;
  terrace?: boolean;
  breakfast?: boolean;
  banner?: string;
  gallery?: string[];
}

function normalizeRoomName(roomTitle: string): string {
  return roomTitle.toLowerCase().replace(/\s+/g, '-');
}

function getAssetUrl(path: string): string {
  if (!path) return '';
  return path.startsWith('http') ? path : `/images/${path}`;
}

const RoomSummary: React.FC = () => {
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const slug = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const parts = window.location.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] || '';
  }, []);

  // Función para ajustar el tamaño del texto dinámicamente
  const adjustHeroTextSize = () => {
    const textElement = heroTitleRef.current;
    if (!textElement) return;

    const container = textElement.closest('.rs-hero-section');
    if (!container) return;

    const containerWidth = (container as HTMLElement).offsetWidth;
    
    // Empezar con un tamaño base
    textElement.style.fontSize = '1px';
    
    // Incrementar el tamaño hasta que ocupe todo el ancho
    let fontSize = 1;
    while (textElement.scrollWidth <= containerWidth && fontSize < 1000) {
      fontSize += 1;
      textElement.style.fontSize = fontSize + 'px';
    }
    
    // Si se pasó del ancho, reducir un poco
    if (textElement.scrollWidth > containerWidth) {
      fontSize -= 1;
      textElement.style.fontSize = fontSize + 'px';
    }
    
    // Aplicar escala horizontal para ocupar exactamente todo el ancho
    const scale = containerWidth / textElement.scrollWidth;
    textElement.style.transform = `scaleX(${scale})`;
  };

  useEffect(() => {
    const found = (roomsData as Room[]).find(r => normalizeRoomName(r.title) === slug);
    if (!found) {
      if (typeof window !== 'undefined') {
        window.location.replace('/rooms');
      }
      return;
    }
    setRoom(found);
  }, [slug]);

  useEffect(() => {
    // Ajustar el texto del hero al cargar
    adjustHeroTextSize();

    // Event listener para redimensionar ventana
    const handleResize = () => {
      adjustHeroTextSize();
    };

    // Agregar event listeners para el texto dinámico
    window.addEventListener('load', adjustHeroTextSize);
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('load', adjustHeroTextSize);
      window.removeEventListener('resize', handleResize);
    };
  }, [room]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseLightbox();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.documentElement.style.overflow = '';
    };
  }, [lightboxOpen]);

  const handleOpenLightbox = (src: string) => {
    setLightboxSrc(src);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setLightboxSrc(null);
  };

  if (!room) {
    return null;
  }

  const images = Array.isArray(room.gallery) ? room.gallery : [];
  const layoutSpans = [6, 6, 4, 4, 4, 6, 6];
  const galleryItems = layoutSpans.map((span, idx) => ({
    image: images.length ? images[idx % images.length] : '',
    alt: `${room.title} - Imagen ${idx + 1}`,
    span
  }));

  const bannerUrl = room.banner ? getAssetUrl(room.banner) : '';

  return (
    <div className="rs-room-detail-page">
      <div className="rs-hero-section" style={{ backgroundImage: `url('${bannerUrl}')` }}>
        <div className="rs-room-overlay"></div>
        <div className="rs-hero-content">
          <h1 className="rs-hero-title" ref={heroTitleRef}>{room.title}</h1>
        </div>
      </div>

      <div className="rs-room-content">
        <div className="rs-room-summary">
          <p className="rs-summary-subtitle">
            Área {room.area}m² y capacidad para {room.capacity} persona{room.capacity > 1 ? 's' : ''}
          </p>
          <h2 className="rs-summary-title">{room.title.toUpperCase()}</h2>
          <p className="rs-summary-description">
            {room.description || 'Descubre el lujo y la comodidad en esta hermosa habitación.'}
          </p>
          <div className="rs-services">
            <p className="rs-services-title">Servicios incluídos:</p>
            <div className="rs-services-icons">
              {Array(room.beds)
                .fill(0)
                .map((_, i) => (
                  <DoubleBed key={`bed-${i}`} strokeWidth={2} size={32} />
                ))}
              {Array(room.bathrooms)
                .fill(0)
                .map((_, i) => (
                  <Tub key={`bath-${i}`} strokeWidth={2} size={32} />
                ))}
              {room.terrace && (
                <Sunbath strokeWidth={2} size={32} />
              )}
              {room.breakfast && (
                <KnifeFork strokeWidth={2} size={32} />
              )}
            </div>
            <div className="rs-services-texts">
              <span>
                {room.beds} cama{room.beds > 1 ? 's' : ''}
              </span>
              <span>
                {room.bathrooms} baño{room.bathrooms > 1 ? 's' : ''}
              </span>
              {room.terrace && <span>terraza</span>}
              {room.breakfast && <span>desayuno incluido</span>}
            </div>
          </div>
          <div className="rs-summary-cta">
            <a href="https://www.choicehotels.com/es-xl/colombia/medellin/radisson-individuals-hotels/cb031" target="_blank" rel="noopener noreferrer" className="rs-btn-stay">Quedarme aquí</a>
          </div>
        </div>

        <div className="rs-gallery-section">
          <div className="rs-gallery-grid">
            {galleryItems.map((it, idx) => (
              <div key={`img-${idx}`} className={`rs-grid-item rs-span-${it.span}`}>
                {it.image && (
                  <img
                    src={getAssetUrl(it.image)}
                    alt={it.alt}
                    loading="lazy"
                    onClick={() => handleOpenLightbox(getAssetUrl(it.image))}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        {lightboxOpen && (
          <div className="rs-room-lightbox" role="dialog" aria-modal="true" aria-label="Imagen ampliada" onClick={(e) => { if (e.target === e.currentTarget) handleCloseLightbox(); }}>
            {lightboxSrc && (
              <div className="rs-room-lightbox_image_container">
                <img className="rs-room-lightbox_image" src={lightboxSrc} alt="Imagen ampliada" />
                <button className="rs-room-lightbox_close" onClick={handleCloseLightbox} aria-label="Cerrar imagen">✕</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomSummary;

