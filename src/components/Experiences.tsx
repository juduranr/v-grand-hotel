import React, { useState } from 'react'
import './Experiences.css'
import { ArrowRight } from "@icon-park/react";
import { EXPERIENCES_IMAGES } from "../config/env";

interface ExperienceItem {
    id: number;
    title: string;
    description: string;
    image: string;
    hoverImage: string;
    activities: string[];
    activitiesDescription?: {
        title: string;
        description: string;
    };
}

const experiencesData: ExperienceItem[] = [
    {
        id: 1,
        title: "Conecta con la esencia de Medellín",
        description: "Desde brunches íntimos hasta eventos corporativos con alma, en V Grand diseñamos cada encuentro para que esté cargado de intención, estética y calidez. Nuestro equipo se encarga de los detalles para que tú solo te encargues de disfrutar.",
        image: EXPERIENCES_IMAGES.ACCORDEON_1,
        hoverImage: EXPERIENCES_IMAGES.ACCORDEON_2,
        activities: [],
        activitiesDescription: {
            title: "Tour Urbano",
            description: "Comuna 13, Pueblito paisa y el centro de la ciudad. Un recorrido por los íconos de la ciudad como son la Comuna 13 y su historia de resurgimiento, el legado artístico de Fernando Botero y un espacio que refleja la cultura auténtica del pueblo paisa."
        }
    },
    {
        id: 2,
        title: "Eventos con propósito",
        description: "Desde brunches íntimos hasta eventos corporativos con alma, en V Grand diseñamos cada encuentro para que esté cargado de intención, estética y calidez. Nuestro equipo se encarga de los detalles para que tú solo te encargues de disfrutar.",
        image: EXPERIENCES_IMAGES.ACCORDEON_2,
        hoverImage: EXPERIENCES_IMAGES.ACCORDEON_3,
        activities: []
    },
    {
        id: 3,
        title: "Un espacio vivo, abierto a la ciudad",
        description: "Más que un hotel, somos un punto de encuentro para locales y viajeros. Abrazamos el arte, la moda, el diseño y la gastronomía como formas de crear comunidad. Aquí siempre está pasando algo: una exposición, una charla, una experiencia que vale la pena vivir.",
        image: EXPERIENCES_IMAGES.ACCORDEON_3,
        hoverImage: EXPERIENCES_IMAGES.ACCORDEON_1,
        activities: [
        ],
        activitiesDescription: {
            title: "Tour a Guatapé",
            description: "En este tour te acercarás a las maravillas de la naturaleza de la región, en la Laguna de Guatapé y la Piedra del Peñol, una inmensa formación en roca. Tambien conocerás el pueblito de Guatapé, muy costumbrista y lleno de detalles artesanales y gastronómicos para disfrutar."
        }
    }
];

