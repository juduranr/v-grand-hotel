import React from 'react';
import './RoomSummary.css';
import { DoubleBed, Tub, Sunbath, KnifeFork } from '@icon-park/react';

interface RoomSummaryProps {
  room: {
    title: string;
    capacity: number;
    area: number;
    description?: string;
    beds: number;
    bathrooms: number;
    terrace?: boolean;
    breakfast?: boolean;
  };
}

const RoomSummary: React.FC<RoomSummaryProps> = ({ room }) => {
  return (
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
              <DoubleBed strokeWidth={2} size={32} />
            ))}
          {Array(room.bathrooms)
            .fill(0)
            .map((_, i) => (
              <Tub strokeWidth={2} size={32} />
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
  );
};

export default RoomSummary;


