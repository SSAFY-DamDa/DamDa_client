<script setup>
import { onMounted } from "vue";
import { useTripStore } from "@/stores/trip";
import { loadKakaoMap } from "@/utils/loadKakaoMap";
import { fetchPage } from "@/utils/kakao-init";

import BaseLeftAside from "@/components/makeself/aside/leftaside/BaseLeftAside.vue";
import BaseRightAside from "@/components/makeself/aside/rightaside/BaseRightAside.vue";
import KakaoMap from "@/components/common/TheKakaoMap.vue";
import { useJourneyStore } from "@/stores/journey";

const tripStore = useTripStore();
const journeyStore = useJourneyStore();

onMounted(async () => {
  tripStore.resetParamObj();
  const kakao = await loadKakaoMap();
  tripStore.setIsLoaded(false);
  await fetchPage(kakao, tripStore);
  tripStore.setIsLoaded(true);

  journeyStore.resetJourneyStore(); // 페이지가 로드될 때 스토어 초기화
});
</script>

<template>
  <section id="make-self-section">
    <BaseLeftAside />
    <BaseRightAside />
    <KakaoMap :positions="tripStore.getPositions" />
  </section>
</template>

<style scoped>
#make-self-section {
  height: 100%;
  display: flex;
}
</style>
