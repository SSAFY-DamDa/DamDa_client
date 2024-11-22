<script setup>
import { useRoute } from "vue-router";

import KakaoMap from "@/components/common/TheKakaoMap.vue";
import { useTripStore } from "@/stores/trip";
import MyJourneyForm from "@/components/myjourney/MyJourneyForm.vue";

const route = useRoute();
const tripStore = useTripStore();
const { params } = route;
</script>

<template>
  <div id="journey-view">
    <MyJourneyForm :journeyId="params.id" />
    <KakaoMap :positions="tripStore.getPositions" />
  </div>
</template>

<style scoped>
#journey-view {
  display: flex;
  height: 100%;
}
</style>
