export interface PurposeConfig {
  parallax: {
    limits: {
      // Límites escalonados para cada imagen
      image1: { upper: number; lower: number };
      image2: { upper: number; lower: number };
      image3: { upper: number; lower: number };
      image4: { upper: number; lower: number };
    };
    baseSpeed: number;
    speedMultiplier: number;
  };
  animation: {
    titleRevealStagger: number;
    descriptionRevealStagger: number;
  };
}

export const defaultPurposeConfig: PurposeConfig = {
  parallax: {
    limits: {
      // Cada imagen tiene límites diferentes para mantener el escalonamiento
      image1: { upper: -150, lower: 150 },  // Primera imagen: rango medio
      image2: { upper: -200, lower: 200 },  // Segunda imagen: rango más amplio
      image3: { upper: -250, lower: 250 },  // Tercera imagen: rango aún más amplio
      image4: { upper: -300, lower: 300 }   // Cuarta imagen: rango máximo
    },
    baseSpeed: 0.3,      // Velocidad base del parallax
    speedMultiplier: 0.1 // Multiplicador de velocidad por imagen
  },
  animation: {
    titleRevealStagger: 0.03,      // Retraso entre caracteres en títulos
    descriptionRevealStagger: 0.01 // Retraso entre caracteres en descripciones
  }
};
