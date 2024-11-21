<script setup>
import MakeTripList from "./MakeTripList.vue";
import { useJourneyStore } from "@/stores/journey";
import { JourneyAxios } from "@/utils/http-journey";

const journeyStore = useJourneyStore();

const handleCreate = async () => {
  try {
    const axiosInstance = JourneyAxios();

    await axiosInstance.post("/journey", journeyStore.journeyDetail);

    await axiosInstance.post("/journey", journeyStore.journeyDay);

    alert("여행 계획이 성공적으로 생성되었습니다.");
  } catch (error) {
    console.error("여행 계획 생성 중 오류가 발생했습니다.", error);
    alert("여행 계획 생성 중 오류가 발생했습니다.");
  }
};
</script>

<template>
  <section id="right-aside-container">
    <MakeTripList />

    <button class="trip-plan-create-btn" @click="handleCreate">생성</button>
  </section>
</template>

<style scoped>
#right-aside-container {
  position: absolute;
  top: 80px;
  left: 410px;
  width: 405px;
  height: 90%;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  z-index: 100;
}

.trip-plan-create-btn {
  position: relative;
  top: -20px;
  left: 150px;
  width: 100px;
  border: 0;
  border-radius: 20px;
  background-color: #c2e0db;
  padding: 20px;
  color: white;
  font-weight: 700;
}
</style>
