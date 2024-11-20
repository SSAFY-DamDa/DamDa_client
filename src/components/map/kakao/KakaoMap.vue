<script setup>
import { ref, onMounted } from "vue";
import { loadKakaoMap } from "@/utils/loadKakaoMap"; // loadKakaoMap 함수 import
import { useKakaoStore } from "@/stores/kakao";
import { watch } from "vue";

const props = defineProps({
  positions: {
    type: Array,
    default: () => [],
  }
})

const kakaoStore = useKakaoStore();
let mapBox = ref(null);
const isMapLoaded = ref(false);
let map = null;
let markers = [];

const initializeMap = (kakao) => {
  const options = {
    center: new kakao.maps.LatLng(kakaoStore.getCoordinate[0], kakaoStore.getCoordinate[1]), // 초기 중심 좌표
    level: 3, // 확대 레벨
  };

  map = new kakao.maps.Map(mapBox.value, options); // 지도 생성
  isMapLoaded.value = true; // 맵 로드 상태 설정

  //지도 컨테이너가 다 뜬 후에 relayout()
  setTimeout(function () {
    map.relayout();
    addMarkers(props.positions, kakao);
  }, 0);
};

/**
 * 
 * @param {관광지정보} positions 
 * @param {카카오객체} kakao 
 * 
 * @return 카카오 맵에 마커 찍기
 */
const addMarkers = (positions, kakao) => {
  clearMarkers();
  const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  const imageSize = new kakao.maps.Size(24, 35);
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  positions.forEach(m => {
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(m.latlng.Ma, m.latlng.La),
      title: m.title,
      image: markerImage
    })
    marker.setMap(map);
    markers.push(marker);
  })
  map.setCenter(positions[0].latlng);
}

/**
 * @retrun 기존 마커지우기
 */
const clearMarkers = () => {
  markers.forEach((marker) => marker.setMap(null));
  markers = [];
};

onMounted(async () => {
  console.log("onMounted 실행됨");
  try {
    const kakao = await loadKakaoMap();
    initializeMap(kakao); // 맵 초기화

  } catch (error) {
    console.error("카카오 맵 로드 중 오류 발생:", error);
  }
});

watch(
  () => props.positions,
  (newPositions) => {
    if (map) addMarkers(newPositions, kakao);
  },
  { deep: true }
);

watch(
  () => kakaoStore.getCoordinate,
  (newCoordinate) => {
    if (map) {
      const newLatLng = new kakao.maps.LatLng(newCoordinate[0], newCoordinate[1]);
      map.setCenter(newLatLng);
      map.setLevel(1);
    }
  }
)

</script>

<template>
  <div id="map-container">
    <div ref="mapBox" v-show="isMapLoaded" id="mapBox"></div>
    <div v-show="!isMapLoaded">로딩중...</div>
  </div>
</template>

<style scoped>
#map-container {
  width: 100%;
  height: 100%;
}

#mapBox {
  height: 100%;
}
</style>
