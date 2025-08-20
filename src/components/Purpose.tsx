import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import vHotelLogo from "../assets/images/v-hotel.svg";
import grandHotelLogo from "../assets/images/grand-hotel.svg";
import purposeGallery1 from "../assets/images/purpose-gallery-1.webp";
import purposeGallery2 from "../assets/images/purpose-gallery-2.webp";
import purposeGallery3 from "../assets/images/purpose-gallery-3.webp";
import LogosCarousel from "./LogosCarousel";
import "./Purpose.css";

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Purpose: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const galleryImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const purposeDescriptionRef = useRef<HTMLDivElement>(null);
  const pillarsDescriptionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState({
    title: 0,
    presentationDescription: 0,
    purposeDescription: 0,
    pillarsDescription: 0
  });

  useEffect(() => {
    // Configurar GSAP

    // Función para crear el efecto de revelación de texto para títulos
    const createTitleReveal = (element: HTMLElement) => {
      // Crear un wrapper para el texto
      const textContent = element.textContent || '';
      element.innerHTML = '';
      
      // Agregar clase para flexbox
      element.classList.add('text-reveal-container');
      
      // Dividir por palabras en lugar de caracteres
      const words = textContent.split(' ');
      const wordSpans: HTMLElement[] = [];
      
      words.forEach((word, wordIndex) => {
        // Crear un span para cada palabra
        const wordSpan = document.createElement('span');
        wordSpan.className = 'text-word';
        
        // Crear spans para cada carácter dentro de la palabra
        const chars = word.split('').map(char => {
          const charSpan = document.createElement('span');
          charSpan.textContent = char;
          charSpan.className = 'text-char-title';
          return charSpan;
        });
        
        // Agregar los caracteres a la palabra
        chars.forEach(charSpan => wordSpan.appendChild(charSpan));
        wordSpans.push(wordSpan);
        
        // Agregar la palabra al elemento
        element.appendChild(wordSpan);
        
        // Agregar espacio entre palabras (excepto después de la última)
        if (wordIndex < words.length - 1) {
          const spaceSpan = document.createElement('span');
          spaceSpan.textContent = '\u00A0';
          spaceSpan.className = 'text-space';
          element.appendChild(spaceSpan);
        }
      });
      
      // Animar todos los caracteres con ScrollTrigger
      const allChars = Array.from(element.querySelectorAll('.text-char-title'));
      
      // Configurar la animación inicial - letras invisibles
      gsap.set(allChars, {
        opacity: 0,
        x: -20
      });
      
      // Animar con ScrollTrigger - letras aparecen una por una
      gsap.to(allChars, {
        opacity: 1,
        x: 0,
        ease: "power2.out",
        stagger: 0.03,
        scrollTrigger: {
          trigger: element,
          scrub: 1,
          start: "top center",
          end: "bottom center"
        }
      });
    };

    // Función para crear el efecto de gradiente para descripciones
    const createDescriptionReveal = (element: HTMLElement) => {
      // Crear un wrapper para el texto
      const textContent = element.textContent || '';
      element.innerHTML = '';
      
      // Agregar clase para flexbox
      element.classList.add('text-reveal-container');
      
      // Dividir por palabras en lugar de caracteres
      const words = textContent.split(' ');
      const wordSpans: HTMLElement[] = [];
      
      words.forEach((word, wordIndex) => {
        // Crear un span para cada palabra
        const wordSpan = document.createElement('span');
        wordSpan.className = 'text-word';
        
        // Crear spans para cada carácter dentro de la palabra
        const chars = word.split('').map(char => {
          const charSpan = document.createElement('span');
          charSpan.textContent = char;
          charSpan.className = 'text-char-description';
          return charSpan;
        });
        
        // Agregar los caracteres a la palabra
        chars.forEach(charSpan => wordSpan.appendChild(charSpan));
        wordSpans.push(wordSpan);
        
        // Agregar la palabra al elemento
        element.appendChild(wordSpan);
        
        // Agregar espacio entre palabras (excepto después de la última)
        if (wordIndex < words.length - 1) {
          const spaceSpan = document.createElement('span');
          spaceSpan.textContent = '\u00A0';
          spaceSpan.className = 'text-space';
          element.appendChild(spaceSpan);
        }
      });
      
      // Animar todos los caracteres con ScrollTrigger
      const allChars = Array.from(element.querySelectorAll('.text-char-description'));
      
      // Configurar la animación inicial
      gsap.set(allChars, {
        backgroundPositionX: '100%'
      });
      
      // Animar con ScrollTrigger
      gsap.to(allChars, {
        backgroundPositionX: '0%',
        ease: "none",
        stagger: 0.01,
        scrollTrigger: {
          trigger: element,
          scrub: 1,
          start: "top center",
          end: "bottom center"
        }
      });
    };

          // Aplicar la animación a los títulos
      const titleElements = document.querySelectorAll('.purpose__content-title');
      titleElements.forEach((title) => {
        createTitleReveal(title as HTMLElement);
      });
      
      // Aplicar la animación a las descripciones
      if (purposeDescriptionRef.current) {
        createDescriptionReveal(purposeDescriptionRef.current);
      }
      
      if (pillarsDescriptionRef.current) {
        createDescriptionReveal(pillarsDescriptionRef.current);
      }

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const purposeRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calcular progreso para el título
      const titleProgress = Math.max(0, Math.min(1, (windowHeight - purposeRect.top) / windowHeight));

      setScrollProgress(prev => ({
        ...prev,
        title: titleProgress
      }));

      // Aplicar efecto parallax a las imágenes de la galería
      galleryImagesRef.current.forEach((imgRef, index) => {
        if (imgRef) {
          const imgRect = imgRef.getBoundingClientRect();
          const imgCenterY = imgRect.top + imgRect.height / 2;
          const distanceFromCenter = windowHeight / 2 - imgCenterY;
          
          // Calcular la velocidad de parallax (diferente para cada imagen)
          const parallaxSpeed = 0.3 + (index * 0.1);
          let translateY = distanceFromCenter * parallaxSpeed;
          
          // Limitar la transformación a un máximo de 200px en ambas direcciones
          const maxTranslate = 200;
          translateY = Math.max(-maxTranslate, Math.min(maxTranslate, translateY));
          
          imgRef.style.transform = `translateY(${translateY}px)`;
        }
      });

      // Aplicar animación al título
      if (titleRef.current) {
        const translateY = -50 + titleProgress * 50;
        const opacity = titleProgress;

        titleRef.current.style.transform = `translateY(${translateY}%)`;
        titleRef.current.style.opacity = opacity.toString();
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Limpiar ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Función para agregar referencia a las imágenes
  const addImageRef = (el: HTMLImageElement | null, index: number) => {
    galleryImagesRef.current[index] = el;
  };

  return (
    <section ref={sectionRef} className="purpose">
      <div className="purpose__container">
        <div className="purpose__logo-container">
          <div className="purpose__logo-item">
            <img src={vHotelLogo.src} alt="V Grand" />
            <h3 className="purpose__logo-title">Más de 25 marcas que confían en la historia de V Grand.</h3>
          </div>
          <div className="purpose__logo-line">
            <hr />
            <img src={grandHotelLogo.src} alt="V Grand" />
            <hr />
          </div>
        </div>
        <LogosCarousel />
        <div className="content-container">
        <div className="purpose__content">
          <p className="purpose__content-subtitle">Propósito</p>
          <h3 className="purpose__content-title">
            V Grand Hotel Medellín: Bienestar urbano con alma colombiana
          </h3>
          <div ref={purposeDescriptionRef} className="purpose__content-description">
            Descubre en V Grand Hotel una experiencia de lujo consciente en el corazón de Medellín. Un refugio contemporáneo donde el bienestar, el diseño y la cultura se encuentran para reconectar cuerpo, mente y espíritu. Bienvenido a una nueva forma de hospedarte: más humana, más consciente, más tú.
          </div>

        </div>
        <div className="purpose__gallery">
          <div className="purpose__gallery-wrapper">
            <div className="purpose__gallery-item">
              <img 
                ref={(el) => addImageRef(el, 0)}
                src={purposeGallery2.src} 
                alt="Purpose" 
              />
            </div>
            <div className="purpose__gallery-item">
              <img 
                ref={(el) => addImageRef(el, 1)}
                src={purposeGallery1.src} 
                alt="Purpose" 
              />
            </div>
            <div className="purpose__gallery-item">
              <img 
                ref={(el) => addImageRef(el, 2)}
                src={purposeGallery2.src} 
                alt="Purpose" 
              />
            </div>
            <div className="purpose__gallery-item">
              <img 
                ref={(el) => addImageRef(el, 3)}
                src={purposeGallery3.src} 
                alt="Purpose" 
              />
            </div>
          </div>
          <div className="purpose__gallery-title">
            El lugar donde bien se está
          </div>
        </div>
        <div className="pillars__content">
          <p className="purpose__content-subtitle">Pilares V-Grand</p>
          <h3 className="purpose__content-title">
            Combinamos comodidad y sofisticación con servicios modernos de
            calidad y bienestar.
          </h3>
          <div ref={pillarsDescriptionRef} className="purpose__content-description">
            dolor sit amet consectetur. Hac eget interdum urna auctor. Enim consequat risus donec. Iaculis dignissim proin non arcu. Viverra adipiscing nec massa nunc tristique. Enim consequat risus sagittis donec. Iaculis dignissim proin non arcu.
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Purpose;
