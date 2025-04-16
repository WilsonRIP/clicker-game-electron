/**
 * Common animation variants for reuse across components
 */

export const fadeInStaggered = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03
    }
  }
};

export const itemFadeInUp = {
  hidden: { opacity: 0, y: 5 },
  show: { opacity: 1, y: 0 }
};

export const scaleInOut = (startScale = 0.8, endScale = 1.2) => ({
  scale: [startScale, endScale, startScale],
  opacity: [0.4, 0.8, 0.4]
});

export const pulseOpacity = {
  opacity: [0.3, 1, 0.3]
}; 