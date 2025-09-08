import React, { useEffect, useMemo, useState } from 'react';
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
  const [room, setRoom] = useState<Room | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const slug = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const parts = window.location.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] || '';
  }, []);

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
    <div className="room-detail-page">
      <div className="hero-section" style={{ backgroundImage: `url('${bannerUrl}')` }}>
        <div className="room-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">{room.title}</h1>
        </div>
      </div>

      <div className="room-content">
        <div className="room-summary">
          <p className="summary-subtitle">
            Área {room.area}m² y capacidad para {room.capacity} persona{room.capacity > 1 ? 's' : ''}
          </p>
          <h2 className="summary-title">{room.title.toUpperCase()}</h2>
          <p className="summary-description">
            {room.description || 'Descubre el lujo y la comodidad en esta hermosa habitación.'}
          </p>
          <div className="services">
            <p className="services-title">Servicios incluídos:</p>
            <div className="services-icons">
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
          </div>
          <div className="summary-cta">
            <a href="/rooms" className="btn-stay">Quedarme aquí</a>
          </div>
        </div>

        <div className="gallery-section">
          <div className="gallery-grid">
            {galleryItems.map((it, idx) => (
              <div key={`img-${idx}`} className={`grid-item span-${it.span}`}>
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
          <div className="room-lightbox" role="dialog" aria-modal="true" aria-label="Imagen ampliada" onClick={(e) => { if (e.target === e.currentTarget) handleCloseLightbox(); }}>
            {lightboxSrc && (
              <div className="room-lightbox_image_container">
                <img className="room-lightbox_image" src={lightboxSrc} alt="Imagen ampliada" />
                <button className="room-lightbox_close" onClick={handleCloseLightbox} aria-label="Cerrar imagen">✕</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomSummary;

