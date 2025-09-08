import React, { useState } from "react";
import "./RoomsCarousel.css";
import roomsData from "../data/rooms.json";
import { DoubleBed, Tub, KnifeFork, ArrowRight } from "@icon-park/react";

const RoomsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getImageSource = (banner: string) => {
    if (banner.startsWith('http')) {
      return banner;
    }
    return `/images/${banner}`;
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    
    if (nextIndex === roomsData.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 500);
    } else {
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
    
    if (prevIndex === -1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(roomsData.length - 1);
      }, 500);
    } else {
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  return (
    <section className="rooms-carousel">
      <div className="rooms-carousel__container">
        <div className="rooms-carousel__presentation">
          <p className="rooms-carousel__presentation-subtitle">Habitaciones</p>
          <h2 className="rooms-carousel__presentation-title">
            Desconexión y recarga{" "}
            <span className="rooms-carousel__presentation-title-highlight">
              total
            </span>
          </h2>
          <p className="rooms-carousel__presentation-description">
            En V Grand Hotel creemos que cada estadía debe sentirse como un
            regalo. Por eso, creamos espacios que invitan al descanso profundo,
            a la inspiración y a vivir con propósito. Desde nuestras suites
            tecnológicas hasta los jardines interiores, todo ha sido diseñado
            para que te sientas en calma, incluso en medio de la ciudad.
          </p>
        </div>
        <div className="rooms-carousel__carousel-title">
          <h2>Nuestras suites y habitaciones te estan esperando</h2>
        </div>
        <div className="rooms-carousel__carousel-description">
          <p>Descubre nuestros espacios diseñados para el descanso y la comodidad. Cada habitación combina elegancia contemporánea con funcionalidad, ofreciendo una experiencia única de hospedaje en el corazón de Medellín.</p>
        </div>
        <div className="rooms-carousel__carousel">
          <div className="rooms-carousel__controls">
            <div className="rooms-carousel__indicators">
              {roomsData.map((_, index) => (
                <button
                  key={index}
                  className={`rooms-carousel__indicator rooms-carousel__indicator--custom ${
                    index === currentIndex ? "active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Ir a habitación ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button className="rooms-carousel__carousel-button">
              Ver todas las habitaciones <ArrowRight size={24} />
            </button>
          </div>
          <div className="rooms-carousel__carousel-container">
            <div
              className={`rooms-carousel__carousel-track ${isTransitioning ? 'transitioning' : ''}`}
              style={{ transform: `translateX(-${(currentIndex + 1) * 100}%)` }}
            >
              {/* Elemento duplicado del último para wrap hacia atrás */}
              <div className="rooms-carousel__carousel-item">
                <div className="rooms-carousel__room-card">
                  <div className="rooms-carousel__room-content">
                    <p className="rooms-carousel__room-subtitle">
                      Habitación
                    </p>
                    <h3 className="rooms-carousel__room-title">
                      {roomsData[roomsData.length - 1].title}
                    </h3>
                    <p className="rooms-carousel__room-capacity">
                      {roomsData[roomsData.length - 1].capacity} personas
                    </p>
                    {roomsData[roomsData.length - 1].description && (
                      <p className="rooms-carousel__room-description">
                        {roomsData[roomsData.length - 1].description}
                      </p>
                    )}
                    <div className="rooms-carousel__room-details">
                      <div className="rooms-carousel__all-icons">
                        {Array(roomsData[roomsData.length - 1].beds)
                          .fill(<DoubleBed fill="#ffffff" strokeWidth={2} size={32} />)
                          .map((icon, i) => (
                            <span
                              key={`beds-${i}`}
                              className="rooms-carousel__room-icon"
                            >
                              {icon}
                            </span>
                          ))}
                        {Array(roomsData[roomsData.length - 1].bathrooms)
                          .fill(<Tub fill="#ffffff" strokeWidth={2} size={32} />)
                          .map((icon, i) => (
                            <span
                              key={`bathrooms-${i}`}
                              className="rooms-carousel__room-icon"
                            >
                              {icon}
                            </span>
                          ))}
                        {roomsData[roomsData.length - 1].terrace && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                          <path d="M16 17.3334V25.3334M16 17.3334V4.00008M16 17.3334C16 15.6814 14.6567 14.0001 13 14.0001C11.3433 14.0001 10 15.6814 10 17.3334C10 15.6814 8.65667 14.0001 7 14.0001C5.34333 14.0001 4 15.6814 4 17.3334V15.9627C4 9.35608 9.37267 4.00008 16 4.00008M16 17.3334C16 15.6814 17.3433 14.0001 19 14.0001C20.6567 14.0001 22 15.6814 22 17.3334C22 15.6814 23.3433 14.0001 25 14.0001C26.6567 14.0001 28 15.6814 28 17.3334V15.9627C28 9.35608 22.6273 4.00008 16 4.00008M16 4.00008V2.66675M5.33333 26.6667H22.6667L26.6667 22.6667M10 26.6667V29.3334M21.3333 26.6667V29.3334" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M10.0006 17.3336C10.0006 17.3336 9.00065 13.6669 10.6673 10.0002C12.334 6.33358 16.0006 4.00024 16.0006 4.00024M16.0006 4.00024C16.0006 4.00024 19.0006 5.66691 20.6673 10.0002C22.334 14.3336 22.0006 17.3336 22.0006 17.3336M16.0006 4.00024V16.6669" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M25 14C23.3433 14 22 15.6813 22 17.3333C22 15.6813 20.6567 14 19 14C17.3433 14 16 15.6813 16 17.3333C16 15.6813 14.6567 14 13 14C11.3433 14 10 15.6813 10 17.3333C10 15.6813 8.65667 14 7 14M10.4887 5.33333C12.14 4.48133 14.0133 4 16 4C17.9867 4 19.86 4.48133 21.5107 5.33333" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        )}
                        {roomsData[roomsData.length - 1].breakfast && (
                          <span className="rooms-carousel__room-icon">
                            <KnifeFork fill="#ffffff" strokeWidth={2} size={32} />
                          </span>
                        )}
                      </div>
                      <div className="rooms-carousel__all-texts">
                        <span>
                          {roomsData[roomsData.length - 1].capacity} persona
                          {roomsData[roomsData.length - 1].capacity > 1 ? "s" : ""}
                        </span>
                        <span>{roomsData[roomsData.length - 1].area}m²</span>
                        <span>
                          {roomsData[roomsData.length - 1].beds} cama{roomsData[roomsData.length - 1].beds > 1 ? "s" : ""}
                        </span>
                        <span>
                          {roomsData[roomsData.length - 1].bathrooms} baño{roomsData[roomsData.length - 1].bathrooms > 1 ? "s" : ""}
                        </span>
                        {roomsData[roomsData.length - 1].terrace && <span>terraza</span>}
                        {roomsData[roomsData.length - 1].breakfast && <span>desayuno incluido</span>}
                      </div>
                    </div>
                  </div>
                  <div className="rooms-carousel__room-image-container">
                    <img
                      src={getImageSource(roomsData[roomsData.length - 1].banner)}
                      alt={roomsData[roomsData.length - 1].title}
                      className="rooms-carousel__room-image"
                    />
                  </div>
                </div>
              </div>
              
              {roomsData.map((room, index) => (
                <div
                  key={index}
                  className={`rooms-carousel__carousel-item ${
                    index === currentIndex ? "active" : ""
                  }`}
                >
                  <div className="rooms-carousel__room-card">
                    <div className="rooms-carousel__room-content">
                      <p className="rooms-carousel__room-subtitle">
                        Habitación
                      </p>
                      <h3 className="rooms-carousel__room-title">
                        {room.title}
                      </h3>
                      <p className="rooms-carousel__room-capacity">
                        {room.capacity} personas
                      </p>
                      {room.description && (
                        <p className="rooms-carousel__room-description">
                          {room.description}
                        </p>
                      )}
                      <div className="rooms-carousel__room-details">
                        <div className="rooms-carousel__all-icons">
                          {Array(room.beds)
                            .fill(<DoubleBed fill="#ffffff" strokeWidth={2} size={32} />)
                            .map((icon, i) => (
                              <span
                                key={`beds-${i}`}
                                className="rooms-carousel__room-icon"
                              >
                                {icon}
                              </span>
                            ))}
                          {Array(room.bathrooms)
                            .fill(<Tub fill="#ffffff" strokeWidth={2} size={32} />)
                            .map((icon, i) => (
                              <span
                                key={`bathrooms-${i}`}
                                className="rooms-carousel__room-icon"
                              >
                                {icon}
                              </span>
                            ))}
                          {room.terrace && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M16 17.3334V25.3334M16 17.3334V4.00008M16 17.3334C16 15.6814 14.6567 14.0001 13 14.0001C11.3433 14.0001 10 15.6814 10 17.3334C10 15.6814 8.65667 14.0001 7 14.0001C5.34333 14.0001 4 15.6814 4 17.3334V15.9627C4 9.35608 9.37267 4.00008 16 4.00008M16 17.3334C16 15.6814 17.3433 14.0001 19 14.0001C20.6567 14.0001 22 15.6814 22 17.3334C22 15.6814 23.3433 14.0001 25 14.0001C26.6567 14.0001 28 15.6814 28 17.3334V15.9627C28 9.35608 22.6273 4.00008 16 4.00008M16 4.00008V2.66675M5.33333 26.6667H22.6667L26.6667 22.6667M10 26.6667V29.3334M21.3333 26.6667V29.3334" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10.0006 17.3336C10.0006 17.3336 9.00065 13.6669 10.6673 10.0002C12.334 6.33358 16.0006 4.00024 16.0006 4.00024M16.0006 4.00024C16.0006 4.00024 19.0006 5.66691 20.6673 10.0002C22.334 14.3336 22.0006 17.3336 22.0006 17.3336M16.0006 4.00024V16.6669" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M25 14C23.3433 14 22 15.6813 22 17.3333C22 15.6813 20.6567 14 19 14C17.3433 14 16 15.6813 16 17.3333C16 15.6813 14.6567 14 13 14C11.3433 14 10 15.6813 10 17.3333C10 15.6813 8.65667 14 7 14M10.4887 5.33333C12.14 4.48133 14.0133 4 16 4C17.9867 4 19.86 4.48133 21.5107 5.33333" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          )}
                          {room.breakfast && (
                            <span className="rooms-carousel__room-icon">
                              <KnifeFork fill="#ffffff" strokeWidth={2} size={32} />
                            </span>
                          )}
                        </div>
                        <div className="rooms-carousel__all-texts">
                          <span>
                            {room.capacity} persona
                            {room.capacity > 1 ? "s" : ""}
                          </span>
                          <span>{room.area}m²</span>
                          <span>
                            {room.beds} cama{room.beds > 1 ? "s" : ""}
                          </span>
                          <span>
                            {room.bathrooms} baño{room.bathrooms > 1 ? "s" : ""}
                          </span>
                          {room.terrace && <span>terraza</span>}
                          {room.breakfast && <span>desayuno incluido</span>}
                        </div>
                      </div>
                    </div>
                    <div className="rooms-carousel__room-image-container">
                      <img
                        src={getImageSource(room.banner)}
                        alt={room.title}
                        className="rooms-carousel__room-image"
                      />
                      <div className="rooms-carousel__navigation">
                        <button
                          className="rooms-carousel__nav-button rooms-carousel__nav-button--prev"
                          onClick={prevSlide}
                          aria-label="Anterior habitación"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="81" height="80" viewBox="0 0 81 80" fill="none">
                            <path d="M40.5026 73.3337C22.0933 73.3337 7.16927 58.4097 7.16927 40.0003C7.16927 21.5908 22.0933 6.66699 40.5026 6.66699C58.9121 6.66699 73.8359 21.5908 73.8359 40.0003C73.8359 58.4097 58.9121 73.3337 40.5026 73.3337Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M44.6992 51.7657L32.9659 39.999L44.6992 28.2324" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button
                          className="rooms-carousel__nav-button rooms-carousel__nav-button--next"
                          onClick={nextSlide}
                          aria-label="Siguiente habitación"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="81" height="80" viewBox="0 0 81 80" fill="none" style={{ transform: 'scaleX(-1)' }}>
                            <path d="M40.5026 73.3337C22.0933 73.3337 7.16927 58.4097 7.16927 40.0003C7.16927 21.5908 22.0933 6.66699 40.5026 6.66699C58.9121 6.66699 73.8359 21.5908 73.8359 40.0003C73.8359 58.4097 58.9121 73.3337 40.5026 73.3337Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M44.6992 51.7657L32.9659 39.999L44.6992 28.2324" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Elemento duplicado del primero para wrap hacia adelante */}
              <div className="rooms-carousel__carousel-item">
                <div className="rooms-carousel__room-card">
                  <div className="rooms-carousel__room-content">
                    <p className="rooms-carousel__room-subtitle">
                      Habitación
                    </p>
                    <h3 className="rooms-carousel__room-title">
                      {roomsData[0].title}
                    </h3>
                    <p className="rooms-carousel__room-capacity">
                      {roomsData[0].capacity} personas
                    </p>
                    {roomsData[0].description && (
                      <p className="rooms-carousel__room-description">
                        {roomsData[0].description}
                      </p>
                    )}
                    <div className="rooms-carousel__room-details">
                      <div className="rooms-carousel__all-icons">
                        {Array(roomsData[0].beds)
                          .fill(<DoubleBed fill="#ffffff" strokeWidth={2} size={32} />)
                          .map((icon, i) => (
                            <span
                              key={`beds-${i}`}
                              className="rooms-carousel__room-icon"
                            >
                              {icon}
                            </span>
                          ))}
                        {Array(roomsData[0].bathrooms)
                          .fill(<Tub fill="#ffffff" strokeWidth={2} size={32} />)
                          .map((icon, i) => (
                            <span
                              key={`bathrooms-${i}`}
                              className="rooms-carousel__room-icon"
                            >
                              {icon}
                            </span>
                          ))}
                        {roomsData[0].terrace && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                          <path d="M16 17.3334V25.3334M16 17.3334V4.00008M16 17.3334C16 15.6814 14.6567 14.0001 13 14.0001C11.3433 14.0001 10 15.6814 10 17.3334C10 15.6814 8.65667 14.0001 7 14.0001C5.34333 14.0001 4 15.6814 4 17.3334V15.9627C4 9.35608 9.37267 4.00008 16 4.00008M16 17.3334C16 15.6814 17.3433 14.0001 19 14.0001C20.6567 14.0001 22 15.6814 22 17.3334C22 15.6814 23.3433 14.0001 25 14.0001C26.6567 14.0001 28 15.6814 28 17.3334V15.9627C28 9.35608 22.6273 4.00008 16 4.00008M16 4.00008V2.66675M5.33333 26.6667H22.6667L26.6667 22.6667M10 26.6667V29.3334M21.3333 26.6667V29.3334" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M10.0006 17.3336C10.0006 17.3336 9.00065 13.6669 10.6673 10.0002C12.334 6.33358 16.0006 4.00024 16.0006 4.00024M16.0006 4.00024C16.0006 4.00024 19.0006 5.66691 20.6673 10.0002C22.334 14.3336 22.0006 17.3336 22.0006 17.3336M16.0006 4.00024V16.6669" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M25 14C23.3433 14 22 15.6813 22 17.3333C22 15.6813 20.6567 14 19 14C17.3433 14 16 15.6813 16 17.3333C16 15.6813 14.6567 14 13 14C11.3433 14 10 15.6813 10 17.3333C10 15.6813 8.65667 14 7 14M10.4887 5.33333C12.14 4.48133 14.0133 4 16 4C17.9867 4 19.86 4.48133 21.5107 5.33333" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        )}
                        {roomsData[0].breakfast && (
                          <span className="rooms-carousel__room-icon">
                            <KnifeFork fill="#ffffff" strokeWidth={2} size={32} />
                          </span>
                        )}
                      </div>
                      <div className="rooms-carousel__all-texts">
                        <span>
                          {roomsData[0].capacity} persona
                          {roomsData[0].capacity > 1 ? "s" : ""}
                        </span>
                        <span>{roomsData[0].area}m²</span>
                        <span>
                          {roomsData[0].beds} cama{roomsData[0].beds > 1 ? "s" : ""}
                        </span>
                        <span>
                          {roomsData[0].bathrooms} baño{roomsData[0].bathrooms > 1 ? "s" : ""}
                        </span>
                        {roomsData[0].terrace && <span>terraza</span>}
                        {roomsData[0].breakfast && <span>desayuno incluido</span>}
                      </div>
                    </div>
                  </div>
                  <div className="rooms-carousel__room-image-container">
                    <img
                      src={getImageSource(roomsData[0].banner)}
                      alt={roomsData[0].title}
                      className="rooms-carousel__room-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rooms-carousel__all-rooms">
          <h2 className="rooms-carousel__all-rooms-title">Distribución de las habitaciones:</h2>
          <div className="rooms-carousel__all-rooms-grid">
            {roomsData.map((room, index) => (
              <div key={index} className="rooms-carousel__room-card-grid">
                <div className="rooms-carousel__room-content-grid">
                <div className="rooms-carousel__all-icons-grid">
                      {Array(room.beds)
                        .fill(<DoubleBed fill="#ffffff" strokeWidth={2} size={32} />)
                        .map((icon, i) => (
                          <span
                            key={`beds-grid-${i}`}
                            className="rooms-carousel__room-icon-grid"
                          >
                            {icon}
                          </span>
                        ))}
                      {Array(room.bathrooms)
                        .fill(<Tub fill="#ffffff" strokeWidth={2} size={32} />)
                        .map((icon, i) => (
                          <span
                            key={`bathrooms-grid-${i}`}
                            className="rooms-carousel__room-icon-grid"
                          >
                            {icon}
                          </span>
                        ))}
                      {room.terrace && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M16 17.3334V25.3334M16 17.3334V4.00008M16 17.3334C16 15.6814 14.6567 14.0001 13 14.0001C11.3433 14.0001 10 15.6814 10 17.3334C10 15.6814 8.65667 14.0001 7 14.0001C5.34333 14.0001 4 15.6814 4 17.3334V15.9627C4 9.35608 9.37267 4.00008 16 4.00008M16 17.3334C16 15.6814 17.3433 14.0001 19 14.0001C20.6567 14.0001 22 15.6814 22 17.3334C22 15.6814 23.3433 14.0001 25 14.0001C26.6567 14.0001 28 15.6814 28 17.3334V15.9627C28 9.35608 22.6273 4.00008 16 4.00008M16 4.00008V2.66675M5.33333 26.6667H22.6667L26.6667 22.6667M10 26.6667V29.3334M21.3333 26.6667V29.3334" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10.0006 17.3336C10.0006 17.3336 9.00065 13.6669 10.6673 10.0002C12.334 6.33358 16.0006 4.00024 16.0006 4.00024M16.0006 4.00024C16.0006 4.00024 19.0006 5.66691 20.6673 10.0002C22.334 14.3336 22.0006 17.3336 22.0006 17.3336M16.0006 4.00024V16.6669" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M25 14C23.3433 14 22 15.6813 22 17.3333C22 15.6813 20.6567 14 19 14C17.3433 14 16 15.6813 16 17.3333C16 15.6813 14.6567 14 13 14C11.3433 14 10 15.6813 10 17.3333C10 15.6813 8.65667 14 7 14M10.4887 5.33333C12.14 4.48133 14.0133 4 16 4C17.9867 4 19.86 4.48133 21.5107 5.33333" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      )}
                      {room.breakfast && (
                        <span className="rooms-carousel__room-icon-grid">
                          <KnifeFork fill="#ffffff" strokeWidth={2} size={32} />
                        </span>
                      )}
                    </div>
                  <h3 className="rooms-carousel__room-title-grid">
                    {room.title}
                  </h3>
                  <p className="rooms-carousel__room-capacity-grid">
                    {room.capacity} PAX
                  </p>
                    <div className="rooms-carousel__all-texts-grid">
                      <span>
                        {room.capacity} persona{room.capacity > 1 ? "s" : ""}
                      </span>
                      <span>{room.area}m²</span>
                      <span>
                        {room.beds} cama{room.beds > 1 ? "s" : ""}
                      </span>
                      <span>
                        {room.bathrooms} baño{room.bathrooms > 1 ? "s" : ""}
                      </span>
                      {room.terrace && <span>terraza</span>}
                      {room.breakfast && <span>desayuno incluido</span>}
                    </div>

                  <div className="rooms-carousel__room-details-grid">
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rooms-carousel__all-rooms-grid-button">
          <p>Para más información de tarifas y disponibilidad, visita nuestra</p>
          <button className="rooms-carousel__carousel-button">
            Página de reservas <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default RoomsCarousel;
