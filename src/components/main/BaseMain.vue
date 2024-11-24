<script setup>
import { useRouter } from "vue-router";
import TheCalendar from "@/components/common/TheCalendar.vue";
import JourneyList from "./journey/JourneyList.vue";

const router = useRouter();

const toMapPage = () => {
  router.push({ name: "map" });
};
</script>

<template>
  <div id="main-container">
    <section id="main-section">
      <img src="@/assets/imgs/mainbg.png" alt="메인배너" class="mainbg" />
      <button class="btn-to-map" @click="toMapPage">
        지역 및 관광지 검색하러 가기
      </button>
    </section>
    <section id="main-journey-section">
      <TheCalendar usage="main-calendar" />
      <JourneyList />
    </section>
  </div>
</template>

<style scoped>
#main-container {
  height: calc(100% - 60px);
}
#main-section {
  width: 100%;
  height: 35%;
  position: relative;
  margin-bottom: 2%;
}

.mainbg {
  position: relative;
  width: 100%;
  height: 100%;
  opacity: 50%;
  object-fit: cover;
}

.btn-to-map {
  position: absolute;
  top: 40%;
  left: 40%;
  max-width: 200px;
  padding: 10px 20px;
  background-color: #fff;
  border: none;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-size: 1.8rem;
  font-weight: 600;
  word-break: keep-all;
}

@media (max-width: 478px) {
  .btn-to-map {
    top: 40%;
    left: 28%;
    font-size: 1.3rem;
  }
}

#main-journey-section {
  width: 80%;
  height: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 40px;
}
</style>
