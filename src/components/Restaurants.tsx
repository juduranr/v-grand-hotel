import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Restaurants.css';
import galleryData from '../data/gallery.json';
import { Button } from './ui/button';
import { ArrowRight } from "@icon-park/react";

const Restaurants: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef1 = useRef<HTMLDivElement>(null);
  const carouselRef2 = useRef<HTMLDivElement>(null);
  const carouselRef3 = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    // Inicializar Flickity para los carruseles
    const initFlickity = async (carouselRef: React.RefObject<HTMLDivElement | null>, options: any = {}) => {
      if (!carouselRef.current || galleryData.length === 0) return;

      try {
        const Flickity = (await import('flickity')).default;
        await import('flickity/css/flickity.css');
        
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
        
        new Flickity(carouselRef.current!, defaultOptions);
      } catch (error) {
        console.error('Error al cargar Flickity:', error);
      }
    };

    // Inicializar los carruseles
    initFlickity(carouselRef1, { autoPlay: 4000 });
    initFlickity(carouselRef2, { autoPlay: 5000 });
    initFlickity(carouselRef3, { autoPlay: 6000 });
  }, []);

  const restaurantData = [
    {
      title: "Tres Generaciones",
      description: "Sabores que cuentan historias, una tradición que une generaciones. Cocina italiana de autor en un ambiente sofisticado.",
      items: galleryData
    },
    {
      title: "V-Coffee",
      description: "Una terraza casual con coctelería y sabores locales, pensados para hacer de cada visita un momento inolvidable.",
      items: galleryData
    },
    {
      title: "ROOFTOP",
      description: "Sabores que cuentan historias, una tradición que une generaciones. Cocina italiana de autor en un ambiente sofisticado.",
      items: galleryData
    }
  ];



  return (
    <div className="restaurants-container" ref={containerRef} tabIndex={0}>
      {/* Primera sección - Restaurante Principal */}
      <section className="restaurants-section">
        <div className="restaurants-content">
          <p className="restaurants-subtitle" data-parallax>GASTRONOMÍA</p>
          <div className="restaurants-title-container" data-parallax>
          <svg width="32" height="35" viewBox="0 0 292 323" fill="none" xmlns="http://www.w3.org/2000/svg" className="v-hotel-logo">
            <path d="M247.337 6.20131C259.826 3.88532 272.352 3.54913 286 6.64957C268.762 12.7757 265.547 28.39 259.414 41.8377C252.123 57.8629 244.233 73.5518 234.25 88.0828C228.043 97.0853 221.2 105.565 212.525 112.289C194.727 126.073 178.499 124.055 164.589 106.461C156.998 96.8611 151.651 85.9536 146.865 74.7845C141.967 63.2419 137.443 51.5126 132.507 39.97C128.88 31.4904 124.954 23.0856 118.971 16.0256C114.073 10.2356 107.753 6.68693 100.088 10.2356C92.0863 13.9711 90.1419 20.8817 91.8246 29.2118C93.6194 38.0275 98.1438 45.5358 102.743 53.0441C118.373 78.4079 136.508 101.979 154.605 125.512C189.38 170.749 195.923 219.31 174.909 272.017C172.89 277.06 171.17 282.215 169.338 287.333C164.676 300.531 167.58 310.816 178.05 318.188C156.213 323.641 153.259 322.334 144.809 303.694C104.313 214.117 63.7434 124.578 23.3603 34.9271C18.3124 23.758 13.5262 12.701 1 6.23867C16.8915 6.23867 32.783 6.16396 48.6745 6.16396C33.6804 12.9252 36.4848 22.488 41.8318 34.2547C79.5601 117.257 116.84 200.52 154.306 283.635C155.951 287.295 157.933 290.844 160.252 295.439C185.715 240.453 193.867 187.372 155.764 135.523C138.415 111.915 121.364 88.1201 104.463 64.1758C97.2464 53.9406 90.3663 43.2945 87.5619 30.7807C83.8227 14.0832 90.142 5.08067 107.006 2.57791C127.235 -0.44782 142.079 8.4426 150.567 28.4274C157.335 44.3778 159.354 61.5236 163.392 78.1464C165.449 86.7007 167.73 95.2175 171.88 103.025C179.471 117.332 190.053 120.395 204.224 112.438C213.946 106.984 221.013 98.6542 227.482 89.8385C239.933 72.8794 249.356 54.1647 257.62 34.9271C264.238 19.5743 262.107 14.7182 247.412 6.23867" fill="currentColor"/>
          </svg>
          <hr />
          <h1 className="restaurants-title">{restaurantData[0].title}</h1>
          <hr />
          <svg width="32" height="35" viewBox="0 0 292 323" fill="none" xmlns="http://www.w3.org/2000/svg" className="v-hotel-logo">
            <path d="M247.337 6.20131C259.826 3.88532 272.352 3.54913 286 6.64957C268.762 12.7757 265.547 28.39 259.414 41.8377C252.123 57.8629 244.233 73.5518 234.25 88.0828C228.043 97.0853 221.2 105.565 212.525 112.289C194.727 126.073 178.499 124.055 164.589 106.461C156.998 96.8611 151.651 85.9536 146.865 74.7845C141.967 63.2419 137.443 51.5126 132.507 39.97C128.88 31.4904 124.954 23.0856 118.971 16.0256C114.073 10.2356 107.753 6.68693 100.088 10.2356C92.0863 13.9711 90.1419 20.8817 91.8246 29.2118C93.6194 38.0275 98.1438 45.5358 102.743 53.0441C118.373 78.4079 136.508 101.979 154.605 125.512C189.38 170.749 195.923 219.31 174.909 272.017C172.89 277.06 171.17 282.215 169.338 287.333C164.676 300.531 167.58 310.816 178.05 318.188C156.213 323.641 153.259 322.334 144.809 303.694C104.313 214.117 63.7434 124.578 23.3603 34.9271C18.3124 23.758 13.5262 12.701 1 6.23867C16.8915 6.23867 32.783 6.16396 48.6745 6.16396C33.6804 12.9252 36.4848 22.488 41.8318 34.2547C79.5601 117.257 116.84 200.52 154.306 283.635C155.951 287.295 157.933 290.844 160.252 295.439C185.715 240.453 193.867 187.372 155.764 135.523C138.415 111.915 121.364 88.1201 104.463 64.1758C97.2464 53.9406 90.3663 43.2945 87.5619 30.7807C83.8227 14.0832 90.142 5.08067 107.006 2.57791C127.235 -0.44782 142.079 8.4426 150.567 28.4274C157.335 44.3778 159.354 61.5236 163.392 78.1464C165.449 86.7007 167.73 95.2175 171.88 103.025C179.471 117.332 190.053 120.395 204.224 112.438C213.946 106.984 221.013 98.6542 227.482 89.8385C239.933 72.8794 249.356 54.1647 257.62 34.9271C264.238 19.5743 262.107 14.7182 247.412 6.23867" fill="currentColor"/>
          </svg>
          </div>
          <div className="restaurants-carousel-container" data-parallax>
            <div ref={carouselRef1} className="restaurants-gallery js-flickity">
              {restaurantData[0].items.map((item, index) => (
                <div key={`carousel1-${index}`} className="restaurants-gallery-cell">
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
          <div className='restaurants-description-container' data-parallax>
            <p className="restaurants-description">{restaurantData[0].description}</p>
            <Button variant="link" className="restaurants-description-button">
              Explora {restaurantData[0].title}<ArrowRight />
            </Button>
          </div>
        </div>
      </section>

      {/* Segunda sección - Bar Lounge */}
      <section className="restaurants-section">
        <div className="restaurants-content">
          <p className="restaurants-subtitle" data-parallax>GASTRONOMÍA</p>
          <div className="restaurants-title-container" data-parallax>
          <svg width="32" height="35" viewBox="0 0 292 323" fill="none" xmlns="http://www.w3.org/2000/svg" className="v-hotel-logo">
            <path d="M247.337 6.20131C259.826 3.88532 272.352 3.54913 286 6.64957C268.762 12.7757 265.547 28.39 259.414 41.8377C252.123 57.8629 244.233 73.5518 234.25 88.0828C228.043 97.0853 221.2 105.565 212.525 112.289C194.727 126.073 178.499 124.055 164.589 106.461C156.998 96.8611 151.651 85.9536 146.865 74.7845C141.967 63.2419 137.443 51.5126 132.507 39.97C128.88 31.4904 124.954 23.0856 118.971 16.0256C114.073 10.2356 107.753 6.68693 100.088 10.2356C92.0863 13.9711 90.1419 20.8817 91.8246 29.2118C93.6194 38.0275 98.1438 45.5358 102.743 53.0441C118.373 78.4079 136.508 101.979 154.605 125.512C189.38 170.749 195.923 219.31 174.909 272.017C172.89 277.06 171.17 282.215 169.338 287.333C164.676 300.531 167.58 310.816 178.05 318.188C156.213 323.641 153.259 322.334 144.809 303.694C104.313 214.117 63.7434 124.578 23.3603 34.9271C18.3124 23.758 13.5262 12.701 1 6.23867C16.8915 6.23867 32.783 6.16396 48.6745 6.16396C33.6804 12.9252 36.4848 22.488 41.8318 34.2547C79.5601 117.257 116.84 200.52 154.306 283.635C155.951 287.295 157.933 290.844 160.252 295.439C185.715 240.453 193.867 187.372 155.764 135.523C138.415 111.915 121.364 88.1201 104.463 64.1758C97.2464 53.9406 90.3663 43.2945 87.5619 30.7807C83.8227 14.0832 90.142 5.08067 107.006 2.57791C127.235 -0.44782 142.079 8.4426 150.567 28.4274C157.335 44.3778 159.354 61.5236 163.392 78.1464C165.449 86.7007 167.73 95.2175 171.88 103.025C179.471 117.332 190.053 120.395 204.224 112.438C213.946 106.984 221.013 98.6542 227.482 89.8385C239.933 72.8794 249.356 54.1647 257.62 34.9271C264.238 19.5743 262.107 14.7182 247.412 6.23867" fill="currentColor"/>
          </svg>
          <hr />
          <h1 className="restaurants-title">{restaurantData[1].title}</h1>
          <hr />
          <svg width="32" height="35" viewBox="0 0 292 323" fill="none" xmlns="http://www.w3.org/2000/svg" className="v-hotel-logo">
            <path d="M247.337 6.20131C259.826 3.88532 272.352 3.54913 286 6.64957C268.762 12.7757 265.547 28.39 259.414 41.8377C252.123 57.8629 244.233 73.5518 234.25 88.0828C228.043 97.0853 221.2 105.565 212.525 112.289C194.727 126.073 178.499 124.055 164.589 106.461C156.998 96.8611 151.651 85.9536 146.865 74.7845C141.967 63.2419 137.443 51.5126 132.507 39.97C128.88 31.4904 124.954 23.0856 118.971 16.0256C114.073 10.2356 107.753 6.68693 100.088 10.2356C92.0863 13.9711 90.1419 20.8817 91.8246 29.2118C93.6194 38.0275 98.1438 45.5358 102.743 53.0441C118.373 78.4079 136.508 101.979 154.605 125.512C189.38 170.749 195.923 219.31 174.909 272.017C172.89 277.06 171.17 282.215 169.338 287.333C164.676 300.531 167.58 310.816 178.05 318.188C156.213 323.641 153.259 322.334 144.809 303.694C104.313 214.117 63.7434 124.578 23.3603 34.9271C18.3124 23.758 13.5262 12.701 1 6.23867C16.8915 6.23867 32.783 6.16396 48.6745 6.16396C33.6804 12.9252 36.4848 22.488 41.8318 34.2547C79.5601 117.257 116.84 200.52 154.306 283.635C155.951 287.295 157.933 290.844 160.252 295.439C185.715 240.453 193.867 187.372 155.764 135.523C138.415 111.915 121.364 88.1201 104.463 64.1758C97.2464 53.9406 90.3663 43.2945 87.5619 30.7807C83.8227 14.0832 90.142 5.08067 107.006 2.57791C127.235 -0.44782 142.079 8.4426 150.567 28.4274C157.335 44.3778 159.354 61.5236 163.392 78.1464C165.449 86.7007 167.73 95.2175 171.88 103.025C179.471 117.332 190.053 120.395 204.224 112.438C213.946 106.984 221.013 98.6542 227.482 89.8385C239.933 72.8794 249.356 54.1647 257.62 34.9271C264.238 19.5743 262.107 14.7182 247.412 6.23867" fill="currentColor"/>
          </svg>
          </div>
          <div className="restaurants-carousel-container" data-parallax>
            <div ref={carouselRef2} className="restaurants-gallery js-flickity">
              {restaurantData[1].items.map((item, index) => (
                <div key={`carousel2-${index}`} className="restaurants-gallery-cell">
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
          <div className='restaurants-description-container' data-parallax>
            <p className="restaurants-description">{restaurantData[1].description}</p>
            <Button variant="link" className="restaurants-description-button">
              Explora {restaurantData[1].title}<ArrowRight />
            </Button>
          </div>
        </div>
      </section>

      {/* Tercera sección - Restaurante de Especialidades */}
      <section className="restaurants-section">
        <div className="restaurants-content">
          <p className="restaurants-subtitle">GASTRONOMÍA</p>
          <div className="restaurants-title-container">
          <svg width="32" height="35" viewBox="0 0 292 323" fill="none" xmlns="http://www.w3.org/2000/svg" className="v-hotel-logo">
            <path d="M247.337 6.20131C259.826 3.88532 272.352 3.54913 286 6.64957C268.762 12.7757 265.547 28.39 259.414 41.8377C252.123 57.8629 244.233 73.5518 234.25 88.0828C228.043 97.0853 221.2 105.565 212.525 112.289C194.727 126.073 178.499 124.055 164.589 106.461C156.998 96.8611 151.651 85.9536 146.865 74.7845C141.967 63.2419 137.443 51.5126 132.507 39.97C128.88 31.4904 124.954 23.0856 118.971 16.0256C114.073 10.2356 107.753 6.68693 100.088 10.2356C92.0863 13.9711 90.1419 20.8817 91.8246 29.2118C93.6194 38.0275 98.1438 45.5358 102.743 53.0441C118.373 78.4079 136.508 101.979 154.605 125.512C189.38 170.749 195.923 219.31 174.909 272.017C172.89 277.06 171.17 282.215 169.338 287.333C164.676 300.531 167.58 310.816 178.05 318.188C156.213 323.641 153.259 322.334 144.809 303.694C104.313 214.117 63.7434 124.578 23.3603 34.9271C18.3124 23.758 13.5262 12.701 1 6.23867C16.8915 6.23867 32.783 6.16396 48.6745 6.16396C33.6804 12.9252 36.4848 22.488 41.8318 34.2547C79.5601 117.257 116.84 200.52 154.306 283.635C155.951 287.295 157.933 290.844 160.252 295.439C185.715 240.453 193.867 187.372 155.764 135.523C138.415 111.915 121.364 88.1201 104.463 64.1758C97.2464 53.9406 90.3663 43.2945 87.5619 30.7807C83.8227 14.0832 90.142 5.08067 107.006 2.57791C127.235 -0.44782 142.079 8.4426 150.567 28.4274C157.335 44.3778 159.354 61.5236 163.392 78.1464C165.449 86.7007 167.73 95.2175 171.88 103.025C179.471 117.332 190.053 120.395 204.224 112.438C213.946 106.984 221.013 98.6542 227.482 89.8385C239.933 72.8794 249.356 54.1647 257.62 34.9271C264.238 19.5743 262.107 14.7182 247.412 6.23867" fill="currentColor"/>
          </svg>
          <hr />
          <h1 className="restaurants-title">{restaurantData[2].title}</h1>
          <hr />
          <svg width="32" height="35" viewBox="0 0 292 323" fill="none" xmlns="http://www.w3.org/2000/svg" className="v-hotel-logo">
            <path d="M247.337 6.20131C259.826 3.88532 272.352 3.54913 286 6.64957C268.762 12.7757 265.547 28.39 259.414 41.8377C252.123 57.8629 244.233 73.5518 234.25 88.0828C228.043 97.0853 221.2 105.565 212.525 112.289C194.727 126.073 178.499 124.055 164.589 106.461C156.998 96.8611 151.651 85.9536 146.865 74.7845C141.967 63.2419 137.443 51.5126 132.507 39.97C128.88 31.4904 124.954 23.0856 118.971 16.0256C114.073 10.2356 107.753 6.68693 100.088 10.2356C92.0863 13.9711 90.1419 20.8817 91.8246 29.2118C93.6194 38.0275 98.1438 45.5358 102.743 53.0441C118.373 78.4079 136.508 101.979 154.605 125.512C189.38 170.749 195.923 219.31 174.909 272.017C172.89 277.06 171.17 282.215 169.338 287.333C164.676 300.531 167.58 310.816 178.05 318.188C156.213 323.641 153.259 322.334 144.809 303.694C104.313 214.117 63.7434 124.578 23.3603 34.9271C18.3124 23.758 13.5262 12.701 1 6.23867C16.8915 6.23867 32.783 6.16396 48.6745 6.16396C33.6804 12.9252 36.4848 22.488 41.8318 34.2547C79.5601 117.257 116.84 200.52 154.306 283.635C155.951 287.295 157.933 290.844 160.252 295.439C185.715 240.453 193.867 187.372 155.764 135.523C138.415 111.915 121.364 88.1201 104.463 64.1758C97.2464 53.9406 90.3663 43.2945 87.5619 30.7807C83.8227 14.0832 90.142 5.08067 107.006 2.57791C127.235 -0.44782 142.079 8.4426 150.567 28.4274C157.335 44.3778 159.354 61.5236 163.392 78.1464C165.449 86.7007 167.73 95.2175 171.88 103.025C179.471 117.332 190.053 120.395 204.224 112.438C213.946 106.984 221.013 98.6542 227.482 89.8385C239.933 72.8794 249.356 54.1647 257.62 34.9271C264.238 19.5743 262.107 14.7182 247.412 6.23867" fill="currentColor"/>
          </svg>
          </div>
          <div className="restaurants-carousel-container">
            <div ref={carouselRef3} className="restaurants-gallery js-flickity">
              {restaurantData[2].items.map((item, index) => (
                <div key={`carousel3-${index}`} className="restaurants-gallery-cell">
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
          <div className='restaurants-description-container'>
            <p className="restaurants-description">{restaurantData[2].description}</p>
            <Button variant="link" className="restaurants-description-button">
              Explora {restaurantData[2].title}<ArrowRight />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Restaurants;
