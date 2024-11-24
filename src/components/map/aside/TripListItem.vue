<script setup>
import { useKakaoStore } from "@/stores/kakao";
import { contentLabels } from "@/assets/constants/contentLabels";

const kakaoStore = useKakaoStore();
const props = defineProps({
  tripItem: {
    type: Object,
    required: true,
  },
});

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
            backgroundColor: contentLabels[tripItem.content_type_id][1],
          }"
          >{{ contentLabels[tripItem.content_type_id][0] }}</span
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
  min-height: 120px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.trip-item-img {
  width: 20%;
  height: 80px;
  border-radius: 5px;
  object-fit: cover;
}

.trip-item-box {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.trip-item-subject-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 5px;
}

.trip-item-type {
  padding: 1px 5px;
  text-align: center;
  background-color: orange;
  border-radius: 30px;
  font-size: 1.1rem;
  color: white;
}

.trip-item-title {
  font-weight: 700;
  word-break: keep-all;
}

.trip-item-address {
  font-weight: 300;
  font-size: 1.4rem;
  color: #797979;
}
</style>
