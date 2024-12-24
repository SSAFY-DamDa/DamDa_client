<script setup>
import LoadingJourneyInfo from "./LoadingJourneyInfo.vue";
</script>

<template>
  <div id="result-view-container">
    <LoadingJourneyInfo />
    <div id="right-side-container">
      <section id="kakaomap-section"></section>
      <section id="youtube-section"></section>
    </div>
  </div>
</template>

<style scoped>
#result-view-container {
  display: flex;
  width: 100%;
  height: 100%;
}

#right-side-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

#kakaomap-section {
  width: 100%;
  height: 80%;
  background-color: #f0f0f0;
}

#youtube-section {
  width: 100%;
  background-color: #c0c0c0;
  height: 20%;
}
</style>
