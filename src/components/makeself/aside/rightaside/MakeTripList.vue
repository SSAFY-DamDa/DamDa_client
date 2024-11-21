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
}

.trip-list-item-container {
  width: 100%;
  min-height: 120px;
  display: flex;
  align-items: center;
  gap: 5px;
  list-style: none;
}

.trip-item-img {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  object-fit: cover;
  flex: 1;
}

.trip-item-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 3;
}

.trip-item-subject-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.trip-item-type {
  width: 50px;
  text-align: center;
  background-color: orange;
  border-radius: 30px;
  font-size: 1.1rem;
  color: white;
}

.trip-item-title {
  font-weight: 700;
}

.trip-item-address {
  font-weight: 300;
  font-size: 1.4rem;
  color: #797979;
  word-break: keep-all;
}
</style>
