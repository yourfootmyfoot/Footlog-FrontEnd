import { useEffect, useState } from 'react';

const useMarkers = (kakao, map, mapData) => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (!kakao || !map || !mapData) return;

    // 기존 마커 제거
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    // 새로운 마커 생성
    const newMarkers = mapData.map(place => {
      const markerPosition = new kakao.maps.LatLng(place.y, place.x);
      return new kakao.maps.Marker({
        position: markerPosition,
        map: map,
      });
    });

    setMarkers(newMarkers);

    // 지도 중심 이동
    if (mapData.length > 0) {
      const { y, x } = mapData[0];
      const centerPosition = new kakao.maps.LatLng(y, x);
      map.setCenter(centerPosition);
    }

    return () => {
      newMarkers.forEach(marker => marker.setMap(null));
    };
  }, [kakao, map, mapData]);

  return markers;
};

export default useMarkers;