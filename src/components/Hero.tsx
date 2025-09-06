import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { IMAGES_BASE_URL } from '../config/env';
import vHotelLogo from "../assets/images/v-hotel.svg";
import './Hero.css';

gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin);

const Hero: React.FC = () => {
  const secondWords = ["WELCOME", "GRAND", "MEDELLÍN"];

  const videoUrl = `${IMAGES_BASE_URL}hero/Video-Header_WebM.webm`;

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

    splits.forEach((split, i) => {
      if (i) {
        gsap.set(split.chars, { yPercent: 100 });
      }
    });

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

    const scrollItem = document.querySelector('.scrollItem');
    const scrollPositionTwo = document.querySelector('.scrollPositionTwo');
    
    if (scrollItem && scrollPositionTwo) {
      const scrollItemRect = scrollItem.getBoundingClientRect();
      const scrollPositionTwoRect = scrollPositionTwo.getBoundingClientRect();
      
      // Calcular la diferencia en el eje Y considerando el cambio de font-size
      // Determinar el tamaño final basado en el tamaño de pantalla
      let finalFontSize = 64;
      let initialFontSize = 96;
      
      if (window.innerWidth <= 480) {
        finalFontSize = 32;
        initialFontSize = 48;
      } else if (window.innerWidth <= 768) {
        finalFontSize = 48;
        initialFontSize = 64;
      }
      
      const scaleFactor = finalFontSize / initialFontSize;
      const finalHeight = scrollItemRect.height * scaleFactor;
      
      // El título debe terminar 16px antes del bottom del elemento final
      const deltaY = (scrollPositionTwoRect.bottom - finalHeight - 16) - scrollItemRect.top;
      
      gsap.timeline({
        scrollTrigger: {
          trigger: ".hero__description",
          start: "top-=50% center",
          end: "top top",
          scrub: 1,
          onStart: () => {
            scrollItem.parentElement?.classList.add('animating');
          },
          onComplete: () => {
            scrollItem.parentElement?.classList.remove('animating');
          }
        },
      }).to(scrollItem, {
        y: deltaY,
        fontSize: `${finalFontSize}px`,
        duration: 1,
        ease: "power2.inOut"
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section className="hero">
      <div className="hero__background">
        <video 
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => console.error('Error loading video:', e)}
        >
          <source src={videoUrl} type="video/webm" />
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
      
      <div className="hero__title-wrapper">
        <div className="hero__title-content scrollItem">
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
      
      <div className="hero__shadow"></div>
      <div className="hero__description">
        <div className="hero__description-content">
        <div className="title__last__position scrollPositionTwo">
        </div>
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
