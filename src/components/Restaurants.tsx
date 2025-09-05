import React, { useEffect, useRef } from 'react';
import './Restaurants.css';
import galleryData from '../data/gallery.json';
import ScrollRestaurant from './ScrollRestaurant';
import { RESTAURANTS_IMAGES } from '../config/env';

declare global {
  interface HTMLDivElement {
    flickity?: any;
  }
}

const Restaurants: React.FC = () => {
  const galleryCarouselRef1 = useRef<HTMLDivElement>(null);
  const galleryCarouselRef2 = useRef<HTMLDivElement>(null);
  const galleryCarouselRef3 = useRef<HTMLDivElement>(null);

  const simpleCarouselRef1 = useRef<HTMLDivElement>(null);
  const simpleCarouselRef2 = useRef<HTMLDivElement>(null);
  const simpleCarouselRef3 = useRef<HTMLDivElement>(null);

  const carouselRef1 = useRef<HTMLDivElement>(null);
  const carouselRef2 = useRef<HTMLDivElement>(null);
  const carouselRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initFlickity = async (carouselRef: React.RefObject<HTMLDivElement | null>, options: any = {}) => {
      if (!carouselRef.current || galleryData.length === 0) return;

      try {
        const Flickity = (await import('flickity')).default;
        await import('flickity/css/flickity.css');

        if (carouselRef.current.flickity) {
          carouselRef.current.flickity.destroy();
        }

        const defaultOptions = {
          wrapAround: true,
          autoPlay: 3000,
          cellAlign: 'center',
          contain: false,
          pageDots: false,
          prevNextButtons: false,
          adaptiveHeight: true,
          draggable: false,
          selectedAttraction: 0.025,
          friction: 0.28,
          percentPosition: false,
          setGallerySize: true,
          ...options
        };

        const flickityInstance = new Flickity(carouselRef.current!, defaultOptions);

        setTimeout(() => {
          if (flickityInstance) {
            flickityInstance.resize();
          }
        }, 50);
      } catch (error) {
        console.error('Error al cargar Flickity:', error);
      }
    };

    const timer = setTimeout(() => {
      initFlickity(simpleCarouselRef1, { autoPlay: 3000 });
      initFlickity(simpleCarouselRef2, { autoPlay: 3500 });
      initFlickity(simpleCarouselRef3, { autoPlay: 4000 });
      initFlickity(galleryCarouselRef1, { autoPlay: 4000 });
      initFlickity(galleryCarouselRef2, { autoPlay: 5000 });
      initFlickity(galleryCarouselRef3, { autoPlay: 6000 });
      initFlickity(carouselRef1, { autoPlay: 4000 });
      initFlickity(carouselRef2, { autoPlay: 5000 });
      initFlickity(carouselRef3, { autoPlay: 6000 });
    }, 100);

    return () => {
      clearTimeout(timer);
      const refs = [simpleCarouselRef1, simpleCarouselRef2, simpleCarouselRef3, galleryCarouselRef1, galleryCarouselRef2, galleryCarouselRef3, carouselRef1, carouselRef2, carouselRef3];
      refs.forEach(ref => {
        if (ref.current && ref.current.flickity) {
          ref.current.flickity.destroy();
        }
      });
    };
  }, []);

  const restaurantData = [
    {
      title: "Tres Generaciones",
      description: "Sabores que cuentan historias, una tradición que une generaciones. Cocina italiana de autor en un ambiente sofisticado.",
      items: [
        { src: RESTAURANTS_IMAGES.TRES_GENERACIONES_1, alt: "Tres Generaciones - Imagen 1" },
        { src: RESTAURANTS_IMAGES.TRES_GENERACIONES_2, alt: "Tres Generaciones - Imagen 2" },
        { src: RESTAURANTS_IMAGES.TRES_GENERACIONES_3, alt: "Tres Generaciones - Imagen 3" }
      ]
    },
    {
      title: "V-Coffee",
      description: "Una terraza casual con coctelería y sabores locales, pensados para hacer de cada visita un momento inolvidable.",
      items: [
        { src: RESTAURANTS_IMAGES.V_COFFEE_1, alt: "V-Coffee - Imagen 1" },
        { src: RESTAURANTS_IMAGES.V_COFFEE_2, alt: "V-Coffee - Imagen 2" },
        { src: RESTAURANTS_IMAGES.V_COFFEE_3, alt: "V-Coffee - Imagen 3" }
      ]
    },
    {
      title: "ROOFTOP",
      description: "Sabores que cuentan historias, una tradición que une generaciones. Cocina italiana de autor en un ambiente sofisticado.",
      items: [
        { src: RESTAURANTS_IMAGES.ROOFTOP_1, alt: "ROOFTOP - Imagen 1" },
        { src: RESTAURANTS_IMAGES.ROOFTOP_2, alt: "ROOFTOP - Imagen 2" },
        { src: RESTAURANTS_IMAGES.ROOFTOP_3, alt: "ROOFTOP - Imagen 3" }
      ]
    }
  ];

  return (
    <div className="restaurants-container">
      <div className="restaurants-sections-wrapper">
        <ScrollRestaurant restaurantData={restaurantData} simpleCarouselRef1={simpleCarouselRef1} simpleCarouselRef2={simpleCarouselRef2} simpleCarouselRef3={simpleCarouselRef3} />
      </div>
    </div>
  );
};

export default Restaurants;
