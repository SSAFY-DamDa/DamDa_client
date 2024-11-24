<script setup>
import TheCalendar from "@/components/common/TheCalendar.vue";
import JourneyList from "@/components/main/journey/JourneyList.vue";
</script>

<template>
  <div id="mycalendar-container">
    <section id="main-journey-section">
      <TheCalendar usage="main-calendar" />
      <JourneyList />
    </section>
  </div>
</template>

<style scoped>
#mycalendar-container {
  height: calc(100% - 60px);
  margin-top: 40px;
}

#main-journey-section {
  width: 80%;
  height: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 40px;
}
</style>
