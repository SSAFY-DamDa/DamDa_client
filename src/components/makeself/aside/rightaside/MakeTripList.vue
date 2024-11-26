<script setup>
import MakeTripListItem from "./MakeTripListItem.vue";
import { useJourneyStore } from "@/stores/journey.js";

const journeyStore = useJourneyStore();
</script>

<template>
  <ul class="make-trip-list-container">
    <MakeTripListItem
      v-for="(journeyItem, index) in journeyStore.journeyDay"
      :key="index"
      :currentIdx="index"
      :journeyItem="journeyItem"
    >
    </MakeTripListItem>
  </ul>
</template>

<style scoped>
.make-trip-list-container {
  width: 90%;
  height: 90%;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
