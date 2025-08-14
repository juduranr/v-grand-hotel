import React, { useState } from 'react';
import './RoomsCarousel.css';
import { Button } from './ui/button';
import roomsData from '../data/rooms.json';

const RoomsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === roomsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? roomsData.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="rooms-carousel">
      <div className="rooms-carousel__container">
        <div className="rooms-carousel__presentation">
            <p className="rooms-carousel__presentation-subtitle">Habitaciones</p>
          <h2 className="rooms-carousel__presentation-title">Desconexión y recarga <span className="rooms-carousel__presentation-title-highlight">total</span></h2>
          <p className="rooms-carousel__presentation-description">
          En V Grand Hotel creemos que cada estadía debe sentirse como un regalo. Por eso, creamos espacios que invitan al descanso profundo, a la inspiración y a vivir con propósito. Desde nuestras suites tecnológicas hasta los jardines interiores, todo ha sido diseñado para que te sientas en calma, incluso en medio de la ciudad.</p>
        </div>
        <div className="rooms-carousel__carousel-title">
            <h2>Nuestras suites y habitaciones te estan esperando</h2>
        </div>
        <div className="rooms-carousel__carousel">
        <div className="rooms-carousel__controls">
                    <div className="rooms-carousel__indicators">
                        {roomsData.map((_, index) => (
                            <button
                                key={index}
                                className={`rooms-carousel__indicator ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Ir a habitación ${index + 1}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <Button variant="link" className="rooms-carousel__carousel-button">
                        Ver todas las habitaciones
                    </Button>
                </div>
            <div className="rooms-carousel__carousel-container">
                <div className="rooms-carousel__carousel-track">
                    {roomsData.map((room, index) => (
                        <div 
                            key={index}
                            className={`rooms-carousel__carousel-item ${index === currentIndex ? 'active' : ''}`}
                            style={{ transform: `translateX(${(index - currentIndex) * 100}%)` }}
                        >
                            <div className="rooms-carousel__room-card">
                            <div className="rooms-carousel__room-content">
                                <p className="rooms-carousel__room-subtitle">Habitación</p>
                                    <h3 className="rooms-carousel__room-title">{room.title}</h3>
                                    <p className="rooms-carousel__room-description">{room.description}</p>
                                    <div className="rooms-carousel__room-details">
                                        <div className="rooms-carousel__all-icons">
                                            {Array(room.capacity).fill('👥').map((icon, i) => (
                                                <span key={`capacity-${i}`} className="rooms-carousel__room-icon">{icon}</span>
                                            ))}
                                            <span className="rooms-carousel__room-icon">📏</span>
                                            {Array(room.beds).fill('🛏️').map((icon, i) => (
                                                <span key={`beds-${i}`} className="rooms-carousel__room-icon">{icon}</span>
                                            ))}
                                            {Array(room.bathrooms).fill('🚿').map((icon, i) => (
                                                <span key={`bathrooms-${i}`} className="rooms-carousel__room-icon">{icon}</span>
                                            ))}
                                            {room.terrace && (
                                                <span className="rooms-carousel__room-icon">🌿</span>
                                            )}
                                            {room.breakfast && (
                                                <span className="rooms-carousel__room-icon">🍳</span>
                                            )}
                                        </div>
                                        <div className="rooms-carousel__all-texts">
                                            <span>{room.capacity} persona{room.capacity > 1 ? 's' : ''}</span>
                                            <span>{room.area}m²</span>
                                            <span>{room.beds} cama{room.beds > 1 ? 's' : ''}</span>
                                            <span>{room.bathrooms} baño{room.bathrooms > 1 ? 's' : ''}</span>
                                            {room.terrace && <span>terraza</span>}
                                            {room.breakfast && <span>desayuno incluido</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="rooms-carousel__room-image-container">
                                    <img src={room.banner} alt={room.title} className="rooms-carousel__room-image" />
                                    <div className="rooms-carousel__navigation">
                                        <button 
                                            className="rooms-carousel__nav-button rooms-carousel__nav-button--prev"
                                            onClick={prevSlide}
                                            aria-label="Anterior habitación"
                                        >
                                            ‹
                                        </button>
                                        <button 
                                            className="rooms-carousel__nav-button rooms-carousel__nav-button--next"
                                            onClick={nextSlide}
                                            aria-label="Siguiente habitación"
                                        >
                                            ›
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default RoomsCarousel;