<script setup>
import MyJourneyList from "../list/MyJourneyList.vue";

defineProps({
  journeyInfo: {
    type: Object,
  },
});
</script>

<template>
  <div v-for="(day, index) in journeyInfo" :key="index">
    <MyJourneyList :day="day" :index="index" />
  </div>
</template>

<style scoped></style>
