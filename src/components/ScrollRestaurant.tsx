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
            height: '100vh', 
            scale: 1, 
            zIndex: 3,
            opacity: 1 
        });

        gsap.set(carousel2Ref.current, { 
            position: 'fixed',
            top: 'calc(10vh - 80px)', 
            left: '20px', 
            width: '100%',
            height: '100vh', 
            scale: 0.9, 
            zIndex: 2,
            opacity: 0.8 
        });

        gsap.set(carousel3Ref.current, { 
            position: 'fixed',
            top: 'calc(10vh - 160px)',
            left: '40px', 
            width: '100%',
            height: '100vh', 
            scale: 0.8, 
            zIndex: 1,
            opacity: 0.6
        });

        // Timeline principal para la secuencia de desapilado
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=400%',
                scrub: 0.5,
                pin: true,
                invalidateOnRefresh: true,
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
        }, 0.2);

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
            top: '0vh',
            ease: 'power3.out'
        }, 0.4);

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [restaurantData]);

    return (
        <section ref={sectionRef} className="simple-carousels-section scroll-r-section">
            <div className="simple-carousels-container scroll-r-container">
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