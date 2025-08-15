import React from "react";
import infinityGallery1 from "../assets/images/infinity-gallery-1.webp";
import infinityGallery2 from "../assets/images/infinity-gallery-2.webp";
import infinityGallery3 from "../assets/images/infinity-gallery-3.webp";
import discoverImage from "../assets/images/discover.webp";
import "./Discover.css";

const Discover: React.FC = () => {
  return (
    <section className="discover">
      <div className="discover__container">
        <div className="discover__infinity-gallery">
          <div className="discover__infinity-gallery-track">
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery1.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery2.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery3.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery1.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery2.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery3.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery1.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery2.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery3.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery1.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery2.src} alt="Infinity Gallery" />
            </div>
            <div className="discover__infinity-gallery-item">
              <img src={infinityGallery3.src} alt="Infinity Gallery" />
            </div>
          </div>
        </div>
        <div className="discover__background">
          <img
            src={discoverImage.src}
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
