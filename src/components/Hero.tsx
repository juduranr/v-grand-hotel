import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES_BASE_URL } from '../config/env';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showHighQuality, setShowHighQuality] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const highQualityVideoRef = useRef<HTMLVideoElement>(null);

  const secondWords = ["WELCOME", "GRAND", "MEDELLÍN"];

  // URLs de los videos
  const lightVideoUrl = `${IMAGES_BASE_URL}hero/Video-Header_WebM.webm`;
  const highQualityVideoUrl = `${IMAGES_BASE_URL}hero/Video-Header_HQ.mp4`;

  // Efecto para cargar el video de alta calidad después del ligero
  useEffect(() => {
    if (videoLoaded && highQualityVideoRef.current) {
      // Precargar el video de alta calidad
      highQualityVideoRef.current.load();
      
      // Cuando el video de alta calidad esté listo, mostrarlo
      const handleHighQualityCanPlay = () => {
        setShowHighQuality(true);
        if (videoRef.current && highQualityVideoRef.current) {
          // Sincronizar el tiempo de reproducción
          highQualityVideoRef.current.currentTime = videoRef.current.currentTime;
          highQualityVideoRef.current.play();
        }
      };

      highQualityVideoRef.current.addEventListener('canplaythrough', handleHighQualityCanPlay);
      
      return () => {
        if (highQualityVideoRef.current) {
          highQualityVideoRef.current.removeEventListener('canplaythrough', handleHighQualityCanPlay);
        }
      };
    }
  }, [videoLoaded]);

  const handleScrollDown = () => {
    if (descriptionRef.current) {
      descriptionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    if (!titleRef.current || !heroRef.current || !shadowRef.current) return;

    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      },
      y: "50vh",
      fontSize: "4rem",
      ease: "none"
    });

    gsap.to(shadowRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      },
      y: "-150vh",
      height: "150vh",
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__background">
        <video 
          ref={videoRef}
          className={`hero__video ${showHighQuality ? 'hero__video--hidden' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          onError={(e) => console.error('Error loading light video:', e)}
        >
          <source src={lightVideoUrl} type="video/webm" />
        </video>
        <video 
          ref={highQualityVideoRef}
          className={`hero__video ${!showHighQuality ? 'hero__video--hidden' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => console.error('Error loading high quality video:', e)}
        >
          <source src={highQualityVideoUrl} type="video/mp4" />
        </video>
        <div className="hero__scroll-button">
          <div className="hero__scroll-pulse"></div>
          <button className="hero__scroll-btn" aria-label="Desplazarse hacia abajo" onClick={handleScrollDown}>
            <svg 
              className="hero__scroll-arrow" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M7 10L12 15L17 10" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <h2 className="hero__title" ref={titleRef}>
        <span className="hero__title-fixed">FEEL</span>
        <span className="hero__title-changing">
          <span>WELCOME</span>
          <span>GRAND</span>
          <span>MEDELLÍN</span>
        </span>
      </h2>
      <div className="hero__shadow" ref={shadowRef}></div>
      <div className="hero__description" ref={descriptionRef}>
        <div className="hero__description-content">
          <p className="hero__description-text">
            Descubre un oasis de bienestar donde cada detalle está diseñado para que te sientas renovado, relajado y completamente cuidado. Tu bienestar es nuestra prioridad.
          </p>
          <p className="hero__description-text">
            Nuestro hotel combina elegancia contemporánea con servicios de bienestar de primera clase, creando una experiencia única que nutre tu cuerpo, mente y espíritu.
          </p>
          <p className="hero__description-text">
            Desde tratamientos spa personalizados hasta espacios de meditación serenos, cada momento está diseñado para promover tu salud integral y bienestar general.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
