import React from "react";
import "./Discover.css";

const Discover: React.FC = () => {
  return (
    <section className="discover">
      <div className="discover__container">
        <div className="discover__infinity-gallery">
          <div className="discover__infinity-gallery-track">
            <div className="discover__infinity-gallery-item">
              <img src="/images/infinity-gallery-1.png" alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src="/images/infinity-gallery-2.png" alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src="/images/infinity-gallery-3.png" alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src="/images/infinity-gallery-1.png" alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src="/images/infinity-gallery-2.png" alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src="/images/infinity-gallery-3.png" alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src="/images/infinity-gallery-1.png" alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src="/images/infinity-gallery-2.png" alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src="/images/infinity-gallery-3.png" alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src="/images/infinity-gallery-1.png" alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src="/images/infinity-gallery-2.png" alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src="/images/infinity-gallery-3.png" alt="Infinity Gallery" />
            </div>
          </div>
        </div>
        <div className="discover__background">
          <img
            src="/images/discover.png"
            alt="V Grand Hotel Discover"
            className="discover__image"
          />
          <div className="discover__background_title">
            <h2>Descubre lo que tenemos para tí</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discover;
