import React from 'react';
import { RESTAURANTS_IMAGES } from '../config/env';
import './VCoffee.css';

const VCoffee: React.FC = () => {
  return (
    <main className="vcoffee-detail">
      <section
        className="vcoffee-hero"
        style={{ backgroundImage: `url(${RESTAURANTS_IMAGES.V_COFFEE_BANNER})` }}
      >
        <div className="vcoffee-hero__content">
          <h1 className="vcoffee-title">V-Coffee</h1>
        </div>
      </section>
      <section className="vcoffee-content">
        <div className="vcoffee-intro__container">
          <div className="vcoffee-intro__logo">
            <img src="/src/assets/images/v-hotel.svg" alt="V Hotel" width="46" height="46" />
          </div>

          <div className="vcoffee-intro__text">
            <p>
              Un espacio que se transforma con el día: café de especialidad por la mañana, cócteles artesanales por la noche, y siempre abierto a nuevas ideas.
            </p>
            <p>
              V Coffee & Bar es más que una cafetería y más que un bar. Es un coworking boutique donde la creatividad fluye, las conversaciones se alargan y el tiempo se disfruta.
            </p>
          </div>

          <div className="vcoffee-intro__button">
            <a 
              href="https://viaggio.cluvi.co/newmenu/22894/on_table/basic?fbclid=PAQ0xDSwK9HApleHRuA2FlbQIxMQABp1g28vwm7exL3fSGh2Eh_bQhAXI9tqdUOj3Jm35dBqmcpCHCyFNaPPJg5gY5_aem_K-80mCmLDQBUBXX09cyrRw"
              target="_blank"
              rel="noopener noreferrer"
              className="vcoffee-btn"
            >
              Ver Carta
            </a>
          </div>

          <div className="vcoffee-intro__image-full">
            <img src={RESTAURANTS_IMAGES.V_COFFEE_2} alt="V-Coffee ambiente" />
          </div>
        </div>
        <div className="vcoffee-coworking__container">
          <div className="vcoffee-coworking__grid">
            <div className="vcoffee-coworking__left">
              <h2 className="vcoffee-coworking__title">
                Un coworking donde la inspiración no se negocia
              </h2>
              <div className="vcoffee-coworking__image">
                <img src={RESTAURANTS_IMAGES.V_COFFEE_3} alt="V-Coffee cócteles" />
              </div>
              <p className="vcoffee-coworking__text">
                Cuando cae la tarde, el espacio se transforma: luces tenues, música envolvente y una carta de cócteles diseñada por expertos. Desde clásicos hasta creaciones exclusivas con ingredientes locales, cada bebida está pensada para ser parte de tu historia en Medellín.
              </p>
            </div>
            
            <div className="vcoffee-coworking__right">
              <div className="vcoffee-coworking__image">
                <img src={RESTAURANTS_IMAGES.ROOFTOP_1} alt="V-Coffee coworking" />
              </div>
              <p className="vcoffee-coworking__text">
                WiFi de alta velocidad, estaciones de trabajo cómodas, iluminación natural y la dosis perfecta de ambiente. Ideal para freelancers, creativos, empresarios o viajeros que quieren seguir conectados sin perder el encanto de un buen entorno. Aquí, cada rincón está pensado para ayudarte a fluir sin distracciones.
              </p>
            </div>
          </div>
        </div>
        <div className="vcoffee-moments__container">
            <div className="vcoffee-moments__title-container">
              <img src="/src/assets/images/v-hotel.svg" alt="V Hotel" width="32" />
              <hr />
              <h2 className="vcoffee-moments__title">
                Un lugar para todos
                los momentos
              </h2>
              <hr />
              <img src="/src/assets/images/v-hotel.svg" alt="V Hotel" width="32" />
            </div>

            <div className="vcoffee-moments__content">
              <div className="vcoffee-moments__item">
                <div className="vcoffee-moments__image">
                  <img src={RESTAURANTS_IMAGES.ROOFTOP_2} alt="Reuniones informales" />
                </div>
                <p className="vcoffee-moments__text">
                  Reuniones informales o after office con estilo
                </p>
              </div>

              <div className="vcoffee-moments__item">
                <div className="vcoffee-moments__image">
                  <img src={RESTAURANTS_IMAGES.ROOFTOP_3} alt="Eventos culturales" />
                </div>
                <p className="vcoffee-moments__text">
                  Eventos culturales, catas,
                  encuentros creativos
                </p>
              </div>

              <div className="vcoffee-moments__item">
                <div className="vcoffee-moments__image">
                  <img src={RESTAURANTS_IMAGES.V_COFFEE_1} alt="Espacio de trabajo" />
                </div>
                <p className="vcoffee-moments__text">
                  Espacio ideal para trabajar
                  o simplemente pausar
                </p>
              </div>
            </div>
          </div>
      </section>
    </main>
  );
};

export default VCoffee;


