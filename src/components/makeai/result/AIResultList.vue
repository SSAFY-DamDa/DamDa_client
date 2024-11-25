<script setup>
import { useAiJourneyStore } from "@/stores/aijourney";
import MyJourneyList from "@/components/myjourney/list/MyJourneyList.vue";
import { loadKakaoMap } from "@/utils/loadKakaoMap";
import { useTripStore } from "@/stores/trip";
import { onMounted } from "vue";

const tripStore = useTripStore();
const aiJourneyStore = useAiJourneyStore();

console.log("airesultlist component");
console.log(aiJourneyStore.recommendedRoute);
onMounted(async () => {
  const temp = [];
  const kakao = await loadKakaoMap();
  Object.keys(aiJourneyStore.recommendedRoute).forEach((day) => {
    aiJourneyStore.recommendedRoute[day].forEach((trip) => {
      temp.push({
        title: trip.title,
        latlng: new kakao.maps.LatLng(trip.latitude, trip.longitude),
        area: trip,
      });
    });
  });
  tripStore.setPositions(temp);
});
</script>

<template>
  <div v-for="(day, index) in aiJourneyStore.recommendedRoute" :key="index">
    <MyJourneyList :day="day" :index="index" />
  </div>
</template>

<style scoped></style>
