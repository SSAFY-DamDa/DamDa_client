<script setup>
import { useRouter } from "vue-router";
import TheCalendar from "@/components/common/TheCalendar.vue";

const router = useRouter();

const toMapPage = () => {
  router.push({ name: "map" });
};
</script>

<template>
  <section id="main-section">
    <img src="@/assets/imgs/mainbg.png" alt="메인배너" class="mainbg" />
    <button class="btn-to-map" @click="toMapPage">
      지역 및 관광지 검색하러 가기
    </button>
  </section>
  <TheCalendar />
</template>

<style scoped>
#main-section {
  width: 100%;
  position: relative;
}

.mainbg {
  position: relative;
  width: 100%;
  opacity: 50%;
}

.btn-to-map {
  position: absolute;
  top: 50%;
  left: 45%;
}
</style>
