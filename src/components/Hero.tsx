import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero__background">
        <img 
          src="/images/hero.webp" 
          alt="V Grand Hotel Hero" 
          className="hero__image"
        />
      </div>
      
      <div className="hero__content">
        {/* Título removido para usar solo el de Purpose */}
      </div>
    </section>
  );
};

export default Hero;
