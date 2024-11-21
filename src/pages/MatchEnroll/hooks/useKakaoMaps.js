import { useEffect, useState } from 'react';

function useKakaoMaps() {
  const [kakao, setKakao] = useState(null);

  useEffect(() => {
    if (window.kakao) {
      setKakao(window.kakao);
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    script.async = true;
    
    script.onload = () => {
      window.kakao.maps.load(() => {
        setKakao(window.kakao);
      });
    };

    script.onerror = () => {
      console.error("Kakao Map SDK 스크립트 로드 실패.")
    }

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return kakao;
};

export default useKakaoMaps;