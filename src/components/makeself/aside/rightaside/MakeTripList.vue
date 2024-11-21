<script setup>
import MakeTripListItem from "./MakeTripListItem.vue";

import { useJourneyStore } from "@/stores/journey.js";

const journeyStore = useJourneyStore();
</script>

<template>
  <ul class="make-trip-list-container">
    <MakeTripListItem
      v-for="journey in journeyStore.getJourneyList"
      :key="journey.id"
      :journey-item="journey"
    />
  </ul>
</template>

<style scoped>
.make-trip-list-container {
  width: 100%;
}
</style>
