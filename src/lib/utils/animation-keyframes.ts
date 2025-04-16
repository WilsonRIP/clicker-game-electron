/**
 * Common animation keyframes for use with Framer Motion
 */

/**
 * Pulse animation that scales an element up and down
 */
export const pulseKeyframes = {
  scale: [1, 1.05, 1],
};

/**
 * Fade-in animation for elements appearing on the page
 */
export const fadeInKeyframes = {
  opacity: [0, 1],
};

/**
 * Bounce animation for interactive elements
 */
export const bounceKeyframes = {
  y: [0, -10, 0],
};

/**
 * Float animation that moves an element upward
 */
export const floatKeyframes = {
  y: [0, -20],
  opacity: [1, 0],
};

/**
 * Wiggle animation for attention-getting elements
 */
export const wiggleKeyframes = {
  rotate: [0, -5, 5, -5, 0],
};

/**
 * Scale animation for clicking elements
 */
export const clickKeyframes = {
  scale: [1, 0.95, 1],
};

/**
 * Shimmer animation for highlighting elements
 */
export const shimmerKeyframes = {
  backgroundPosition: ["0% 0%", "100% 0%"],
};

/**
 * Common transition options
 */
export const transitions = {
  gentle: {
    duration: 0.5,
    ease: "easeInOut",
  },
  bounce: {
    type: "spring",
    stiffness: 300,
    damping: 10,
  },
  slowFade: {
    duration: 1,
    ease: "easeOut",
  },
}; 