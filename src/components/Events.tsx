import React, { useState, useEffect } from 'react'
import './Events.css'

// Datos de imágenes para el carousel
const eventsImages = [
    "/images/purpose-gallery-1.webp",
    "/images/purpose-gallery-2.webp",
    "/images/purpose-gallery-3.webp",
    "/images/infinity-gallery-1.webp",
    "/images/infinity-gallery-2.webp",
    "/images/infinity-gallery-3.webp"
];

const Events = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [animTargetIndex, setAnimTargetIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState<1 | -1>(1);

    const normalizeIndex = (idx: number) => (idx + eventsImages.length) % eventsImages.length;
    const chooseDirection = (from: number, to: number): 1 | -1 => {
        const n = eventsImages.length;
        const forward = (to - from + n) % n;
        const backward = (from - to + n) % n;
        return forward <= backward ? 1 : -1;
    };

    const updateCarousel = (newIndex: number) => {
        if (isAnimating) return;
        const target = normalizeIndex(newIndex);
        const dir = chooseDirection(currentImageIndex, target);
        setDirection(dir);
        setAnimTargetIndex(target);
        setIsAnimating(true);
        window.setTimeout(() => {
            setCurrentImageIndex(target);
            setIsAnimating(false);
            setAnimTargetIndex(null);
        }, 500);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            updateCarousel(currentImageIndex + 1);
        }, 4000);
        return () => clearInterval(interval);
    }, [currentImageIndex]);

    const goToImage = (index: number) => {
        updateCarousel(index);
    };

    const nextImage = () => {
        updateCarousel(currentImageIndex + 1);
    };

    const prevImage = () => {
        updateCarousel(currentImageIndex - 1);
    };

    const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const imageWidth = rect.width;
        
        // Si click en el lado izquierdo (primer tercio), imagen anterior
        if (clickX < imageWidth / 3) {
            prevImage();
        }
        // Si click en el lado derecho (último tercio), imagen siguiente
        else if (clickX > (imageWidth * 2) / 3) {
            nextImage();
        }
        // El tercio del medio no hace nada (mantiene la imagen actual)
    };

    return (
        <div className='events-container'>
            <div className='events-content-container'>
                <div className='events-header'>
                <p className='events-subtitle'>EVENTOS</p>
                <div className='events-title-container'>
                    <svg width="32" height="35" viewBox="0 0 292 323" fill="none" xmlns="http://www.w3.org/2000/svg" className="v-hotel-logo">
                        <path d="M247.337 6.20131C259.826 3.88532 272.352 3.54913 286 6.64957C268.762 12.7757 265.547 28.39 259.414 41.8377C252.123 57.8629 244.233 73.5518 234.25 88.0828C228.043 97.0853 221.2 105.565 212.525 112.289C194.727 126.073 178.499 124.055 164.589 106.461C156.998 96.8611 151.651 85.9536 146.865 74.7845C141.967 63.2419 137.443 51.5126 132.507 39.97C128.88 31.4904 124.954 23.0856 118.971 16.0256C114.073 10.2356 107.753 6.68693 100.088 10.2356C92.0863 13.9711 90.1419 20.8817 91.8246 29.2118C93.6194 38.0275 98.1438 45.5358 102.743 53.0441C118.373 78.4079 136.508 101.979 154.605 125.512C189.38 170.749 195.923 219.31 174.909 272.017C172.89 277.06 171.17 282.215 169.338 287.333C164.676 300.531 167.58 310.816 178.05 318.188C156.213 323.641 153.259 322.334 144.809 303.694C104.313 214.117 63.7434 124.578 23.3603 34.9271C18.3124 23.758 13.5262 12.701 1 6.23867C16.8915 6.23867 32.783 6.16396 48.6745 6.16396C33.6804 12.9252 36.4848 22.488 41.8318 34.2547C79.5601 117.257 116.84 200.52 154.306 283.635C155.951 287.295 157.933 290.844 160.252 295.439C185.715 240.453 193.867 187.372 155.764 135.523C138.415 111.915 121.364 88.1201 104.463 64.1758C97.2464 53.9406 90.3663 43.2945 87.5619 30.7807C83.8227 14.0832 90.142 5.08067 107.006 2.57791C127.235 -0.44782 142.079 8.4426 150.567 28.4274C157.335 44.3778 159.354 61.5236 163.392 78.1464C165.449 86.7007 167.73 95.2175 171.88 103.025C179.471 117.332 190.053 120.395 204.224 112.438C213.946 106.984 221.013 98.6542 227.482 89.8385C239.933 72.8794 249.356 54.1647 257.62 34.9271C264.238 19.5743 262.107 14.7182 247.412 6.23867" fill="currentColor"/>
                    </svg>
                    <hr />
                    <h1 className='events-title'>Disfruta tus momentos especiales</h1>
                    <hr />
                    <svg width="32" height="35" viewBox="0 0 292 323" fill="none" xmlns="http://www.w3.org/2000/svg" className="v-hotel-logo">
                        <path d="M247.337 6.20131C259.826 3.88532 272.352 3.54913 286 6.64957C268.762 12.7757 265.547 28.39 259.414 41.8377C252.123 57.8629 244.233 73.5518 234.25 88.0828C228.043 97.0853 221.2 105.565 212.525 112.289C194.727 126.073 178.499 124.055 164.589 106.461C156.998 96.8611 151.651 85.9536 146.865 74.7845C141.967 63.2419 137.443 51.5126 132.507 39.97C128.88 31.4904 124.954 23.0856 118.971 16.0256C114.073 10.2356 107.753 6.68693 100.088 10.2356C92.0863 13.9711 90.1419 20.8817 91.8246 29.2118C93.6194 38.0275 98.1438 45.5358 102.743 53.0441C118.373 78.4079 136.508 101.979 154.605 125.512C189.38 170.749 195.923 219.31 174.909 272.017C172.89 277.06 171.17 282.215 169.338 287.333C164.676 300.531 167.58 310.816 178.05 318.188C156.213 323.641 153.259 322.334 144.809 303.694C104.313 214.117 63.7434 124.578 23.3603 34.9271C18.3124 23.758 13.5262 12.701 1 6.23867C16.8915 6.23867 32.783 6.16396 48.6745 6.16396C33.6804 12.9252 36.4848 22.488 41.8318 34.2547C79.5601 117.257 116.84 200.52 154.306 283.635C155.951 287.295 157.933 290.844 160.252 295.439C185.715 240.453 193.867 187.372 155.764 135.523C138.415 111.915 121.364 88.1201 104.463 64.1758C97.2464 53.9406 90.3663 43.2945 87.5619 30.7807C83.8227 14.0832 90.142 5.08067 107.006 2.57791C127.235 -0.44782 142.079 8.4426 150.567 28.4274C157.335 44.3778 159.354 61.5236 163.392 78.1464C165.449 86.7007 167.73 95.2175 171.88 103.025C179.471 117.332 190.053 120.395 204.224 112.438C213.946 106.984 221.013 98.6542 227.482 89.8385C239.933 72.8794 249.356 54.1647 257.62 34.9271C264.238 19.5743 262.107 14.7182 247.412 6.23867" fill="currentColor"/>
                    </svg>
                </div>
                <p className='events-description'>
                En V Grand Hotel, cada evento se convierte en una experiencia inolvidable. Ya sea una reunión íntima, una conferencia de alto nivel o una celebración especial, nuestros espacios están diseñados para inspirar, conectar y sorprender.                </p>
                <button className="events-button">
                    Ver todos los eventos
                </button>
                </div>

                {/* Carousel de fotos */}
                <div className='events-carousel'>
                    <div className='events-carousel__container'>
                        <div className='events-carousel__track'>
                            <div className='events-carousel__stage'>
                                {(() => {
                                    const currentSrc = eventsImages[currentImageIndex];
                                    const target = animTargetIndex ?? currentImageIndex;
                                    const nextSrc = eventsImages[normalizeIndex(target)];
                                    const baseTransform = direction === -1 ? 'translateX(-50%)' : 'translateX(0%)';
                                    const targetTransform = direction === -1 ? 'translateX(0%)' : 'translateX(-50%)';
                                    const styleTransform = isAnimating ? targetTransform : baseTransform;
                                    const innerClass = `events-card-inner${isAnimating ? '' : ' no-transition'}`;
                                    const panes = direction === 1
                                        ? [
                                            <div className='events-card-pane' key='current'><img src={currentSrc} alt={'Evento actual'} className='events-carousel__image' /></div>,
                                            <div className='events-card-pane' key='next'><img src={nextSrc} alt={'Siguiente evento'} className='events-carousel__image' /></div>
                                          ]
                                        : [
                                            <div className='events-card-pane' key='next'><img src={nextSrc} alt={'Siguiente evento'} className='events-carousel__image' /></div>,
                                            <div className='events-card-pane' key='current'><img src={currentSrc} alt={'Evento actual'} className='events-carousel__image' /></div>
                                          ];
                                    return (
                                        <div className={innerClass} style={{ transform: styleTransform }}>
                                            {panes}
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                        
                        {/* Áreas clickeables para navegación */}
                        <div className='events-carousel__click-areas'>
                            <div 
                                className='events-carousel__click-area events-carousel__click-area--left'
                                onClick={prevImage}
                                title="Imagen anterior"
                            ></div>
                            <div 
                                className='events-carousel__click-area events-carousel__click-area--right'
                                onClick={nextImage}
                                title="Imagen siguiente"
                            ></div>
                        </div>
                    </div>
                    
                    {/* Indicadores en la parte inferior alineados a la izquierda */}
                    <div className='events-carousel__indicators'>
                        {eventsImages.map((_, index) => (
                            <button
                                key={index}
                                className={`events-carousel__indicator events-carousel__indicator--custom ${
                                    index === currentImageIndex ? 'active' : ''
                                }`}
                                onClick={() => goToImage(index)}
                                aria-label={`Ir a imagen ${index + 1}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Events;