const Experiences = () => {
    const [activeAccordion, setActiveAccordion] = useState<number>(1); // Primer acordeón activo por defecto

    const toggleAccordion = (id: number) => {
        setActiveAccordion(id);
    };

    return (
        <div className='experiences-container'>
            <div className='experiences-content-container'>
                <div className='experiences-header'>
                    <p className='experiences-subtitle'>EXPERIENCIAS</p>
                    <div className='experiences-title-container'>
                        <svg width="32" height="35" viewBox="0 0 292 323" fill="none" xmlns="http://www.w3.org/2000/svg" className="v-hotel-logo">
                            <path d="M247.337 6.20131C259.826 3.88532 272.352 3.54913 286 6.64957C268.762 12.7757 265.547 28.39 259.414 41.8377C252.123 57.8629 244.233 73.5518 234.25 88.0828C228.043 97.0853 221.2 105.565 212.525 112.289C194.727 126.073 178.499 124.055 164.589 106.461C156.998 96.8611 151.651 85.9536 146.865 74.7845C141.967 63.2419 137.443 51.5126 132.507 39.97C128.88 31.4904 124.954 23.0856 118.971 16.0256C114.073 10.2356 107.753 6.68693 100.088 10.2356C92.0863 13.9711 90.1419 20.8817 91.8246 29.2118C93.6194 38.0275 98.1438 45.5358 102.743 53.0441C118.373 78.4079 136.508 101.979 154.605 125.512C189.38 170.749 195.923 219.31 174.909 272.017C172.89 277.06 171.17 282.215 169.338 287.333C164.676 300.531 167.58 310.816 178.05 318.188C156.213 323.641 153.259 322.334 144.809 303.694C104.313 214.117 63.7434 124.578 23.3603 34.9271C18.3124 23.758 13.5262 12.701 1 6.23867C16.8915 6.23867 32.783 6.16396 48.6745 6.16396C33.6804 12.9252 36.4848 22.488 41.8318 34.2547C79.5601 117.257 116.84 200.52 154.306 283.635C155.951 287.295 157.933 290.844 160.252 295.439C185.715 240.453 193.867 187.372 155.764 135.523C138.415 111.915 121.364 88.1201 104.463 64.1758C97.2464 53.9406 90.3663 43.2945 87.5619 30.7807C83.8227 14.0832 90.142 5.08067 107.006 2.57791C127.235 -0.44782 142.079 8.4426 150.567 28.4274C157.335 44.3778 159.354 61.5236 163.392 78.1464C165.449 86.7007 167.73 95.2175 171.88 103.025C179.471 117.332 190.053 120.395 204.224 112.438C213.946 106.984 221.013 98.6542 227.482 89.8385C239.933 72.8794 249.356 54.1647 257.62 34.9271C264.238 19.5743 262.107 14.7182 247.412 6.23867" fill="currentColor"/>
                        </svg>
                        <hr />
                        <h1 className='experiences-title'>Tu punto de partida para descubrir Medellín</h1>
                        <hr />
                        <svg width="32" height="35" viewBox="0 0 292 323" fill="none" xmlns="http://www.w3.org/2000/svg" className="v-hotel-logo">
                            <path d="M247.337 6.20131C259.826 3.88532 272.352 3.54913 286 6.64957C268.762 12.7757 265.547 28.39 259.414 41.8377C252.123 57.8629 244.233 73.5518 234.25 88.0828C228.043 97.0853 221.2 105.565 212.525 112.289C194.727 126.073 178.499 124.055 164.589 106.461C156.998 96.8611 151.651 85.9536 146.865 74.7845C141.967 63.2419 137.443 51.5126 132.507 39.97C128.88 31.4904 124.954 23.0856 118.971 16.0256C114.073 10.2356 107.753 6.68693 100.088 10.2356C92.0863 13.9711 90.1419 20.8817 91.8246 29.2118C93.6194 38.0275 98.1438 45.5358 102.743 53.0441C118.373 78.4079 136.508 101.979 154.605 125.512C189.38 170.749 195.923 219.31 174.909 272.017C172.89 277.06 171.17 282.215 169.338 287.333C164.676 300.531 167.58 310.816 178.05 318.188C156.213 323.641 153.259 322.334 144.809 303.694C104.313 214.117 63.7434 124.578 23.3603 34.9271C18.3124 23.758 13.5262 12.701 1 6.23867C16.8915 6.23867 32.783 6.16396 48.6745 6.16396C33.6804 12.9252 36.4848 22.488 41.8318 34.2547C79.5601 117.257 116.84 200.52 154.306 283.635C155.951 287.295 157.933 290.844 160.252 295.439C185.715 240.453 193.867 187.372 155.764 135.523C138.415 111.915 121.364 88.1201 104.463 64.1758C97.2464 53.9406 90.3663 43.2945 87.5619 30.7807C83.8227 14.0832 90.142 5.08067 107.006 2.57791C127.235 -0.44782 142.079 8.4426 150.567 28.4274C157.335 44.3778 159.354 61.5236 163.392 78.1464C165.449 86.7007 167.73 95.2175 171.88 103.025C179.471 117.332 190.053 120.395 204.224 112.438C213.946 106.984 221.013 98.6542 227.482 89.8385C239.933 72.8794 249.356 54.1647 257.62 34.9271C264.238 19.5743 262.107 14.7182 247.412 6.23867" fill="currentColor"/>
                        </svg>
                    </div>
                </div>
                <p className='experiences-description'>
                    Desde V Grand Hotel podrás explorar lo mejor de la ciudad: arte, moda, gastronomía, innovación y naturaleza. Además, somos parte activa de los eventos más importantes. No solo te recibimos, te conectamos con lo que hace única a esta ciudad vibrante.
                </p>
                {/* <button className="experiences-button">
                    Ver todas las experiencias
                </button> */}
                
                <div className='experiences-accordion-grid'>
                    {/* Grid de imágenes - Solo muestra la imagen del acordeón activo */}
                    <div className='experiences-images-grid'>
                        <div 
                            className='experience-image-item active'
                        >
                            <img 
                                src={experiencesData.find(item => item.id === activeAccordion)?.image} 
                                alt={experiencesData.find(item => item.id === activeAccordion)?.title}
                                className='experience-image'
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.backgroundColor = '#1a1a1a';
                                    (e.target as HTMLImageElement).style.display = 'flex';
                                    (e.target as HTMLImageElement).style.alignItems = 'center';
                                    (e.target as HTMLImageElement).style.justifyContent = 'center';
                                    (e.target as HTMLImageElement).style.color = '#fff';
                                    (e.target as HTMLImageElement).innerHTML = 'Imagen no disponible';
                                }}
                            />
                        </div>
                    </div>

                    {/* Grid del acordeón */}
                    <div className='experiences-accordion-container'>
                        {experiencesData.map((item, index) => (
                            <div 
                                key={item.id}
                                className={`accordion-item ${activeAccordion === item.id ? 'active' : ''}`}
                                onMouseEnter={() => setActiveAccordion(item.id)}
                            >
                                <div className='accordion-header'>
                                    <span className='accordion-index'>{(index + 1).toString().padStart(2, '0')}/</span>
                                    <div className='accordion-content-wrapper'>
                                        <h3 className='accordion-title'>{item.title}</h3>
                                        <div className='accordion-content'>
                                            <p className='accordion-description'>{item.description}</p>
                                            {item.activitiesDescription && (
                                                <div className="activities-description">
                                                    <h4 className="activities-description-title">{item.activitiesDescription.title}</h4>
                                                    <p className="activities-description-text">{item.activitiesDescription.description}</p>
                                                </div>
                                            )}
                                            {item.activities && item.activities.length > 0 && (
                                                <div className="activities-buttons">
                                                    {item.activities.map((activity, activityIndex) => (
                                                        <button key={activityIndex} className="activity-button">
                                                            <span className="activity-text">{activity}</span>
                                                            <ArrowRight size={16} />
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Experiences;