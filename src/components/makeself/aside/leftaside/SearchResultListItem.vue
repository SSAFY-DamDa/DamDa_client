<script setup>
import { useKakaoStore } from "@/stores/kakao";

const kakaoStore = useKakaoStore();

const props = defineProps({
  tripItem: {
    type: Object,
    required: true,
  },
});

const contentLabel = {
  12: ["관광지", "#3498db"],
  14: ["문화시설", "#9b59b6"],
  15: ["축제공연행사", "#e74c3c"],
  25: ["여행코스", "#1abc9c"],
  28: ["레포츠", "#f39c12"],
  32: ["숙박", "#34495e"],
  38: ["쇼핑", "#2ecc71"],
  39: ["음식점", "#e67e22"],
};

const handleClickMove = () => {
  const latlng = { La: props.tripItem.latitude, Ma: props.tripItem.longitude };
  kakaoStore.setCoordinate([latlng.La, latlng.Ma]);
};
</script>

<template>
  <li class="trip-list-item-container" @click="handleClickMove">
    <img :src="tripItem.img1" alt="이미지 준비중" class="trip-item-img" />
    <div class="trip-item-box">
      <div class="trip-item-subject-box">
        <span
          class="trip-item-type"
          :style="{
            backgroundColor: contentLabel[tripItem.content_type_id][1],
          }"
          >{{ contentLabel[tripItem.content_type_id][0] }}</span
        >
        <span class="trip-item-title">{{ tripItem.title }}</span>
      </div>
      <span class="trip-item-address"
        >{{ tripItem.addr1 }}{{ tripItem.addr2 }}</span
      >
    </div>
  </li>
</template>

<style scoped>
.trip-list-item-container {
  width: 100%;
  min-height: 120px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.trip-item-img {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  object-fit: cover;
}

.trip-item-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.trip-item-subject-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.trip-item-type {
  width: 50px;
  text-align: center;
  background-color: orange;
  border-radius: 30px;
  font-size: 1.1rem;
  color: white;
}

.trip-item-title {
  font-weight: 700;
}

.trip-item-address {
  font-weight: 300;
  font-size: 1.4rem;
  color: #797979;
  word-break: keep-all;
}
</style>
