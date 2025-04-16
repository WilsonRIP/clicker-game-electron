import { FLOAT_ANIMATION_DURATION } from "../constants";

/**
 * Function to create a click animation
 */
export function createClickAnimation(
  x: number,
  y: number,
  value: number,
  container: HTMLElement
) {
  // Create floating number element
  const floater = document.createElement("div");
  floater.innerText = `+${value}`;
  floater.className = "absolute text-primary font-bold text-xl animate-float-up select-none pointer-events-none";
  floater.style.left = `${x}px`;
  floater.style.top = `${y}px`;
  
  // Add to container and remove after animation completes
  container.appendChild(floater);
  setTimeout(() => {
    floater.remove();
  }, FLOAT_ANIMATION_DURATION);
} 