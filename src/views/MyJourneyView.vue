<script setup>
import { useRoute } from "vue-router";
import KakaoMap from "@/components/common/TheKakaoMap.vue";
import MyJourneyForm from "@/components/myjourney/MyJourneyForm.vue";
import { useJourneyStore } from "@/stores/journey";

const route = useRoute();
const journeyStore = useJourneyStore();
const { params } = route;
const info = journeyStore.userJourneyList.filter(
  (journey) => Number(params.id) === journey.id
);
</script>

<template>
  <div id="journey-view">
    <MyJourneyForm :journeyId="params.id" :info="info[0] || {}" />
    <KakaoMap />
  </div>
</template>

<style scoped>
#journey-view {
  display: flex;
  height: 100%;
}
</style>
