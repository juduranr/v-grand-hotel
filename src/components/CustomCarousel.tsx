import React, { useState, useEffect, useRef } from 'react'
import './CustomCarousel.css'

interface CarouselItem {
    src: string;
    alt: string;
}

interface CustomCarouselProps {
    images: CarouselItem[];
    titles?: string[];
    className?: string;
    showIndicators?: boolean;
    autoPlay?: boolean;
}

const CustomCarousel = ({ images, titles = [], className = '', showIndicators = true, autoPlay = false }: CustomCarouselProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [animTargetIndex, setAnimTargetIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState<1 | -1>(1);
    const [animDirection, setAnimDirection] = useState<1 | -1>(1);
    const innerMainRef = useRef<HTMLDivElement>(null);
    const innerPrevRef = useRef<HTMLDivElement>(null);
    const innerNextRef = useRef<HTMLDivElement>(null);

    const normalizeIndex = (idx: number) => (idx + images.length) % images.length;
    
    const chooseDirection = (from: number, to: number): 1 | -1 => {
        const n = images.length;
        const forward = (to - from + n) % n;
        const backward = (from - to + n) % n;
        return forward <= backward ? 1 : -1;
    };

    const updateCarousel = (newIndex: number) => {
        if (isAnimating) return;
        
        const target = normalizeIndex(newIndex);
        const dir = chooseDirection(currentImageIndex, target);
        
        // Si estamos cambiando de dirección, resetear completamente el estado
        if (direction !== dir) {
            setIsAnimating(false);
            setAnimTargetIndex(null);
            setDirection(dir);
            setAnimDirection(dir);
            
            // Pequeño delay para asegurar que el estado se resetee
            setTimeout(() => {
                setAnimTargetIndex(target);
                setIsAnimating(true);
                
                setTimeout(() => {
                    setCurrentImageIndex(target);
                    setIsAnimating(false);
                    setAnimTargetIndex(null);
                }, 500);
            }, 10);
        } else {
            // Navegación en la misma dirección - lógica normal
            setAnimDirection(dir);
            setDirection(dir);
            setAnimTargetIndex(target);
            setIsAnimating(true);

            setTimeout(() => {
                setCurrentImageIndex(target);
                setIsAnimating(false);
                setAnimTargetIndex(null);
            }, 500);
        }
    };

    useEffect(() => {
        if (!autoPlay) return;
        
        const interval = setInterval(() => {
            updateCarousel(currentImageIndex + 1);
        }, 4000);
        return () => clearInterval(interval);
    }, [currentImageIndex, autoPlay]);

    // Aplicar clases de animación
    useEffect(() => {
        const refs = [innerMainRef, innerPrevRef, innerNextRef];
        
        refs.forEach(ref => {
            if (!ref.current) return;

            // Remover clases anteriores
            ref.current.classList.remove('slide-right', 'no-transition');
            
            if (isAnimating) {
                // Aplicar clase de animación para el efecto de empuje
                ref.current.classList.add('slide-right');
            } else {
                ref.current.classList.add('no-transition');
            }
        });
    }, [isAnimating, animDirection]);

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

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const imageWidth = rect.width;
        
        // Cambiar cursor según la posición del mouse
        if (mouseX < imageWidth / 3) {
            e.currentTarget.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"81\\" height=\\"80\\" viewBox=\\"0 0 81 80\\" fill=\\"none\\"><path d=\\"M40.5026 73.3337C22.0933 73.3337 7.16927 58.4097 7.16927 40.0003C7.16927 21.5908 22.0933 6.66699 40.5026 6.66699C58.9121 6.66699 73.8359 21.5908 73.8359 40.0003C73.8359 58.4097 58.9121 73.3337 40.5026 73.3337Z\\" stroke=\\"white\\" stroke-width=\\"2\\" stroke-miterlimit=\\"10\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"/><path d=\\"M44.6992 51.7657L32.9659 39.999L44.6992 28.2324\\" stroke=\\"white\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"/></svg>") 40 40, auto';
        } else if (mouseX > (imageWidth * 2) / 3) {
            e.currentTarget.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"81\\" height=\\"80\\" viewBox=\\"0 0 81 80\\" fill=\\"none\\"><path d=\\"M40.4974 73.3337C58.9067 73.3337 73.8307 58.4097 73.8307 40.0003C73.8307 21.5908 58.9067 6.66699 40.4974 6.66699C22.0879 6.66699 7.16406 21.5908 7.16406 40.0003C7.16406 58.4097 22.0879 73.3337 40.4974 73.3337Z\\" stroke=\\"white\\" stroke-width=\\"2\\" stroke-miterlimit=\\"10\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"/><path d=\\"M36.3008 51.7657L48.0341 39.999L36.3008 28.2324\\" stroke=\\"white\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"/></svg>") 40 40, auto';
        } else {
            e.currentTarget.style.cursor = 'default';
        }
    };

    return (
        <div className={`custom-carousel ${className}`}>
            <div className='custom-carousel__container' onClick={handleImageClick} onMouseMove={handleMouseMove}>
                <div className='custom-carousel__track'>
                    <div className='custom-carousel__stage'>
                        <div className='custom-card-inner'>
                            {/* Imagen anterior */}
                            <div className='custom-card-pane custom-card-pane--prev'>
                                <div ref={innerPrevRef} className={`custom-card-inner-side${isAnimating ? '' : ' no-transition'}`}>
                                    {/* Pane anterior actual */}
                                    <div className='custom-card-pane-inner' key='prev-current'>
                                        <img 
                                            src={images[normalizeIndex(currentImageIndex - 1)]?.src} 
                                            alt={images[normalizeIndex(currentImageIndex - 1)]?.alt || 'Imagen anterior'} 
                                            className='custom-carousel__image'
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.backgroundColor = '#1a1a1a';
                                                (e.target as HTMLImageElement).style.display = 'flex';
                                                (e.target as HTMLImageElement).style.alignItems = 'center';
                                                (e.target as HTMLImageElement).style.justifyContent = 'center';
                                                (e.target as HTMLImageElement).style.color = '#fff';
                                                (e.target as HTMLImageElement).innerHTML = 'Imagen no disponible';
                                            }}
                                        />
                                    </div>
                                    
                                    {/* Pane anterior siguiente (para el efecto de empuje) */}
                                    <div className='custom-card-pane-inner' key='prev-next'>
                                        <img 
                                            src={images[normalizeIndex(currentImageIndex)]?.src} 
                                            alt={images[normalizeIndex(currentImageIndex)]?.alt || 'Imagen actual'} 
                                            className='custom-carousel__image'
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.backgroundColor = '#1a1a1a';
                                                (e.target as HTMLImageElement).style.display = 'flex';
                                                (e.target as HTMLImageElement).style.alignItems = 'center';
                                                (e.target as HTMLImageElement).style.justifyContent = 'center';
                                                (e.target as HTMLImageElement).style.color = '#fff';
                                                (e.target as HTMLImageElement).innerHTML = 'Imagen no disponible';
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Imagen principal con efecto de empuje */}
                            <div className='custom-card-pane custom-card-pane--current'>
                                <div ref={innerMainRef} className={`custom-card-inner-main${isAnimating ? '' : ' no-transition'}`}>
                                    {/* Pane actual */}
                                    <div className='custom-card-pane-inner' key='current'>
                                        <img 
                                            src={images[currentImageIndex]?.src} 
                                            alt={images[currentImageIndex]?.alt || 'Imagen actual'} 
                                            className='custom-carousel__image'
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.backgroundColor = '#1a1a1a';
                                                (e.target as HTMLImageElement).style.display = 'flex';
                                                (e.target as HTMLImageElement).style.alignItems = 'center';
                                                (e.target as HTMLImageElement).style.justifyContent = 'center';
                                                (e.target as HTMLImageElement).style.color = '#fff';
                                                (e.target as HTMLImageElement).innerHTML = 'Imagen no disponible';
                                            }}
                                        />
                                    </div>
                                    
                                    {/* Pane siguiente (para el efecto de empuje) */}
                                    <div className='custom-card-pane-inner' key='next'>
                                        <img 
                                            src={images[normalizeIndex(currentImageIndex + 1)]?.src} 
                                            alt={images[normalizeIndex(currentImageIndex + 1)]?.alt || 'Siguiente imagen'} 
                                            className='custom-carousel__image'
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.backgroundColor = '#1a1a1a';
                                                (e.target as HTMLImageElement).style.display = 'flex';
                                                (e.target as HTMLImageElement).style.alignItems = 'center';
                                                (e.target as HTMLImageElement).style.justifyContent = 'center';
                                                (e.target as HTMLImageElement).style.color = '#fff';
                                                (e.target as HTMLImageElement).innerHTML = 'Imagen no disponible';
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Imagen siguiente */}
                            <div className='custom-card-pane custom-card-pane--next'>
                                <div ref={innerNextRef} className={`custom-card-inner-side${isAnimating ? '' : ' no-transition'}`}>
                                    {/* Pane siguiente actual */}
                                    <div className='custom-card-pane-inner' key='next-current'>
                                        <img 
                                            src={images[normalizeIndex(currentImageIndex + 1)]?.src} 
                                            alt={images[normalizeIndex(currentImageIndex + 1)]?.alt || 'Siguiente imagen'} 
                                            className='custom-carousel__image'
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.backgroundColor = '#1a1a1a';
                                                (e.target as HTMLImageElement).style.display = 'flex';
                                                (e.target as HTMLImageElement).style.alignItems = 'center';
                                                (e.target as HTMLImageElement).style.justifyContent = 'center';
                                                (e.target as HTMLImageElement).style.color = '#fff';
                                                (e.target as HTMLImageElement).innerHTML = 'Imagen no disponible';
                                            }}
                                        />
                                    </div>
                                    
                                    {/* Pane siguiente anterior (para el efecto de empuje) */}
                                    <div className='custom-card-pane-inner' key='next-prev'>
                                        <img 
                                            src={images[normalizeIndex(currentImageIndex + 2)]?.src} 
                                            alt={images[normalizeIndex(currentImageIndex + 2)]?.alt || 'Siguiente imagen'} 
                                            className='custom-carousel__image'
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.backgroundColor = '#1a1a1a';
                                                (e.target as HTMLImageElement).style.display = 'flex';
                                                (e.target as HTMLImageElement).style.alignItems = 'center';
                                                (e.target as HTMLImageElement).style.justifyContent = 'center';
                                                (e.target as HTMLImageElement).style.color = '#fff';
                                                (e.target as HTMLImageElement).innerHTML = 'Imagen no disponible';
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Áreas clickeables para navegación */}
                <div className='custom-carousel__click-areas'>
                    <div 
                        className='custom-carousel__click-area custom-carousel__click-area--left'
                        onClick={prevImage}
                        title="Imagen anterior"
                    ></div>
                    <div 
                        className='custom-carousel__click-area custom-carousel__click-area--right'
                        onClick={nextImage}
                        title="Imagen siguiente"
                    ></div>
                </div>

                {/* Overlay con título en esquina inferior izquierda */}
                {titles.length > 0 && (
                    <div className='custom-carousel__overlay'>
                        <div className='custom-carousel__overlay-title'>
                            <h3>{titles[currentImageIndex] || ''}</h3>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Indicadores en la parte inferior alineados a la izquierda */}
            {showIndicators && images.length > 1 && (
                <div className='custom-carousel__indicators'>
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`custom-carousel__indicator custom-carousel__indicator--custom ${
                                index === currentImageIndex ? 'active' : ''
                            }`}
                            onClick={() => goToImage(index)}
                            aria-label={`Ir a imagen ${index + 1}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CustomCarousel
