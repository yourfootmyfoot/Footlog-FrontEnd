import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import useKakaoMaps from '../hooks/useKakaoMaps';
import useMarkers from '../hooks/useMarkers';

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 10px;
  z-index: 0; // footer 영역을 침범함.
`;

function KakaoMap({ mapData }) {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const kakao = useKakaoMaps();

  useMarkers(kakao, map, mapData);

  useEffect(() => {
    if (kakao && mapContainerRef.current && !map) {
      const options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 기본 중심 좌표 (서울)
        level: 4, // 확대 레벨
      };
      const mapInstance = new kakao.maps.Map(mapContainerRef.current, options);
      setMap(mapInstance);
    }
  }, [kakao, map]);

  return <MapContainer ref={mapContainerRef} />;
}

export default KakaoMap;