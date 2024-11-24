<script setup>
import { useAiJourneyStore } from "@/stores/aijourney";
import MyJourneyList from "@/components/myjourney/list/MyJourneyList.vue";

const aiJourneyStore = useAiJourneyStore();

console.log("airesultlist component");
console.log(aiJourneyStore.recommendedRoute);
</script>

<template>
  <div v-for="(day, index) in aiJourneyStore.recommendedRoute" :key="index">
    <MyJourneyList :day="day" :index="index" />
  </div>
</template>

<style scoped></style>
