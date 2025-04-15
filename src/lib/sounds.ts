// Sound effect utility functions

// Audio context for sound generation
let audioContext: AudioContext | null = null;

// Sound enabled flag (persisted in localStorage)
let soundEnabled = localStorage.getItem('soundEnabled') !== 'false';

// Get sound enabled state
export const getSoundEnabled = (): boolean => {
  return soundEnabled;
};

// Toggle sound enabled state
export const toggleSound = (): boolean => {
  soundEnabled = !soundEnabled;
  localStorage.setItem('soundEnabled', soundEnabled.toString());
  return soundEnabled;
};

// Initialize audio context on first user interaction
export const initAudio = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
};

// Play a click sound
export const playClickSound = () => {
  if (!audioContext || !soundEnabled) return;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.1);
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);
};

// Play a critical hit sound
export const playCriticalSound = () => {
  if (!audioContext || !soundEnabled) return;
  
  const oscillator1 = audioContext.createOscillator();
  const oscillator2 = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator1.type = 'sine';
  oscillator1.frequency.setValueAtTime(600, audioContext.currentTime);
  oscillator1.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.1);
  
  oscillator2.type = 'sine';
  oscillator2.frequency.setValueAtTime(900, audioContext.currentTime);
  oscillator2.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
  
  oscillator1.connect(gainNode);
  oscillator2.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator1.start();
  oscillator2.start();
  oscillator1.stop(audioContext.currentTime + 0.2);
  oscillator2.stop(audioContext.currentTime + 0.2);
};

// Play a purchase success sound
export const playPurchaseSound = () => {
  if (!audioContext || !soundEnabled) return;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.3);
};

// Play an achievement unlocked sound
export const playAchievementSound = () => {
  if (!audioContext || !soundEnabled) return;
  
  const oscillator1 = audioContext.createOscillator();
  const oscillator2 = audioContext.createOscillator();
  const oscillator3 = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator1.type = 'sine';
  oscillator1.frequency.setValueAtTime(400, audioContext.currentTime);
  oscillator1.frequency.setValueAtTime(600, audioContext.currentTime + 0.2);
  oscillator1.frequency.setValueAtTime(800, audioContext.currentTime + 0.4);
  
  oscillator2.type = 'sine';
  oscillator2.frequency.setValueAtTime(600, audioContext.currentTime + 0.4);
  oscillator2.frequency.setValueAtTime(900, audioContext.currentTime + 0.6);
  
  oscillator3.type = 'sine';
  oscillator3.frequency.setValueAtTime(800, audioContext.currentTime + 0.6);
  oscillator3.frequency.setValueAtTime(1200, audioContext.currentTime + 0.8);
  
  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
  
  oscillator1.connect(gainNode);
  oscillator2.connect(gainNode);
  oscillator3.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator1.start();
  oscillator2.start(audioContext.currentTime + 0.4);
  oscillator3.start(audioContext.currentTime + 0.6);
  
  oscillator1.stop(audioContext.currentTime + 0.4);
  oscillator2.stop(audioContext.currentTime + 0.6);
  oscillator3.stop(audioContext.currentTime + 1);
};

// Play golden cookie appear sound
export const playGoldenCookieSound = () => {
  if (!audioContext || !soundEnabled) return;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(900, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
  oscillator.frequency.exponentialRampToValueAtTime(900, audioContext.currentTime + 0.2);
  oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.3);
  
  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.4);
}; 