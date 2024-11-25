<script setup>
import { ref, onMounted } from "vue";
import { loadKakaoMap } from "@/utils/loadKakaoMap";
import { useKakaoStore } from "@/stores/kakao";
import { watch } from "vue";
import { contentLabels } from "@/assets/constants/contentLabels";
import { useTripStore } from "@/stores/trip";
import noimage from "@/assets/imgs/noimage.jpg";

const props = defineProps({
  positions: {
    type: Array,
    default: () => [],
  },
  height: {
    // height prop 추가
    type: String,
    default: "100%",
  },
});

const tripStore = useTripStore();
const kakaoStore = useKakaoStore();
let mapBox = ref(null);
const isMapLoaded = ref(false);
let map = null;

const initializeMap = (kakao) => {
  const options = {
    center: new kakao.maps.LatLng(
      kakaoStore.getCoordinate[0],
      kakaoStore.getCoordinate[1]
    ), // 초기 중심 좌표
    level: 3, // 확대 레벨
  };

  map = new kakao.maps.Map(mapBox.value, options); // 지도 생성
  isMapLoaded.value = true; // 맵 로드 상태 설정

  //지도 컨테이너가 다 뜬 후에 relayout()
  setTimeout(function () {
    map.relayout();
    addMarkers(tripStore.getPositions, kakao);
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
  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
  const imageSize = new kakao.maps.Size(24, 35);
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  positions.forEach((m) => {
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(m.latlng.Ma, m.latlng.La),
      image: markerImage,
    });
    kakaoStore.addMarker(marker);

    let content =
      '<div class="kakao-overlay-wrap">' +
      `    <img 
              class="kakao-overlay overlay-img"
              src=${m.area.img1 || m.area.img2 || noimage}
            />` +
      '    <div class="info-wrap">' +
      `      <div class="kakao-overlay overlay-title" style="white-space: break-spaces;">${m.area.title}</div>` +
      `      <div class="kakao-overlay overlay-address id=address-main" style="white-space: break-spaces;">${m.area.addr1} ${m.area.addr2}</div>` +
      `      <div class="kakao-overlay overlay-content-type">
              <span style="background-color: ${
                contentLabels[m.area.content_type_id][1]
              }">
                ${contentLabels[m.area.content_type_id][0]}
              </span>
             </div>` +
      "    </div>" +
      "     <div class=overlay-arrow></div>" +
      "</div>";

    const overlay = new kakao.maps.CustomOverlay({
      content: content,
      position: marker.getPosition(),
    });

    kakao.maps.event.addListener(marker, "click", () => {
      map.setCenter(marker.getPosition());
      map.setLevel(1);
    });

    kakao.maps.event.addListener(marker, "mouseover", () => {
      overlay.setMap(map);
    });

    kakao.maps.event.addListener(marker, "mouseout", () => {
      setTimeout(() => {
        overlay.setMap();
      });
    });
  });
  map.setCenter(positions[0].latlng);
};

const clearMarkers = () => {
  if (kakaoStore.markers && kakaoStore.markers.length > 0) {
    kakaoStore.markers.forEach((marker) => marker.setMap(null));
    kakaoStore.markers = [];
  }
};

onMounted(async () => {
  try {
    const kakao = await loadKakaoMap();
    initializeMap(kakao); // 맵 초기화
  } catch (error) {
    console.error("카카오 맵 로드 중 오류 발생:", error);
  }
});

watch(
  () => tripStore.getPositions,
  (newPositions) => {
    if (map) addMarkers(newPositions, kakao);
  },
  { deep: true }
);

watch(
  () => kakaoStore.getCoordinate,
  (newCoordinate) => {
    if (map) {
      const newLatLng = new kakao.maps.LatLng(
        newCoordinate[0],
        newCoordinate[1]
      );
      map.setCenter(newLatLng);
      map.setLevel(1);
    }
  }
);
</script>

<template>
  <div id="map-container" :style="{ height: props.height }">
    <div ref="mapBox" v-show="isMapLoaded" id="mapBox"></div>
    <div v-show="!isMapLoaded">로딩중...</div>
  </div>
</template>
<style scoped>
#map-container {
  width: 100%;
}

#mapBox {
  height: 100%;
}
</style>
<style>
.kakao-overlay-wrap {
  position: absolute;
  top: -295px;
  left: -100px;
  width: 200px;
  background: #ffffff;
  border: 1px solid #c9c9c9;
  border-radius: 10px;
}

.info-wrap {
  height: 100%;
  padding: 0 5px 10px 0;
  display: flex;
  flex-direction: column;
}

.kakao-overlay {
  width: 100%;
}

.overlay-img {
  height: 120px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
}

.overlay-title {
  font-size: 1.6rem;
  font-weight: bold;
  padding: 5px;
}

.overlay-address {
  font-size: 1.3rem;
  padding: 5px;
  color: #a9a9a9;
}

.overlay-content-type {
  width: 100%;
  display: flex;
  justify-content: end;

  span {
    font-size: 1.2rem;
    color: #ffffff;
    font-weight: 100;
    padding: 5px 10px;
    margin-right: 10px;
    border-radius: 20px;
  }
}

.overlay-arrow:after,
.overlay-arrow:before {
  top: 100%;
  left: 50%;
  border: solid transparent;
  content: "";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.overlay-arrow:after {
  border-color: rgba(255, 255, 255, 0);
  border-top-color: #ffffff;
  border-width: 10px;
  margin-left: -10px;
}
.overlay-arrow:before {
  border-color: rgba(201, 201, 201, 0);
  border-top-color: #c9c9c9;
  border-width: 11px;
  margin-left: -11px;
}
</style>
