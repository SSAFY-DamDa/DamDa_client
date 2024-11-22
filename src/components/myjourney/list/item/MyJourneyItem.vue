<script setup>
import { useKakaoStore } from "@/stores/kakao";
import { useTripStore } from "@/stores/trip";

const kakaoStore = useKakaoStore();
const tripStore = useTripStore();
const props = defineProps({
  item: {
    type: Object,
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
  const latlng = { La: props.item.latitude, Ma: props.item.longitude };
  const title = props.item.title;
  tripStore.setPositions([{ title, latlng }]);
  kakaoStore.setCoordinate([latlng.La, latlng.Ma]);
};

console.log(props.item);
</script>

<template>
  <li class="my-journey-list-item-container" @click="handleClickMove">
    <img
      :src="item.img1 ? item.img1 : item.img2"
      alt="이미지 준비중"
      class="my-journey-item-img"
    />
    <div class="my-journey-item-box">
      <div class="my-journey-item-subject-box">
        <span
          class="my-journey-item-type"
          :style="{
            backgroundColor: contentLabel[item.content_type_id][1],
          }"
          >{{ contentLabel[item.content_type_id][0] }}</span
        >
        <span class="my-journey-item-title">{{ item.title }}</span>
      </div>
      <span class="my-journey-item-address"
        >{{ item.addr1 }}{{ item.addr2 }}</span
      >
    </div>
  </li>
</template>

<style scoped>
.my-journey-list-item-container {
  width: 95%;
  min-height: 80px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.my-journey-item-img {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  object-fit: cover;
  flex: 1;
}

.my-journey-item-box {
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 3;
}

.icon-add-to-list {
  flex: 1;
}

.my-journey-item-subject-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.my-journey-item-type {
  width: 50px;
  max-height: 20px;
  line-height: 20px;
  text-align: center;
  background-color: orange;
  border-radius: 30px;
  font-size: 0.9rem;
  color: white;
}

.my-journey-item-title {
  line-height: 25px;
  font-weight: 700;
  font-size: 1.5rem;
}

.my-journey-item-address {
  font-weight: 300;
  font-size: 1.2rem;
  color: #797979;
  line-height: 12px;
  word-break: keep-all;
}
</style>
