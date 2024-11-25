<script setup>
import KakaoMap from "@/components/common/TheKakaoMap.vue";
import { useTripStore } from "@/stores/trip";
import JourneyInfo from "./JourneyInfo.vue";
import YoutubeRecommend from "../youtube/YoutubeRecommend.vue";
const tripStore = useTripStore();
</script>

<template>
  <div id="result-view-container">
    <JourneyInfo />
    <div class="right-side-container">
      <KakaoMap height="70%" :positions="tripStore.getPositions" />
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
