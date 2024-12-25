<script setup>
import NoImage from "@/assets/imgs/noImage.jpg";

defineProps({
  content: {
    type: String,
  },
  title: {
    type: String,
  },
  address: {
    type: String,
  },
});
</script>

<template>
  <div class="trip-list-item-container">
    <img :src="NoImage" alt="이미지 준비중" class="trip-item-img" />
    <div class="trip-item-box">
      <div class="trip-item-subject-box">
        <span class="trip-item-type">{{ content }}</span>
        <span class="trip-item-title">{{ title }}</span>
      </div>
      <span class="trip-item-address">{{ address }}</span>
    </div>
  </div>
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
