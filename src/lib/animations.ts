import { gsap } from 'gsap';

// Function to create floating numbers showing click value
export const createFloatingText = (
  x: number, 
  y: number, 
  value: number, 
  container: HTMLElement
) => {
  // Create element
  const element = document.createElement('div');
  element.innerText = `+${value}`;
  element.className = 'absolute text-yellow-300 font-bold z-50 pointer-events-none';
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  container.appendChild(element);

  // Animate with GSAP
  gsap.to(element, {
    y: -80,
    opacity: 0,
    duration: 1.5,
    ease: "power1.out",
    onComplete: () => {
      container.removeChild(element);
    }
  });
};

// Function to create particle effects on click
export const createClickParticles = (
  x: number, 
  y: number, 
  container: HTMLElement,
  particleCount = 10
) => {
  const colors = ['#FDE68A', '#FBBF24', '#D97706', '#F59E0B', '#FBBF24'];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'absolute rounded-full z-40 pointer-events-none';
    particle.style.width = `${Math.random() * 8 + 4}px`;
    particle.style.height = particle.style.width;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const distance = 30 + Math.random() * 60;
    
    gsap.to(particle, {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      opacity: 0,
      duration: 0.8 + Math.random() * 0.6,
      ease: "power2.out",
      onComplete: () => {
        container.removeChild(particle);
      }
    });
  }
};

// Function to pulse an element
export const pulseElement = (element: HTMLElement) => {
  gsap.to(element, {
    scale: 1.05,
    duration: 0.1,
    ease: "power1.inOut",
    onComplete: () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.1,
        ease: "power1.out"
      });
    }
  });
};

// Function to shake element (for when can't afford upgrade)
export const shakeElement = (element: HTMLElement) => {
  gsap.to(element, {
    x: -5,
    duration: 0.05,
    ease: "power1.inOut",
    onComplete: () => {
      gsap.to(element, {
        x: 5,
        duration: 0.05,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(element, {
            x: -3,
            duration: 0.05,
            ease: "power1.inOut",
            onComplete: () => {
              gsap.to(element, {
                x: 3,
                duration: 0.05,
                ease: "power1.inOut",
                onComplete: () => {
                  gsap.to(element, {
                    x: 0,
                    duration: 0.05,
                    ease: "power1.out"
                  });
                }
              });
            }
          });
        }
      });
    }
  });
}; 