import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { IMAGES_BASE_URL } from '../config/env';
import vHotelLogo from "../assets/images/v-hotel.svg";
import './Hero.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero: React.FC = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showHighQuality, setShowHighQuality] = useState(false);

  const secondWords = ["WELCOME", "GRAND", "MEDELLÍN"];

  // URLs de los videos
  const lightVideoUrl = `${IMAGES_BASE_URL}hero/Video-Header_WebM.webm`;
  const highQualityVideoUrl = `${IMAGES_BASE_URL}hero/Video-Header_HQ.mp4`;

  // Efecto para cargar el video de alta calidad después del ligero
  useEffect(() => {
    const lightVideo = document.querySelector('.hero__video--light') as HTMLVideoElement;
    const highQualityVideo = document.querySelector('.hero__video--high-quality') as HTMLVideoElement;
    
    if (videoLoaded && highQualityVideo) {
      // Precargar el video de alta calidad
      highQualityVideo.load();
      
      // Cuando el video de alta calidad esté listo, mostrarlo
      const handleHighQualityCanPlay = () => {
        setShowHighQuality(true);
        if (lightVideo && highQualityVideo) {
          // Sincronizar el tiempo de reproducción
          highQualityVideo.currentTime = lightVideo.currentTime;
          highQualityVideo.play();
        }
      };

      highQualityVideo.addEventListener('canplaythrough', handleHighQualityCanPlay);
      
      return () => {
        if (highQualityVideo) {
          highQualityVideo.removeEventListener('canplaythrough', handleHighQualityCanPlay);
        }
      };
    }
  }, [videoLoaded]);

  const handleScrollDown = () => {
    const descriptionElement = document.querySelector('.hero__description');
    if (descriptionElement) {
      descriptionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {

    const words = gsap.utils.toArray(".hero__word");
    const splits = words.map((word) => new SplitText(word as HTMLElement, { type: "chars" }));
    const firstSplit = splits[0];
    const duration = 0.8;
    const pause = 2;
    const tl = gsap.timeline({
      repeat: -1
    });

    // Set initial positions - only first word visible
    splits.forEach((split, i) => {
      if (i) {
        gsap.set(split.chars, { yPercent: 100 });
      }
    });

    // Create the animation sequence
    splits.forEach((split, i) => {
      const next = splits[i + 1];
      
      // Animate current word out
      tl.to(
        split.chars,
        {
          yPercent: -100,
          duration: duration,
          ease: "power1.inOut"
        },
        "+=" + pause
      );
      
      // Animate next word in (if exists)
      if (next) {
        tl.to(
          next.chars,
          {
            duration: duration,
            yPercent: 0,
            ease: "power1.inOut"
          },
          "<"
        );
      }
    });
    
    // Finally, animate the first word back in to complete the cycle
    tl.fromTo(
      firstSplit.chars,
      {
        yPercent: 100
      },
      {
        duration: duration,
        yPercent: 0,
        ease: "power1.inOut",
        immediateRender: false
      },
      "<"
    );

    // ScrollTrigger animations - Solo overlay/sombra

    gsap.to(".hero__shadow", {
      scrollTrigger: {
        trigger: ".hero__description",
        start: "top bottom",
        end: "top top",
        scrub: true
      },
      y: "-100vh",
      height: "100vh"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section className="hero">
      <div className="hero__background">
        <video 
          className={`hero__video hero__video--light ${showHighQuality ? 'hero__video--hidden' : ''}`}
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
          className={`hero__video hero__video--high-quality ${!showHighQuality ? 'hero__video--hidden' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => console.error('Error loading high quality video:', e)}
        >
          <source src={highQualityVideoUrl} type="video/mp4" />
        </video>
        
        <div className="hero__title-wrapper">
          <div className="hero__title-content">
            <div className="hero__title-fixed">
              FEEL&nbsp;
            </div>
            <div className="hero__words-container">
              <div className="hero__word">WELCOME</div>
              <div className="hero__word">GRAND</div>
              <div className="hero__word">MEDELLÍN</div>
            </div>
          </div>
        </div>
        
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
      <div className="hero__shadow"></div>
      <div className="hero__description">
        <div className="hero__description-content">
          <img src={vHotelLogo.src} alt="V Grand" />
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
