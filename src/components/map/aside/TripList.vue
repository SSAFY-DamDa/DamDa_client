<script setup>
import TripListItem from "@/components/map/aside/TripListItem.vue";
import { useTripStore } from "@/stores/trip";

const tripStore = useTripStore();
</script>

<template>
  <ul id="trip-list-ul" v-if="tripStore.getIsLoaded">
    <TripListItem v-for="trip in tripStore.getTripList" :key="trip.content_id" :trip-item="trip" />
  </ul>
</template>

<style scoped>
#trip-list-ul {
  width: 90%;
  max-height: 80%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

#trip-list-ul::-webkit-scrollbar {
  width: 4px;
}

#trip-list-ul::-webkit-scrollbar-thumb {
  background-color: rgb(170, 170, 170);
  border-radius: 20px;
}

#trip-list-ul.search-middle::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0);
}
</style>
