import { useEffect, useState } from "react";
import './Preloader.scss';

const Preloader: React.FC = () => {
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  
  useEffect(() => {
    const messages = [
      "Preparing cosmic journey...",
      "Calculating the meaning of life...",
      "Brewing cosmic coffee...",
      "Convincing electrons to move faster...",
      "Teaching hamsters to power our servers...",
      "Generating random excuses for the delay...",
      "Searching for the internet's sense of humor...",
      "Untangling quantum knots...",
      "Aligning digital chakras...",
      "Reticulating splines...",
      "Warming up the flux capacitor...",
      "Debugging unicorn code...",
      "Adjusting the space-time continuum...",
      "Feeding the pixel gremlins...",
      "Loading cosmic particles..."
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setLoadingMessage(randomMessage);
  }, []);
  
  return (
    <div className="preloader">
      <div className="loader"></div>
      <div className="loader-text">{loadingMessage}</div>
    </div>
  );
};

export default Preloader;
