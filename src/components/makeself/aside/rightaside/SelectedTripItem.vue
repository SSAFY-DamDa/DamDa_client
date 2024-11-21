<script setup>
import IconDrag from "@/components/icons/IconDrag.vue";

defineProps({
  place: {
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
</script>

<template>
  <li class="trip-list-item-container">
    <IconDrag width="10" height="20" />
    <img :src="place.img1" alt="이미지 준비중" class="trip-item-img" />
    <div class="trip-item-box">
      <div class="trip-item-subject-box">
        <span
          class="trip-item-type"
          :style="{
            backgroundColor: contentLabel[place.content_type_id][1],
          }"
          >{{ contentLabel[place.content_type_id][0] }}</span
        >
        <span class="trip-item-title">{{ place.title }}</span>
      </div>
      <span class="trip-item-address">{{ place.addr1 }}{{ place.addr2 }}</span>
    </div>
  </li>
</template>

<style scoped>
.trip-list-item-container {
  width: 95%;
  min-height: 80px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.trip-item-img {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  object-fit: cover;
  flex: 1;
}

.trip-item-box {
  min-height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 3;
}

.icon-add-to-list {
  flex: 1;
}

.trip-item-subject-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.trip-item-type {
  width: 50px;
  max-height: 20px;
  line-height: 20px;
  text-align: center;
  background-color: orange;
  border-radius: 30px;
  font-size: 0.9rem;
  color: white;
}

.trip-item-title {
  line-height: 25px;
  font-weight: 700;
  font-size: 1.5rem;
}

.trip-item-address {
  font-weight: 300;
  font-size: 1.2rem;
  color: #797979;
  line-height: 12px;
  word-break: keep-all;
}
</style>
