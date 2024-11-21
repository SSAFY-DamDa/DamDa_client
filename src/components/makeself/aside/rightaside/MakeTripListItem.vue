<script setup>
import { useJourneyStore } from "@/stores/journey.js";
import SelectedTripItem from "./SelectedTripItem.vue";
const journeyStore = useJourneyStore();

defineProps({
  journeyItem: {
    type: Object,
  },
  currentIdx: {
    type: Number,
  },
});
</script>

<template>
  <li class="make-trip-list-item" @click="journeyStore.toggleDay(currentIdx)">
    <div :class="['item-title', { titleActive: journeyItem.isOpen }]">
      {{ journeyItem.day }}일차
    </div>
    <div v-if="journeyItem.isOpen" class="item-content">
      <ul class="selected-list-ul">
        <SelectedTripItem
          v-for="place in journeyItem.places"
          :key="place.id"
          :place="place"
        />
      </ul>
    </div>
  </li>
</template>

<style scoped>
.make-trip-list-item {
  width: 90%;
  border: 1px solid #c9c9c9;
  border-radius: 5px;
  line-height: 40px;
  color: #787878;
  font-weight: 700;
  cursor: pointer;
}

.item-title {
  border-radius: 5px 5px 0px 0px;
  height: 40px;
  padding-left: 10px;
}

.titleActive {
  background-color: #7bbcb0;
  color: white;
}

.item-content {
  margin-top: 5px;
  padding-left: 10px;
  color: #555;
}

.selected-list-ul {
  width: 100%;
  margin: 20px 0 20px 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
