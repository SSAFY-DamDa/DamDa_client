<script setup>
import KakaoMap from "@/components/common/TheKakaoMap.vue";
import { useTripStore } from "@/stores/trip";
import { onMounted, ref } from "vue";
import { loadKakaoMap } from "@/utils/loadKakaoMap";
import { fetchPage } from "@/utils/kakao-init";
import JourneyInfo from "./JourneyInfo.vue";
import YoutubeRecommend from "../youtube/YoutubeRecommend.vue";

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
  <div id="result-view-container">
    <JourneyInfo />
    <div class="right-side-container">
      <KakaoMap height="70%" />
      <YoutubeRecommend />
    </div>
  </div>
</template>

<style scoped>
#result-view-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.right-side-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
