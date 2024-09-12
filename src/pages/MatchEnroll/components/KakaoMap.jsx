import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 10px;
  z-index: 0; //footer영역을 침범함.
`;

function KakaoMap({ mapData }) {
  const kakaoScript = useRef(null);
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const script = document.createElement('script');
    script.ref = kakaoScript.current;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        initializeMap();
      });
    };

    function initializeMap() {
      const kakao = window.kakao;
      const mapContainer = mapContainerRef.current;
      const options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 4,
      };

      const mapInstance = new kakao.maps.Map(mapContainer, options);
      setMap(mapInstance);
    }
  }, []);

  useEffect(() => {
    if (map && mapData) {
      const kakao = window.kakao;

      markers.map((marker) => marker.setMap(null));
      setMarkers([]);

      const newMarkers = mapData.map((place) => {
        const markerPosition = new kakao.maps.LatLng(place.y, place.x);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          map: map,
        });
        return marker;
      });

      setMarkers(newMarkers);

      if (mapData[0]) {
        const centerPosition = new kakao.maps.LatLng(
          mapData[0].y,
          mapData[0].x
        );
        map.setCenter(centerPosition);
      }
    }
  }, [map, mapData]);

  return <MapContainer ref={mapContainerRef} />;
}

export default KakaoMap;
