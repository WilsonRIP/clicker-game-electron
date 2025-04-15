import { useEffect, useState, useRef } from "react";
import { pulseElement } from "../lib/animations";
import { playGoldenCookieSound } from "../lib/sounds";

interface GoldCookieProps {
  enabled: boolean;
  onCollect: (bonus: number) => void;
}

export function GoldCookie({ enabled, onCollect }: GoldCookieProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cookieRef = useRef<HTMLDivElement>(null);
  
  // Minimum time between appearances in milliseconds
  const minTime = 60000;
  // Maximum time between appearances in milliseconds  
  const maxTime = 180000;
  
  useEffect(() => {
    if (!enabled) return;
    
    const scheduleNextAppearance = () => {
      // Random delay between 1-3 minutes
      const delay = minTime + Math.random() * (maxTime - minTime);
      
      return setTimeout(() => {
        // Random position on screen
        const x = 10 + Math.random() * 80; // 10-90% of width
        const y = 20 + Math.random() * 60; // 20-80% of height
        
        setPosition({ x, y });
        setVisible(true);
        
        // Play golden cookie appearance sound
        playGoldenCookieSound();
        
        // Auto-hide after 15 seconds if not clicked
        const hideTimeout = setTimeout(() => {
          setVisible(false);
          scheduleNextAppearance();
        }, 15000);
        
        // Store timeout ID to clear on cleanup
        return () => clearTimeout(hideTimeout);
      }, delay);
    };
    
    const timeoutId = scheduleNextAppearance();
    
    return () => clearTimeout(timeoutId);
  }, [enabled, visible]);
  
  useEffect(() => {
    // Apply pulse animation when gold cookie appears
    if (visible && cookieRef.current) {
      pulseElement(cookieRef.current);
    }
  }, [visible]);
  
  const handleClick = () => {
    // Random bonus between 10-30% of current score
    const bonus = 0.1 + Math.random() * 0.2;
    onCollect(bonus);
    setVisible(false);
  };
  
  if (!visible) return null;
  
  return (
    <div 
      ref={cookieRef}
      className="absolute z-50 cursor-pointer" 
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%` 
      }}
      onClick={handleClick}
    >
      <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
        <div className="w-14 h-14 bg-yellow-300 rounded-full flex items-center justify-center">
          <div className="text-2xl">🍪</div>
        </div>
      </div>
    </div>
  );
} 