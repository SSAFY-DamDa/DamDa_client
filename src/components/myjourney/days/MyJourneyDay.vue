<script setup>
import MyJourneyList from "../list/MyJourneyList.vue";

const props = defineProps({
  journeyInfo: {
    type: Object,
  },
});

console.log("day:", props.journeyInfo);
</script>

<template>
  <div v-for="(day, index) in journeyInfo" :key="index">
    <MyJourneyList :day="day" :index="index" />
  </div>
</template>

<style scoped></style>
