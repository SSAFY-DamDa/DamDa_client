<script setup>
import { ref, onMounted } from "vue";
import { useTripStore } from "@/stores/trip";
import { loadKakaoMap } from "@/utils/loadKakaoMap";
import { fetchPage } from "@/utils/kakao-init";

import BaseLeftAside from "@/components/makeself/aside/leftaside/BaseLeftAside.vue";
import KakaoMap from "@/components/common/TheKakaoMap.vue";

const tripStore = useTripStore();
const currentPage = ref(1);

onMounted(async () => {
  tripStore.setSelectTag(0);
  const kakao = await loadKakaoMap();
  tripStore.setIsLoaded(false);
  await fetchPage(currentPage.value, kakao, tripStore);
  tripStore.setIsLoaded(true);
});
</script>

<template>
  <section id="make-self-section">
    <BaseLeftAside />
    <KakaoMap :positions="tripStore.getPositions" />
  </section>
</template>

<style scoped>
#make-self-section {
  height: 100%;
  display: flex;
}
</style>
