// src/components/BackgroundMusic.jsx
import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const handleFirstClick = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(error => {
          console.error('Erro ao reproduzir:', error);
        });
      }
    };

    document.addEventListener('click', handleFirstClick);
    
    return () => {
      document.removeEventListener('click', handleFirstClick);
    };
  }, []);

  return (
    <audio 
      ref={audioRef} 
      src="/public/musica.mp3" 
      loop
      style={{ display: 'none' }}
    />
  );
}
