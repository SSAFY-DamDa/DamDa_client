<script setup>
import { computed } from "vue";
import MakeTripListItem from "./MakeTripListItem.vue";

import { useJourneyStore } from "@/stores/journey.js";

const journeyStore = useJourneyStore();

const period = computed(() => journeyStore.journeyPeriod);

console.log("period", period);
</script>

<template>
  <ul class="make-trip-list-container">
    <MakeTripListItem v-for="day in period" :key="day" :day="day" />
  </ul>
</template>

<style scoped>
.make-trip-list-container {
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
}
</style>
