import React from 'react';
import { RESTAURANTS_IMAGES } from '../config/env';
import './RestaurantsPage.css';

const VCoffee: React.FC = () => {
  return (
    <main className="restaurant-detail">
      <section
        className="restaurant-hero"
        style={{ backgroundImage: `url(${RESTAURANTS_IMAGES.V_COFFEE_BANNER})` }}
      >
        <div className="restaurant-hero__content">
          <h1 className="restaurant-title">V-Coffee</h1>
          <div className="restaurant-meta">Cócteles y Tapas · 5:00 PM - 2:00 AM · Rooftop</div>
        </div>
      </section>

      <section className="restaurant-section">
        <p className="restaurant-description">
          Un ambiente sofisticado para disfrutar de cócteles artesanales y aperitivos gourmet.
        </p>
      </section>

      <section className="restaurant-section">
        <div className="restaurant-gallery">
          <div className="restaurant-gallery__item restaurant-grid-1">
            <img src={RESTAURANTS_IMAGES.V_COFFEE_1} alt="V-Coffee 1" />
          </div>
          <div className="restaurant-gallery__item restaurant-grid-2">
            <img src={RESTAURANTS_IMAGES.V_COFFEE_2} alt="V-Coffee 2" />
          </div>
          <div className="restaurant-gallery__item restaurant-grid-3">
            <img src={RESTAURANTS_IMAGES.V_COFFEE_3} alt="V-Coffee 3" />
          </div>
          <div className="restaurant-gallery__item restaurant-grid-4">
            <img src={RESTAURANTS_IMAGES.ROOFTOP_2} alt="Vista rooftop" />
          </div>
        </div>
      </section>
    </main>
  );
};

export default VCoffee;


