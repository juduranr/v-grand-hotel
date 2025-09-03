import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollRestaurant = ({restaurantData, simpleCarouselRef1, simpleCarouselRef2, simpleCarouselRef3}: {restaurantData: any, simpleCarouselRef1: any, simpleCarouselRef2: any, simpleCarouselRef3: any}) => {

    // Referencias para las animaciones
    const sectionRef = useRef<HTMLElement>(null);
    const carousel1Ref = useRef<HTMLDivElement>(null);
    const carousel2Ref = useRef<HTMLDivElement>(null);
    const carousel3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !carousel1Ref.current || !carousel2Ref.current || !carousel3Ref.current) return;

        // Configuración inicial de posiciones - Los tres carruseles apilados escalonadamente
        gsap.set(carousel1Ref.current, { 
            position: 'fixed',
            top: '10vh',
            left: 0,
            width: '100%',
            height: '100vh', // Ocupa toda la altura de la pantalla
            scale: 1, // Tamaño completo
            zIndex: 3,
            opacity: 1 // Carrusel 1 siempre al 100%
        });

        gsap.set(carousel2Ref.current, { 
            position: 'fixed',
            top: 'calc(10vh - 80px)', // Apilado escalonadamente, mostrando parte del carrusel 1
            left: '20px', // Desplazado lateralmente para crear efecto de pila
            width: '100%',
            height: '100vh', // Ocupa toda la altura de la pantalla
            scale: 0.9, // Tamaño reducido inicialmente
            zIndex: 2,
            opacity: 0.8 // Carrusel 2 empieza al 80%
        });

        gsap.set(carousel3Ref.current, { 
            position: 'fixed',
            top: 'calc(10vh - 160px)', // Más escalonado, mostrando parte de los dos carruseles anteriores
            left: '40px', // Más desplazado lateralmente
            width: '100%',
            height: '100vh', // Ocupa toda la altura de la pantalla
            scale: 0.8, // Tamaño más reducido inicialmente
            zIndex: 1,
            opacity: 0.6 // Carrusel 3 empieza al 60%
        });

        // Timeline principal para la secuencia de desapilado
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=400%',
                scrub: 0.5,
                pin: true,
                anticipatePin: 1
            }
        });

        // Primera fase: El carrusel 1 se desliza hacia arriba, revelando el carrusel 2
        tl.to(carousel1Ref.current, {
            top: '-100vh',
            ease: 'power1.out'
        }, 0)
        .to(carousel2Ref.current, {
            opacity: 1, // Carrusel 2 aumenta su opacidad a 100% cuando está al frente
            scale: 1, // Carrusel 2 aumenta su tamaño al 100% cuando está al frente
            ease: 'power1.out'
        }, 0);

        // Segunda fase: El carrusel 2 se desliza hacia arriba, revelando el carrusel 3
        tl.to(carousel2Ref.current, {
            top: '-100vh',
            ease: 'power1.out'
        }, 0.33)
        .to(carousel3Ref.current, {
            opacity: 1, // Carrusel 3 aumenta su opacidad a 100% cuando está al frente
            scale: 1, // Carrusel 3 aumenta su tamaño al 100% cuando está al frente
            ease: 'power1.out'
        }, 0.33);

        // Tercera fase: El carrusel 3 se desliza hacia arriba
        tl.to(carousel3Ref.current, {
            top: '-100vh',
            ease: 'power1.out'
        }, 0.66);

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [restaurantData]);

    return (
        <section ref={sectionRef} className="simple-carousels-section scroll-r-section" style={{ height: '100vh' }}>
            <div className="simple-carousels-container scroll-r-container" style={{ height: '100vh' }}>
                {/* Primer carousel - Tres Generaciones */}
                <div ref={carousel1Ref} className="simple-carousel-wrapper scroll-r-carousel-wrapper">
                    <div ref={simpleCarouselRef1} className="restaurants-gallery js-flickity scroll-r-restaurants-gallery">
                        {restaurantData[0].items.map((item: any, index: any) => (
                            <div key={`simple1-${index}`} className="restaurants-gallery-cell scroll-r-gallery-cell">
                                <img src={item.src} alt={item.alt} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Segundo carousel - V-Coffee */}
                <div ref={carousel2Ref} className="simple-carousel-wrapper scroll-r-carousel-wrapper">
                    <div ref={simpleCarouselRef2} className="restaurants-gallery js-flickity scroll-r-restaurants-gallery">
                        {restaurantData[1].items.map((item: any, index: any) => (
                            <div key={`simple2-${index}`} className="restaurants-gallery-cell scroll-r-gallery-cell">
                                <img src={item.src} alt={item.alt} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tercer carousel - ROOFTOP */}
                <div ref={carousel3Ref} className="simple-carousel-wrapper scroll-r-carousel-wrapper">
                    <div ref={simpleCarouselRef3} className="restaurants-gallery js-flickity scroll-r-restaurants-gallery">
                        {restaurantData[2].items.map((item: any, index: any) => (
                            <div key={`simple3-${index}`} className="restaurants-gallery-cell scroll-r-gallery-cell">
                                <img src={item.src} alt={item.alt} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ScrollRestaurant;