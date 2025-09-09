import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCarousel from './CustomCarousel';

gsap.registerPlugin(ScrollTrigger);

const ScrollRestaurant = ({restaurantData}: {restaurantData: any}) => {

    const sectionRef = useRef<HTMLElement>(null);
    const carousel1Ref = useRef<HTMLDivElement>(null);
    const carousel2Ref = useRef<HTMLDivElement>(null);
    const carousel3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !carousel1Ref.current || !carousel2Ref.current || !carousel3Ref.current) return;

        // Ocultar textos de todos los carruseles inicialmente
        gsap.set(carousel1Ref.current.querySelectorAll('.restaurants-subtitle, .restaurants-title-container, .restaurants-description-container'), {
            opacity: 0,
            visibility: 'hidden'
        });
        gsap.set(carousel2Ref.current.querySelectorAll('.restaurants-subtitle, .restaurants-title-container, .restaurants-description-container'), {
            opacity: 0,
            visibility: 'hidden'
        });
        gsap.set(carousel3Ref.current.querySelectorAll('.restaurants-subtitle, .restaurants-title-container, .restaurants-description-container'), {
            opacity: 0,
            visibility: 'hidden'
        });

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

        // Detectar si es pantalla pequeña
        const isMobileScreen = window.innerWidth <= 768;
        
        gsap.set(carousel2Ref.current, { 
            position: 'fixed',
            top: 'calc(10vh - 80px)', 
            left: '0px',
            width: '100%',
            height: '100vh', 
            scale: isMobileScreen ? 0.95 : 0.95, 
            zIndex: 2,
            opacity: 0.8 
        });

        gsap.set(carousel3Ref.current, { 
            position: 'fixed',
            top: 'calc(10vh - 160px)',
            left: '0px', 
            width: '100%',
            height: '100vh', 
            scale: isMobileScreen ? 0.9 : 0.9, 
            zIndex: 1,
            opacity: 0.6
        });

        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=400%',
            onEnter: () => {
                // ScrollTrigger activado
            }
        });

        // Configuración de pin adaptada para móviles
        const isMobile = window.innerWidth <= 768;
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: isMobile ? '+=400%' : '+=500%',
                scrub: 0.5,
                pin: true,
                pinSpacing: true, // Mantener pinSpacing para evitar solapamiento
                invalidateOnRefresh: true,
                anticipatePin: isMobile ? 0.5 : 1,
            }
        });

        tl.to(carousel1Ref.current, {
            top: '50vh',
            transform: 'translateY(-50%)',
            zIndex: 10,
            ease: 'power2.out'
        }, 0)
        .to(carousel2Ref.current, {
            opacity: 0,
            scale: 0.8,
            ease: 'power1.out'
        }, 0.1)
        .to(carousel3Ref.current, {
            opacity: 0,
            scale: 0.8,
            ease: 'power1.out'
        }, 0.1)
        .to(carousel1Ref.current.querySelectorAll('.restaurants-subtitle, .restaurants-title-container, .restaurants-description-container'), {
            opacity: 1,
            visibility: 'visible',
            ease: 'power1.out',
        }, 0.2)
        .to(carousel1Ref.current, {
            top: '50vh',
            transform: 'translateY(-50%)',
            duration: 0.4
        }, 0.2)
        .to(carousel1Ref.current.querySelectorAll('.restaurants-subtitle, .restaurants-title-container, .restaurants-description-container'), {
            opacity: 0,
            visibility: 'hidden',
            ease: 'power1.out',
        }, 0.6)
        .to(carousel1Ref.current, {
            top: '-100vh',
            transform: 'translateY(0%)',
            ease: 'power1.out'
        }, 0.6)
        .to(carousel2Ref.current, {
            opacity: 1,
            scale: 1,
            zIndex: 10,
            ease: 'power1.out'
        }, 0.7)
        .to(carousel3Ref.current, {
            opacity: 0,
            scale: 0.8,
            ease: 'power1.out'
        }, 0.7);

        tl.to(carousel2Ref.current, {
            top: '50vh',
            transform: 'translateY(-50%)',
            zIndex: 10,
            ease: 'power2.out'
        }, 0.8)
        .to(carousel3Ref.current, {
            opacity: 0,
            scale: 0.8,
            ease: 'power1.out'
        }, 0.9)
        .to(carousel2Ref.current.querySelectorAll('.restaurants-subtitle, .restaurants-title-container, .restaurants-description-container'), {
            opacity: 1,
            visibility: 'visible',
            ease: 'power1.out',
        }, 1.0)
        .to(carousel2Ref.current, {
            top: '50vh',
            transform: 'translateY(-50%)',
            duration: 0.4
        }, 1.0)
        .to(carousel2Ref.current.querySelectorAll('.restaurants-subtitle, .restaurants-title-container, .restaurants-description-container'), {
            opacity: 0,
            visibility: 'hidden',
            ease: 'power1.out',
        }, 1.4)
        .to(carousel2Ref.current, {
            top: '-100vh',
            transform: 'translateY(0%)',
            ease: 'power1.out'
        }, 1.4)
        .to(carousel3Ref.current, {
            opacity: 1,
            scale: 1,
            zIndex: 10,
            ease: 'power1.out'
        }, 1.5)
        .to(carousel3Ref.current, {
            opacity: 0,
            scale: 0.8,
            ease: 'power1.out'
        }, 1.5);
        
        tl.to(carousel3Ref.current, {
            opacity: 1,
            scale: 1,
            zIndex: 10,
            ease: 'power1.out'
        }, 1.6)
        .to(carousel3Ref.current, {
            top: '50vh',
            transform: 'translateY(-50%)',
            zIndex: 10,
            ease: 'power2.out'
        }, 1.6)
        .to(carousel3Ref.current.querySelectorAll('.restaurants-subtitle, .restaurants-title-container, .restaurants-description-container'), {
            opacity: 1,
            visibility: 'visible',
            ease: 'power1.out',
        }, 1.8)
        .to(carousel3Ref.current, {
            top: '50vh',
            transform: 'translateY(-50%)',
            duration: 0.4
        }, 1.8)
        .to(carousel3Ref.current, {
            top: '0vh',
            transform: 'translateY(0%)',
            ease: 'power3.out'
        }, 2.2);

        // Listener para redimensionamiento de ventana
        const handleResize = () => {
            const isMobile = window.innerWidth <= 768;
            
            if (carousel2Ref.current) {
                gsap.set(carousel2Ref.current, {
                    left: '0px',
                    scale: isMobile ? 0.95 : 0.95
                });
            }
            
            if (carousel3Ref.current) {
                gsap.set(carousel3Ref.current, {
                    left: '0px',
                    scale: isMobile ? 0.9 : 0.9
                });
            }
            
            // Refrescar ScrollTrigger para aplicar nuevos ajustes
            ScrollTrigger.refresh();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            window.removeEventListener('resize', handleResize);
        };
    }, [restaurantData]);

    return (
        <section ref={sectionRef} className="simple-carousels-section scroll-r-section">
            <div className="simple-carousels-container scroll-r-container">
                <div ref={carousel1Ref} className="simple-carousel-wrapper scroll-r-carousel-wrapper">
                    <div className="restaurants-content">
                        <p className="restaurants-subtitle">GASTRONOMÍA</p>
                        <div className="restaurants-title-container">
                            <svg width="32" height="35" viewBox="0 0 292 323" fill="none" xmlns="http://www.w3.org/2000/svg" className="v-hotel-logo">
                                <path d="M247.337 6.20131C259.826 3.88532 272.352 3.54913 286 6.64957C268.762 12.7757 265.547 28.39 259.414 41.8377C252.123 57.8629 244.233 73.5518 234.25 88.0828C228.043 97.0853 221.2 105.565 212.525 112.289C194.727 126.073 178.499 124.055 164.589 106.461C156.998 96.8611 151.651 85.9536 146.865 74.7845C141.967 63.2419 137.443 51.5126 132.507 39.97C128.88 31.4904 124.954 23.0856 118.971 16.0256C114.073 10.2356 107.753 6.68693 100.088 10.2356C92.0863 13.9711 90.1419 20.8817 91.8246 29.2118C93.6194 38.0275 98.1438 45.5358 102.743 53.0441C118.373 78.4079 136.508 101.979 154.605 125.512C189.38 170.749 195.923 219.31 174.909 272.017C172.89 277.06 171.17 282.215 169.338 287.333C164.676 300.531 167.58 310.816 178.05 318.188C156.213 323.641 153.259 322.334 144.809 303.694C104.313 214.117 63.7434 124.578 23.3603 34.9271C18.3124 23.758 13.5262 12.701 1 6.23867C16.8915 6.23867 32.783 6.16396 48.6745 6.16396C33.6804 12.9252 36.4848 22.488 41.8318 34.2547C79.5601 117.257 116.84 200.52 154.306 283.635C155.951 287.295 157.933 290.844 160.252 295.439C185.715 240.453 193.867 187.372 155.764 135.523C138.415 111.915 121.364 88.1201 104.463 64.1758C97.2464 53.9406 90.3663 43.2945 87.5619 30.7807C83.8227 14.0832 90.142 5.08067 107.006 2.57791C127.235 -0.44782 142.079 8.4426 150.567 28.4274C157.335 44.3778 159.354 61.5236 163.392 78.1464C165.449 86.7007 167.73 95.2175 171.88 103.025C179.471 117.332 190.053 120.395 204.224 112.438C213.946 106.984 221.013 98.6542 227.482 89.8385C239.933 72.8794 249.356 54.1647 257.62 34.9271C264.238 19.5743 262.107 14.7182 247.412 6.23867" fill="currentColor" />
                            </svg>
                            <hr />
                            <h1 className="restaurants-title">{restaurantData[0].title}</h1>
                            <hr />
                            <svg width="32" height="35" viewBox="0 0 292 323" fill="none" xmlns="http://www.w3.org/2000/svg" className="v-hotel-logo">
                                <path d="M247.337 6.20131C259.826 3.88532 272.352 3.54913 286 6.64957C268.762 12.7757 265.547 28.39 259.414 41.8377C252.123 57.8629 244.233 73.5518 234.25 88.0828C228.043 97.0853 221.2 105.565 212.525 112.289C194.727 126.073 178.499 124.055 164.589 106.461C156.998 96.8611 151.651 85.9536 146.865 74.7845C141.967 63.2419 137.443 51.5126 132.507 39.97C128.88 31.4904 124.954 23.0856 118.971 16.0256C114.073 10.2356 107.753 6.68693 100.088 10.2356C92.0863 13.9711 90.1419 20.8817 91.8246 29.2118C93.6194 38.0275 98.1438 45.5358 102.743 53.0441C118.373 78.4079 136.508 101.979 154.605 125.512C189.38 170.749 195.923 219.31 174.909 272.017C172.89 277.06 171.17 282.215 169.338 287.333C164.676 300.531 167.58 310.816 178.05 318.188C156.213 323.641 153.259 322.334 144.809 303.694C104.313 214.117 63.7434 124.578 23.3603 34.9271C18.3124 23.758 13.5262 12.701 1 6.23867C16.8915 6.23867 32.783 6.16396 48.6745 6.16396C33.6804 12.9252 36.4848 22.488 41.8318 34.2547C79.5601 117.257 116.84 200.52 154.306 283.635C155.951 287.295 157.933 290.844 160.252 295.439C185.715 240.453 193.867 187.372 155.764 135.523C138.415 111.915 121.364 88.1201 104.463 64.1758C97.2464 53.9406 90.3663 43.2945 87.5619 30.7807C83.8227 14.0832 90.142 5.08067 107.006 2.57791C127.235 -0.44782 142.079 8.4426 150.567 28.4274C157.335 44.3778 159.354 61.5236 163.392 78.1464C165.449 86.7007 167.73 95.2175 171.88 103.025C179.471 117.332 190.053 120.395 204.224 112.438C213.946 106.984 221.013 98.6542 227.482 89.8385C239.933 72.8794 249.356 54.1647 257.62 34.9271C264.238 19.5743 262.107 14.7182 247.412 6.23867" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="restaurants-carousel-container">
                            <CustomCarousel 
                                images={restaurantData[0].items}
                                className="scroll-r-restaurants-gallery"
                                showIndicators={false}
                            />
                        </div>
                        <div className='restaurants-description-container'>
                            <p className="restaurants-description">{restaurantData[0].description}</p>
                            {/* <button className="restaurants-description-button">
                                Ver más
                            </button> */}
                        </div>
                    </div>
                </div>
                <div ref={carousel2Ref} className="simple-carousel-wrapper scroll-r-carousel-wrapper">
                    <div className="restaurants-content">
                        <p className="restaurants-subtitle">GASTRONOMÍA</p>
                        <div className="restaurants-title-container">
                            <svg width="32" height="35" viewBox="0 0 292 323" fill="none" xmlns="http://www.w3.org/2000/svg" className="v-hotel-logo">
                                <path d="M247.337 6.20131C259.826 3.88532 272.352 3.54913 286 6.64957C268.762 12.7757 265.547 28.39 259.414 41.8377C252.123 57.8629 244.233 73.5518 234.25 88.0828C228.043 97.0853 221.2 105.565 212.525 112.289C194.727 126.073 178.499 124.055 164.589 106.461C156.998 96.8611 151.651 85.9536 146.865 74.7845C141.967 63.2419 137.443 51.5126 132.507 39.97C128.88 31.4904 124.954 23.0856 118.971 16.0256C114.073 10.2356 107.753 6.68693 100.088 10.2356C92.0863 13.9711 90.1419 20.8817 91.8246 29.2118C93.6194 38.0275 98.1438 45.5358 102.743 53.0441C118.373 78.4079 136.508 101.979 154.605 125.512C189.38 170.749 195.923 219.31 174.909 272.017C172.89 277.06 171.17 282.215 169.338 287.333C164.676 300.531 167.58 310.816 178.05 318.188C156.213 323.641 153.259 322.334 144.809 303.694C104.313 214.117 63.7434 124.578 23.3603 34.9271C18.3124 23.758 13.5262 12.701 1 6.23867C16.8915 6.23867 32.783 6.16396 48.6745 6.16396C33.6804 12.9252 36.4848 22.488 41.8318 34.2547C79.5601 117.257 116.84 200.52 154.306 283.635C155.951 287.295 157.933 290.844 160.252 295.439C185.715 240.453 193.867 187.372 155.764 135.523C138.415 111.915 121.364 88.1201 104.463 64.1758C97.2464 53.9406 90.3663 43.2945 87.5619 30.7807C83.8227 14.0832 90.142 5.08067 107.006 2.57791C127.235 -0.44782 142.079 8.4426 150.567 28.4274C157.335 44.3778 159.354 61.5236 163.392 78.1464C165.449 86.7007 167.73 95.2175 171.88 103.025C179.471 117.332 190.053 120.395 204.224 112.438C213.946 106.984 221.013 98.6542 227.482 89.8385C239.933 72.8794 249.356 54.1647 257.62 34.9271C264.238 19.5743 262.107 14.7182 247.412 6.23867" fill="currentColor" />
                            </svg>
                            <hr />
                            <h1 className="restaurants-title">{restaurantData[1].title}</h1>
                            <hr />
                            <svg width="32" height="35" viewBox="0 0 292 323" fill="none" xmlns="http://www.w3.org/2000/svg" className="v-hotel-logo">
                                <path d="M247.337 6.20131C259.826 3.88532 272.352 3.54913 286 6.64957C268.762 12.7757 265.547 28.39 259.414 41.8377C252.123 57.8629 244.233 73.5518 234.25 88.0828C228.043 97.0853 221.2 105.565 212.525 112.289C194.727 126.073 178.499 124.055 164.589 106.461C156.998 96.8611 151.651 85.9536 146.865 74.7845C141.967 63.2419 137.443 51.5126 132.507 39.97C128.88 31.4904 124.954 23.0856 118.971 16.0256C114.073 10.2356 107.753 6.68693 100.088 10.2356C92.0863 13.9711 90.1419 20.8817 91.8246 29.2118C93.6194 38.0275 98.1438 45.5358 102.743 53.0441C118.373 78.4079 136.508 101.979 154.605 125.512C189.38 170.749 195.923 219.31 174.909 272.017C172.89 277.06 171.17 282.215 169.338 287.333C164.676 300.531 167.58 310.816 178.05 318.188C156.213 323.641 153.259 322.334 144.809 303.694C104.313 214.117 63.7434 124.578 23.3603 34.9271C18.3124 23.758 13.5262 12.701 1 6.23867C16.8915 6.23867 32.783 6.16396 48.6745 6.16396C33.6804 12.9252 36.4848 22.488 41.8318 34.2547C79.5601 117.257 116.84 200.52 154.306 283.635C155.951 287.295 157.933 290.844 160.252 295.439C185.715 240.453 193.867 187.372 155.764 135.523C138.415 111.915 121.364 88.1201 104.463 64.1758C97.2464 53.9406 90.3663 43.2945 87.5619 30.7807C83.8227 14.0832 90.142 5.08067 107.006 2.57791C127.235 -0.44782 142.079 8.4426 150.567 28.4274C157.335 44.3778 159.354 61.5236 163.392 78.1464C165.449 86.7007 167.73 95.2175 171.88 103.025C179.471 117.332 190.053 120.395 204.224 112.438C213.946 106.984 221.013 98.6542 227.482 89.8385C239.933 72.8794 249.356 54.1647 257.62 34.9271C264.238 19.5743 262.107 14.7182 247.412 6.23867" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="restaurants-carousel-container">
                            <CustomCarousel 
                                images={restaurantData[1].items}
                                className="scroll-r-restaurants-gallery"
                                showIndicators={false}
                            />
                        </div>
                        <div className='restaurants-description-container'>
                            <p className="restaurants-description">{restaurantData[1].description}</p>
                            {/* <button className="restaurants-description-button">
                                Ver más
                            </button> */}
                        </div>
                    </div>
                </div>
                <div ref={carousel3Ref} className="simple-carousel-wrapper scroll-r-carousel-wrapper">
                    <div className="restaurants-content">
                        <p className="restaurants-subtitle">GASTRONOMÍA</p>
                        <div className="restaurants-title-container">
                            <svg width="32" height="35" viewBox="0 0 292 323" fill="none" xmlns="http://www.w3.org/2000/svg" className="v-hotel-logo">
                                <path d="M247.337 6.20131C259.826 3.88532 272.352 3.54913 286 6.64957C268.762 12.7757 265.547 28.39 259.414 41.8377C252.123 57.8629 244.233 73.5518 234.25 88.0828C228.043 97.0853 221.2 105.565 212.525 112.289C194.727 126.073 178.499 124.055 164.589 106.461C156.998 96.8611 151.651 85.9536 146.865 74.7845C141.967 63.2419 137.443 51.5126 132.507 39.97C128.88 31.4904 124.954 23.0856 118.971 16.0256C114.073 10.2356 107.753 6.68693 100.088 10.2356C92.0863 13.9711 90.1419 20.8817 91.8246 29.2118C93.6194 38.0275 98.1438 45.5358 102.743 53.0441C118.373 78.4079 136.508 101.979 154.605 125.512C189.38 170.749 195.923 219.31 174.909 272.017C172.89 277.06 171.17 282.215 169.338 287.333C164.676 300.531 167.58 310.816 178.05 318.188C156.213 323.641 153.259 322.334 144.809 303.694C104.313 214.117 63.7434 124.578 23.3603 34.9271C18.3124 23.758 13.5262 12.701 1 6.23867C16.8915 6.23867 32.783 6.16396 48.6745 6.16396C33.6804 12.9252 36.4848 22.488 41.8318 34.2547C79.5601 117.257 116.84 200.52 154.306 283.635C155.951 287.295 157.933 290.844 160.252 295.439C185.715 240.453 193.867 187.372 155.764 135.523C138.415 111.915 121.364 88.1201 104.463 64.1758C97.2464 53.9406 90.3663 43.2945 87.5619 30.7807C83.8227 14.0832 90.142 5.08067 107.006 2.57791C127.235 -0.44782 142.079 8.4426 150.567 28.4274C157.335 44.3778 159.354 61.5236 163.392 78.1464C165.449 86.7007 167.73 95.2175 171.88 103.025C179.471 117.332 190.053 120.395 204.224 112.438C213.946 106.984 221.013 98.6542 227.482 89.8385C239.933 72.8794 249.356 54.1647 257.62 34.9271C264.238 19.5743 262.107 14.7182 247.412 6.23867" fill="currentColor" />
                            </svg>
                            <hr />
                            <h1 className="restaurants-title">{restaurantData[2].title}</h1>
                            <hr />
                            <svg width="32" height="35" viewBox="0 0 292 323" fill="none" xmlns="http://www.w3.org/2000/svg" className="v-hotel-logo">
                                <path d="M247.337 6.20131C259.826 3.88532 272.352 3.54913 286 6.64957C268.762 12.7757 265.547 28.39 259.414 41.8377C252.123 57.8629 244.233 73.5518 234.25 88.0828C228.043 97.0853 221.2 105.565 212.525 112.289C194.727 126.073 178.499 124.055 164.589 106.461C156.998 96.8611 151.651 85.9536 146.865 74.7845C141.967 63.2419 137.443 51.5126 132.507 39.97C128.88 31.4904 124.954 23.0856 118.971 16.0256C114.073 10.2356 107.753 6.68693 100.088 10.2356C92.0863 13.9711 90.1419 20.8817 91.8246 29.2118C93.6194 38.0275 98.1438 45.5358 102.743 53.0441C118.373 78.4079 136.508 101.979 154.605 125.512C189.38 170.749 195.923 219.31 174.909 272.017C172.89 277.06 171.17 282.215 169.338 287.333C164.676 300.531 167.58 310.816 178.05 318.188C156.213 323.641 153.259 322.334 144.809 303.694C104.313 214.117 63.7434 124.578 23.3603 34.9271C18.3124 23.758 13.5262 12.701 1 6.23867C16.8915 6.23867 32.783 6.16396 48.6745 6.16396C33.6804 12.9252 36.4848 22.488 41.8318 34.2547C79.5601 117.257 116.84 200.52 154.306 283.635C155.951 287.295 157.933 290.844 160.252 295.439C185.715 240.453 193.867 187.372 155.764 135.523C138.415 111.915 121.364 88.1201 104.463 64.1758C97.2464 53.9406 90.3663 43.2945 87.5619 30.7807C83.8227 14.0832 90.142 5.08067 107.006 2.57791C127.235 -0.44782 142.079 8.4426 150.567 28.4274C157.335 44.3778 159.354 61.5236 163.392 78.1464C165.449 86.7007 167.73 95.2175 171.88 103.025C179.471 117.332 190.053 120.395 204.224 112.438C213.946 106.984 221.013 98.6542 227.482 89.8385C239.933 72.8794 249.356 54.1647 257.62 34.9271C264.238 19.5743 262.107 14.7182 247.412 6.23867" fill="currentColor" />
                            </svg>
                        </div>
                        <div className="restaurants-carousel-container" style={{ position: 'relative' }}>
                            <img 
                                src="https://yvivloqhhmvh4iw4.public.blob.vercel-storage.com/restaurants/rooftop.avif"
                                alt="Rooftop"
                                className="scroll-r-restaurants-gallery"
                                style={{
                                    width: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                            <div 
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'rgba(0, 0, 0, 0.60)',
                                    backdropFilter: 'blur(12px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <span 
                                    style={{
                                        color: '#FFF',
                                        textAlign: 'center',
                                        fontSize: '56px',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: '120%',
                                        letterSpacing: '1.12px',
                                        textTransform: 'uppercase'
                                    }}
                                >
                                    Próximamente
                                </span>
                            </div>
                        </div>
                        <div className='restaurants-description-container'>
                            <p className="restaurants-description">{restaurantData[2].description}</p>
                            {/* <button className="restaurants-description-button">
                                Ver más
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ScrollRestaurant;