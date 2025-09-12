import React, { useEffect } from 'react';
import { RESTAURANTS_IMAGES } from '../config/env';
import './TresGeneraciones.css';
import bgSvgUrl from '../assets/images/tres-generaciones-bg.svg?url';
import isoLogoSvgUrl from '../assets/images/tres-generaciones-isologo.svg?url';
import isoLogoEstSvgUrl from '../assets/images/tres-generaciones-est-isologo.svg?url';
import pinSvgUrl from '../assets/images/tres-generaciones-pin.svg?url';
import isoTipoSvgUrl from '../assets/images/tres-generaciones-isotipo.svg?url';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TresGeneraciones: React.FC = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);

    useEffect(() => {
        // Animación para la galería de experiencias
        const galleryElement = document.querySelector('.tg-experiences__gallery');
        
        if (galleryElement) {
            // Función para calcular el ancho dinámico
            const calculateDynamicWidth = () => {
                const vw = window.innerWidth;
                const firstImageWidth = 561;
                const panelWidth = 1024; // Ancho del panel según CSS
                const middleImagesCount = document.querySelectorAll('.tg-experiences__item:not(:first-child):not(.tg-experiences__item--panel)').length;
                
                // Calcular espacio disponible para las imágenes del medio
                const availableSpace = vw - firstImageWidth - panelWidth;
                const dynamicWidth = Math.max(35, availableSpace / middleImagesCount); // Mínimo 35px
                
                return dynamicWidth;
            };

            // Fijar el ancho de la primera imagen y el panel para que no cambien
            gsap.set('.tg-experiences__item:first-child', {
                flex: '0 0 561px',
                width: '561px',
                maxWidth: '561px'
            });

            gsap.set('.tg-experiences__item--panel', {
                flex: '1 1 auto',
                width: 'auto'
            });

            // Establecer ancho inicial de 561px para las imágenes del medio
            gsap.set('.tg-experiences__item:not(:first-child):not(.tg-experiences__item--panel)', {
                width: '561px',
                minWidth: '561px',
                flex: '0 0 561px'
            });

            // Animar el ancho de los contenedores (excepto el primero y el panel) como en Hero.tsx
            gsap.to('.tg-experiences__item:not(:first-child):not(.tg-experiences__item--panel)', {
                width: () => `${calculateDynamicWidth()}px`,
                minWidth: () => `${calculateDynamicWidth()}px`,
                flex: () => `0 0 ${calculateDynamicWidth()}px`,
                duration: 1,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: galleryElement,
                    start: 'center-=25% center',
                    end: 'center center',
                    scrub: 1
                }
            });
        }
    }, []);


    return (
        <div>
            <section
                className="tg-hero"
            >
                <img className="tg-hero__bg" src={bgSvgUrl} alt="Fondo decorativo Tres Generaciones" />
                <div className="tg-hero__content">
                    <img className="tg-hero__logo" src={isoLogoSvgUrl} alt="Tres Generaciones" />
                    <h1 className="tg-hero__title">
                        Un mismo propósito,
                        <br />
                        heredado por Tres generaciones.
                    </h1>
                    <a
                        href="#carta"
                        className="tg-hero__button"
                        aria-label="Ver Carta"
                    >
                        Ver Carta
                    </a>
                </div>
            </section>

            <section className="tg-presentation">
                <img className="tg-pin" src={pinSvgUrl} alt="" aria-hidden="true" />
                <div className="tg-section-pair">
                    <div className="tg-presentation__content">
                        <div className="tg-presentation__intro">
                            <h2 className="tg-section-title">Una historia que se
                                <br />
                                sirve en cada plato</h2>
                            <p className="tg-section-text">Un restaurante que honra el tiempo, los lazos familiares y la tradición culinaria italiana.</p>
                            <p className="tg-section-text">Tres Generaciones nace de una herencia profunda: la pasión por la cocina transmitida de abuelo a padre, y de padre a hijo. Cada plato cuenta una historia, cada ingrediente es elegido con respeto, y cada vino celebra el arte de compartir</p>
                        </div>
                    </div>
                    <div className="tg-presentation__gallery">
                        <div className="tg-presentation__gallery-item tg-presentation__grid-1">
                            <img src={RESTAURANTS_IMAGES.TRES_GENERACIONES_2} alt="Tres Generaciones 1" />
                        </div>
                        <div className="tg-presentation__gallery-item tg-presentation__grid-2 tg-presentation__gallery-item--hover">
                            <img src={RESTAURANTS_IMAGES.TRES_GENERACIONES_1} alt="Tres Generaciones 2" />
                            <div className="tg-presentation__hover-overlay">
                                <div className="tg-presentation__hover-content">
                                    <p className="tg-presentation__hover-name">Ana Fourneaux, Primera mesera de Tres Generaciones</p>
                                    <p className="tg-presentation__hover-date">24 de diciembre de 1948</p>
                                </div>
                            </div>
                        </div>
                        <div className="tg-presentation__gallery-item tg-presentation__grid-3">
                            <img src={RESTAURANTS_IMAGES.TRES_GENERACIONES_3} alt="Tres Generaciones 3" />
                        </div>
                        <div className="tg-presentation__gallery-item tg-presentation__grid-4">
                            <img src={RESTAURANTS_IMAGES.TRES_GENERACIONES_4} alt="Tres Generaciones 4" />
                        </div>
                    </div>
                </div>
                <div className="tg-section-pair">
                    <div className="tg-presentation__content">
                        <div className="tg-presentation__header">
                            <img className="tg-hero__logo" src={isoLogoEstSvgUrl} alt="Tres Generaciones" />
                            <div className="tg-presentation__header-title">
                                <hr />
                                <h2 className="tg-section-title">Tres Generaciones</h2>
                                <hr />
                            </div>
                            <p className="tg-section-text">Italian Cuisine & Wine</p>
                        </div>
                    </div>
                    <div className="tg-grid">
                        <div className="tg-grid__item tg-grid__item--1">
                            <img src={RESTAURANTS_IMAGES.TRES_GENERACIONES_2} alt="Tres Generaciones 1" />
                        </div>
                        <div className="tg-grid__item tg-grid__item--2">
                            <img src={RESTAURANTS_IMAGES.TRES_GENERACIONES_1} alt="Tres Generaciones 2" />
                        </div>
                        <div className="tg-grid__item tg-grid__item--3">
                            <img src={RESTAURANTS_IMAGES.TRES_GENERACIONES_3} alt="Tres Generaciones 3" />
                        </div>
                        <div className="tg-grid__item tg-grid__item--4">
                            <img src={RESTAURANTS_IMAGES.TRES_GENERACIONES_4} alt="Tres Generaciones 4" />
                        </div>
                        <div className="tg-grid__item tg-grid__item--5">
                            <img src={RESTAURANTS_IMAGES.TRES_GENERACIONES_2} alt="Tres Generaciones 5" />
                        </div>
                        <div className="tg-grid__item tg-grid__item--6">
                            <img src={RESTAURANTS_IMAGES.TRES_GENERACIONES_1} alt="Tres Generaciones 6" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="tg-highlights">
                <div className="tg-highlight-grid">
                    <div className="tg-highlight__item tg-highlight__item--1">
                        <img src={RESTAURANTS_IMAGES.TRES_GENERACIONES_2} alt="Tres Generaciones plato" />
                    </div>
                    <div className="tg-highlight__item tg-highlight__item--2 tg-highlight__panel">
                        <h3 className="tg-highlight__title">Tradición italiana, corazón colombiano</h3>
                        <p className="tg-highlight__text">
                            Desde una pasta artesanal hecha a mano hasta un risotto que respeta los tiempos de cocción como si se tratara de un ritual, aquí todo sucede sin prisas. Nuestros chefs reinterpretan recetas clásicas italianas con ingredientes frescos, locales y de alta calidad, creando un menú que es familiar y sorprendente a la vez.
                        </p>
                    </div>
                    <div className="tg-highlight__item tg-highlight__item--3 tg-highlight__panel">
                        <h3 className="tg-highlight__title">Un lugar para celebrar lo esencial</h3>
                        <p className="tg-highlight__text">
                            El espacio ha sido diseñado para invitar a la conversación y al encuentro. Mesas amplias, iluminación cálida, una cava con vinos seleccionados cuidadosamente, y un equipo que entiende que la hospitalidad también es un arte. Ideal para cenas íntimas, almuerzos ejecutivos, celebraciones familiares o simplemente para detener el tiempo con una copa de vino.
                        </p>
                    </div>
                    <div className="tg-highlight__item tg-highlight__item--4">
                        <img src={RESTAURANTS_IMAGES.TRES_GENERACIONES_4} alt="Ambiente Tres Generaciones" />
                    </div>
                </div>
            </section>

            <section className="tg-experiences">
                <div className="tg-experiences__inner">
                    <div className="tg-experiences__content">
                        <p className="tg-experiences__subtitle">TRES GENERACIONES</p>
                        <div className="tg-experiences__title-container">
                            <img className="tg-hero__logo" src={isoTipoSvgUrl} alt="Tres Generaciones" />
                            <hr />
                            <h2 className="tg-experiences__title">Un menú con historia</h2>
                            <hr />
                            <img className="tg-hero__logo" src={isoTipoSvgUrl} alt="Tres Generaciones" />
                        </div>
                        <p className="tg-experiences__text">
                            En el corazón del restaurante, un detalle único: una hoja en blanco dentro del menú donde puedes dejar tu huella. Un mensaje, una dedicatoria, un recuerdo. Porque en Tres Generaciones, creemos que cada visita merece ser recordada.
                        </p>
                    </div>
                    <div className="tg-experiences__gallery">
                        <div className="tg-experiences__item tg-experiences__grid-1">
                            <img src={RESTAURANTS_IMAGES.TRES_GENERACIONES_1} alt="Tres Generaciones galería 1" />
                        </div>
                        <div className="tg-experiences__item tg-experiences__grid-2">
                            <img src={RESTAURANTS_IMAGES.TRES_GENERACIONES_2} alt="Tres Generaciones galería 2" />
                        </div>
                        <div className="tg-experiences__item tg-experiences__grid-3">
                            <img src={RESTAURANTS_IMAGES.TRES_GENERACIONES_3} alt="Tres Generaciones galería 3" />
                        </div>
                        <div className="tg-experiences__item tg-experiences__item--panel tg-experiences__grid-4">
                            <div className="tg-experiences__panel">
                                <img className="tg-experiences__panel-logo" src={isoLogoSvgUrl} alt="Tres Generaciones" />
                                <h3 className="tg-experiences__panel-title">Una experiencia que puedes escribir</h3>
                                <p className="tg-experiences__panel-text">
                                    En el corazón del restaurante, un detalle único: una hoja en blanco dentro del menú donde puedes dejar tu huella. Un mensaje, una dedicatoria, un recuerdo. Porque en Tres Generaciones, creemos que cada visita merece ser recordada.
                                </p>
                                <div className="tg-experiences__actions">
                                    <a href="#carta" className="tg-btn tg-btn--light" aria-label="Ver Carta">Ver Carta</a>
                                    <a href="#" className="tg-btn tg-btn--outline" aria-label="Reservar Mesa">Reservar Mesa</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TresGeneraciones;


