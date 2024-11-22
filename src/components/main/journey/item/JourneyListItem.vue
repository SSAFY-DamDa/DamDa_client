<script setup>
const props = defineProps({
  journey: {
    type: Object,
  },
});
const startDate = props.journey.startDate.slice(0, 10);
const endDate = props.journey.endDate.slice(0, 10);
</script>

<template>
  <div class="journey-item-section">
    <div class="journey-item item-top">
      <div id="journey-color" :style="{ backgroundColor: journey.color }"></div>
      <div id="journey-title">{{ journey.title }}</div>
    </div>
    <div class="journey-item">
      <div id="journey-date">{{ startDate }} ~ {{ endDate }}</div>
    </div>
  </div>
</template>

<style scoped>
.journey-item-section {
  height: auto;
  padding: 20px 20px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #7bbcb0;
  border-radius: 20px;
}

.journey-item {
  display: flex;
}

.item-top {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.7rem;
}

#journey-color {
  width: 20px;
  height: 10px;
  border-radius: 5px;
}

#journey-date {
  font-size: 1.3rem;
}
</style>
