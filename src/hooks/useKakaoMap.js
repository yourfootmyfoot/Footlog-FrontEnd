import { useState, useEffect } from 'react';
import axios from 'axios';

const useKakaoMap = (libraries = '') => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const scriptId = 'kakao-map-script';

    const loadKakaoMapScript = async () => {
      try {
        if (!document.getElementById(scriptId)) {
          const response = await axios.get(`/api/kakao-map?libraries=${libraries}`);
          const script = document.createElement('script');
          script.id = scriptId;
          script.type = 'text/javascript';
          script.async = true;
          script.innerHTML = response.data;
          document.body.appendChild(script);

          script.onload = () => {
            window.kakao.maps.load(() => {
              setIsMapLoaded(true);
            });
          };
        } else {
          window.kakao.maps.load(() => {
            setIsMapLoaded(true);
          });
        }
      } catch (error) {
        console.error('Failed to load Kakao Map API:', error);
      }
    };

    loadKakaoMapScript();

    return () => {
      const script = document.getElementById(scriptId);
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [libraries]);

  return isMapLoaded;
};

export default useKakaoMap;
